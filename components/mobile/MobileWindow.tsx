'use client';

import { motion, PanInfo } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';
import { WindowState } from '@/types/window';

interface Props {
  window: WindowState;
  children: React.ReactNode;
}

export default function MobileWindow({ window: win, children }: Props) {
  const minimizeWindow = useDesktopStore((s) => s.minimizeWindow);

  function handleDragEnd(_: unknown, info: PanInfo) {
    // Swipe down far or fast enough → go back home
    if (info.offset.y > 120 || info.velocity.y > 800) {
      minimizeWindow(win.id);
    }
  }

  return (
    <motion.div
      key={win.id}
      className="fixed inset-0 z-40 flex flex-col bg-zinc-950"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 32, stiffness: 340 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragEnd={handleDragEnd}
    >
      {/* Nav bar */}
      <div className="flex h-12 shrink-0 items-center gap-1 border-b border-white/10 bg-zinc-950/95 px-2 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => minimizeWindow(win.id)}
          className="flex items-center gap-0.5 rounded-lg px-2 py-1.5 text-sky-400 active:bg-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm">Home</span>
        </button>
        <span className="flex-1 truncate text-center text-sm font-medium text-white/80 pr-16">
          {win.title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto overscroll-contain">{children}</div>

      {/* iOS home indicator */}
      <div className="flex h-6 shrink-0 items-center justify-center bg-zinc-950">
        <div className="h-1 w-32 rounded-full bg-white/30" />
      </div>
    </motion.div>
  );
}