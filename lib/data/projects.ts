import { Project } from '@/types/project';

export const projects: Project[] = [];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const featuredProjects: Project[] = [];

const ACCENTS = [
  'from-sky-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-rose-600',
  'from-fuchsia-500 to-purple-600',
  'from-cyan-500 to-blue-600',
];

export function getProjectAccent(id: string): string {
  const i = Math.abs([...id].reduce((acc, c) => acc + c.charCodeAt(0), 0)) % ACCENTS.length;
  return ACCENTS[i];
}
