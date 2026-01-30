
export enum Theme {
  COFFEE = 'COFFEE',
  HARDWARE = 'HARDWARE'
}

export type Language = 'pt' | 'en';

export interface LocalizedString {
  pt: string;
  en: string;
}

export interface LocalizedList {
  pt: string[];
  en: string[];
}

export interface Experience {
  company: string;
  role: LocalizedString;
  period: string;
  location: string;
  description: LocalizedList;
}

export interface ProjectRPGStats {
  xpGained: LocalizedString;
  manaCost: LocalizedString;
  questLevel: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  techClass: LocalizedString;
}

export interface Project {
  title: string;
  date: string;
  description: LocalizedList;
  longDescription: LocalizedString;
  images?: string[];
  tech: string[];
  theme: Theme;
  githubUrl?: string;
  liveUrl?: string;
  rpgStats: ProjectRPGStats;
}

export interface SkillItem {
  name: string;
  icon: string;
  details?: LocalizedList;
  level?: 'Basic' | 'Intermediate' | 'Advanced' | 'Master';
}

export interface Skill {
  category: LocalizedString;
  items: SkillItem[];
}
