export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  category: 'ride' | 'show' | 'experience';
  ageRequirement?: number;
  maxHeight?: number;
  featured: boolean;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FunActivity {
  id: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
}
