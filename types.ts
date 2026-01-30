
export enum Theme {
  COFFEE = 'COFFEE',
  HARDWARE = 'HARDWARE'
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface ProjectRPGStats {
  xpGained: string;
  manaCost: string; // Estimated time/complexity
  questLevel: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  techClass: string;
}

export interface Project {
  title: string;
  date: string;
  description: string[]; // Brief points for the card
  longDescription?: string; // Detailed text for the modal
  images?: string[]; // Array of image URLs for the gallery
  tech: string[];
  theme: Theme;
  githubUrl?: string;
  liveUrl?: string;
  rpgStats: ProjectRPGStats;
}

export interface SkillItem {
  name: string;
  icon: string;
  details?: string[]; // Detailed knowledge/usage points
  level?: 'Basic' | 'Intermediate' | 'Advanced' | 'Master'; // Game-like levels
}

export interface Skill {
  category: string;
  items: SkillItem[];
}
