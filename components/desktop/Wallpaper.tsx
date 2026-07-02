'use client';

import { useThemeStore } from '@/stores/themeStore';

export default function Wallpaper() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className={
          theme === 'dark'
            ? 'absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1e3a8a_0%,#0f172a_45%,#020617_100%)]'
            : 'absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#fde68a_0%,#f472b6_45%,#7c3aed_100%)]'
        }
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><circle cx=%221%22 cy=%221%22 r=%221%22 fill=%22white%22 opacity=%220.04%22/></svg>')]" />
    </div>
  );
}
