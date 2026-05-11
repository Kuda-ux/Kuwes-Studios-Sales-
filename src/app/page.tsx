import Link from 'next/link';
import { KUWEX } from '@/config/kuwex';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-widest">{KUWEX.brand.logoText}</div>
          <nav className="flex gap-3 text-sm">
            <Link className="rounded-full border border-white/20 px-4 py-2 hover:bg-white/10" href="/simulator">Simulator</Link>
            <Link className="rounded-full bg-accent px-4 py-2 font-semibold text-brand-900 hover:bg-accent-600 hover:text-white" href="/admin">Admin</Link>
          </nav>
        </div>

        <h1 className="text-5xl font-bold leading-tight md:text-6xl">
          {KUWEX.brand.name}
        </h1>
        <p className="mt-3 max-w-2xl text-xl text-white/80">{KUWEX.brand.tagline}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card
            title="WhatsApp Simulator"
            desc="Test every conversation flow in a WhatsApp-style chat — no Twilio approval needed."
            href="/simulator"
            cta="Open Simulator"
          />
          <Card
            title="Admin Dashboard"
            desc="View leads, tickets, conversations and customer data in real time."
            href="/admin"
            cta="Open Admin"
          />
        </div>

        <div className="mt-16 grid gap-4 text-sm text-white/70 md:grid-cols-3">
          <Info label="Phone" value={KUWEX.contact.phone} />
          <Info label="Email" value={KUWEX.contact.email} />
          <Info label="Address" value={KUWEX.contact.address} />
        </div>
      </div>
    </main>
  );
}

function Card({ title, desc, href, cta }: { title: string; desc: string; href: string; cta: string }) {
  return (
    <Link href={href} className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-accent/60 hover:bg-white/10">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-2 text-white/70">{desc}</p>
      <span className="mt-4 inline-block text-accent group-hover:underline">{cta} →</span>
    </Link>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-1 text-white/90">{value}</div>
    </div>
  );
}
