export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
