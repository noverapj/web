"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LosaGameDB } from "@/db";
import { LoginSchema, RegistSchema } from "@/schemas/auth";
import { generateRandomStringWithSalt } from "@/utils/generator";
import { createSessionToken } from "@/utils/session";

export type AuthState = { error?: string; message?: string };

async function setSessionCookie(userID: string, remember: boolean) {
  const cookieStore = await cookies();
  cookieStore.set("novera_session", createSessionToken(userID, remember), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: (remember ? 30 : 7) * 24 * 60 * 60,
  });
}

export async function loginAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "true",
  });

  if (!parsed.success) {
    return { error: "Invalid Request" };
  }

  const payload = parsed.data;

  const existUser = await LosaGameDB.selectFrom("userMemberDB")
    .where("userID", "=", payload.username)
    .selectAll()
    .executeTakeFirst();

  if (!existUser) {
    return { error: "Account not found" };
  }

  if (existUser.userPWD != payload.password) {
    return { error: "Invalid Password" };
  }

  if (existUser.limitType == 100) {
    return {
      error: `Account has been blocked until ${existUser.limitDate.toLocaleString()}`,
    };
  }

  const existLogin = await LosaGameDB.selectFrom("userLoginDB")
    .where("accountIDX", "=", existUser.accountIDX)
    .selectAll()
    .executeTakeFirst();

  if (!existLogin) {
    return { error: "Invalid login data. Please contact support" };
  }

  await setSessionCookie(existUser.userID, payload.rememberMe ?? false);

  redirect("/dashboard");
}

export async function registerAction(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = RegistSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    nickName: formData.get("nickName"),
  });

  if (!parsed.success) {
    return { error: "Invalid Request" };
  }

  const payload = parsed.data;

  const existUser = await LosaGameDB.selectFrom("userMemberDB")
    .where("userID", "=", payload.username)
    .selectAll()
    .executeTakeFirst();

  const existEmail = await LosaGameDB.selectFrom("userMemberDB")
    .where("email", "=", payload.email)
    .selectAll()
    .executeTakeFirst();

  const existNickname = await LosaGameDB.selectFrom("userMemberDB")
    .where("nickName", "=", payload.nickName)
    .selectAll()
    .executeTakeFirst();

  if (existUser || existNickname || existEmail) {
    return { error: "Username or Email or Nickname already registered." };
  }

  const generatedKey = generateRandomStringWithSalt(
    payload.username + payload.nickName,
  );

  try {
    await LosaGameDB.transaction().execute(async (trx) => {
      const newUser = await trx
        .insertInto("userMemberDB")
        .values({
          email: payload.email,
          userID: payload.username,
          nickName: payload.nickName,
          userPWD: payload.password,
          joinType: 100,
          userType: 10,
          mailling: 0,
        })
        .outputAll("inserted")
        .executeTakeFirst();

      const newAaccountIDX = newUser?.accountIDX;

      await trx
        .insertInto("userInfoDB")
        .values({
          accountIDX: newAaccountIDX!,
          userIP: "0.0.0.0",
          visit_count: 0,
          checkDate: new Date(),
          rec_dec: 0,
          rec_inc: 0,
          rec_index: 0,
        })
        .execute();

      await trx
        .insertInto("userRecordBattleDB")
        .values({
          accountIDX: newAaccountIDX!,
        })
        .execute();

      await trx
        .insertInto("userCashDB")
        .values({
          accountIDX: newAaccountIDX!,
          amtBonus: 0,
          amtCash: 10_000_000,
          amtLimit: 99999999,
          amtSum: 10_000_000,
        })
        .execute();

      await trx
        .insertInto("userGameDB")
        .values({
          accountIDX: newAaccountIDX!,
          gameMoney: 10_000_000,
        })
        .execute();

      await trx
        .insertInto("userLoginDB")
        .values({
          accountIDX: newAaccountIDX!,
          encodeKey: generateRandomStringWithSalt(generatedKey),
        })
        .execute();
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to Register" };
  }

  await setSessionCookie(payload.username, false);

  redirect("/dashboard");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("novera_session");
  redirect("/login");
}
