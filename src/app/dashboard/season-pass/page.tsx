import type { Metadata } from "next";
import { GiLaurelsTrophy } from "react-icons/gi";
import SeasonTrack from "@/components/dashboard/season-track";
import { SEASON_PASS } from "@/data/season-pass";

export const metadata: Metadata = {
  title: "Season Pass",
};

export default function SeasonPassPage() {
  const tierPct = Math.round((SEASON_PASS.tierXp / SEASON_PASS.tierXpNext) * 100);

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Season Pass</h1>
        <p className="mt-2 text-sm text-mist">{SEASON_PASS.season}</p>
      </header>

      <div className="space-y-6">
        {/* status + premium banner */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="card-glow rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur lg:col-span-2 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-white">
                Tier {SEASON_PASS.currentTier} / {SEASON_PASS.maxTier}
              </h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-dim">
                Ends in {SEASON_PASS.endsIn}
              </span>
            </div>
            <p className="mt-2 text-sm text-mist">
              Earn XP from any match to unlock the next tier. Daily Contracts give bonus XP.
            </p>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-dim">
                <span>Progress to Tier {SEASON_PASS.currentTier + 1}</span>
                <span>
                  {SEASON_PASS.tierXp} / {SEASON_PASS.tierXpNext} XP
                </span>
              </div>
              <div className="mt-1.5 h-3.5 overflow-hidden rounded-full border border-white/10 bg-abyss-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-electric via-magenta to-tangerine shadow-[0_0_14px_rgb(226_59_255/0.45)]"
                  style={{ width: `${tierPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* premium upsell */}
          <div className="relative overflow-hidden rounded-2xl border border-tangerine/30 bg-panel/60 p-6 backdrop-blur">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgb(255 138 42/0.14), transparent 70%)" }}
              aria-hidden
            />
            <div className="relative flex h-full flex-col">
              <GiLaurelsTrophy className="text-4xl text-tangerine" aria-hidden />
              <h2 className="mt-3 font-display text-lg font-bold text-white">Premium Pass</h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-mist">
                Unlock the premium reward track — exclusive skins, heroes, and Gashapon keys
                every tier.
              </p>
              <button type="button" className="btn-gradient mt-4 w-full rounded-xl px-4 py-3 text-sm font-bold text-white">
                Upgrade — {SEASON_PASS.premiumPrice} Gems
              </button>
            </div>
          </div>
        </section>

        {/* reward track */}
        <section className="rounded-2xl border border-white/10 bg-panel/40 p-5 backdrop-blur sm:p-8">
          <SeasonTrack />

          {/* legend */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-dim">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-mint" /> Claimed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-electric to-magenta" /> Ready to claim
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-tangerine" /> Premium reward
            </span>
            <span className="ml-auto hidden sm:block">Use the arrows to browse all 30 tiers</span>
          </div>
        </section>
      </div>
    </div>
  );
}
