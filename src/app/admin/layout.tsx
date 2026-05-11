import Link from 'next/link';
import { KUWEX } from '@/config/kuwex';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-brand-700 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-accent text-sm font-bold text-brand-900">KX</div>
            <div>
              <div className="font-semibold leading-tight">{KUWEX.brand.name}</div>
              <div className="text-xs text-white/60">Admin Console</div>
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
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-md px-3 py-1.5 hover:bg-white/10">
      {children}
    </Link>
  );
}
