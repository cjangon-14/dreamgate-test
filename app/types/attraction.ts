export interface Attraction {
  id: string;
  name: string;
  label: string;
  description: string;
  image_path: string;
  selectable_attractions: number;
  attractions?: AttractionItem[];
  start_date: string | null;
  end_date: string | null;
  status: number;
  free_attractions: string[];
  gradient?: string;
  badgeColor?: string;
  inclusions?: string[];
  choices?: string[];
  color?: string;
  base_amount: number;
  category: "ride" | "show" | "experience";
  featured: boolean;
}

export type AttractionItem = {
  id: number;
  name: string;
};

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
