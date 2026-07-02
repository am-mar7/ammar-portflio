'use client';

import { Mail, MapPin, Code2 } from 'lucide-react';

const LINKS = [
  { href: 'https://github.com/am-mar7', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/ammar-alaa-am77/', label: 'LinkedIn', Icon: LinkedIn },
  { href: 'https://codeforces.com/profile/ammaralaa470', label: 'Codeforces', Icon: Code2 },
  { href: 'mailto:hello@ammar.dev', label: 'Email', Icon: Mail },
];

export function LinkedIn({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function Github({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53
  2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943a1.8 1.8 0 0 1 .513 1.397c0 1.01-.009 1.824-.009 2.072 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export default function AboutApp() {
  return (
    <div className="h-full overflow-y-auto bg-linear-to-br from-zinc-900 to-zinc-950 p-8 text-white">
      <div className="flex items-start gap-6">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-indigo-600 text-4xl font-bold shadow-lg shadow-sky-500/20 ring-1 ring-white/10">
          A
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Ammar</h1>
          <p className="mt-1 text-lg text-white/70">Software Engineer · Full-stack in progress</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Cairo, Egypt · GMT+2
            </span>
          </div>
        </div>
      </div>

      <section className="mt-8 space-y-4 text-white/80 leading-relaxed">
        <p>
          Software Engineering student at Al-Azhar University, currently training with A2SV.
          I&apos;m interning at 3D Diagnotix, building medical imaging software — mostly DICOM
          viewers, CBCT tooling, and the frontends that make that data usable.
        </p>
        <p>
          I started frontend-first (React, Next.js, TypeScript) and I&apos;m actively pushing into
          backend and full-stack work now — NestJS, TypeORM, Spring Boot, database design. Outside
          of code, I compete on Codeforces and coach at the gym.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        {LINKS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-4 w-4" /> {label}
          </a>
        ))}
      </div>
    </div>
  );
}