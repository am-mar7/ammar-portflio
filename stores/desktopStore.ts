// stores/desktopStore.ts
import { create } from 'zustand';
import { WindowState, AppId } from '@/types/window';
import { v4 as uuid } from 'uuid';

interface DesktopStore {
  windows: WindowState[];
  focusedWindowId: string | null;
  zCounter: number;

  openWindow: (appId: AppId, meta?: Record<string, unknown>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

const DEFAULT_SIZES: Record<AppId, { width: number; height: number }> = {
  about:          { width: 720, height: 520 },
  projects:       { width: 860, height: 580 },
  'project-detail': { width: 900, height: 640 },
  skills:         { width: 640, height: 480 },
  resume:         { width: 780, height: 680 },
  contact:        { width: 640, height: 520 },
};

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: [],
  focusedWindowId: null,
  zCounter: 10,

  openWindow: (appId, meta) => {
    const existing = get().windows.find(
      w => w.appId === appId && !meta
    );
    if (existing) {
      // Focus and restore if already open
      get().focusWindow(existing.id);
      if (existing.isMinimized) get().restoreWindow(existing.id);
      return;
    }
    const z = get().zCounter + 1;
    const id = uuid();
    // Cascade offset per window count
    const offset = get().windows.length * 24;
    const newWindow: WindowState = {
      id,
      appId,
      title: appId,
      isMinimized: false,
      isMaximized: false,
      zIndex: z,
      position: { x: 120 + offset, y: 80 + offset },
      size: DEFAULT_SIZES[appId],
      meta,
    };
    set(s => ({
      windows: [...s.windows, newWindow],
      focusedWindowId: id,
      zCounter: z,
    }));
  },

  closeWindow: (id) =>
    set(s => ({ windows: s.windows.filter(w => w.id !== id) })),

  minimizeWindow: (id) =>
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      focusedWindowId: null,
    })),

  restoreWindow: (id) => {
    const z = get().zCounter + 1;
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, isMinimized: false, zIndex: z } : w
      ),
      focusedWindowId: id,
      zCounter: z,
    }));
  },

  maximizeWindow: (id) =>
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    })),

  focusWindow: (id) => {
    const z = get().zCounter + 1;
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, zIndex: z } : w
      ),
      focusedWindowId: id,
      zCounter: z,
    }));
  },

  updatePosition: (id, pos) =>
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, position: pos } : w
      ),
    })),

  updateSize: (id, size) =>
    set(s => ({
      windows: s.windows.map(w =>
        w.id === id ? { ...w, size } : w
      ),
    })),
}));