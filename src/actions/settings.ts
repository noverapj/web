"use server";

import { redirect } from "next/navigation";
import { LosaGameDB } from "@/db";
import { NickNameSchema } from "@/schemas/settings";
import { getSessionUserID } from "@/server/dashboard";

export type ProfileState = { error?: string; message?: string };

export async function updateProfileAction(
  prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const userID = await getSessionUserID();
  if (!userID) redirect("/login");

  const parsed = NickNameSchema.safeParse({
    nickName: formData.get("nickName"),
  });

  if (!parsed.success) {
    return { error: "Invalid nickname" };
  }

  const { nickName } = parsed.data;

  const existNickname = await LosaGameDB.selectFrom("userMemberDB")
    .where("nickName", "=", nickName)
    .where("userID", "!=", userID)
    .select("userID")
    .executeTakeFirst();

  if (existNickname) {
    return { error: "Nickname already taken" };
  }

  await LosaGameDB.updateTable("userMemberDB")
    .set({ nickName })
    .where("userID", "=", userID)
    .execute();

  return { message: "Saved!" };
}