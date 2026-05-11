import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function TicketsPage() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: true },
    take: 100,
  });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-700">Tickets</h1>
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-2">Ref</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Timeline</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-t hover:bg-slate-50 align-top">
                <td className="px-4 py-2 font-mono text-xs">{t.ref}</td>
                <td className="px-4 py-2">{t.type}</td>
                <td className="px-4 py-2">{t.title}</td>
                <td className="px-4 py-2">
                  <div>{t.customer.name ?? '—'}</div>
                  <div className="text-xs text-slate-500">{t.customer.phone}</div>
                </td>
                <td className="px-4 py-2">{t.budget ?? '—'}</td>
                <td className="px-4 py-2">{t.timeline ?? '—'}</td>
                <td className="px-4 py-2">{t.status}</td>
                <td className="px-4 py-2 text-slate-500">{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-400">No tickets yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
