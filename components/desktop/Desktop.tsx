'use client';

import { useState } from 'react';
import { Layers, Sparkles, ShieldCheck, LucideIcon } from 'lucide-react';
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
  { appId: 'projects', label: 'Selected Work', Icon: Layers },
  { appId: 'services', label: 'Services & Offers', Icon: Sparkles },
  { appId: 'about', label: 'Proof & Story', Icon: ShieldCheck },
  { appId: 'whatsapp', label: 'Instant DM', Icon: WhatsappIcon },
];

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();
  useBootSequence(() => setBooted(true));

  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201023134890').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Ammar, I checked your portfolio and would like to discuss a project.'
  )}`;

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
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-24 flex-col items-center gap-1.5 rounded-xl p-2 text-center transition-all hover:bg-white/10 group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-500/30 text-emerald-400 backdrop-blur-md transition-transform group-hover:scale-105 group-active:scale-95">
                  <WhatsappIcon className="h-7 w-7" />
                </div>
                <span className="text-[11px] font-medium tracking-wide text-white drop-shadow-md">
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
