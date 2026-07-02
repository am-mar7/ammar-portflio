'use client';

import { useDesktopStore } from '@/stores/desktopStore';
import { AppId } from '@/types/window';
import { cn } from '@/lib/utils';
import { User, Folder, Terminal, FileText, LucideIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/WhatsappIcon';

const GRID_APPS: { appId: AppId; label: string; Icon: LucideIcon }[] = [
  { appId: 'about', label: 'About Me', Icon: User },
  { appId: 'projects', label: 'Projects', Icon: Folder },
  { appId: 'skills', label: 'Skills', Icon: Terminal },
  { appId: 'resume', label: 'Resume', Icon: FileText },
];

function useClock() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

import * as React from 'react';

export default function MobileHome() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex h-full w-full flex-col px-6 pt-14">
      {/* Lock-screen style clock */}
      <div className="mb-10 text-center text-white drop-shadow-lg">
        <div className="text-6xl font-semibold tracking-tight">{time}</div>
        <div className="mt-1 text-sm font-medium text-white/80">{date}</div>
      </div>

      {/* Icon grid */}
      <div className="grid grid-cols-4 gap-y-6">
        {GRID_APPS.map(({ appId, label, Icon }) => (
          <button
            key={appId}
            type="button"
            onClick={() => openWindow(appId)}
            className="flex flex-col items-center gap-1.5 active:opacity-70"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-md ring-1 ring-white/15 backdrop-blur-md transition-transform active:scale-90">
              <Icon className="h-7 w-7 text-white" strokeWidth={1.6} />
            </span>
            <span className="line-clamp-1 text-[11px] font-medium text-white drop-shadow-md">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom dock */}
      <div className="pointer-events-auto fixed inset-x-4 bottom-6 flex items-center justify-around rounded-[28px] border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-2xl shadow-2xl shadow-black/40">
        {GRID_APPS.map(({ appId, Icon }) => (
          <button
            key={appId}
            type="button"
            onClick={() => openWindow(appId)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white active:scale-90 transition-transform"
          >
            <Icon className="h-5 w-5" strokeWidth={1.6} />
          </button>
        ))}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/20 text-green-400 active:scale-90 transition-transform"
        >
          <WhatsappIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}