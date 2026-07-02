'use client';

import { useState } from 'react';
import { Send, Loader2, Check } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent';

export default function ContactApp() {
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    // dummy: real submit hits /api/contact when supabase is wired.
    setTimeout(() => {
      setStatus('sent');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 2000);
    }, 600);
  }

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col bg-zinc-900 text-white">
      <div className="grid grid-cols-[80px_1fr] gap-y-2 border-b border-white/10 px-4 py-3 text-sm">
        <label className="self-center text-white/50">To</label>
        <span className="text-white/80">hello@ammar.dev</span>

        <label className="self-center text-white/50" htmlFor="contact-email">From</label>
        <input
          id="contact-email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded-sm bg-transparent outline-none placeholder:text-white/30 focus:bg-white/5 px-1 -mx-1"
        />

        <label className="self-center text-white/50" htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="rounded-sm bg-transparent outline-none placeholder:text-white/30 focus:bg-white/5 px-1 -mx-1"
        />

        <label className="self-center text-white/50" htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What's up?"
          className="rounded-sm bg-transparent outline-none placeholder:text-white/30 focus:bg-white/5 px-1 -mx-1"
        />
      </div>

      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message…"
        className="min-h-0 flex-1 resize-none bg-transparent p-4 text-sm outline-none placeholder:text-white/30"
      />

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
          {status === 'sent' && (
            <>
              <Check className="h-3.5 w-3.5" /> Message queued (demo)
            </>
          )}
        </span>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-1.5 rounded-md bg-sky-500 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          Send
        </button>
      </div>
    </form>
  );
}