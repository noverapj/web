"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeSlash, HiLockClosed, HiUser } from "react-icons/hi2";
import OAuthButtons from "./oauth-buttons";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 900);
  };

  return (
    <div className="space-y-5">
      <OAuthButtons />

      <div className="flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-dim">
          or continue with
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {error && (
          <p className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-center text-xs font-semibold text-red-400">
            {error}
          </p>
        )}

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
            Username or Email
          </span>
          <span className="relative block">
            <HiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-dim" aria-hidden />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              placeholder="VanguardX"
              className="w-full rounded-full border border-white/10 bg-abyss-2/70 py-3 pl-11 pr-5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-dim/50 focus:border-electric/60 focus:shadow-[0_0_18px_rgb(59_107_255/0.2)]"
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
            Password
          </span>
          <span className="relative block">
            <HiLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-dim" aria-hidden />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-full border border-white/10 bg-abyss-2/70 py-3 pl-11 pr-12 text-sm font-semibold text-white outline-none transition-colors placeholder:text-dim/50 focus:border-electric/60 focus:shadow-[0_0_18px_rgb(59_107_255/0.2)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-dim transition-colors hover:text-white"
            >
              {showPassword ? <HiEyeSlash aria-hidden /> : <HiEye aria-hidden />}
            </button>
          </span>
        </label>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={remember}
            aria-label="Remember me"
            onClick={() => setRemember((v) => !v)}
            className="group flex items-center gap-2.5"
          >
            <span
              className={`relative h-6 w-10 rounded-full border transition-colors ${
                remember ? "border-magenta/50 bg-magenta/25" : "border-white/15 bg-abyss-2"
              }`}
            >
              <span
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all ${
                  remember
                    ? "left-5 bg-gradient-to-r from-electric to-magenta"
                    : "left-1 bg-white/40"
                }`}
              />
            </span>
            <span className="text-xs font-semibold text-mist group-hover:text-white">
              Remember me
            </span>
          </button>
          <Link href="/forgot" className="text-xs font-semibold text-ice transition-colors hover:text-white">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-gradient w-full rounded-full px-6 py-3.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p className="text-center text-xs text-dim">
        New to NOVERA?{" "}
        <Link href="/register" className="font-bold text-ice transition-colors hover:text-white">
          Create an account
        </Link>
      </p>
    </div>
  );
}
