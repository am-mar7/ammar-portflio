'use client';

import { Mail, MapPin, Code2, Award, ShieldCheck, Zap, ArrowRight, Smartphone, Layout, BarChart3 } from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';

const LINKS = [
  { href: 'https://github.com/am-mar7', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/ammar-alaa-am77/', label: 'LinkedIn', Icon: LinkedIn },
  { href: 'https://codeforces.com/profile/ammaralaa470', label: 'Codeforces', Icon: Code2 },
  { href: 'mailto:hello@ammar.dev', label: 'Email', Icon: Mail },
];

export function LinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function Github({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943a1.8 1.8 0 0 1 .513 1.397c0 1.01-.009 1.824-.009 2.072 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export default function AboutApp() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201023134890').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Ammar, I read your background story and wanted to get in touch.'
  )}`;

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 p-6 sm:p-8 text-white">
      {/* Profile Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-white/10 pb-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-indigo-600 text-3xl font-bold text-white shadow-xl shadow-sky-500/20 ring-1 ring-white/20">
          A
        </div>
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available for Q4 Projects & Retainers
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Ammar Alaa</h1>
          <p className="text-sm sm:text-base text-zinc-300 font-medium mt-0.5">
            Software Engineer & Product Architect
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-sky-400" /> Cairo, Egypt (GMT+2)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Mobile, Web Apps & Advanced SaaS Features
            </span>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 hover:bg-green-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-green-600/20 transition-all hover:scale-105 shrink-0"
        >
          Message on WhatsApp
        </a>
      </div>

      {/* Verified Commercial Track Record */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-400 font-mono">
          Commercial Track Record & Live Systems
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Zap className="h-4 w-4 text-emerald-400" /> Live E-Commerce Scale (Activo Store)
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Engineered and customized an active apparel storefront serving 5,000+ monthly shoppers in Egypt. Features custom bilingual typography (Bodoni Moda & IBM Plex Arabic), mobile performance optimization, and direct WhatsApp order flows.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <BarChart3 className="h-4 w-4 text-sky-400" /> Advanced SaaS Feature (Whispyr AI)
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Engineered the core customizable brokerage analytics dashboard for Whispyr AI, an AI real estate platform. Built high-density visualization pipelines for leads, WhatsApp chats, and agent conversion metrics.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Layout className="h-4 w-4 text-indigo-400" /> Enterprise B2B Landing UI (FlexCode Systems)
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Built the high-conversion corporate landing page for an official Odoo Silver Partner in Germany. Designed interactive ERP comparison tables, a 3-step efficiency workflow visualizer, and Calendly integration.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Smartphone className="h-4 w-4 text-purple-400" /> Dedicated Mobile App (Darb — دَرْب)
            </div>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              Engineered a React Native & Expo mobile SaaS for personal trainers and their clients with zero cognitive overhead: dual-speed workout logging (1-tap fast day check vs lifter set/rep mode), structured diet tracking, and automated check-ins.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Discipline & Background */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
        <h3 className="text-sm font-semibold text-white">Technical Foundation & Discipline:</h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300">
          <div>
            <strong className="text-white block mb-1">Medical 3D Web & Microservices (3D Diagnotix)</strong>
            <p className="text-zinc-400 leading-relaxed">
              Built dental CBCT MPR 3D viewers using VTK.js and Cornerstone3D, rendering simultaneous viewports with real-time crosshair synchronization, backed by Java Spring Boot and AWS S3 services.
            </p>
          </div>
          <div>
            <strong className="text-white block mb-1">Competitive Problem Solver (A2SV / Codeforces)</strong>
            <p className="text-zinc-400 leading-relaxed">
              Trained with Africa to Silicon Valley (A2SV). Solved hundreds of algorithmic problems on Codeforces, giving me the discipline to write clean, bug-free, and high-performance software.
            </p>
          </div>
        </div>
      </section>

      {/* Client Standards */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
        <h3 className="text-sm font-semibold text-white">Client Working Invariants:</h3>
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-sky-400 font-mono">01.</span>
            <span><strong>Zero Bloat:</strong> Clean TypeScript, minimal dependencies, and sub-2s mobile loading.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-sky-400 font-mono">02.</span>
            <span><strong>Async Visibility:</strong> Daily milestone updates and working preview links.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-sky-400 font-mono">03.</span>
            <span><strong>ROI Focused:</strong> Every architectural choice is tied directly to your sales or efficiency.</span>
          </li>
        </ul>
      </section>

      {/* Social / Direct Links */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
        <div className="flex flex-wrap gap-2.5">
          {LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => openWindow('services')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
        >
          Explore Services & Deliverables <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
