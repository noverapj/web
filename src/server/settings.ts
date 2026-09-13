import { LosaGameDB } from "@/db";
import type { SettingsData } from "@/types/settings";

export async function getSettingsData(userID: string): Promise<SettingsData | null> {
  const member = await LosaGameDB.selectFrom("userMemberDB")
    .where("userID", "=", userID)
    .select(["userID", "nickName", "email"])
    .executeTakeFirst();

  if (!member) return null;

  return {
    username: member.userID,
    nickName: member.nickName,
    email: member.email,
  };
}