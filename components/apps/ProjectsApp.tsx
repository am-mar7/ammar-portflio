'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useDesktopStore } from '@/stores/desktopStore';
import { cn } from '@/lib/utils';
import { ExternalLink, Star, Layers, ShoppingBag, Smartphone, Layout, BarChart3 } from 'lucide-react';
import { Project } from '@/types/project';

type ProjectCategory = 'all' | 'ecommerce' | 'mobile' | 'landing' | 'saas';

interface PortfolioProject extends Project {
  category: 'ecommerce' | 'mobile' | 'landing' | 'saas';
  badge: string;
  metric: string;
  deliverableType: string;
}

const FEATURED_PROJECTS: PortfolioProject[] = [
  {
    id: 'activo-store',
    slug: 'activo-store',
    title: 'Activo Store — DTC Fashion E-Commerce',
    category: 'ecommerce',
    deliverableType: 'E-Commerce Storefront',
    badge: 'Live E-Commerce',
    metric: '5,000+ monthly shoppers',
    description:
      'High-converting apparel storefront engineered for the Egyptian market. Features bespoke bilingual typography (Bodoni Moda & IBM Plex Arabic), mobile-first navigation, and fast checkout flow.',
    longDescription:
      'Architected and customized for active commercial sales in Egypt. Optimized mobile layout to reduce bounce rates, styled bilingual typography for seamless Arabic and English reading, integrated WhatsApp direct ordering, and streamlined product collections for rapid discovery.',
    technologies: ['Shopify', 'Liquid', 'Tailwind CSS', 'JavaScript', 'Cloudflare', 'Bilingual UX'],
    screenshots: ['/screenshots/activo.png'],
    liveUrl: 'https://activostore.com/',
    featured: true,
  },
  {
    id: 'darb-mobile-app',
    slug: 'darb',
    title: 'Darb (دَرْب) — Dedicated Mobile App for Fitness Coaches',
    category: 'mobile',
    deliverableType: 'Cross-Platform Mobile App',
    badge: 'In Active Build · Mobile MVP',
    metric: 'React Native & Supabase',
    description:
      'Dedicated mobile SaaS connecting personal trainers with their clients. Built around the "5-Year-Old UX" rule: zero cognitive friction, dual-speed workout logging, structured diet accountability, and automated push check-ins.',
    longDescription:
      'Engineered with React Native (Expo) and Supabase PostgreSQL. Solves coach chaos with deep-link client onboarding, coach rosters with health & injury flags, reusable workout templates, and dual-speed tracking (1-tap fast day completion vs lifter mode set/rep logging).',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'PostgreSQL', 'Push Notifications'],
    screenshots: ['/screenshots/darb.png'],
    githubUrl: 'https://github.com/am-mar7',
    featured: true,
  },
  {
    id: 'flexcode-landing',
    slug: 'flexcode',
    title: 'FlexCode Systems — Enterprise B2B Landing UI',
    category: 'landing',
    deliverableType: 'High-Converting Landing Page',
    badge: 'Live B2B Web',
    metric: 'Odoo Silver Partner Germany',
    description:
      'Modern, high-conversion landing page UI engineered for an official Odoo ERP Silver Partner in Germany. Features clean conversion design, interactive ERP comparisons, and seamless booking integration.',
    longDescription:
      'Crafted a high-credibility corporate landing page for the European B2B market. Implemented interactive comparison matrices, structured 3-step efficiency workflow visualizers, mobile-first responsive layout, and direct appointment scheduling.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Calendly Integration'],
    screenshots: ['/screenshots/flexcode.jpg'],
    liveUrl: 'https://flexcodesys.com/',
    featured: true,
  },
  {
    id: 'whispyr-ai-dashboard',
    slug: 'whispyr-ai',
    title: 'Whispyr AI — Dashboard Customization Feature',
    category: 'saas',
    deliverableType: 'Advanced SaaS Feature',
    badge: 'Live SaaS Feature',
    metric: 'Customization Engine',
    description:
      'Engineered the dashboard customization engine for Whispyr AI, an AI real estate platform. Enables brokerages and agents to customize KPI widgets, pipeline metrics, and workspace views.',
    longDescription:
      'Engineered the modular dashboard customization feature for real estate brokerages. Allows teams to tailor their analytics workspace: configuring active KPI widgets, dynamic layout persistence, lead funnel filtering, and custom performance metrics suited to their specific sales workflow.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'State Management', 'REST APIs'],
    screenshots: ['/screenshots/whispyr.png'],
    liveUrl: 'https://www.whispyrai.com/',
    featured: true,
  },
];

export default function ProjectsApp() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return FEATURED_PROJECTS;
    return FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const counts = useMemo(() => {
    return {
      all: FEATURED_PROJECTS.length,
      ecommerce: FEATURED_PROJECTS.filter((p) => p.category === 'ecommerce').length,
      mobile: FEATURED_PROJECTS.filter((p) => p.category === 'mobile').length,
      landing: FEATURED_PROJECTS.filter((p) => p.category === 'landing').length,
      saas: FEATURED_PROJECTS.filter((p) => p.category === 'saas').length,
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 p-6 sm:p-8 text-white font-sans">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Selected Commercial Work</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Real-world software: live e-commerce, cross-platform mobile apps, B2B landing pages, and advanced SaaS features.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/80 p-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              selectedCategory === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            )}
          >
            <Layers className="h-3.5 w-3.5" /> All ({counts.all})
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('ecommerce')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              selectedCategory === 'ecommerce'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            )}
          >
            <ShoppingBag className="h-3.5 w-3.5" /> E-Commerce ({counts.ecommerce})
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('mobile')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              selectedCategory === 'mobile'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            )}
          >
            <Smartphone className="h-3.5 w-3.5" /> Mobile Apps ({counts.mobile})
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('landing')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              selectedCategory === 'landing'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            )}
          >
            <Layout className="h-3.5 w-3.5" /> Landing UI ({counts.landing})
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('saas')}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
              selectedCategory === 'saas'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            )}
          >
            <BarChart3 className="h-3.5 w-3.5" /> Advanced Feature ({counts.saas})
          </button>
        </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            onClick={() => openWindow('project-detail', { projectId: p.id, project: p })}
            className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/70 p-4 sm:p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-sky-500/40 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-sky-500/10"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-950 border border-white/10 shadow-lg">
                {p.screenshots?.[0] ? (
                  <>
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={p.screenshots[0]}
                        alt=""
                        fill
                        aria-hidden
                        className="scale-125 object-cover opacity-30 blur-2xl saturate-150"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Screenshot Foreground */}
                    <Image
                      src={p.screenshots[0]}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Top & Bottom Legibility Gradients */}
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />
                  </>
                ) : null}

                {/* Top Badges */}
                <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
                  <span className="rounded-lg bg-zinc-950/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/20 shadow-md">
                    {p.badge}
                  </span>
                </div>

                {p.featured && (
                  <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-lg bg-sky-500/90 px-2.5 py-1 text-[10px] font-semibold text-white shadow-md backdrop-blur">
                    <Star className="h-3 w-3 fill-current text-white" /> Featured
                  </span>
                )}

                {/* Bottom Overlay Label */}
                <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-2">
                  <span className="rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-300 backdrop-blur-md border border-white/10">
                    {p.deliverableType}
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-mono font-medium text-emerald-300 backdrop-blur-md border border-emerald-500/40 shadow-sm">
                    {p.metric}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-4 px-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-white transition-colors group-hover:text-sky-400">
                    {p.title}
                  </h3>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                      title="Open Live Site"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{p.description}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mt-4 border-t border-white/5 pt-3 px-1 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
