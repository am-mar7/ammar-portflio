'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDesktopStore } from '@/stores/desktopStore';
import { getProjectAccent } from '@/lib/data/projects';
import { getProjects } from '@/app/dashboard/actions';
import { cn } from '@/lib/utils';
import { ExternalLink, Star, Loader2 } from 'lucide-react';
import { Project } from '@/types/project';

export default function ProjectsApp() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const [projectsList, setProjectsList] = useState<(Project & { status?: string; is_team?: boolean; role?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (isMounted) {
          setProjectsList(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error loading projects:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 p-6 text-white font-mono">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-sm text-white/60">Double-click a card to open details.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video rounded-xl bg-white/5" />
              <div className="mt-3 h-4 w-2/3 rounded bg-white/5" />
              <div className="mt-2 h-3 w-full rounded bg-white/5" />
              <div className="mt-1 h-3 w-4/5 rounded bg-white/5" />
            </div>
          ))}
        </div>
      ) : projectsList.length === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-white/40">
          No projects available.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projectsList.map((p) => (
            <button
              key={p.id}
              type="button"
              onDoubleClick={() => openWindow('project-detail', { projectId: p.id, project: p })}
              className="group text-left focus:outline-none"
            >
              <div
                className={cn(
                  'relative aspect-video overflow-hidden rounded-xl shadow-md ring-1 ring-white/10 transition-all',
                  'group-hover:ring-sky-400/40 group-hover:shadow-lg group-hover:shadow-sky-500/10',
                  'group-focus-visible:ring-2 group-focus-visible:ring-sky-400',
                )}
              >
                {p.screenshots?.[0] ? (
                  <>
                    {/* Blurred backdrop fill — gives the card color/depth without cropping content */}
                    <Image
                      src={p.screenshots[0]}
                      alt=""
                      fill
                      aria-hidden
                      className="scale-110 object-cover opacity-40 blur-2xl saturate-150"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-zinc-950/40" />
                    {/* Actual screenshot, fully visible */}
                    <Image
                      src={p.screenshots[0]}
                      alt={p.title}
                      fill
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </>
                ) : (
                  <div
                    className={cn(
                      'flex h-full w-full items-center justify-center bg-gradient-to-br text-3xl font-bold text-white/90',
                      getProjectAccent(p.id),
                    )}
                  >
                    <span className="opacity-80">{p.title.slice(0, 2).toUpperCase()}</span>
                  </div>
                )}

                {p.featured && (
                  <span className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold backdrop-blur">
                    <Star className="h-2.5 w-2.5 fill-current text-sky-400" /> Featured
                  </span>
                )}
              </div>

              <div className="mt-3 px-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="line-clamp-1 font-semibold transition-colors group-hover:text-sky-400">
                    {p.title}
                  </h3>
                  <div className="flex shrink-0 items-center gap-2 text-white/40">
                    {p.liveUrl && <ExternalLink className="h-3.5 w-3.5 transition-colors hover:text-white" />}
                  </div>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/60">{p.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.technologies.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/5 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                  {p.technologies.length > 3 && (
                    <span className="rounded-md border border-white/5 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/50">
                      +{p.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}