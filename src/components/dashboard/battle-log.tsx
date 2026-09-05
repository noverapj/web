import type { Match } from "@/data/matches";
import { heroByName } from "@/data/heroes";
import { HiClock, HiStar } from "react-icons/hi2";

export default function BattleLog({ match }: { match: Match }) {
  const hero = heroByName(match.hero);
  const win = match.result === "win";

  return (
    <article
      className={`card-glow relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-panel/60 p-4 backdrop-blur sm:p-5 ${
        win ? "border-mint/25" : "border-red-500/25"
      }`}
    >
      {/* hero portrait */}
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10"
        style={{ background: `linear-gradient(150deg, ${win ? "#3b6bff26" : "#ef444418"}, transparent)` }}
      >
        <hero.icon className="text-2xl text-white/90" aria-hidden />
      </div>

      {/* main info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="font-display text-sm font-bold text-white sm:text-base">{match.hero}</h3>
          <span className="text-xs text-dim">vs</span>
          <span className="truncate text-sm text-mist">{match.opponent}</span>
          {match.mvp && (
            <span className="inline-flex items-center gap-1 rounded-full border border-tangerine/30 bg-tangerine/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tangerine">
              <HiStar className="text-[11px]" aria-hidden />
              MVP
            </span>
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-dim">
          <span>{match.mode}</span>
          <span className="inline-flex items-center gap-1">
            <HiClock className="text-sm" aria-hidden />
            {match.duration}
          </span>
          <span>
            <span className="text-mist">{match.kills}</span> / {match.deaths} /{" "}
            <span className="text-mist">{match.assists}</span>
          </span>
          <span>
            {match.date} · {match.time}
          </span>
        </div>
      </div>

      {/* result + LP */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span
          className={`rounded-lg px-3 py-1 font-display text-xs font-bold tracking-wider ${
            win ? "bg-mint/15 text-mint" : "bg-red-500/15 text-red-400"
          }`}
        >
          {win ? "VICTORY" : "DEFEAT"}
        </span>
        {match.lpDelta !== null && (
          <span
            className={`font-display text-sm font-bold ${
              match.lpDelta >= 0 ? "text-mint" : "text-red-400"
            }`}
          >
            {match.lpDelta >= 0 ? "+" : ""}
            {match.lpDelta} LP
          </span>
        )}
      </div>
    </article>
  );
}
