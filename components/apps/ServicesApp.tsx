'use client';

import { ShoppingBag, Smartphone, Layout, BarChart3, ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';

const SERVICES = [
  {
    icon: ShoppingBag,
    title: 'High-Converting E-Commerce & DTC Stores',
    tag: 'Shopify · Next.js · Headless · Liquid',
    badge: 'Fastest ROI',
    description:
      'Turn visitors into paying buyers with high-speed storefronts, bespoke bilingual Arabic/English typography, custom checkout logic, and local payment/WhatsApp ordering.',
    deliverables: [
      'Custom Shopify or Next.js e-commerce storefront',
      'Direct WhatsApp 1-Click checkout & cart sharing',
      'Sub-2s mobile loading & Core Web Vitals in the green',
      'Payment gateways (Paymob, Fawry, Stripe) & tracking setup',
    ],
    proof: 'Live Reference: Activo Store (5,000+ monthly shoppers)',
    timeline: '1–2 weeks',
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform Mobile Apps (iOS & Android)',
    tag: 'React Native · Expo · TypeScript · Supabase',
    badge: 'App Store Ready',
    description:
      'Fluid native mobile applications built around zero cognitive overhead. Single-codebase iOS & Android delivery with offline caching, push notifications, and clean UX.',
    deliverables: [
      'Cross-platform iOS & Android builds via Expo / EAS',
      'Dual-speed user workflows & seamless data synchronization',
      'Automated background notifications & reminder scheduling',
      'Supabase/PostgreSQL backend schema with row-level security',
    ],
    proof: 'In Active Build: Darb (Fitness Coach & Client Mobile SaaS)',
    timeline: '3–4 weeks',
  },
  {
    icon: Layout,
    title: 'High-Converting Landing Pages & B2B Web UI',
    tag: 'Next.js · Tailwind CSS · Conversion Architecture',
    badge: 'Lead Generation',
    description:
      'Elevate your brand credibility with enterprise-grade landing UI. Designed specifically for B2B tech companies, agencies, and high-ticket service businesses.',
    deliverables: [
      'Modern, high-conversion landing page architecture',
      'Interactive pricing tables & product comparison matrices',
      'Direct Calendly / booking funnel integration',
      'Full mobile responsiveness & SEO technical optimization',
    ],
    proof: 'Live Reference: FlexCode Systems (Odoo Silver Partner Germany)',
    timeline: '5–7 days',
  },
  {
    icon: BarChart3,
    title: 'Advanced SaaS Features & Custom Dashboards',
    tag: 'Next.js · React · Data Visualization · APIs',
    badge: 'SaaS Engineering',
    description:
      'Build complex, mission-critical product features for existing web apps. From customizable analytics dashboards and pipeline visualizers to third-party API integrations.',
    deliverables: [
      'Interactive analytics dashboards with customizable widgets',
      'Real-time data feeds, charts, and pipeline tracking',
      'Clean modular React/Next.js component architecture',
      'Seamless REST / GraphQL backend API wiring',
    ],
    proof: 'Live Reference: Whispyr AI (Real Estate CRM Dashboard Customization Engine)',
    timeline: '1–2 weeks',
  },
];

export default function ServicesApp() {
  const openWindow = useDesktopStore((s) => s.openWindow);
  const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+201023134890').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Ammar, I checked your services on your portfolio and I would like to discuss a project with you.'
  )}`;

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 p-6 sm:p-8 text-white">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
            <Zap className="h-3.5 w-3.5" /> Direct Freelance & Contract Services
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Engineering Capabilities & Services
          </h1>
          <p className="mt-1 text-sm text-zinc-400 max-w-xl">
            I help businesses, brands, and startups ship robust, high-converting software with zero technical bloat and fast execution.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all hover:scale-105"
        >
          Book a Consultation <ArrowRight className="h-4 w-4" />
        </a>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {SERVICES.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-zinc-900"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-sky-400">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-xs text-sky-400 font-mono mt-0.5">{s.tag}</p>

                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  {s.description}
                </p>

                <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
                  {s.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4 flex items-center justify-between text-xs">
                <div className="text-zinc-400 font-mono">
                  <span className="text-zinc-500">Proof: </span>
                  <span className="text-zinc-200">{s.proof}</span>
                </div>
                <div className="inline-flex items-center gap-1 text-zinc-400 shrink-0">
                  <Clock className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{s.timeline}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Banner */}
      <div className="rounded-2xl border border-white/10 bg-linear-to-r from-zinc-900 to-zinc-900/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-white">Have a project with custom requirements?</h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Whether you need a quick audit, custom feature build, or full-stack MVP, we can align on scope and timeline in under 24 hours.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openWindow('contact')}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors"
          >
            Send Message
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-600 hover:bg-green-500 px-4 py-2 text-xs font-semibold text-white transition-all shadow-md shadow-green-600/20"
          >
            WhatsApp DM
          </a>
        </div>
      </div>
    </div>
  );
}
