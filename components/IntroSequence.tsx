import React, { useEffect, useRef, useState } from 'react';

const IntroSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingText, setLoadingText] = useState("SYSTEM CHECK");

  // Text Sequence - Synced approx to Apollo 11 audio
  useEffect(() => {
    const schedule = [
      { time: 0, text: "T-MINUS 15 SECONDS" },
      { time: 1000, text: "GUIDANCE IS INTERNAL" },
      { time: 1500, text: "IGNITION SEQUENCE START" }, // ~6s mark in audio
      { time: 2000, text: "6" },
      { time: 3000, text: "5" },
      { time: 4000, text: "4" },
      { time: 5000, text: "3" },
      { time: 6000, text: "2" },
      { time: 7000, text: "1" },
      { time: 8000, text: "0" },
      { time: 10000, text: "ALL ENGINES RUNNING" },
      { time: 12000, text: "LIFTOFF DETECTED" },
      { time: 20000, text: "TOWER CLEARED" },
      { time: 22000, text: "NOMINAL TRAJECTORY" }
    ];

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    schedule.forEach(({ time, text }) => {
      const t = setTimeout(() => {
        setLoadingText(text);
      }, time);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Equations
    const equationsList = [
      "F = ma",
      "Δv = ve ln(m₀/mf)",
      "ρv²CDA/2",
      "L = Cl ½ρv²S",
      "g = GM/r²",
      "T = 2π√(a³/μ)",
      "V = √(GM/r)",
      "P = Fv",
      "K.E. = ½mv²"
    ];
    
    const floatingItems = equationsList.map(() => ({
      text: equationsList[Math.floor(Math.random() * equationsList.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      scale: 0.5 + Math.random() * 1.5,
      alpha: Math.random()
    }));

    // Wireframe Objects (Rocket/F1)
    let rotation = 0;

    let frameId: number;

    const drawRocket = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 4); // Tilt
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2;

      // Body
      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.lineTo(15, 0);
      ctx.lineTo(15, 60);
      ctx.lineTo(-15, 60);
      ctx.lineTo(-15, 0);
      ctx.closePath();
      ctx.stroke();

      // Nose Cone
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(0, -50);
      ctx.lineTo(15, 0);
      ctx.stroke();

      // Fins
      ctx.beginPath();
      ctx.moveTo(-15, 40);
      ctx.lineTo(-35, 70);
      ctx.lineTo(-15, 60);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(15, 40);
      ctx.lineTo(35, 70);
      ctx.lineTo(15, 60);
      ctx.stroke();

      // Window
      ctx.beginPath();
      ctx.arc(0, 15, 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const drawF1Car = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#FF003C';
      ctx.lineWidth = 2;

      // Simple F1 Outline
      ctx.beginPath();
      // Rear Wing
      ctx.moveTo(-40, -10);
      ctx.lineTo(-40, -25);
      ctx.lineTo(-20, -25);
      // Body
      ctx.moveTo(-20, -10);
      ctx.lineTo(20, -10);
      ctx.lineTo(40, 5); // Nose
      ctx.lineTo(20, 10);
      ctx.lineTo(-40, 10);
      ctx.closePath();
      ctx.stroke();

      // Wheels
      ctx.beginPath();
      ctx.arc(-25, 10, 8, 0, Math.PI * 2); // Rear Left
      ctx.moveTo(-17, 10);
      ctx.arc(25, 10, 6, 0, Math.PI * 2); // Front Left
      ctx.stroke();

      // Driver Halo
      ctx.beginPath();
      ctx.moveTo(-5, -10);
      ctx.lineTo(5, -15);
      ctx.lineTo(15, -10);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      // Trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Physics Equations
      ctx.font = '16px "Space Grotesk"';
      floatingItems.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;

        // Bounce
        if(item.x < 0 || item.x > width) item.vx *= -1;
        if(item.y < 0 || item.y > height) item.vy *= -1;

        ctx.fillStyle = `rgba(100, 200, 255, ${item.alpha})`;
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.scale(item.scale, item.scale);
        ctx.fillText(item.text, 0, 0);
        ctx.restore();
      });

      // 2. Center Rotating Blueprints
      rotation += 0.01;
      const cx = width / 2;
      const cy = height / 2;

      // Grid Lines Background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      const offset = (Date.now() / 20) % gridSize;
      
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, height);
      }
      // Horizontal moving down
      for (let y = 0; y < height; y += gridSize) {
         ctx.moveTo(0, y + offset);
         ctx.lineTo(width, y + offset);
      }
      ctx.stroke();


      // Rotating F1 Car Orbiting Center
      const orbitRadius = Math.min(width, height) * 0.25;
      const f1X = cx + Math.cos(rotation * 2) * orbitRadius;
      const f1Y = cy + Math.sin(rotation * 2) * orbitRadius;
      drawF1Car(ctx, f1X, f1Y, 1.5);

      // Rocket Shooting Up periodically
      const rocketY = (height + 200) - ((Date.now() % 3000) / 3000) * (height + 400);
      drawRocket(ctx, cx, rocketY, 2);

      // HUD Circle Center
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.stroke();
      
      // Dashed Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-rotation);
      ctx.setLineDash([10, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-black overflow-hidden flex flex-col items-center justify-center font-display">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Central HUD Text */}
        <div className="border border-neon-blue/30 bg-black/50 backdrop-blur-sm p-8 rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.2)]">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-widest animate-pulse">
            MISSION STATUS
          </h1>
          <div className="h-0.5 w-full bg-neon-red mb-4"></div>
          <div className="text-neon-blue text-xl md:text-2xl font-mono glitch-text">
             {loadingText}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 w-full text-center">
        <p className="text-xs text-gray-500 font-mono tracking-[0.5em] animate-pulse">
          PREPARING SYSTEMS FOR ORBITAL INSERTION
        </p>
      </div>

      <style>{`
        .glitch-text {
          animation: glitch 0.5s linear infinite;
        }
        @keyframes glitch {
          2%, 64% { transform: translate(1px,0) skew(0deg); opacity: 0.9; }
          4%, 60% { transform: translate(-1px,0) skew(0deg); opacity: 1; }
          62% { transform: translate(0,0) skew(2deg); }
        }
      `}</style>
    </div>
  );
};

export default IntroSequence;