import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowDownTray, HiArrowLeft } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* backdrop */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_20%,rgb(226_59_255/0.18),transparent_70%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_90%,rgb(59_107_255/0.16),transparent_70%)]" aria-hidden />

      <div className="relative mx-auto max-w-xl py-32 text-center">
        {/* error badge */}
        <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-magenta/30 bg-magenta/10 px-4 py-2 text-sm font-bold text-magenta">
          <span className="h-2 w-2 animate-glow-pulse rounded-full bg-magenta" />
          Error 404
        </div>

        <h1 className="font-display text-7xl font-bold leading-none tracking-tight sm:text-9xl">
          <span className="text-white drop-shadow-[0_0_35px_rgb(226_59_255/0.5)]">4</span>
          <span className="text-gradient">0</span>
          <span className="text-white drop-shadow-[0_0_35px_rgb(59_107_255/0.5)]">4</span>
        </h1>

        <h2 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base text-mist">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/" className="btn-gradient inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white sm:w-auto">
            <HiArrowLeft className="text-lg" aria-hidden />
            Back to Home
          </Link>
          <Link
            href="/#download"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-electric/50 bg-electric/10 px-8 py-4 text-base font-bold text-ice transition-all hover:-translate-y-0.5 hover:border-electric hover:bg-electric/20 sm:w-auto"
          >
            <HiArrowDownTray className="text-lg" aria-hidden />
            Download Game
          </Link>
        </div>
      </div>
    </section>
  );
}
