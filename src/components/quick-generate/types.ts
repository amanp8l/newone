export interface Platform {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
}

export interface GeneratedContent {
  [key: string]: string;
}

export interface DraftContent {
  content: string;
  isValid: boolean;
}