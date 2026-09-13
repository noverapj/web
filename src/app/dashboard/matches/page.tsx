import type { Metadata } from "next";
import { redirect } from "next/navigation";
import MatchesBrowser from "@/components/dashboard/matches-browser";
import { getSessionUserID } from "@/server/dashboard";
import { getBattleLogs } from "@/server/matches";

export const metadata: Metadata = {
  title: "Match History",
};

export default async function MatchesPage() {
  const userID = await getSessionUserID();
  if (!userID) redirect("/login");

  const data = await getBattleLogs(userID);
  if (!data) redirect("/login");

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Battle Logs</h1>
        <p className="mt-2 text-sm text-mist">
          Every duel, raid, and guild war — filtered your way.
        </p>
      </header>
      <MatchesBrowser rows={data.rows} total={data.total} />
    </div>
  );
}