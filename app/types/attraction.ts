export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  gradient?: string;
  badgeLabel?: string;
  badgeColor?: string;
  inclusions?: string[];
  choices?: string[];
  color?: string;
  price: number;
  category: 'ride' | 'show' | 'experience';
  ageRequirement?: number;
  maxHeight?: number;
  featured: boolean;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
}

export interface FunActivity {
  id: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
}
