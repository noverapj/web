import { cookies } from "next/headers";
import type { Selectable } from "kysely";
import { LosaGameDB } from "@/db";
import type { UserRecordBattleDB } from "@/db/types/LosaGame";
import { verifySessionToken } from "@/utils/session";
import {
  RECORD_TYPE_NAMES,
  type BattleTypeRecord,
  type DashboardData,
} from "@/types/dashboard";

export async function getSessionUserID(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get("novera_session")?.value);
  return session?.uid ?? null;
}

type RecordRow = Selectable<UserRecordBattleDB>;

function recordField(
  row: RecordRow | undefined,
  type: number,
  field: "win" | "lose" | "kill" | "death",
): number {
  if (!row) return 0;
  const key = `type${type}_${field}` as keyof RecordRow;
  return Number(row[key] ?? 0);
}

export async function getDashboardData(userID: string): Promise<DashboardData | null> {
  const member = await LosaGameDB.selectFrom("userMemberDB")
    .where("userID", "=", userID)
    .selectAll()
    .executeTakeFirst();

  if (!member) return null;

  const accountIDX = member.accountIDX;

  const [game, cash, record] = await Promise.all([
    LosaGameDB.selectFrom("userGameDB")
      .where("accountIDX", "=", accountIDX)
      .selectAll()
      .executeTakeFirst(),
    LosaGameDB.selectFrom("userCashDB")
      .where("accountIDX", "=", accountIDX)
      .selectAll()
      .executeTakeFirst(),
    LosaGameDB.selectFrom("userRecordBattleDB")
      .where("accountIDX", "=", accountIDX)
      .selectAll()
      .executeTakeFirst(),
  ]);

  const types: BattleTypeRecord[] = [1, 2, 3, 4].map((type) => ({
    type,
    name: RECORD_TYPE_NAMES[type],
    win: recordField(record, type, "win"),
    lose: recordField(record, type, "lose"),
    kill: recordField(record, type, "kill"),
    death: recordField(record, type, "death"),
  }));

  const wins = types.reduce((sum, t) => sum + t.win, 0);
  const losses = types.reduce((sum, t) => sum + t.lose, 0);
  const matches = wins + losses;

  return {
    nickName: member.nickName,
    userID: member.userID,
    regDate: member.regDate,
    level: Number(game?.userLevel ?? 0),
    exp: Number(game?.userEXP ?? 0),
    peso: Number(game?.gameMoney ?? 0),
    cash: Number(cash?.amtCash ?? 0),
    bonus: Number(cash?.amtBonus ?? 0),
    wins,
    losses,
    kills: types.reduce((sum, t) => sum + t.kill, 0),
    deaths: types.reduce((sum, t) => sum + t.death, 0),
    winrate: matches > 0 ? Math.round((wins / matches) * 1000) / 10 : 0,
    matches,
    types,
  };
}