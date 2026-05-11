import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: true },
    take: 100,
  });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-700">Leads</h1>
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Stage</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-2">
                  <div>{l.customer.name ?? '—'}</div>
                  <div className="text-xs text-slate-500">{l.customer.phone}</div>
                </td>
                <td className="px-4 py-2">{l.service ?? '—'}</td>
                <td className="px-4 py-2">{l.stage}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full bg-accent" style={{ width: `${l.score}%` }} />
                    </div>
                    <span className="text-xs">{l.score}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-slate-500">{new Date(l.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">No leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
