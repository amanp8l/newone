export interface Trend {
  title: string;
  keyTheme: string;
  sellingPoint: string;
  visualAppeal: string;
  goodPoints: string[];
  badPoints: string[];
  description: string;
  views: number;
  engagement: number;
  thumbnail?: string;
  videoUrl?: string;
}