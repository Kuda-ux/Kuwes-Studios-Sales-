import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function TicketsPage() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: true },
    take: 100,
  });
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Tickets</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">All service requests</h1>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-ink-200">
              <tr className="text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Ref</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Budget</th>
                <th className="px-5 py-3 font-medium">Timeline</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-t border-white/5 align-top transition hover:bg-white/[0.03]">
                  <td className="px-5 py-3 font-mono text-xs text-accent">{t.ref}</td>
                  <td className="px-5 py-3 text-ink-50">{t.type}</td>
                  <td className="px-5 py-3">{t.title}</td>
                  <td className="px-5 py-3">
                    <div>{t.customer.name ?? '—'}</div>
                    <div className="text-xs text-ink-200">{t.customer.phone}</div>
                  </td>
                  <td className="px-5 py-3 text-ink-100">{t.budget ?? '—'}</td>
                  <td className="px-5 py-3 text-ink-100">{t.timeline ?? '—'}</td>
                  <td className="px-5 py-3 text-ink-100">{t.status}</td>
                  <td className="px-5 py-3 text-ink-200">{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-ink-200">No tickets yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
