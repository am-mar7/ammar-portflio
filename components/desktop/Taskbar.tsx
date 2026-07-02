'use client';

import { useEffect, useState } from 'react';
import { useDesktopStore } from '@/stores/desktopStore';
import { AppId } from '@/types/window';
import { cn } from '@/lib/utils';
import { User, Folder, Terminal, FileText, Apple } from 'lucide-react';
import { WhatsappIcon } from '@/components/WhatsappIcon';

const APP_META: Record<AppId, { label: string; Icon: typeof User }> = {
  about: { label: 'About', Icon: User },
  projects: { label: 'Projects', Icon: Folder },
  'project-detail': { label: 'Project', Icon: Folder },
  skills: { label: 'Skills', Icon: Terminal },
  resume: { label: 'Resume', Icon: FileText },
  contact: { label: 'Contact', Icon: User }, // Unused now but kept for AppId type
};

const DOCK_APPS: AppId[] = ['about', 'projects', 'skills', 'resume'];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Taskbar() {
  const { windows, openWindow, focusWindow, minimizeWindow, restoreWindow, focusedWindowId } =
    useDesktopStore();
  const now = useClock();

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <>

      {/* Dock */}
      <div
        id="taskbar"
        className="pointer-events-auto fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-2xl shadow-2xl shadow-black/40"
      >
        {DOCK_APPS.map((appId) => {
          const meta = APP_META[appId];
          const openInstance = windows.find((w) => w.appId === appId);
          const isFocused = openInstance?.id === focusedWindowId;

          return (
            <button
              key={appId}
              type="button"
              title={meta.label}
              onClick={() => {
                if (!openInstance) return openWindow(appId);
                if (openInstance.isMinimized) return restoreWindow(openInstance.id);
                if (isFocused) return minimizeWindow(openInstance.id);
                focusWindow(openInstance.id);
              }}
              className={cn(
                'group relative flex h-12 w-12 items-center justify-center rounded-xl text-white/90 transition-all',
                'hover:scale-110 hover:-translate-y-1',
                'bg-white/10 ring-1 ring-white/15',
              )}
            >
              <meta.Icon className="h-6 w-6" strokeWidth={1.6} />
              {openInstance ? (
                <span
                  className={cn(
                    'absolute -bottom-1.5 h-1 w-1 rounded-full',
                    isFocused ? 'bg-white' : 'bg-white/60',
                  )}
                />
              ) : null}
            </button>
          );
        })}

        {/* WhatsApp Link */}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className={cn(
            'group relative flex h-12 w-12 items-center justify-center rounded-xl text-white/90 transition-all',
            'hover:scale-110 hover:-translate-y-1',
            'bg-green-500/20 ring-1 ring-green-500/30 text-green-400',
          )}
        >
          <WhatsappIcon className="h-6 w-6" />
        </a>
      </div>
    </>
  );
}
