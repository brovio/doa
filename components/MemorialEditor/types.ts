export interface MemorialData {
  id: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  biography: string;
  dates: {
    birth: string;
    death: string;
    milestones: Milestone[];
  };
  gallery: GalleryImage[];
  timeline: TimelineEvent[];
  keyMemories: Memory[];
  privacyMode: 'public' | 'private' | 'friends';
}

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'life' | 'achievement' | 'family' | 'work' | 'memory';
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  people: string;
}