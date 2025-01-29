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

export interface Video {
  viralScore: string | null;
  relatedTopic: string[] | null;
  transcript: string | null;
  videoUrl: string;
  videoMsDuration: number;
  videoId: number;
  title: string | null;
  viralReason: string | null;
}