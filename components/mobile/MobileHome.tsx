'use client';

import * as React from 'react';
import { useDesktopStore } from '@/stores/desktopStore';
import { AppId } from '@/types/window';
import { cn } from '@/lib/utils';
import { Layers, Sparkles, ShieldCheck, LucideIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/WhatsappIcon';

const GRID_APPS: { appId: AppId; label: string; Icon: LucideIcon; accent: string }[] = [
  { appId: 'projects', label: 'Work', Icon: Layers, accent: 'from-sky-500/30 to-blue-600/30' },
  { appId: 'services', label: 'Services', Icon: Sparkles, accent: 'from-amber-500/30 to-orange-600/30' },
  { appId: 'about', label: 'Story & Proof', Icon: ShieldCheck, accent: 'from-indigo-500/30 to-purple-600/30' },
];

function useClock() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function MobileHome() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const now = useClock();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201023134890').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Ammar, I checked your portfolio on mobile and would like to discuss a project.'
  )}`;

  return (
    <div className="flex h-full w-full flex-col px-6 pt-12 pb-24 justify-between">
      <div>
        {/* Lock-screen style clock */}
        <div className="mb-10 text-center text-white drop-shadow-lg">
          <div className="text-6xl font-semibold tracking-tight">{time}</div>
          <div className="mt-1 text-sm font-medium text-white/80">{date}</div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available for Q4 Projects
          </div>
        </div>

        {/* Icon grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {GRID_APPS.map(({ appId, label, Icon, accent }) => (
            <button
              key={appId}
              type="button"
              onClick={() => openWindow(appId)}
              className="flex flex-col items-center gap-2 active:opacity-75"
            >
              <span
                className={cn(
                  'flex h-15 w-15 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-linear-to-br shadow-lg ring-1 ring-white/20 backdrop-blur-xl transition-transform active:scale-90',
                  accent
                )}
              >
                <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
              </span>
              <span className="line-clamp-1 text-xs font-medium text-white drop-shadow-md">
                {label}
              </span>
            </button>
          ))}

          {/* WhatsApp in grid */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 active:opacity-75"
          >
            <span className="flex h-15 w-15 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500/30 to-green-600/30 shadow-lg ring-1 ring-emerald-500/30 backdrop-blur-xl transition-transform active:scale-90 text-emerald-400">
              <WhatsappIcon className="h-7 w-7" />
            </span>
            <span className="line-clamp-1 text-xs font-medium text-white drop-shadow-md">
              Chat
            </span>
          </a>
        </div>
      </div>

      {/* Bottom dock */}
      <div className="pointer-events-auto fixed inset-x-6 bottom-6 flex items-center justify-around rounded-[28px] border border-white/15 bg-zinc-950/70 px-4 py-3 backdrop-blur-2xl shadow-2xl shadow-black/60">
        {GRID_APPS.map(({ appId, Icon }) => (
          <button
            key={appId}
            type="button"
            onClick={() => openWindow(appId)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white active:scale-90 transition-transform"
          >
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </button>
        ))}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-500/30 text-emerald-400 active:scale-90 transition-transform"
        >
          <WhatsappIcon className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
