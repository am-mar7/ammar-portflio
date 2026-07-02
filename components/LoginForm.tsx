'use client';

import { useState } from 'react';
import { loginAdmin } from '@/app/dashboard/actions';
import { Terminal, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await loginAdmin(formData);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 font-mono selection:bg-sky-500 selection:text-white">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[30%] h-[80%] w-[80%] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[30%] h-[80%] w-[80%] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-xl shadow-2xl">
        {/* Terminal Header */}
        <div className="mb-8 flex items-center gap-2 border-b border-white/10 pb-4">
          <Terminal className="h-5 w-5 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            AmmarOS — System Authorization
          </span>
        </div>

        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-sm text-white/40">Provide credentials to access the portfolio dashboard.</p>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                id="username"
                name="username"
                type="text"
                required
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 transition-all outline-none focus:border-sky-500 focus:bg-white/[0.08]"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-white/60 uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 transition-all outline-none focus:border-sky-500 focus:bg-white/[0.08]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <span>Access System</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
