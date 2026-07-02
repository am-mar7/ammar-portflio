'use client';

import { useState } from 'react';
import { User, Folder, Terminal, FileText, LucideIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/WhatsappIcon';
import { useIsMobile } from '@/hooks/useMediaQuery';
import Wallpaper from './Wallpaper';
import BootScreen from './BootScreen';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import MobileHome from '../mobile/MobileHome';
import WindowManager from '@/components/window/WindowManager';
import { useBootSequence } from '@/hooks/useBootSequence';
import { AppId } from '@/types/window';

const DESKTOP_ICONS: (
  | { appId: AppId; label: string; Icon: LucideIcon }
  | { appId: 'whatsapp'; label: string; Icon: typeof WhatsappIcon }
)[] = [
  { appId: 'about', label: 'About Me', Icon: User },
  { appId: 'projects', label: 'Projects', Icon: Folder },
  { appId: 'skills', label: 'Skills', Icon: Terminal },
  { appId: 'resume', label: 'Resume', Icon: FileText },
  { appId: 'whatsapp', label: 'WhatsApp', Icon: WhatsappIcon },
];

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();
  useBootSequence(() => setBooted(true));

  return (
    <div className="relative h-screen w-screen overflow-hidden text-white">
      <Wallpaper />

      {isMobile ? (
        <MobileHome />
      ) : (
        <div className="absolute right-4 top-10 grid grid-cols-1 gap-3">
          {DESKTOP_ICONS.map((icon) =>
            icon.appId === 'whatsapp' ? (
              <a
                key={icon.appId}
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-24 flex-col items-center gap-1 rounded-sm p-2 text-center transition-colors hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 ring-1 ring-green-500/30 text-green-400">
                  <WhatsappIcon className="h-7 w-7" />
                </div>
                <span className="text-xs font-medium tracking-wide text-white drop-shadow-md">
                  {icon.label}
                </span>
              </a>
            ) : (
              <DesktopIcon key={icon.appId} appId={icon.appId as AppId} label={icon.label} Icon={icon.Icon} />
            ),
          )}
        </div>
      )}

      <WindowManager />
      {!isMobile && <Taskbar />}

      {!booted && <BootScreen />}
    </div>
  );
}