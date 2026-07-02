'use client';

export default function BootScreen() {
  return (
    <div
      id="boot-screen"
      className="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
    >
      <div id="boot-logo" className="text-6xl font-semibold tracking-tight">
        Ammar<span className="text-sky-400">OS</span>
      </div>
      <div id="boot-text" className="mt-6 text-sm uppercase tracking-[0.3em] text-white/50">
        Booting workspace…
      </div>
      <div className="mt-10 h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
        <div id="boot-progress-fill" className="h-full w-full origin-left bg-white/80" />
      </div>
    </div>
  );
}
