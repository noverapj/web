import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HiUserGroup } from "react-icons/hi2";
import { GiShield } from "react-icons/gi";
import { getSessionUserID } from "@/server/dashboard";
import { getGuildData } from "@/server/guild";

export const metadata: Metadata = {
  title: "Guild",
};

const ROLE_STYLES: Record<string, string> = {
  "Guild Master": "border-tangerine/30 bg-tangerine/10 text-tangerine",
  Officer: "border-electric/40 bg-electric/15 text-ice",
  Member: "border-white/10 bg-white/5 text-mist",
};

export default async function GuildPage() {
  const userID = await getSessionUserID();
  if (!userID) redirect("/login");

  const { guild, roster, warRecord } = await getGuildData(userID);

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Guild</h1>
      </header>

      <div className="space-y-6">
        {!guild ? (
          <section className="rounded-2xl border border-white/10 bg-panel/60 p-10 text-center backdrop-blur">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <GiShield className="text-4xl text-dim" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold text-white">You&apos;re not in a guild</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mist">
              Join a guild to run Guild Wars, climb the leaderboard, and team up with fellow
              mercenaries.
            </p>
            <button
              type="button"
              className="btn-gradient mt-6 rounded-xl px-6 py-2.5 text-sm font-bold text-white"
            >
              Browse Guilds
            </button>
          </section>
        ) : (
          <>
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
                    {guild.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
                    {guild.description || "No guild description yet."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
                      Lv {guild.level}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm text-mist">
                      <HiUserGroup className="text-lg text-ice" aria-hidden />
                      {guild.memberCount} / {guild.memberCap} members
                    </span>
                    {guild.ranking > 0 && (
                      <span className="rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-tangerine">
                        Rank #{guild.ranking}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* guild stats */}
              <div className="relative grid grid-cols-2 gap-4 border-t border-white/10 p-6 sm:px-8 lg:grid-cols-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Guild Points</p>
                  <p className="mt-1 font-display text-xl font-bold text-white">
                    {guild.point.toLocaleString("en-US")}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Points Today</p>
                  <p className="mt-1 font-display text-xl font-bold text-tangerine">
                    {guild.todayPoint.toLocaleString("en-US")}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-dim">VC Today</p>
                  <p className="mt-1 font-display text-xl font-bold text-white">
                    {guild.todayVc.toLocaleString("en-US")}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-dim">VC Total</p>
                  <p className="mt-1 font-display text-xl font-bold text-ice">
                    {guild.totalVc.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* roster */}
              <section className="overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur lg:col-span-2">
                <h2 className="border-b border-white/10 px-6 py-4 font-display text-lg font-bold text-white">
                  Roster
                </h2>
                {roster.length === 0 ? (
                  <p className="px-6 py-8 text-sm text-dim">No members found.</p>
                ) : (
                  <ol>
                    {roster.map((m) => (
                      <li
                        key={m.nickName}
                        className="flex items-center gap-3 border-b border-white/5 px-6 py-3.5 transition-colors last:border-0 hover:bg-white/[0.04]"
                      >
                        <span className="min-w-0 flex-1 truncate font-display text-sm font-bold text-white">
                          {m.nickName}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                            ROLE_STYLES[m.role] ?? ROLE_STYLES.Member
                          }`}
                        >
                          {m.role}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>

              {/* guild war record */}
              <section className="card-glow relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur">
                <h2 className="font-display text-lg font-bold text-white">Guild War Record</h2>
                {!warRecord ? (
                  <p className="mt-5 text-sm text-dim">No guild war battles recorded yet.</p>
                ) : (
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-xl border border-mint/20 bg-mint/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Wins</p>
                      <p className="mt-1 font-display text-2xl font-bold text-mint">
                        {warRecord.win.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Losses</p>
                      <p className="mt-1 font-display text-2xl font-bold text-red-400">
                        {warRecord.lose.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Kills</p>
                      <p className="mt-1 font-display text-2xl font-bold text-tangerine">
                        {warRecord.kill.toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Deaths</p>
                      <p className="mt-1 font-display text-2xl font-bold text-white/70">
                        {warRecord.death.toLocaleString("en-US")}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}