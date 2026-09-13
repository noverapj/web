"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { LosaGameDB } from "@/db";
import { LoginSchema, RegistSchema } from "@/schemas/auth";
import { registerAccount } from "@/server/auth";
import { createSessionToken } from "@/utils/session";

export type AuthState = { error?: string; message?: string };

async function setSessionCookie(userID: string, remember: boolean) {
  const cookieStore = await cookies();
  cookieStore.set("novera_session", await createSessionToken(userID, remember), {
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

  const result = await registerAccount({
    email: payload.email,
    username: payload.username,
    nickName: payload.nickName,
    password: payload.password,
  });

  if (!result.ok) {
    return { error: result.error };
  }

  await setSessionCookie(payload.username, false);

  redirect("/dashboard");
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("novera_session");
  redirect("/login");
}
