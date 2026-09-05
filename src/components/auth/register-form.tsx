"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeSlash, HiLockClosed, HiUser, HiEnvelope } from "react-icons/hi2";
import OAuthButtons from "./oauth-buttons";

function strengthOf(password: string): 0 | 1 | 2 | 3 {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;
  return score as 0 | 1 | 2 | 3;
}

const STRENGTH_LABELS = ["Too short", "Weak", "Good", "Strong"];
const STRENGTH_COLORS = ["bg-white/10", "bg-red-400", "bg-tangerine", "bg-mint"];

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => strengthOf(password), [password]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!terms) {
      setError("Please accept the Terms of Service to continue.");
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
          or sign up with email
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {error && (
          <p className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-center text-xs font-semibold text-red-400">
            {error}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
              Username
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
              Email
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
        </div>

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
              autoComplete="new-password"
              placeholder="At least 8 characters"
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
          {/* strength meter */}
          {password && (
            <span className="mt-2 flex items-center gap-2">
              <span className="flex flex-1 gap-1" aria-hidden>
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= strength ? STRENGTH_COLORS[strength] : "bg-white/10"
                    }`}
                  />
                ))}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-dim">
                {STRENGTH_LABELS[strength]}
              </span>
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
            Confirm Password
          </span>
          <span className="relative block">
            <HiLockClosed className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-dim" aria-hidden />
            <input
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              placeholder="Repeat your password"
              className="w-full rounded-full border border-white/10 bg-abyss-2/70 py-3 pl-11 pr-5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-dim/50 focus:border-electric/60 focus:shadow-[0_0_18px_rgb(59_107_255/0.2)]"
            />
          </span>
        </label>

        <button
          type="button"
          role="switch"
          aria-checked={terms}
          onClick={() => setTerms((v) => !v)}
          className="group flex items-start gap-2.5 text-left"
        >
          <span
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
              terms ? "border-transparent bg-gradient-to-r from-electric to-magenta" : "border-white/20 bg-abyss-2"
            }`}
          >
            {terms && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                <path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className="text-xs leading-relaxed text-mist group-hover:text-white">
            I agree to the{" "}
            <Link href="/forgot" className="font-bold text-ice hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/forgot" className="font-bold text-ice hover:text-white">
              Privacy Policy
            </Link>
            .
          </span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="btn-gradient w-full rounded-full px-6 py-3.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-xs text-dim">
        Already a mercenary?{" "}
        <Link href="/login" className="font-bold text-ice transition-colors hover:text-white">
          Sign in
        </Link>
      </p>
    </div>
  );
}
