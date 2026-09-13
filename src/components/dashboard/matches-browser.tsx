"use client";

import { useMemo, useState } from "react";
import { HiFunnel } from "react-icons/hi2";
import { BattleLogRow } from "@/components/dashboard/battle-history";
import { MODE_TYPE_NAMES, type BattleHistoryRow } from "@/types/dashboard";

type ResultFilter = "all" | "win" | "loss" | "draw";

const RESULT_LABELS: { key: ResultFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "win", label: "Victories" },
  { key: "loss", label: "Defeats" },
  { key: "draw", label: "Draws" },
];

export default function MatchesBrowser({
  rows,
  total,
}: {
  rows: BattleHistoryRow[];
  total: number;
}) {
  const [result, setResult] = useState<ResultFilter>("all");
  const [mode, setMode] = useState("all");

  const modes = useMemo(() => Object.values(MODE_TYPE_NAMES), []);

  const filtered = rows.filter(
    (m) =>
      (result === "all" || m.result === result) &&
      (mode === "all" || (MODE_TYPE_NAMES[m.modeType] ?? `Mode ${m.modeType}`) === mode),
  );

  const wins = filtered.filter((m) => m.result === "win").length;

  return (
    <div className="space-y-5">
      {/* filters */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dim">
            <HiFunnel className="text-sm" aria-hidden />
            Filters
          </span>

          {/* result chips */}
          <div className="flex gap-2">
            {RESULT_LABELS.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setResult(r.key)}
                className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all ${
                  result === r.key
                    ? "border-magenta/50 bg-magenta/15 text-white"
                    : "border-white/10 bg-white/5 text-dim hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* mode select */}
          <label className="flex items-center gap-2 text-xs text-dim">
            Mode
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="rounded-xl border border-white/10 bg-abyss-2 px-3 py-1.5 text-sm text-white outline-none focus:border-electric/50"
            >
              <option value="all">All modes</option>
              {modes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* count */}
      <p className="text-sm text-dim">
        Showing <span className="font-bold text-white">{filtered.length}</span> of{" "}
        {total} battles ·{" "}
        <span className="font-bold text-mint">{wins} W</span> /{" "}
        <span className="font-bold text-red-400">
          {filtered.filter((m) => m.result === "loss").length} L
        </span>
        {result === "all" && (
          <>
            {" "}
            /{" "}
            <span className="font-bold text-mist">
              {filtered.filter((m) => m.result === "draw").length} D
            </span>
          </>
        )}
      </p>

      {/* list */}
      {rows.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-mist">
          No battles recorded yet — go hit the arena!
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((m) => (
            <BattleLogRow key={m.idx} match={m} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-10 text-center text-mist">
          No matches found for these filters.
        </div>
      )}
    </div>
  );
}