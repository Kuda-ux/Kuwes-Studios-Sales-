import Link from 'next/link';
import { KUWEX, SERVICES } from '@/config/kuwex';
import { Logo } from '@/components/Logo';

/**
 * Landing page for the **Kuwex Sales AI** product.
 *
 * Note: this is NOT a marketing site for Kuwex Studios (that already
 * exists at kuwexstudios.co.zw). This page introduces the AI sales
 * agent product itself — how it works, what it does, and how to test
 * it via the live simulator and admin console.
 */

const PARENT_SITE = KUWEX.contact.website;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 kx-grid-bg opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-radial-accent" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" aria-hidden />

      <SiteHeader />

      <Hero />

      <HowItWorks />

      <Capabilities />

      <CtaSection />

      <SiteFooter />
    </main>
  );
}

/* ============================================================ */
/*  HEADER                                                       */
/* ============================================================ */

function SiteHeader() {
  return (
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-3">
        <Logo size={40} />
        <div className="leading-tight">
          <div className="font-semibold tracking-tight">
            Kuwex <span className="text-accent">Sales AI</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-ink-200">
            By Kuwex Studios
          </div>
        </div>
      </Link>

      <nav className="hidden items-center gap-1 text-sm md:flex">
        <NavLink href="#how">How it works</NavLink>
        <NavLink href="#features">Capabilities</NavLink>
        <NavLink href="/simulator">Live demo</NavLink>
        <NavLink href="/admin">Admin</NavLink>
      </nav>

      <a
        href={PARENT_SITE}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-ink-100 transition hover:border-accent/40 hover:text-white md:inline-flex"
      >
        kuwexstudios.co.zw
        <ExternalIcon className="h-3 w-3" />
      </a>
    </header>
  );
}

/* ============================================================ */
/*  HERO                                                         */
/* ============================================================ */

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10 md:pt-16">
      <div className="grid items-center gap-14 md:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-200">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Internal product · Live in production
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Your <span className="kx-gradient-text">24/7 sales agent</span>,<br />
            on WhatsApp.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-100 md:text-xl">
            Kuwex Sales AI greets every prospect, asks the right questions,
            qualifies the lead, generates a ticket reference, and pings the
            team — all inside a WhatsApp conversation. No website forms.
            No missed leads. No off-hours.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/simulator"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-black shadow-glow-lg transition hover:bg-accent-400"
            >
              <PlayIcon className="h-4 w-4" />
              Try the live demo
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:border-accent/50 hover:bg-white/10"
            >
              <DashboardIcon className="h-4 w-4" />
              Open admin console
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            <Stat n="< 60s" label="First reply" />
            <Stat n="10+" label="Service flows" />
            <Stat n="24/7" label="Always on" />
          </div>
        </div>

        {/* Live chat preview */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="kx-glow-ring" />
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}

function ChatPreview() {
  // Static, rendered server-side — gives visitors an instant feel for the bot
  // without needing to load the simulator. Mirrors the same WhatsApp UI.
  return (
    <div className="relative z-10 overflow-hidden rounded-[28px] border border-white/10 bg-[#0B141A] shadow-glow-lg">
      {/* Phone header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-ink-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-accent/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="Kuwex" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Kuwex <span className="text-accent">Studios</span></div>
            <div className="flex items-center gap-1.5 text-[10px] text-wa-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Online · AI Sales Agent
            </div>
          </div>
        </div>
        <div className="flex gap-3 text-wa-muted">
          <DotsIcon className="h-4 w-4" />
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-2 bg-[#0B141A] px-3 py-4">
        <ChatBubble side="in" delay={0}>Hi 👋</ChatBubble>
        <ChatBubble side="out" delay={0.1}>
          <strong>Welcome to Kuwex Studios! 🎉</strong>
          <br />
          I'm your AI sales agent. What can we build for you today?
        </ChatBubble>
        <ChatBubble side="out" delay={0.2} chips={['🌐 Website', '📈 Marketing', '🤖 AI Automation']} />
        <ChatBubble side="in" delay={0.3}>🌐 Website</ChatBubble>
        <ChatBubble side="out" delay={0.4}>
          Great choice. What kind of business is this for?
        </ChatBubble>
        <ChatBubble side="in" delay={0.5}>A boutique lodge in Vic Falls 🦁</ChatBubble>
        <ChatBubble side="out" delay={0.6}>
          ✅ Ticket created: <span className="font-mono text-accent">KX-WEB-2026-0042</span>
          <br />
          Our team has been notified — expect a quote within the hour.
        </ChatBubble>
      </div>

      {/* Composer (visual only) */}
      <div className="flex items-center gap-2 border-t border-white/5 bg-ink-700 px-3 py-3">
        <div className="flex-1 rounded-full bg-[#2A3942] px-4 py-2 text-xs text-wa-muted">
          Type a message…
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-black shadow-glow">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor"><path d="M2 10l16-7-7 16-2-7-7-2z" /></svg>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({
  side,
  children,
  chips,
  delay = 0,
}: {
  side: 'in' | 'out';
  children?: React.ReactNode;
  chips?: string[];
  delay?: number;
}) {
  const isOut = side === 'out';
  return (
    <div
      className={`flex ${isOut ? 'justify-start' : 'justify-end'} animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs leading-snug shadow-bubble ${isOut ? 'bg-wa-bubbleIn text-wa-text' : 'bg-wa-bubbleOut text-wa-text'}`}>
        {children}
        {chips && (
          <div className="mt-2 flex flex-wrap gap-1.5 border-t border-white/10 pt-2">
            {chips.map((c) => (
              <span key={c} className="rounded-md border border-accent/20 bg-accent/5 px-2 py-1 text-[10px] font-medium text-accent">{c}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  HOW IT WORKS                                                 */
/* ============================================================ */

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Customer messages WhatsApp', desc: 'A prospect sends "Hi" to Kuwex on WhatsApp. The AI replies in under a second.', icon: '💬' },
    { n: '02', title: 'AI qualifies the lead', desc: 'The bot asks the right questions — service type, business name, budget, timeline — without feeling like a form.', icon: '🤖' },
    { n: '03', title: 'Ticket auto-generated', desc: 'A unique reference like KX-WEB-2026-0042 is created and saved to the database with full context.', icon: '🧾' },
    { n: '04', title: 'Team is notified instantly', desc: 'The on-call admin gets a WhatsApp ping with the ticket ref and customer details. Reply, scope, close.', icon: '🚀' },
  ];

  return (
    <section id="how" className="relative z-10 border-t border-white/5 bg-black/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">How it works</div>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            From hello to ticket, <span className="kx-gradient-text">in four steps.</span>
          </h2>
          <p className="mt-4 text-ink-100">
            The Sales AI runs a stateful conversation engine over WhatsApp.
            Every message is logged, every flow is tracked, and every lead
            is scored — automatically.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-4">
          {/* Connecting line on desktop */}
          <div className="pointer-events-none absolute inset-x-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent md:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black p-6 transition hover:border-accent/40 hover:shadow-glow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-accent">{s.n}</span>
                <span className="text-xl">{s.icon}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-100">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  CAPABILITIES                                                 */
/* ============================================================ */

function Capabilities() {
  const features = [
    { icon: '🧠', title: 'Stateful conversations', desc: 'Sessions persist in Postgres. Customers can resume a half-finished quote 3 days later — the AI remembers.' },
    { icon: '🎯', title: 'Lead scoring', desc: 'Every customer gets a score based on engagement, budget signals, and intent — visible in the admin pipeline.' },
    { icon: '🧾', title: 'Auto-ticketing', desc: 'Each service request becomes a uniquely-referenced ticket (KX-WEB-2026-0001 style) with full audit trail.' },
    { icon: '🔀', title: '10+ service flows', desc: `Built-in flows for ${SERVICES.slice(0, 6).map((s) => s.title.toLowerCase()).join(', ')} and more.` },
    { icon: '👤', title: 'Human handover', desc: 'Keywords like "agent", "human", "support" instantly pause the bot and notify the on-call admin.' },
    { icon: '🔔', title: 'Real-time alerts', desc: 'Every new ticket pings the configured admin WhatsApp with the customer details and ticket ref.' },
    { icon: '📊', title: 'Admin dashboard', desc: 'Live view of customers, leads, tickets, and full conversation transcripts — in your brand colours.' },
    { icon: '🧪', title: 'Built-in simulator', desc: 'A WhatsApp-style chat UI for QA, demos, and training new flows without touching production.' },
    { icon: '🔌', title: 'Multi-channel', desc: 'Provider-agnostic adapter — Twilio Sandbox, Twilio Production, or the in-app simulator. Swap with one env var.' },
  ];

  return (
    <section id="features" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Capabilities</div>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Built like a <span className="kx-gradient-text">production system,</span> not a chatbot demo.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black p-6 transition hover:border-accent/40 hover:shadow-glow">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all group-hover:bg-accent/20" />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl ring-1 ring-white/10 transition group-hover:bg-accent/10 group-hover:ring-accent/40">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-100">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  CTA                                                          */
/* ============================================================ */

function CtaSection() {
  return (
    <section className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-700 via-black to-ink-800 p-10 md:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                See the agent in action.<br />
                <span className="kx-gradient-text">No setup required.</span>
              </h3>
              <p className="mt-4 max-w-md text-ink-100">
                The simulator is a fully-functional WhatsApp-style chat that
                runs the exact same engine as the production WhatsApp deployment.
                Send a message, watch the agent qualify you in real time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/simulator" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-black shadow-glow-lg transition hover:bg-accent-400">
                  <PlayIcon className="h-4 w-4" /> Open simulator
                </Link>
                <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5">
                  <DashboardIcon className="h-4 w-4" /> Open admin
                </Link>
              </div>
            </div>

            <div className="grid gap-3 text-sm">
              <Quick label="Live URL" value="kuwes-studios-sales.vercel.app" />
              <Quick label="WhatsApp" value={KUWEX.contact.phone} />
              <Quick label="Parent site" value={PARENT_SITE.replace(/^https?:\/\//, '').replace(/\/$/, '')} />
              <Quick label="Status" value="Production · Live" accent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  FOOTER                                                       */
/* ============================================================ */

function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-xs text-ink-200 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <div className="leading-tight">
            <div className="text-white">Kuwex Sales AI</div>
            <div>An internal product of Kuwex Studios · © {new Date().getFullYear()}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link href="/simulator" className="hover:text-white">Simulator</Link>
          <Link href="/admin" className="hover:text-white">Admin</Link>
          <a href="/api/health" target="_blank" className="hover:text-white">Health</a>
          <a href={PARENT_SITE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
            kuwexstudios.co.zw <ExternalIcon className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ */
/*  Primitives & Icons                                           */
/* ============================================================ */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-full px-4 py-2 text-ink-100 transition hover:bg-white/5 hover:text-white">
      {children}
    </Link>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <div className="text-2xl font-bold text-white">{n}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-ink-200">{label}</div>
    </div>
  );
}

function Quick({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border bg-black/40 px-4 py-3 ${accent ? 'border-accent/40 shadow-glow' : 'border-white/10'}`}>
      <div className="text-[10px] uppercase tracking-widest text-ink-200">{label}</div>
      <div className={`mt-0.5 font-medium ${accent ? 'text-accent' : 'text-white'}`}>{value}</div>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path d="M5 3.5v13l11-6.5L5 3.5z" />
    </svg>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="6" height="9" rx="1.5" />
      <rect x="11" y="3" width="6" height="5" rx="1.5" />
      <rect x="11" y="10" width="6" height="7" rx="1.5" />
      <rect x="3" y="14" width="6" height="3" rx="1.5" />
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

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M11 4h5v5M16 4l-8 8M8 5H4v11h11v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg>
  );
}

