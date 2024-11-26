export interface FormData {
  companyName: string;
  products: string;
  objective: string;
  targetAudience: string;
  contentLength: string;
  contentTone: string;
  selectedPlatforms: string[];
  topic: string;
  resources?: Array<{
    type: 'url' | 'file' | 'image';
    content: string;
    name: string;
  }>;
}