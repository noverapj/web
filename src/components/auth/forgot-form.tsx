"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { HiCheckCircle, HiEnvelope } from "react-icons/hi2";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="animate-bubble grid h-20 w-20 place-items-center rounded-full border border-mint/40 bg-mint/10 shadow-[0_0_28px_rgb(59_251_176/0.25)]">
          <HiCheckCircle className="text-4xl text-mint" aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-xl font-bold text-white">Reset Link Sent</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
          We sent password reset instructions to{" "}
          <span className="font-bold text-white">{email}</span>. Check your inbox (and the
          spam folder, just in case).
        </p>
        <Link
          href="/login"
          className="btn-gradient mt-8 rounded-full px-8 py-3 text-sm font-bold text-white"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && (
        <p className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-center text-xs font-semibold text-red-400">
          {error}
        </p>
      )}

      <label className="block">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
          Account Email
        </span>
        <span className="relative block">
          <HiEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-dim" aria-hidden />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-full border border-white/10 bg-abyss-2/70 py-3 pl-11 pr-5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-dim/50 focus:border-electric/60 focus:shadow-[0_0_18px_rgb(59_107_255/0.2)]"
          />
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="btn-gradient w-full rounded-full px-6 py-3.5 text-sm font-bold text-white disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send Reset Link"}
      </button>

      <p className="text-center text-xs text-dim">
        Remembered it after all?{" "}
        <Link href="/login" className="font-bold text-ice transition-colors hover:text-white">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
