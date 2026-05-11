import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* subtle top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[400px] bg-radial-accent opacity-60" aria-hidden />

      <header className="relative z-10 border-b border-white/5 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size={36} />
            <div className="leading-tight">
              <div className="font-semibold">Kuwex <span className="text-accent">Studios</span></div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-200">Admin Console</div>
            </div>
          </Link>
          <nav className="flex gap-1 text-sm">
            <NavLink href="/admin">Overview</NavLink>
            <NavLink href="/admin/leads">Leads</NavLink>
            <NavLink href="/admin/tickets">Tickets</NavLink>
            <NavLink href="/admin/conversations">Conversations</NavLink>
            <NavLink href="/simulator">Simulator</NavLink>
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-full px-4 py-1.5 text-ink-100 transition hover:bg-white/5 hover:text-white">
      {children}
    </Link>
  );
}
