export interface Chemical {
  id: string;
  name: string;
  formula?: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  foundIn: string[];
  healthEffects: string;
  safetyRating: number;
  products?: string;
}
