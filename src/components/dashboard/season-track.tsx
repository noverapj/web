"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  GiCoins,
  GiCrown,
  GiGems,
  GiKey,
  GiPresent,
  GiSparkles,
  GiSwordsPower,
  GiTShirt,
  GiWrench,
} from "react-icons/gi";
import { HiChevronLeft, HiChevronRight, HiCheck, HiLockClosed } from "react-icons/hi2";
import { HEROES, heroByName, RARITY_STYLES } from "@/data/heroes";
import { SEASON_PASS, TIERS, type PassReward } from "@/data/season-pass";

/* resolve reward icons once at module scope (never during render) */

function rewardIcon(name: string): IconType {
  if (name.startsWith("Hero:")) return heroByName(name.slice(6).split(" - ")[0]).icon;
  const mention = HEROES.find((h) => name.includes(h.name));
  if (mention) return mention.icon;
  if (name.includes("Gold")) return GiCoins;
  if (name.includes("Gems")) return GiGems;
  if (name.includes("Key")) return GiKey;
  if (name.includes("Title") || name.includes("Badge")) return GiCrown;
  if (name.includes("Trail")) return GiSwordsPower;
  if (name.includes("Repair")) return GiWrench;
  if (name.includes("Emote") || name.includes("Taunt") || name.includes("Pose")) return GiSparkles;
  if (name.includes("Cape") || name.includes("Costume") || name.includes("Skin") || name.includes("Ronin")) return GiTShirt;
  return GiPresent;
}

function withIcon(reward: PassReward) {
  if (!reward) return null;
  return { ...reward, icon: rewardIcon(reward.name) };
}

const RESOLVED_TIERS = TIERS.map((t) => ({
  tier: t.tier,
  free: withIcon(t.free),
  premium: withIcon(t.premium),
}));

type ResolvedReward = NonNullable<(typeof RESOLVED_TIERS)[number]["free"]>;

function RewardCard({
  reward,
  side,
  reached,
  claimed,
  isCurrent,
  premiumOwned,
}: {
  reward: ResolvedReward | null;
  side: "free" | "premium";
  reached: boolean;
  claimed: boolean;
  isCurrent: boolean;
  premiumOwned: boolean;
}) {
  const r = RARITY_STYLES[reward?.rarity ?? "normal"];
  const premiumLocked = side === "premium" && !premiumOwned;
  const locked = !reached || premiumLocked;

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border ${
          isCurrent && !claimed ? "animate-glow-pulse" : ""
        }`}
        style={{
          borderColor: claimed ? "rgb(59 251 176 / 0.35)" : `${r.to}66`,
          background: `linear-gradient(165deg, ${r.from}2e, ${r.to}0d 60%, #0b0e1a)`,
          boxShadow: isCurrent && !claimed ? `0 0 18px ${r.glow}` : undefined,
          filter: locked ? "saturate(0.4)" : undefined,
          opacity: locked ? 0.45 : 1,
        }}
      >
        {reward && <reward.icon className="text-4xl" style={{ color: r.text }} aria-hidden />}

        {/* state badges */}
        {claimed ? (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-bl-lg bg-mint/90 text-abyss">
            <HiCheck className="text-xs" aria-hidden />
          </span>
        ) : isCurrent && !locked ? (
          <span className="absolute -right-0.5 -top-0.5 rounded-bl-lg bg-gradient-to-r from-electric to-magenta px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            Claim
          </span>
        ) : null}

        {premiumLocked && (
          <span className="absolute inset-0 grid place-items-center bg-abyss/50 backdrop-blur-[1px]">
            <HiLockClosed className="text-lg text-white/60" aria-hidden />
          </span>
        )}
      </div>
      <p className={`mt-1.5 h-9 line-clamp-2 text-center text-[11px] leading-tight ${locked ? "text-dim/60" : "text-mist"}`}>
        {reward?.name ?? ""}
      </p>
    </div>
  );
}

const COLUMN_WIDTH = 144; // px, w-36

export default function SeasonTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // center the current tier on first load
    const idx = Math.max(0, RESOLVED_TIERS.findIndex((t) => t.tier === SEASON_PASS.currentTier) - 2);
    if (idx > 0) el.scrollTo({ left: idx * COLUMN_WIDTH });
    updateArrows();
  }, []);

  return (
    <div className="relative">
      {/* header row: track title + chevrons top-right */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-dim">
          Reward Track | Tier {SEASON_PASS.currentTier} / {SEASON_PASS.maxTier}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll rewards left"
            onClick={() => scrollBy(-1)}
            className={`glass grid h-10 w-10 place-items-center rounded-full text-white transition-all hover:scale-110 ${
              atStart ? "pointer-events-none opacity-30" : "opacity-100"
            }`}
          >
            <HiChevronLeft className="text-xl" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Scroll rewards right"
            onClick={() => scrollBy(1)}
            className={`glass grid h-10 w-10 place-items-center rounded-full text-white transition-all hover:scale-110 ${
              atEnd ? "pointer-events-none opacity-30" : "opacity-100"
            }`}
          >
            <HiChevronRight className="text-xl" aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* track labels - same size as reward cards */}
        <div className="mr-4 hidden w-36 shrink-0 flex-col gap-2 sm:flex">
          <span className="h-9 shrink-0" />
          <div className="flex w-full flex-col items-center px-2.5">
            <div
              className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-electric/50 bg-gradient-to-br from-electric/25 to-electric/5 shadow-[0_0_16px_rgb(59_107_255/0.18)]"
              title="Free rewards"
            >
              <GiPresent className="text-4xl text-ice" aria-hidden />
            </div>
            <p className="mt-1.5 h-9 text-center text-[11px] font-bold uppercase leading-tight tracking-widest text-ice">
              Free
            </p>
          </div>
          <div className="flex w-full flex-col items-center px-2.5">
            <div
              className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-tangerine/50 bg-gradient-to-br from-tangerine/25 to-tangerine/5 shadow-[0_0_16px_rgb(255_138_42/0.18)]"
              title="Premium rewards"
            >
              <GiCrown className="text-4xl text-tangerine" aria-hidden />
            </div>
            <p className="mt-1.5 h-9 text-center text-[11px] font-bold uppercase leading-tight tracking-widest text-tangerine">
              Premium
            </p>
          </div>
        </div>

        {/* scrollable track */}
        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-label="Season pass reward track"
        >
          <div className="flex">
            {RESOLVED_TIERS.map((tier, i): ReactNode => {
              const reached = tier.tier <= SEASON_PASS.currentTier;
              const isCurrent = tier.tier === SEASON_PASS.currentTier;
              const claimed = tier.tier < SEASON_PASS.currentTier;
              const nodeFilled = reached;
              return (
                <div
                  key={tier.tier}
                  className={`relative flex w-36 shrink-0 snap-start flex-col gap-2 rounded-xl px-2.5 pb-2.5 ${
                    isCurrent ? "bg-magenta/10 ring-1 ring-magenta/30" : ""
                  }`}
                >
                  {/* tier node + connectors on top */}
                  <div className="relative flex h-9 items-center justify-center">
                    {i > 0 && (
                      <span
                        className={`absolute left-0 top-1/2 h-1 w-1/2 -translate-y-1/2 rounded-full ${
                          nodeFilled ? "bg-gradient-to-r from-electric to-magenta" : "bg-white/10"
                        }`}
                        aria-hidden
                      />
                    )}
                    {i < RESOLVED_TIERS.length - 1 && (
                      <span
                        className={`absolute right-0 top-1/2 h-1 w-1/2 -translate-y-1/2 rounded-full ${
                          nodeFilled ? "bg-gradient-to-r from-electric to-magenta" : "bg-white/10"
                        }`}
                        aria-hidden
                      />
                    )}
                    <span
                      className={`relative z-10 grid place-items-center rounded-full border-2 font-display text-xs font-bold transition-all ${
                        isCurrent
                          ? "h-8 w-8 border-magenta bg-gradient-to-br from-electric to-magenta text-white shadow-[0_0_18px_rgb(226_59_255/0.8)]"
                          : nodeFilled
                            ? "h-7 w-7 border-magenta/60 bg-abyss text-white"
                            : "h-7 w-7 border-white/15 bg-abyss-2 text-dim"
                      }`}
                    >
                      {tier.tier}
                    </span>
                  </div>

                  {/* free reward */}
                  <RewardCard
                    reward={tier.free}
                    side="free"
                    reached={reached}
                    claimed={claimed}
                    isCurrent={isCurrent}
                    premiumOwned={SEASON_PASS.premiumOwned}
                  />

                  {/* premium reward */}
                  <RewardCard
                    reward={tier.premium}
                    side="premium"
                    reached={reached}
                    claimed={claimed}
                    isCurrent={isCurrent}
                    premiumOwned={SEASON_PASS.premiumOwned}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
