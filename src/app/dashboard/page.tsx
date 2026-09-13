import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { IconType } from "react-icons";
import { GiCoins, GiCrossedSwords, GiFlame, GiGems, GiPodium, GiSwordman } from "react-icons/gi";
import AdSlot from "@/components/ad-slot";
import LaunchButton from "@/components/dashboard/launch-button";
import { getDashboardData, getSessionUserID } from "@/server/dashboard";

export const metadata: Metadata = {
  title: "Overview",
};

const EXP_PER_LEVEL = 2000;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function DashboardOverview() {
  const userID = await getSessionUserID();
  if (!userID) redirect("/login");

  const data = await getDashboardData(userID);
  if (!data) redirect("/login");

  const xpIntoLevel = data.exp % EXP_PER_LEVEL;
  const xpPct = Math.round((xpIntoLevel / EXP_PER_LEVEL) * 100);
  const memberSince = dateFormatter.format(data.regDate);

  const STATS: { label: string; value: string; icon: IconType; color: string }[] = [
    { label: "Winrate", value: `${data.winrate}%`, icon: GiPodium, color: "text-ice" },
    { label: "Wins", value: data.wins.toLocaleString("en-US"), icon: GiCrossedSwords, color: "text-mint" },
    { label: "Losses", value: data.losses.toLocaleString("en-US"), icon: GiFlame, color: "text-red-400" },
    { label: "Kills", value: data.kills.toLocaleString("en-US"), icon: GiSwordman, color: "text-tangerine" },
  ];

  return (
    <div className="space-y-6">
      {/* identity card */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 90% at 85% 30%, rgb(122 59 255/0.3), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">
              Welcome back
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
              {data.nickName}
            </h1>

            {/* level */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-display text-sm font-bold text-white">
                Lv {data.level}
              </span>
            </div>

            {/* XP bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-dim">
                <span>XP</span>
                <span>
                  {xpIntoLevel.toLocaleString("en-US")} / {EXP_PER_LEVEL.toLocaleString("en-US")}
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
                {data.peso.toLocaleString("en-US")} Peso
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                <GiGems className="text-lg text-ice" aria-hidden />
                {data.cash.toLocaleString("en-US")} Cash
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                <GiPodium className="text-lg text-magenta" aria-hidden />
                {data.bonus.toLocaleString("en-US")} Bonus
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm text-dim">
                Member since {memberSince}
              </span>
            </div>
          </div>

          {/* play launch */}
          <div className="mx-auto hidden w-full max-w-xs shrink-0 flex-col items-center justify-center lg:flex lg:w-72 lg:self-start">
            <LaunchButton />
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

      {/* battle record */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">Battle Record</h2>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-dim">
            {data.matches.toLocaleString("en-US")} total battles
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.types.map((t) => (
            <div key={t.type} className="rounded-2xl border border-white/10 bg-panel/60 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-dim">
                {t.name}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-mist">
                  Wins <span className="ml-1 font-display font-bold text-mint">{t.win}</span>
                </span>
                <span className="text-mist">
                  Losses <span className="ml-1 font-display font-bold text-red-400">{t.lose}</span>
                </span>
                <span className="text-mist">
                  Kills <span className="ml-1 font-display font-bold text-tangerine">{t.kill}</span>
                </span>
                <span className="text-mist">
                  Deaths <span className="ml-1 font-display font-bold text-white/70">{t.death}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot adSlot="1234567890" className="mx-auto max-w-2xl py-6" />
    </div>
  );
}