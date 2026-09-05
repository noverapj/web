"use client";

import { useMemo, useState } from "react";
import { HiFunnel } from "react-icons/hi2";
import BattleLog from "@/components/dashboard/battle-log";
import type { Match } from "@/data/matches";

type ResultFilter = "all" | "win" | "loss";

export default function MatchesBrowser({ matches }: { matches: Match[] }) {
  const [result, setResult] = useState<ResultFilter>("all");
  const [mode, setMode] = useState("all");
  const [hero, setHero] = useState("all");

  const modes = useMemo(() => Array.from(new Set(matches.map((m) => m.mode))), [matches]);
  const heroesUsed = useMemo(
    () => Array.from(new Set(matches.map((m) => m.hero))),
    [matches],
  );

  const filtered = matches.filter(
    (m) =>
      (result === "all" || m.result === result) &&
      (mode === "all" || m.mode === mode) &&
      (hero === "all" || m.hero === hero),
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
            {(
              [
                { key: "all", label: "All" },
                { key: "win", label: "Victories" },
                { key: "loss", label: "Defeats" },
              ] as const
            ).map((r) => (
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

          {/* hero select */}
          <label className="flex items-center gap-2 text-xs text-dim">
            Hero
            <select
              value={hero}
              onChange={(e) => setHero(e.target.value)}
              className="rounded-xl border border-white/10 bg-abyss-2 px-3 py-1.5 text-sm text-white outline-none focus:border-electric/50"
            >
              <option value="all">All heroes</option>
              {heroesUsed.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* count */}
      <p className="text-sm text-dim">
        Showing <span className="font-bold text-white">{filtered.length}</span> of{" "}
        {matches.length} matches ·{" "}
        <span className="font-bold text-mint">{wins} W</span> /{" "}
        <span className="font-bold text-red-400">{filtered.length - wins} L</span>
      </p>

      {/* list */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((m) => (
            <BattleLog key={m.id} match={m} />
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
