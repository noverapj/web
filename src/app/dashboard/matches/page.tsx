import type { Metadata } from "next";
import MatchesBrowser from "@/components/dashboard/matches-browser";
import { MATCHES } from "@/data/matches";

export const metadata: Metadata = {
  title: "Match History",
};

export default function MatchesPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Battle Logs</h1>
        <p className="mt-2 text-sm text-mist">
          Every duel, raid, and guild war — filtered your way.
        </p>
      </header>
      <MatchesBrowser matches={MATCHES} />
    </div>
  );
}
