'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { KUWEX } from '@/config/kuwex';

type Msg = {
  id: string;
  direction: 'in' | 'out';
  body: string;
  payload?: any;
  createdAt: string;
};

const PHONE_KEY = 'kuwex.sim.phone';

export default function SimulatorPage() {
  const [phone, setPhone] = useState<string>('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial phone (random by default to simulate different customers)
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(PHONE_KEY) : null;
    const initial = stored ?? `+26371${Math.floor(1000000 + Math.random() * 8999999)}`;
    setPhone(initial);
  }, []);

  const fetchHistory = useCallback(async (p: string) => {
    if (!p) return;
    const res = await fetch(`/api/simulator/history?phone=${encodeURIComponent(p)}`);
    const json = await res.json();
    setMessages(json.messages ?? []);
  }, []);

  useEffect(() => {
    if (phone) {
      localStorage.setItem(PHONE_KEY, phone);
      fetchHistory(phone);
    }
  }, [phone, fetchHistory]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  async function send(text: string, payloadId?: string) {
    if (!text.trim() && !payloadId) return;
    setLoading(true);
    try {
      await fetch('/api/simulator/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: phone, text, payloadId }),
      });
      await fetchHistory(phone);
    } finally {
      setLoading(false);
    }
  }

  async function reset() {
    await fetch('/api/simulator/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    setMessages([]);
  }

  function newCustomer() {
    const next = `+26371${Math.floor(1000000 + Math.random() * 8999999)}`;
    setPhone(next);
    setMessages([]);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input;
    setInput('');
    await send(text);
  }

  return (
    <main className="min-h-screen bg-[#0B141A] text-wa-text">
      <div className="mx-auto flex h-screen max-w-md flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-[#202C33] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-bold text-brand-900">
              KX
            </div>
            <div>
              <div className="font-semibold leading-tight">{KUWEX.brand.name}</div>
              <div className="text-xs text-wa-muted">Online • Bot</div>
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <button onClick={newCustomer} className="rounded-md bg-white/5 px-2 py-1 hover:bg-white/10" title="New customer phone">New 👤</button>
            <button onClick={reset} className="rounded-md bg-white/5 px-2 py-1 hover:bg-white/10">Reset</button>
          </div>
        </header>

        {/* Phone bar */}
        <div className="bg-[#111B21] px-4 py-2 text-xs text-wa-muted">
          Simulating customer: <span className="font-mono text-wa-text">{phone}</span>
        </div>

        {/* Chat */}
        <div ref={scrollRef} className="wa-scroll flex-1 space-y-1 overflow-y-auto bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22/>')] bg-[#0B141A] px-3 py-4">
          {messages.length === 0 && (
            <div className="mt-12 text-center text-sm text-wa-muted">
              Send <span className="rounded bg-white/10 px-1">Hi</span> to start the conversation.
            </div>
          )}
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} onTap={(id, label) => send(label, id)} />
          ))}
          {loading && <div className="ml-2 text-xs text-wa-muted">…</div>}
        </div>

        {/* Composer */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 bg-[#202C33] px-3 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 rounded-full bg-[#2A3942] px-4 py-2 text-sm text-wa-text outline-none placeholder:text-wa-muted"
          />
          <button
            type="submit"
            className="grid h-10 w-10 place-items-center rounded-full bg-accent text-brand-900 hover:bg-accent-600 hover:text-white"
            aria-label="Send"
          >
            ➤
          </button>
        </form>
      </div>
    </main>
  );
}

function Bubble({ msg, onTap }: { msg: Msg; onTap: (id: string, label: string) => void }) {
  const isOut = msg.direction === 'out'; // bot
  const payload = msg.payload ?? {};
  const isInteractive = payload?.kind === 'buttons' || payload?.kind === 'list';

  return (
    <div className={`flex ${isOut ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-bubble ${isOut ? 'bg-wa-bubbleIn' : 'bg-wa-bubbleOut'}`}>
        <div className="whitespace-pre-wrap leading-snug">{formatWa(msg.body)}</div>

        {isInteractive && payload.kind === 'buttons' && (
          <div className="mt-2 flex flex-wrap gap-2 border-t border-white/10 pt-2">
            {payload.buttons?.map((b: any) => (
              <button
                key={b.id}
                onClick={() => onTap(b.id, b.title)}
                className="rounded-md bg-white/5 px-3 py-1.5 text-xs text-accent-500 hover:bg-white/10"
              >
                {b.title}
              </button>
            ))}
          </div>
        )}

        {isInteractive && payload.kind === 'list' && (
          <div className="mt-2 space-y-2 border-t border-white/10 pt-2">
            {payload.sections?.map((s: any, i: number) => (
              <div key={i}>
                <div className="text-[10px] uppercase tracking-wider text-wa-muted">{s.title}</div>
                <div className="mt-1 flex flex-col gap-1">
                  {s.items.map((it: any) => (
                    <button
                      key={it.id}
                      onClick={() => onTap(it.id, it.title)}
                      className="rounded-md bg-white/5 px-3 py-2 text-left text-xs text-accent-500 hover:bg-white/10"
                    >
                      <div className="font-medium">{it.title}</div>
                      {it.description && <div className="text-[10px] text-wa-muted">{it.description}</div>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-1 text-right text-[10px] text-wa-muted">
          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

/** Render *bold* and _italic_ WhatsApp markdown. */
function formatWa(s: string) {
  const nodes: React.ReactNode[] = [];
  const re = /(\*[^*\n]+\*|_[^_\n]+_)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) nodes.push(s.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('*')) nodes.push(<strong key={i++}>{tok.slice(1, -1)}</strong>);
    else nodes.push(<em key={i++}>{tok.slice(1, -1)}</em>);
    last = m.index + tok.length;
  }
  if (last < s.length) nodes.push(s.slice(last));
  return nodes;
}
