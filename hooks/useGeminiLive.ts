import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';
import { base64ToUint8Array, decodeAudioData, createPcmBlob } from '../utils/audio';

interface UseGeminiLiveReturn {
  isConnect: boolean;
  isTalking: boolean; // Model is talking
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  volume: number; // For visualization
}

export const useGeminiLive = (): UseGeminiLiveReturn => {
  const [isConnect, setIsConnect] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);

  // Refs for cleanup and audio management
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourceNodesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  
  // Analyzer for visualization
  const analyzerRef = useRef<AnalyserNode | null>(null);

  const disconnect = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }

    if (sourceNodesRef.current.size > 0) {
      sourceNodesRef.current.forEach(node => {
        try { node.stop(); } catch (e) {}
      });
      sourceNodesRef.current.clear();
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // We can't strictly "close" the session promise directly via the API in the same way as a socket,
    // but we reset our state. The library handles cleanup on page unload usually, 
    // but ideally we'd have a session.close() if exposed by the promise result.
    // Based on docs, we just stop sending data.
    sessionPromiseRef.current?.then((session: any) => {
        if(session.close) session.close();
    });
    sessionPromiseRef.current = null;

    setIsConnect(false);
    setIsTalking(false);
    setVolume(0);
  }, []);

  const connect = useCallback(async () => {
    if (!process.env.API_KEY) {
      setError("API Key not found.");
      return;
    }

    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio Contexts
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = audioCtx;

      // Audio Input (Mic) - Re-sampled to 16k for Gemini
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const source = inputCtx.createMediaStreamSource(stream);
      
      // Visualization Analyzer
      const analyzer = inputCtx.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;
      
      // Update volume for UI
      const updateVolume = () => {
        if (!analyzerRef.current || !isConnect) return;
        const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
        analyzerRef.current.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setVolume(avg);
        requestAnimationFrame(updateVolume);
      };
      
      // Processor to send data
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      processor.onaudioprocess = (e) => {
        if (!sessionPromiseRef.current) return;
        
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createPcmBlob(inputData);
        
        sessionPromiseRef.current.then((session: any) => {
          session.sendRealtimeInput({ media: pcmBlob });
        });
      };

      source.connect(processor);
      processor.connect(inputCtx.destination); // destination is mute needed for script processor to run

      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } }, 
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            setIsConnect(true);
            updateVolume();
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (audioData) {
              setIsTalking(true);
              const audioBuffer = await decodeAudioData(
                base64ToUint8Array(audioData),
                audioCtx,
                24000,
                1
              );

              const now = audioCtx.currentTime;
              // Ensure we schedule after the previous chunk, or now if we fell behind
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);

              const sourceNode = audioCtx.createBufferSource();
              sourceNode.buffer = audioBuffer;
              sourceNode.connect(audioCtx.destination);
              
              sourceNode.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              
              sourceNodesRef.current.add(sourceNode);
              sourceNode.onended = () => {
                sourceNodesRef.current.delete(sourceNode);
                if (sourceNodesRef.current.size === 0) {
                    setIsTalking(false);
                }
              };
            }

            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              // Stop all current audio
              sourceNodesRef.current.forEach(node => {
                try { node.stop(); } catch(e) {}
              });
              sourceNodesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsTalking(false);
            }
          },
          onclose: () => {
            disconnect();
          },
          onerror: (err) => {
            console.error(err);
            setError("Connection error");
            disconnect();
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to connect to microphone or API.");
      disconnect();
    }
  }, [disconnect, isConnect]);

  return { isConnect, isTalking, error, connect, disconnect, volume };
};
