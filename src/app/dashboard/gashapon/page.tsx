import type { Metadata } from "next";
import Image from "next/image";
import { HiClock } from "react-icons/hi2";
import { GiCoins, GiDiceTarget, GiGems, GiHourglass } from "react-icons/gi";
import { heroByName, RARITY_STYLES } from "@/data/heroes";
import { FEATURED_BANNER, PITY, PULLS } from "@/data/gashapon";
import { PLAYER } from "@/data/player";

export const metadata: Metadata = {
  title: "Gashapon",
};

const TYPE_LABELS: Record<string, string> = {
  hero: "Hero",
  costume: "Costume",
  gear: "Gear",
};

export default function GashaponPage() {
  const featured = heroByName(FEATURED_BANNER.hero);
  const r = RARITY_STYLES[featured.rarity];
  const pityPct = Math.round((PITY.current / PITY.guaranteed) * 100);
  const pullsLeft = PITY.guaranteed - PITY.current;

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Gashapon</h1>
      </header>

      <div className="space-y-6">
        {/* featured banner */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 60% 90% at 80% 40%, ${r.from}33, transparent 70%)` }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
            <div className="min-w-0 flex-1">
              <p className="inline-flex items-center gap-2 rounded-full border border-tangerine/30 bg-tangerine/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-tangerine">
                <GiHourglass className="text-sm" aria-hidden />
                Ends in {FEATURED_BANNER.endsIn}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
                {FEATURED_BANNER.title}
              </h2>
              <p className="mt-2 text-sm text-mist">{FEATURED_BANNER.detail}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button type="button" className="btn-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white">
                  <GiDiceTarget className="text-lg" aria-hidden />
                  Pull x10
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-electric/50 bg-electric/10 px-6 py-3 text-sm font-bold text-ice transition-all hover:border-electric hover:bg-electric/20"
                >
                  <GiDiceTarget className="text-lg" aria-hidden />
                  Pull x1
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                  <GiCoins className="text-lg text-tangerine" aria-hidden />
                  {PLAYER.gold.toLocaleString("en-US")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                  <GiGems className="text-lg text-ice" aria-hidden />
                  {PLAYER.gems.toLocaleString("en-US")}
                </span>
              </div>
            </div>

            <div className="relative mx-auto h-64 w-full max-w-xs shrink-0 sm:h-80 lg:h-96 lg:w-80">
              <Image
                src={featured.art}
                alt={`${featured.name} artwork`}
                fill
                sizes="(max-width: 1024px) 320px, 320px"
                className="object-contain object-bottom drop-shadow-[0_14px_36px_rgba(255_138_42/0.4)]"
                priority
              />
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* pity counter */}
          <section className="relative overflow-hidden rounded-2xl border border-tangerine/25 bg-panel/60 p-6 backdrop-blur">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 60% at 100% 0%, rgb(255 138 42/0.1), transparent 70%)" }}
              aria-hidden
            />
            <h2 className="relative font-display text-lg font-bold text-white">Pity Counter</h2>
            <p className="relative mt-2 text-sm text-mist">
              <span className="font-bold text-white">{pullsLeft} pulls</span> until a guaranteed
              Unique drop.
            </p>
            <div className="relative mt-4">
              <div className="flex items-center justify-between text-xs text-dim">
                <span>{PITY.current} / {PITY.guaranteed}</span>
                <span>Guaranteed Unique</span>
              </div>
              <div className="mt-1.5 h-4 overflow-hidden rounded-full border border-white/10 bg-abyss-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-tangerine to-[#ffd76a] shadow-[0_0_14px_rgb(255_138_42/0.5)]"
                  style={{ width: `${pityPct}%` }}
                />
              </div>
            </div>
          </section>

          {/* pull history */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur lg:col-span-2">
            <h2 className="border-b border-white/10 px-6 py-4 font-display text-lg font-bold text-white">
              Pull History
            </h2>
            <ul>
              {PULLS.map((pull) => {
                const pr = RARITY_STYLES[pull.rarity];
                return (
                  <li
                    key={pull.id}
                    className="flex items-center gap-4 border-b border-white/5 px-6 py-3.5 transition-colors last:border-0 hover:bg-white/[0.04]"
                  >
                    <span
                      className="h-10 w-1.5 shrink-0 rounded-full"
                      style={{ background: `linear-gradient(180deg, ${pr.from}, ${pr.to})`, boxShadow: `0 0 10px ${pr.glow}` }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">
                        {pull.name}
                        {pull.isNew && (
                          <span className="ml-2 rounded-full bg-gradient-to-r from-electric to-magenta px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
                            New
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-dim">
                        <span style={{ color: pr.text }} className="font-semibold uppercase tracking-wide">
                          {pull.rarity}
                        </span>{" "}
                        · {TYPE_LABELS[pull.type]}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs text-dim">
                      <HiClock className="text-sm" aria-hidden />
                      {pull.date}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
