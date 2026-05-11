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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-700">Overview</h1>
        <p className="text-sm text-slate-500">Live snapshot of your WhatsApp pipeline.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Customers" value={customers} />
        <Stat label="Leads" value={leads} />
        <Stat label="Total Tickets" value={tickets} />
        <Stat label="Open" value={openTickets} accent />
      </div>

      <section className="rounded-xl border bg-white">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <h2 className="font-semibold">Recent Tickets</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr>
              <th className="px-5 py-2">Ref</th>
              <th className="px-5 py-2">Type</th>
              <th className="px-5 py-2">Title</th>
              <th className="px-5 py-2">Customer</th>
              <th className="px-5 py-2">Status</th>
              <th className="px-5 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {recentTickets.map((t) => (
              <tr key={t.id} className="border-t hover:bg-slate-50">
                <td className="px-5 py-2 font-mono text-xs">{t.ref}</td>
                <td className="px-5 py-2">{t.type}</td>
                <td className="px-5 py-2">{t.title}</td>
                <td className="px-5 py-2">{t.customer.name ?? t.customer.phone}</td>
                <td className="px-5 py-2"><Badge status={t.status} /></td>
                <td className="px-5 py-2 text-slate-500">{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {recentTickets.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-400">No tickets yet. Open the simulator to create one.</td></tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-xl border bg-white p-5 ${accent ? 'border-accent/50 ring-1 ring-accent/20' : ''}`}>
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-bold text-brand-700">{value}</div>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-amber-100 text-amber-700',
    quoted: 'bg-purple-100 text-purple-700',
    won: 'bg-emerald-100 text-emerald-700',
    lost: 'bg-rose-100 text-rose-700',
    closed: 'bg-slate-200 text-slate-600',
  };
  return <span className={`rounded-full px-2 py-0.5 text-xs ${map[status] ?? 'bg-slate-100'}`}>{status}</span>;
}
