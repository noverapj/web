import { LosaGameDB, LosaLogDB } from "@/db";
import type { BattleHistoryRow } from "@/types/dashboard";

export type BattleLogs = {
  rows: BattleHistoryRow[];
  total: number;
};

export async function getBattleLogs(userID: string): Promise<BattleLogs | null> {
  const member = await LosaGameDB.selectFrom("userMemberDB")
    .where("userID", "=", userID)
    .select("accountIDX")
    .executeTakeFirst();

  if (!member) return null;

  const logs = await LosaLogDB.selectFrom("log_data_play")
    .where("accountIDX", "=", member.accountIDX)
    .orderBy("regDate", "desc")
    .select(["idx", "modeType", "win", "lose", "kill", "death", "playTime", "regDate"])
    .execute();

  return {
    rows: logs.slice(0, 50).map((log) => {
      const win = Number(log.win);
      const lose = Number(log.lose);
      return {
        idx: log.idx,
        modeType: Number(log.modeType),
        win,
        lose,
        kill: Number(log.kill),
        death: Number(log.death),
        playTime: Number(log.playTime),
        date: log.regDate,
        result: win > lose ? ("win" as const) : win < lose ? ("loss" as const) : ("draw" as const),
      };
    }),
    total: logs.length,
  };
}