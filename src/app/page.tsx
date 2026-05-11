import Link from 'next/link';
import Image from 'next/image';
import { KUWEX, SERVICES } from '@/config/kuwex';
import { Logo } from '@/components/Logo';

const WHATSAPP_LINK = `https://wa.me/${KUWEX.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Kuwex Studios 👋')}`;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background: grid + radial accent glow */}
      <div className="pointer-events-none absolute inset-0 kx-grid-bg opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-radial-accent" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" aria-hidden />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo size={40} withWordmark />
        <nav className="hidden items-center gap-1 text-sm md:flex">
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#process">Process</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <NavLink href="/simulator">Simulator</NavLink>
          <NavLink href="/admin">Admin</NavLink>
        </nav>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black shadow-glow transition hover:bg-accent-400"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 md:pt-20">
        <div className="grid items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Now live on WhatsApp — reply in under 60 seconds
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Smart Digital<br />
              Solutions for{' '}
              <span className="kx-gradient-text">Africa.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100 md:text-xl">
              Websites, branding, AI automations and WhatsApp commerce systems
              built for businesses that want to scale. Talk to Kuwex Studios on
              WhatsApp — we'll scope, quote and start your project the same day.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-black shadow-glow-lg transition hover:bg-accent-400"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Start on WhatsApp
                <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/simulator"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:border-accent/50 hover:bg-white/10"
              >
                Try the Live Demo
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ink-100">
              <Stat n="50+" label="Projects delivered" />
              <Stat n="24/7" label="WhatsApp response" />
              <Stat n="< 60s" label="First reply time" />
            </div>
          </div>

          {/* Hero logo showcase */}
          <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center">
            <div className="kx-glow-ring" />
            <div className="relative z-10 aspect-square w-full max-w-sm overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-glow-lg">
              <Image src="/logo.jpg" alt="Kuwex Studios" fill priority sizes="400px" className="object-cover" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
            {/* Floating chips */}
            <FloatingChip className="absolute -left-4 top-10 md:-left-10" icon="💬" text="WhatsApp Automation" />
            <FloatingChip className="absolute -right-2 top-28 md:-right-8" icon="🤖" text="AI Automation" />
            <FloatingChip className="absolute bottom-20 -left-2 md:-left-8" icon="🎨" text="Branding & Design" />
            <FloatingChip className="absolute -bottom-2 right-6" icon="🌐" text="Website Development" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10 border-t border-white/5 bg-black/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">What we do</div>
            <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Everything your business needs, <span className="kx-gradient-text">in one studio.</span></h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => !['quote', 'handover', 'portfolio'].includes(s.id)).map((s) => (
              <ServiceCard key={s.id} emoji={s.emoji} title={s.title} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How it works</div>
            <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">From hello to launch, <span className="kx-gradient-text">on WhatsApp.</span></h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            <Step n="01" title="Say Hi" desc="Open WhatsApp, send 'Hi'. Our bot greets you and shows your options in seconds." />
            <Step n="02" title="Pick a service" desc="Tap the service you need. We ask the right questions — no forms, no friction." />
            <Step n="03" title="Get a quote" desc="We generate a ticket reference and our team reaches out with a proposal." />
            <Step n="04" title="We build" desc="Fixed scope, fixed price, fast delivery. You get updates straight to your chat." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative z-10 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-700 via-black to-ink-800 p-10 md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to start?<br /><span className="kx-gradient-text">Let's build it today.</span>
                </h3>
                <p className="mt-4 max-w-md text-ink-100">
                  Send us a WhatsApp message. You'll get a real reply, a real quote,
                  and a real plan — usually within the hour.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-black shadow-glow-lg transition hover:bg-accent-400">
                    <WhatsAppIcon className="h-5 w-5" /> Message us now
                  </a>
                  <a href={`mailto:${KUWEX.contact.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5">
                    Email instead
                  </a>
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <Contact label="WhatsApp" value={KUWEX.contact.phone} />
                <Contact label="Email" value={KUWEX.contact.email} />
                <Contact label="Website" value={KUWEX.contact.website.replace(/^https?:\/\//, '')} />
                <Contact label="Studio" value={KUWEX.contact.address} />
                <Contact label="Hours" value={KUWEX.contact.hours} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-ink-200">
          <div className="flex items-center gap-3">
            <Logo size={24} />
            <span>© {new Date().getFullYear()} Kuwex Studios. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/simulator" className="hover:text-white">Simulator</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <a href={KUWEX.contact.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-white">Portfolio</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------- UI primitives ---------- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-full px-4 py-2 text-ink-100 transition hover:bg-white/5 hover:text-white">
      {children}
    </Link>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-2xl font-bold text-white">{n}</div>
      <div className="text-xs leading-tight text-ink-100">{label}</div>
    </div>
  );
}

function FloatingChip({ icon, text, className }: { icon: string; text: string; className?: string }) {
  return (
    <div className={`z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-xs font-medium text-white shadow-glow backdrop-blur animate-fade-in ${className}`}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function ServiceCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black p-6 transition hover:border-accent/40 hover:shadow-glow">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all group-hover:bg-accent/20" />
      <div className="relative">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl ring-1 ring-white/10 transition group-hover:bg-accent/10 group-hover:ring-accent/40">
          {emoji}
        </div>
        <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-ink-100">{desc}</p>
        <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition group-hover:opacity-100">
          Learn more <ArrowIcon className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="text-xs font-mono font-bold text-accent">{n}</div>
      <h4 className="mt-2 text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm text-ink-100">{desc}</p>
    </div>
  );
}

function Contact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-ink-200">{label}</div>
      <div className="mt-0.5 text-white">{value}</div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.2 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-3-1.3-4.6 0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
