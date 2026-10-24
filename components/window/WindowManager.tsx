'use client';

import { ComponentType } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/desktopStore';
import { AppId, WindowState } from '@/types/window';
import { useIsMobile } from '@/hooks/useMediaQuery';
import Window from './Window';
import ProjectsApp from '../apps/ProjectsApp';
import ProjectDetailApp from '../apps/ProjectDetailApp';
import SkillsApp from '../apps/SkillsApp';
import ResumeApp from '../apps/ResumeApp';
import ContactApp from '../apps/ContactApp';
import AboutApp from '../apps/AboutApp';
import ServicesApp from '../apps/ServicesApp';
import MobileWindow from '../mobile/MobileWindow';

const APPS: Record<AppId, ComponentType<{ window: WindowState }>> = {
  about: AboutApp,
  projects: ProjectsApp,
  'project-detail': ProjectDetailApp,
  services: ServicesApp,
  skills: SkillsApp,
  resume: ResumeApp,
  contact: ContactApp,
};

const TITLES: Record<AppId, string> = {
  about: 'Proof & Story — Ammar',
  projects: 'Selected Work',
  'project-detail': 'Project Details',
  services: 'Services & Capabilities',
  skills: 'Skills — Terminal',
  resume: 'Resume.pdf',
  contact: 'New Message',
};

export default function WindowManager() {
  const windows = useDesktopStore((s) => s.windows);
  const focusedWindowId = useDesktopStore((s) => s.focusedWindowId);
  const isMobile = useIsMobile();

  if (isMobile) {
    const visible = windows.find((w) => w.id === focusedWindowId && !w.isMinimized);
    if (!visible) return null;
    const App = APPS[visible.appId];
    const titled: WindowState = { ...visible, title: TITLES[visible.appId] ?? visible.title };
    return (
      <AnimatePresence>
        <MobileWindow key={titled.id} window={titled}>
          <App window={titled} />
        </MobileWindow>
      </AnimatePresence>
    );
  }

  return (
    <>
      {windows.map((win) => {
        const App = APPS[win.appId];
        const titled: WindowState = { ...win, title: TITLES[win.appId] ?? win.title };
        return (
          <Window key={win.id} window={titled}>
            <App window={titled} />
          </Window>
        );
      })}
    </>
  );
}