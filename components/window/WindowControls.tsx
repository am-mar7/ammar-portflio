'use client';

import { useDesktopStore } from '@/stores/desktopStore';
import { cn } from '@/lib/utils';

interface Props {
  windowId: string;
}

export default function WindowControls({ windowId }: Props) {
  const { closeWindow, minimizeWindow, maximizeWindow } = useDesktopStore();

  return (
    <div className="group/controls flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          closeWindow(windowId);
        }}
        className={cn(
          'h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10',
          'transition-colors hover:bg-[#ff3b30]',
        )}
      />
      <button
        type="button"
        aria-label="Minimize"
        onClick={(e) => {
          e.stopPropagation();
          minimizeWindow(windowId);
        }}
        className={cn(
          'h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/10',
          'transition-colors hover:bg-[#ffaa00]',
        )}
      />
      <button
        type="button"
        aria-label="Maximize"
        onClick={(e) => {
          e.stopPropagation();
          maximizeWindow(windowId);
        }}
        className={cn(
          'h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/10',
          'transition-colors hover:bg-[#1ea832]',
        )}
      />
    </div>
  );
}
