import { HiClock } from "react-icons/hi2";
import { MODE_TYPE_NAMES, type BattleHistoryRow } from "@/types/dashboard";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const RESULT_STYLES: Record<
  BattleHistoryRow["result"],
  { glyph: string; glyphClass: string; badge: string; text: string }
> = {
  win: { glyph: "W", glyphClass: "text-mint", badge: "bg-mint/15 text-mint", text: "VICTORY" },
  loss: { glyph: "L", glyphClass: "text-red-400", badge: "bg-red-500/15 text-red-400", text: "DEFEAT" },
  draw: { glyph: "D", glyphClass: "text-mist", badge: "bg-white/10 text-mist", text: "DRAW" },
};

export function BattleLogRow({ match }: { match: BattleHistoryRow }) {
  const style = RESULT_STYLES[match.result];
  const modeName = MODE_TYPE_NAMES[match.modeType] ?? `Mode ${match.modeType}`;
  return (
    <article
      className={`card-glow flex items-center gap-4 rounded-2xl border bg-panel/60 p-4 backdrop-blur sm:p-5 ${
        match.result === "win"
          ? "border-mint/25"
          : match.result === "loss"
            ? "border-red-500/25"
            : "border-white/10"
      }`}
    >
      <span
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10 font-display text-xl font-bold ${style.glyphClass}`}
      >
        {style.glyph}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-bold text-white sm:text-base">
          {modeName} | {match.win} - {match.lose}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-dim">
          <span className="inline-flex items-center gap-1">
            <HiClock className="text-sm" aria-hidden />
            {formatDuration(match.playTime)}
          </span>
          <span>
            <span className="text-mist">{match.kill}</span> / {match.death}
          </span>
          <span>{dateFormatter.format(match.date)}</span>
        </p>
      </div>

      <span
        className={`shrink-0 rounded-lg px-3 py-1 font-display text-xs font-bold tracking-wider ${style.badge}`}
      >
        {style.text}
      </span>
    </article>
  );
}

export default function BattleHistory({ rows }: { rows: BattleHistoryRow[] }) {
  if (rows.length === 0) {
    return <p className="text-sm text-dim">No battles recorded yet.</p>;
  }

  return (
    <div className="space-y-3">
      {rows.map((m) => (
        <BattleLogRow key={m.idx} match={m} />
      ))}
    </div>
  );
}