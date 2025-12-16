export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  content: string; // HTML content
  imageUrl: string;
  author: string;
  readingTime: string;
}

export interface QuizState {
  step: number;
  answers: {
    intent?: string;
    age?: number;
    zipCode?: string;
    germanLevel?: string;
    driversLicense?: boolean;
    experience?: string;
    sporty?: boolean;
    mindset?: boolean;
    startDate?: string;
    name?: string;
    phone?: string;
    email?: string;
    consent?: boolean;
  };
  isSubmitted: boolean;
  isDisqualified: boolean;
  disqualificationReason?: string;
}

export type Partner = {
  name: string;
  logoUrl: string; // Placeholder URL
  description: string;
};