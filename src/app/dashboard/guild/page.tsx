import type { Metadata } from "next";
import { HiCalendarDays, HiUserGroup } from "react-icons/hi2";
import { GiShield } from "react-icons/gi";
import { heroByName } from "@/data/heroes";
import { GUILD, NEXT_GUILD_WAR, RECENT_WARS, ROSTER } from "@/data/guild";

export const metadata: Metadata = {
  title: "Guild",
};

const ROLE_STYLES: Record<string, string> = {
  "Guild Master": "border-tangerine/30 bg-tangerine/10 text-tangerine",
  Officer: "border-electric/40 bg-electric/15 text-ice",
  Member: "border-white/10 bg-white/5 text-mist",
};

export default function GuildPage() {
  const gpPct = Math.round((GUILD.gp / GUILD.gpNext) * 100);

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Guild</h1>
      </header>

      <div className="space-y-6">
        {/* guild banner */}
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 100% at 0% 0%, rgb(59 107 255/0.2), transparent 70%), radial-gradient(ellipse 50% 90% at 100% 100%, rgb(226 59 255/0.14), transparent 70%)" }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center">
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric to-magenta shadow-xl shadow-magenta/25">
              <GiShield className="text-4xl text-white" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                {GUILD.name} <span className="text-ice">[{GUILD.tag}]</span>
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">{GUILD.description}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                  Lv {GUILD.level}
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm text-mist">
                  <HiUserGroup className="text-lg text-ice" aria-hidden />
                  {GUILD.memberCount} / {GUILD.memberCap} members
                </span>
                <button type="button" className="btn-gradient rounded-xl px-5 py-2 text-sm font-bold text-white">
                  Invite Friends
                </button>
              </div>
            </div>
          </div>
          {/* GP bar */}
          <div className="relative border-t border-white/10 p-6 sm:px-8">
            <div className="flex items-center justify-between text-xs text-dim">
              <span>Guild Points</span>
              <span>
                {GUILD.gp.toLocaleString("en-US")} / {GUILD.gpNext.toLocaleString("en-US")}
              </span>
            </div>
            <div className="mt-1.5 h-3 overflow-hidden rounded-full border border-white/10 bg-abyss-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric via-magenta to-tangerine shadow-[0_0_14px_rgb(226_59_255/0.45)]"
                style={{ width: `${gpPct}%` }}
              />
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* roster */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur lg:col-span-2">
            <h2 className="border-b border-white/10 px-6 py-4 font-display text-lg font-bold text-white">
              Roster
            </h2>
            <ol>
              {ROSTER.map((m) => {
                const hero = heroByName(m.hero);
                return (
                  <li
                    key={m.name}
                    className="flex items-center gap-3 border-b border-white/5 px-6 py-3.5 transition-colors last:border-0 hover:bg-white/[0.04]"
                  >
                    <span className="relative flex h-2.5 w-2.5 shrink-0" title={m.online ? "Online" : "Offline"}>
                      <span className={`h-2.5 w-2.5 rounded-full ${m.online ? "bg-mint shadow-[0_0_8px_rgb(59_251_176/0.8)]" : "bg-white/15"}`} />
                    </span>
                    <span className={`min-w-0 flex-1 truncate font-display text-sm font-bold ${m.name === "VanguardX" ? "text-gradient" : "text-white"}`}>
                      {m.name}
                    </span>
                    <span
                      className={`hidden rounded-full border px-2.5 py-0.5 text-[11px] font-bold sm:inline-block ${ROLE_STYLES[m.role]}`}
                    >
                      {m.role}
                    </span>
                    <span className="hidden items-center gap-2 text-sm text-mist md:flex" title={m.hero}>
                      <hero.icon className="text-lg" aria-hidden />
                      <span className="w-28 truncate">{m.hero}</span>
                    </span>
                    <span className="shrink-0 font-display text-sm font-bold text-ice">
                      {m.contribution.toLocaleString("en-US")}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* schedule + recent wars */}
          <div className="space-y-6">
            <section className="card-glow relative overflow-hidden rounded-2xl border border-tangerine/25 bg-panel/60 p-6 backdrop-blur">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 80% 60% at 100% 0%, rgb(255 138 42/0.12), transparent 70%)" }}
                aria-hidden
              />
              <h2 className="relative font-display text-lg font-bold text-white">Next Guild War</h2>
              <div className="relative mt-4 space-y-3">
                <p className="inline-flex items-center gap-2 text-sm text-mist">
                  <HiCalendarDays className="text-lg text-tangerine" aria-hidden />
                  {NEXT_GUILD_WAR.date} · {NEXT_GUILD_WAR.time}
                </p>
                <p className="font-display text-xl font-bold text-white">
                  vs {NEXT_GUILD_WAR.opponent}
                </p>
                <p className="text-sm font-semibold text-tangerine">
                  In {NEXT_GUILD_WAR.inDays} days — get your line-up ready
                </p>
                <button type="button" className="btn-gradient mt-1 w-full rounded-xl px-4 py-2.5 text-sm font-bold text-white">
                  Set Reminder
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur">
              <h2 className="font-display text-lg font-bold text-white">Recent Wars</h2>
              <ul className="mt-4 space-y-3">
                {RECENT_WARS.map((w) => (
                  <li key={w.date + w.opponent} className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-abyss-2/50 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{w.opponent}</p>
                      <p className="text-xs text-dim">{w.date}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-display text-sm font-bold text-mist">{w.score}</span>
                      <span
                        className={`rounded-lg px-2.5 py-1 font-display text-xs font-bold ${
                          w.result === "win" ? "bg-mint/15 text-mint" : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {w.result === "win" ? "WIN" : "LOSS"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
