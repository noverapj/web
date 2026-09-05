"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HiArrowLeft, HiArrowPath } from "react-icons/hi2";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* backdrop */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgb(226_59_255/0.16),transparent_70%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_90%,rgb(59_107_255/0.14),transparent_70%)]" aria-hidden />

      <div className="relative mx-auto max-w-xl py-32 text-center">
        {/* error badge */}
        <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-tangerine/30 bg-tangerine/10 px-4 py-2 text-sm font-bold text-tangerine">
          <span className="h-2 w-2 animate-glow-pulse rounded-full bg-tangerine" />
          Unexpected Error
        </div>

        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Something <span className="text-gradient">Went Wrong</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-mist">
          An unexpected error occurred while loading this page. Please try
          again, or head back to the homepage.
        </p>

        {error.digest && (
          <p className="mt-4 font-mono text-xs text-dim">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="btn-gradient inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white sm:w-auto"
          >
            <HiArrowPath className="text-lg" aria-hidden />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-electric/50 bg-electric/10 px-8 py-4 text-base font-bold text-ice transition-all hover:-translate-y-0.5 hover:border-electric hover:bg-electric/20 sm:w-auto"
          >
            <HiArrowLeft className="text-lg" aria-hidden />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
