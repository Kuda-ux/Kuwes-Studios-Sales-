import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ConversationsPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 50,
    include: {
      messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      session: true,
      _count: { select: { messages: true, tickets: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-700">Conversations</h1>
      <div className="grid gap-3">
        {customers.map((c) => (
          <div key={c.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{c.name ?? c.phone}</div>
                <div className="text-xs text-slate-500">{c.phone} • {c.businessName ?? '—'}</div>
              </div>
              <div className="flex gap-2 text-xs">
                {c.session?.paused && <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700">Human handover</span>}
                {c.session?.flowId && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">Flow: {c.session.flowId}</span>}
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{c._count.messages} msgs</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{c._count.tickets} tickets</span>
              </div>
            </div>
            {c.messages[0] && (
              <div className="mt-2 line-clamp-2 text-sm text-slate-600">
                <span className="text-xs uppercase tracking-wider text-slate-400 mr-2">{c.messages[0].direction === 'in' ? 'Customer' : 'Bot'}:</span>
                {c.messages[0].body}
              </div>
            )}
          </div>
        ))}
        {customers.length === 0 && (
          <div className="rounded-xl border bg-white p-10 text-center text-slate-400">No conversations yet.</div>
        )}
      </div>
    </div>
  );
}
