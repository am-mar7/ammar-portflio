'use client';

import { useEffect, useState } from 'react';

const SKILLS_JSON = `{
  "frontend":  ["React", "Next.js 15", "TypeScript", "Tailwind", "Framer Motion", "Zustand"],
  "backend":   ["NestJS", "TypeORM", "PostgreSQL", "MySQL", "Supabase"],
  "medical":   ["Cornerstone3D", "VTK.js", "DICOM"],
  "infra":     ["Vercel", "JWT / OAuth", "Docker", "Git"],
  "cp":        ["Python", "Codeforces (+1200)"]
}`;

function useTypewriter(text: string, speed = 8) {
  const [out, setOut] = useState('');
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOut('');
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

export default function SkillsApp() {
  const typed = useTypewriter(SKILLS_JSON);
  const done = typed.length === SKILLS_JSON.length;

  return (
    <div className="h-full overflow-y-auto bg-black p-4 font-mono text-[13px] text-emerald-300">
      <div className="text-white/40">Last login: today on ttys000</div>
      <div className="mt-2">
        <span className="text-sky-400">ammar@os</span>
        <span className="text-white/50"> ~ </span>
        <span className="text-white">$ </span>cat skills.json
      </div>
      <pre className="mt-2 whitespace-pre-wrap text-emerald-200">{typed}</pre>
      {done && (
        <div className="mt-3">
          <span className="text-sky-400">ammar@os</span>
          <span className="text-white/50"> ~ </span>
          <span className="text-white">$ </span>
          <span className="animate-pulse">▋</span>
        </div>
      )}
    </div>
  );
}