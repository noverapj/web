import { LosaGameDB } from "@/db";
import type { GuildData } from "@/types/guild";

function normalizeRole(position: string | null): string {
  if (!position) return "Member";
  const lower = position.toLowerCase();
  if (lower.includes("master")) return "Guild Master";
  if (lower.includes("officer")) return "Officer";
  return position;
}

export async function getGuildData(userID: string): Promise<GuildData> {
  const member = await LosaGameDB.selectFrom("userMemberDB")
    .where("userID", "=", userID)
    .select("accountIDX")
    .executeTakeFirst();

  if (!member) return { guild: null, roster: [], warRecord: null };

  const info = await LosaGameDB.selectFrom("userGuildInfoDB")
    .where("accountIDX", "=", member.accountIDX)
    .selectAll()
    .executeTakeFirst();

  if (!info) return { guild: null, roster: [], warRecord: null };

  const [guild, roster, warRecord] = await Promise.all([
    LosaGameDB.selectFrom("userGuildDB")
      .where("idx", "=", info.guildIDX)
      .selectAll()
      .executeTakeFirst(),
    LosaGameDB.selectFrom("userGuildInfoDB")
      .where("guildIDX", "=", info.guildIDX)
      .innerJoin(
        "userMemberDB",
        "userMemberDB.accountIDX",
        "userGuildInfoDB.accountIDX",
      )
      .select(["userGuildInfoDB.guildPosition", "userMemberDB.nickName"])
      .execute(),
    LosaGameDB.selectFrom("userRecordGuildDB")
      .where("guildIDX", "=", info.guildIDX)
      .select(["type1_win", "type1_lose", "type1_kill", "type1_death"])
      .executeTakeFirst(),
  ]);

  return {
    guild: guild
      ? {
          name: guild.guildName,
          level: guild.guildLevel,
          memberCount: guild.membercount,
          memberCap: guild.maxcount,
          description: guild.aboutguild,
          point: Number(guild.point),
          todayPoint: Number(guild.todaypoint),
          todayVc: Number(guild.today_vc),
          totalVc: Number(guild.total_vc),
          ranking: Number(guild.ranking),
        }
      : null,
    roster: roster.map((r) => ({
      nickName: r.nickName,
      role: normalizeRole(r.guildPosition),
    })),
    warRecord: warRecord
      ? {
          win: Number(warRecord.type1_win),
          lose: Number(warRecord.type1_lose),
          kill: Number(warRecord.type1_kill),
          death: Number(warRecord.type1_death),
        }
      : null,
  };
}