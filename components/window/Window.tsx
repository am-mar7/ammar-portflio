// components/window/Window.tsx
'use client';
import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/desktopStore';
import { WindowState } from '@/types/window';
import WindowControls from './WindowControls';
import { cn } from '@/lib/utils';


interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function Window({ window: win, children }: WindowProps) {
  const { focusWindow, updatePosition, focusedWindowId } = useDesktopStore();
  const dragStart = useRef<{ mx: number; my: number; wx: number; wy: number } | null>(null);
  const isFocused = focusedWindowId === win.id;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    focusWindow(win.id);
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      wx: win.position.x,
      wy: win.position.y,
    };
    const onMove = (ev: MouseEvent) => {
      if (!dragStart.current) return;
      updatePosition(win.id, {
        x: dragStart.current.wx + ev.clientX - dragStart.current.mx,
        y: dragStart.current.wy + ev.clientY - dragStart.current.my,
      });
    };
    const onUp = () => {
      dragStart.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [win.id, win.position, focusWindow, updatePosition]);

  if (win.isMinimized) return null;

  const style = win.isMaximized
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)', zIndex: win.zIndex }
    : { top: win.position.y, left: win.position.x, width: win.size.width, height: win.size.height, zIndex: win.zIndex };


  return (
    <AnimatePresence>
      <motion.div
        key={win.id}
        className={cn(
          'absolute flex flex-col overflow-hidden rounded-xl border',
          'bg-white/10 backdrop-blur-2xl',
          isFocused
            ? 'border-white/20 shadow-2xl shadow-black/40'
            : 'border-white/10 shadow-lg shadow-black/20'
        )}
        style={style}
        initial={{ scale: 0.92, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 12 }}
        transition={{ type: 'spring', damping: 28, stiffness: 380, mass: 0.8 }}
        onMouseDown={() => focusWindow(win.id)}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-4 h-11 cursor-move shrink-0 border-b border-white/10 select-none"
          onMouseDown={handleMouseDown}
        >
          <WindowControls windowId={win.id} />
          <span className="text-sm font-medium text-white/70 ml-1">{win.title}</span>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}