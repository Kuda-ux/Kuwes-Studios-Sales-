import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  const [customers, leads, tickets, openTickets, recentTickets] = await Promise.all([
    prisma.customer.count(),
    prisma.lead.count(),
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: { in: ['new', 'in_progress', 'quoted'] } } }),
    prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: { customer: true },
    }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Overview</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Pipeline snapshot</h1>
        <p className="mt-1 text-sm text-ink-100">Real-time view of customers, leads, and tickets coming in on WhatsApp.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Customers" value={customers} icon="👥" />
        <Stat label="Leads" value={leads} icon="🎯" />
        <Stat label="Tickets" value={tickets} icon="🧾" />
        <Stat label="Open" value={openTickets} icon="🔥" accent />
      </div>

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h2 className="font-semibold">Recent Tickets</h2>
          <span className="text-xs text-ink-200">Last 8</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-ink-200">
              <tr className="text-xs uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Ref</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((t) => (
                <tr key={t.id} className="border-t border-white/5 transition hover:bg-white/[0.03]">
                  <td className="px-6 py-3 font-mono text-xs text-accent">{t.ref}</td>
                  <td className="px-6 py-3 text-ink-50">{t.type}</td>
                  <td className="px-6 py-3">{t.title}</td>
                  <td className="px-6 py-3 text-ink-100">{t.customer.name ?? t.customer.phone}</td>
                  <td className="px-6 py-3"><Badge status={t.status} /></td>
                  <td className="px-6 py-3 text-ink-200">{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {recentTickets.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-ink-200">
                  No tickets yet. Open the <span className="text-accent">Simulator</span> to create one.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, icon, accent }: { label: string; value: number; icon: string; accent?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-ink-700/50 to-black p-6 transition ${accent ? 'border-accent/40 shadow-glow' : 'border-white/10 hover:border-white/20'}`}>
      <div className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition ${accent ? 'bg-accent/30' : 'bg-accent/0 group-hover:bg-accent/10'}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-ink-200">{label}</div>
          <div className="mt-3 text-4xl font-bold">{value}</div>
        </div>
        <div className="text-2xl opacity-70">{icon}</div>
      </div>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-accent/15 text-accent-200 ring-1 ring-accent/30',
    in_progress: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30',
    quoted: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30',
    won: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
    lost: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30',
    closed: 'bg-white/10 text-ink-100 ring-1 ring-white/10',
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map[status] ?? 'bg-white/10 text-ink-100'}`}>{status}</span>;
}
