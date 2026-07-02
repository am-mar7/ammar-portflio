export type AppId =
  | 'about'
  | 'projects'
  | 'project-detail'
  | 'skills'
  | 'resume'
  | 'contact';

export interface WindowState {
  id: string;               // uuid — allows multiple instances
  appId: AppId;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  meta?: Record<string, unknown>; // e.g. projectId for detail windows
}

export interface DesktopIcon {
  id: string;
  appId: AppId;
  label: string;
  icon: string;             // path to /public/icons/*.png
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
  meta?: Record<string, unknown>;
}