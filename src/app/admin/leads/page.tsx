import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: true },
    take: 100,
  });
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Leads</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Sales pipeline</h1>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-ink-200">
              <tr className="text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Stage</th>
                <th className="px-5 py-3 font-medium">Score</th>
                <th className="px-5 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-white/5 transition hover:bg-white/[0.03]">
                  <td className="px-5 py-3">
                    <div>{l.customer.name ?? '—'}</div>
                    <div className="text-xs text-ink-200">{l.customer.phone}</div>
                  </td>
                  <td className="px-5 py-3 text-ink-50">{l.service ?? '—'}</td>
                  <td className="px-5 py-3 text-ink-100">{l.stage}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
                        <div className="h-full bg-gradient-to-r from-accent-600 to-accent" style={{ width: `${l.score}%` }} />
                      </div>
                      <span className="text-xs font-mono text-ink-100">{l.score}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink-200">{new Date(l.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-ink-200">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
