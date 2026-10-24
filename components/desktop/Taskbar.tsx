'use client';

import { useEffect, useState } from 'react';
import { useDesktopStore } from '@/stores/desktopStore';
import { AppId } from '@/types/window';
import { cn } from '@/lib/utils';
import { Layers, Sparkles, ShieldCheck, LucideIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/WhatsappIcon';

const APP_META: Record<string, { label: string; Icon: LucideIcon }> = {
  projects: { label: 'Selected Work', Icon: Layers },
  services: { label: 'Services & Offers', Icon: Sparkles },
  about: { label: 'Proof & Story', Icon: ShieldCheck },
};

const DOCK_APPS: AppId[] = ['projects', 'services', 'about'];

export default function Taskbar() {
  const { windows, openWindow, focusWindow, minimizeWindow, restoreWindow, focusedWindowId } =
    useDesktopStore();

  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201023134890').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Ammar, I checked your portfolio and would like to discuss a project.'
  )}`;

  return (
    <div
      id="taskbar"
      className="pointer-events-auto fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2.5 rounded-2xl border border-white/15 bg-zinc-950/70 px-3.5 py-2.5 backdrop-blur-2xl shadow-2xl shadow-black/60"
    >
      {DOCK_APPS.map((appId) => {
        const meta = APP_META[appId];
        const openInstance = windows.find((w) => w.appId === appId);
        const isFocused = openInstance?.id === focusedWindowId;
        const Icon = meta.Icon;

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
              'group relative flex h-12 w-12 items-center justify-center rounded-xl text-white/90 transition-all duration-200',
              'hover:scale-110 hover:-translate-y-1',
              'bg-white/10 ring-1 ring-white/15 hover:bg-white/15',
              isFocused && 'bg-white/20 ring-sky-400/50'
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.8} />
            
            {/* Tooltip on hover */}
            <span className="pointer-events-none absolute -top-10 rounded-lg bg-zinc-900 border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
              {meta.label}
            </span>

            {openInstance ? (
              <span
                className={cn(
                  'absolute -bottom-1 h-1 w-1 rounded-full transition-colors',
                  isFocused ? 'bg-sky-400' : 'bg-white/60'
                )}
              />
            ) : null}
          </button>
        );
      })}

      {/* WhatsApp DM Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Instant WhatsApp DM"
        className={cn(
          'group relative flex h-12 w-12 items-center justify-center rounded-xl text-emerald-400 transition-all duration-200',
          'hover:scale-110 hover:-translate-y-1',
          'bg-emerald-500/20 ring-1 ring-emerald-500/30 hover:bg-emerald-500/30'
        )}
      >
        <WhatsappIcon className="h-6 w-6" />
        <span className="pointer-events-none absolute -top-10 rounded-lg bg-zinc-900 border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100 whitespace-nowrap">
          Instant WhatsApp DM
        </span>
      </a>
    </div>
  );
}
