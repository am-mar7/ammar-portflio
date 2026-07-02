'use client';

import { useDesktopStore } from '@/stores/desktopStore';
import { AppId } from '@/types/window';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  appId: AppId;
  label: string;
  Icon: LucideIcon;
  className?: string;
}

export default function DesktopIcon({ appId, label, Icon, className }: DesktopIconProps) {
  const openWindow = useDesktopStore((s) => s.openWindow);

  return (
    <button
      type="button"
      onDoubleClick={() => openWindow(appId)}
      onClick={(e) => {
        if (e.detail === 1) e.currentTarget.focus();
      }}
      className={cn(
        'desktop-icon group flex w-20 flex-col items-center gap-1.5 rounded-lg p-2 text-white/90',
        'focus:bg-white/15 focus:outline-none',
        'hover:bg-white/10 active:bg-white/20',
        className,
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 transition-transform group-hover:scale-105 group-active:scale-95">
        <Icon className="h-7 w-7" strokeWidth={1.6} />
      </span>
      <span className="line-clamp-2 max-w-full text-center text-[11px] font-medium leading-tight drop-shadow-md">
        {label}
      </span>
    </button>
  );
}
