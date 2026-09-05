import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { HiArrowRight, HiCheck, HiStar } from "react-icons/hi2";
import { GiCoins, GiCrossedSwords, GiCrown, GiFlame, GiGems, GiPodium } from "react-icons/gi";
import BattleLog from "@/components/dashboard/battle-log";
import { heroByName } from "@/data/heroes";
import { DAILY_CONTRACTS, PLAYER, TIER_STYLES } from "@/data/player";
import { MATCHES } from "@/data/matches";

export const metadata: Metadata = {
  title: "Overview",
};

const STATS: { label: string; value: string; icon: IconType; color: string }[] = [
  { label: "Winrate", value: `${PLAYER.winrate}%`, icon: GiPodium, color: "text-ice" },
  { label: "Matches", value: PLAYER.matches.toLocaleString("en-US"), icon: GiCrossedSwords, color: "text-mist" },
  { label: "Win Streak", value: `${PLAYER.streak} W`, icon: GiFlame, color: "text-tangerine" },
  { label: "Best Rank", value: PLAYER.bestRank, icon: GiCrown, color: "text-magenta" },
];

export default function DashboardOverview() {
  const hero = heroByName("Kage Ninja");
  const tier = TIER_STYLES["Diamond"];
  const xpPct = Math.round((PLAYER.xp / PLAYER.xpNext) * 100);
  const lpPct = Math.round((PLAYER.lp / PLAYER.lpNext) * 100);

  return (
    <div className="space-y-6">
      {/* identity card */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 70% 90% at 85% 30%, ${tier.to}30, transparent 70%)` }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">
              Welcome back
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              {PLAYER.name}
            </h1>
            <p className="mt-1 font-display text-sm font-semibold text-ice">{PLAYER.title}</p>

            {/* tier emblem + level */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-display text-sm font-bold text-abyss shadow-lg"
                style={{ background: `linear-gradient(92deg, ${tier.from}, ${tier.to})` }}
              >
                <GiCrown className="text-lg" aria-hidden />
                {PLAYER.tier}
              </span>
              <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-display text-sm font-bold text-white">
                Lv {PLAYER.level}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-tangerine/25 bg-tangerine/10 px-4 py-2 text-sm font-bold text-tangerine">
                <HiStar className="text-base" aria-hidden />
                Equipped: {hero.name}
              </span>
            </div>

            {/* XP bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-dim">
                <span>XP</span>
                <span>
                  {PLAYER.xp.toLocaleString("en-US")} / {PLAYER.xpNext.toLocaleString("en-US")}
                </span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full border border-white/10 bg-abyss-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-electric to-magenta shadow-[0_0_14px_rgb(226_59_255/0.5)]"
                  style={{ width: `${xpPct}%` }}
                />
              </div>
            </div>

            {/* currencies */}
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                <GiCoins className="text-lg text-tangerine" aria-hidden />
                {PLAYER.gold.toLocaleString("en-US")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                <GiGems className="text-lg text-ice" aria-hidden />
                {PLAYER.gems.toLocaleString("en-US")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm text-dim">
                Playing since {PLAYER.memberSince}
              </span>
            </div>
          </div>

          {/* hero art */}
          <div className="relative mx-auto h-56 w-full max-w-xs shrink-0 sm:h-72 lg:h-80 lg:w-72">
            <Image
              src={hero.art}
              alt={`${hero.name} artwork`}
              fill
              sizes="(max-width: 1024px) 320px, 288px"
              className="object-contain object-bottom drop-shadow-[0_14px_36px_rgba(122_59_255/0.45)]"
              priority
            />
          </div>
        </div>
      </section>

      {/* stat chips */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="card-glow rounded-2xl border border-white/10 bg-panel/60 p-5 backdrop-blur">
            <s.icon className={`text-2xl ${s.color}`} aria-hidden />
            <p className="mt-3 font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="mt-0.5 text-xs uppercase tracking-widest text-dim">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ladder + daily contracts */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* ladder panel */}
        <div className="card-glow relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur lg:col-span-2 sm:p-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 60% 80% at 100% 0%, ${tier.to}1f, transparent 70%)` }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-white">Ladder Progress</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-dim">
                Season 12 ends in {PLAYER.seasonEndsIn}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-5">
              <span
                className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl font-display text-2xl font-bold text-abyss shadow-xl"
                style={{ background: `linear-gradient(140deg, ${tier.from}, ${tier.to})` }}
              >
                {PLAYER.lp}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-display font-bold text-white">{PLAYER.tier} · {PLAYER.lp} LP</span>
                  <span className="text-dim">Promotion at {PLAYER.lpNext} LP</span>
                </div>
                <div className="mt-2 h-4 overflow-hidden rounded-full border border-white/10 bg-abyss-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-electric via-magenta to-tangerine shadow-[0_0_14px_rgb(226_59_255/0.45)]"
                    style={{ width: `${lpPct}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-tangerine">
                  {PLAYER.winsToPromotion} more wins to reach Diamond II
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* daily contracts */}
        <div className="rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur">
          <h2 className="font-display text-lg font-bold text-white">Daily Contracts</h2>
          <ul className="mt-5 space-y-4">
            {DAILY_CONTRACTS.map((c) => {
              const done = c.progress >= c.goal;
              return (
                <li key={c.name}>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className={done ? "text-mint" : "text-mist"}>{c.name}</span>
                    <span className="shrink-0 text-xs text-dim">
                      {c.progress.toLocaleString("en-US")}/{c.goal.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-abyss-2">
                      <div
                        className={`h-full rounded-full ${done ? "bg-mint" : "bg-gradient-to-r from-electric to-magenta"}`}
                        style={{ width: `${Math.min(100, (c.progress / c.goal) * 100)}%` }}
                      />
                    </div>
                    {c.claimed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-mint">
                        <HiCheck className="text-sm" aria-hidden />
                        Claimed
                      </span>
                    ) : done ? (
                      <button
                        type="button"
                        className="btn-gradient rounded-lg px-3 py-1 text-xs font-bold text-white"
                      >
                        Claim
                      </button>
                    ) : (
                      <span className="text-xs text-dim">{c.reward}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* recent battles */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">Recent Battles</h2>
          <Link
            href="/dashboard/matches"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ice transition-colors hover:text-white"
          >
            View all matches
            <HiArrowRight className="text-base" aria-hidden />
          </Link>
        </div>
        <div className="space-y-3">
          {MATCHES.slice(0, 5).map((m) => (
            <BattleLog key={m.id} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
