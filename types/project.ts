export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  screenshots: string[];   // Supabase Storage URLs
  githubUrl?: string;
  liveUrl?: string;
  architectureNotes?: string;
  challenges?: string;
  featured: boolean;
}