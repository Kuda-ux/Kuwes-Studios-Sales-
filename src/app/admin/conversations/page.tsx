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
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Conversations</div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Live chats</h1>
        <p className="mt-1 text-sm text-ink-100">Every customer thread, with their current flow state and last message.</p>
      </div>
      <div className="grid gap-3">
        {customers.map((c) => (
          <div key={c.id} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black p-5 transition hover:border-accent/30 hover:shadow-glow">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-sm font-bold text-accent ring-1 ring-accent/30">
                    {(c.name ?? c.phone).slice(-2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{c.name ?? c.phone}</div>
                    <div className="text-xs text-ink-200">{c.phone}{c.businessName ? ` • ${c.businessName}` : ''}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 text-[11px]">
                {c.session?.paused && <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 font-medium text-rose-300 ring-1 ring-rose-500/30">Human handover</span>}
                {c.session?.flowId && <span className="rounded-full bg-accent/15 px-2.5 py-0.5 font-medium text-accent-200 ring-1 ring-accent/30">Flow: {c.session.flowId}</span>}
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-ink-100 ring-1 ring-white/10">{c._count.messages} msgs</span>
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-ink-100 ring-1 ring-white/10">{c._count.tickets} tickets</span>
              </div>
            </div>
            {c.messages[0] && (
              <div className="mt-3 line-clamp-2 text-sm text-ink-100">
                <span className="mr-2 rounded bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-ink-200">
                  {c.messages[0].direction === 'in' ? 'Customer' : 'Bot'}
                </span>
                {c.messages[0].body}
              </div>
            )}
          </div>
        ))}
        {customers.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700/60 to-black p-12 text-center text-ink-200">
            No conversations yet. Open the <span className="text-accent">Simulator</span> to start one.
          </div>
        )}
      </div>
    </div>
  );
}
