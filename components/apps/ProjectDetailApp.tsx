'use client';

import Image from 'next/image';
import { WindowState } from '@/types/window';
import { getProjectAccent } from '@/lib/data/projects';
import { cn } from '@/lib/utils';
import { ExternalLink, Code } from 'lucide-react';
import { Project } from '@/types/project';

interface ExtendedProject extends Project {
  status?: string;
  is_team?: boolean;
  role?: string;
}

interface Props {
  window: WindowState;
}

export default function ProjectDetailApp({ window: win }: Props) {
  const metaProject = win.meta?.project as ExtendedProject | undefined;
  const project = metaProject as ExtendedProject | undefined;

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center bg-zinc-950 text-sm text-white/40 font-mono">
        No project selected.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 text-white font-mono selection:bg-sky-500 selection:text-white">
      {/* Hero */}
      <div
        className={cn(
          'relative aspect-[21/9] overflow-hidden bg-gradient-to-br shadow-inner',
          getProjectAccent(project.id),
        )}
      >
        {project.screenshots?.[0] ? (
          <>
            <Image
              src={project.screenshots[0]}
              alt=""
              fill
              aria-hidden
              className="scale-110 object-cover opacity-50 blur-2xl saturate-150"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-zinc-950/30" />
            <Image
              src={project.screenshots[0]}
              alt={project.title}
              fill
              className="object-contain p-4"
              sizes="100vw"
              priority
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl font-bold tracking-tight">
            {project.title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{project.title}</h1>
            <p className="mt-1 text-sm text-white/60">{project.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
              >
                <Code className="h-3.5 w-3.5" /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-sky-500/20 px-2.5 py-1 text-xs text-sky-300 transition-all hover:bg-sky-500/30"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
          </div>
        </div>

        {(project.status || project.is_team) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.status && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/70">
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    project.status === 'finished' && 'bg-emerald-500',
                    project.status === 'working on' && 'bg-amber-500',
                    project.status === 'on maintenance' && 'bg-cyan-500',
                  )}
                />
                <span className="capitalize">{project.status}</span>
              </span>
            )}
            {project.is_team && (
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-0.5 text-xs text-sky-400">
                Team Project {project.role && `(${project.role})`}
              </span>
            )}
          </div>
        )}

        <p className="mt-6 border-t border-white/5 pt-4 text-sm leading-6 text-white/80">
          {project.longDescription}
        </p>

        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">Stack</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span key={t} className="rounded-md border border-white/5 bg-white/10 px-2 py-0.5 text-xs text-white/90">
                {t}
              </span>
            ))}
          </div>
        </section>

        {project.architectureNotes && (
          <section className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">Architecture</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">{project.architectureNotes}</p>
          </section>
        )}

        {project.challenges && (
          <section className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">Challenges</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">{project.challenges}</p>
          </section>
        )}

        {project.screenshots && project.screenshots.length > 1 && (
          <section className="mt-6">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
              Screenshots
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              {project.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="relative h-48 w-80 shrink-0 snap-start overflow-hidden rounded-lg border border-white/10 bg-white/5"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    aria-hidden
                    className="scale-110 object-cover opacity-30 blur-xl"
                    sizes="320px"
                  />
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-contain p-1.5"
                    sizes="320px"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}