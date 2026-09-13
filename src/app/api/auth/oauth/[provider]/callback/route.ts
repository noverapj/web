import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LosaGameDB } from "@/db";
import {
  exchangeCode,
  fetchOAuthProfile,
  isOAuthProvider,
  OAUTH_BASE_URL,
  type OAuthProvider,
} from "@/server/oauth";
import {
  generateRandomPassword,
  generateUniqueNickname,
  generateUniqueUsername,
  registerAccount,
} from "@/server/auth";
import { createSessionToken } from "@/utils/session";

function redirectLogin() {
  return NextResponse.redirect(`${OAUTH_BASE_URL}/login`);
}

function redirectDashboard() {
  return NextResponse.redirect(`${OAUTH_BASE_URL}/dashboard`);
}

async function setSessionOn(res: NextResponse, userID: string) {
  res.cookies.set(
    "novera_session",
    await createSessionToken(userID, false),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    },
  );
}

function clearOAuthCookies(res: NextResponse) {
  res.cookies.set("oauth_state", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.cookies.set("oauth_verifier", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

async function linkOAuthAccount(
  provider: OAuthProvider,
  profile: { providerUserID: string; email: string },
  accountIDX: number,
) {
  await LosaGameDB.insertInto("userOAuthDB")
    .values({
      accountIDX,
      provider,
      providerUserID: profile.providerUserID,
      email: profile.email,
    })
    .execute();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  if (!isOAuthProvider(provider)) {
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return redirectLogin();

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  const verifier = cookieStore.get("oauth_verifier")?.value;
  if (!storedState || !verifier || storedState !== state) {
    return redirectLogin();
  }

  const accessToken = await exchangeCode(provider, code, verifier);
  if (!accessToken) return redirectLogin();

  const profile = await fetchOAuthProfile(provider, accessToken);
  if (!profile || !profile.emailVerified) return redirectLogin();

  const res = redirectDashboard();
  clearOAuthCookies(res);

  const link = await LosaGameDB.selectFrom("userOAuthDB")
    .where("provider", "=", provider)
    .where("providerUserID", "=", profile.providerUserID)
    .select("accountIDX")
    .executeTakeFirst();

  if (link) {
    const member = await LosaGameDB.selectFrom("userMemberDB")
      .where("accountIDX", "=", link.accountIDX)
      .select("userID")
      .executeTakeFirst();

    if (!member) return redirectLogin();

    await setSessionOn(res, member.userID);
    return res;
  }

  const emailMatch = await LosaGameDB.selectFrom("userMemberDB")
    .where("email", "=", profile.email)
    .selectAll()
    .executeTakeFirst();

  if (emailMatch) {
    await linkOAuthAccount(provider, profile, emailMatch.accountIDX);
    await setSessionOn(res, emailMatch.userID);
    return res;
  }

  const username = await generateUniqueUsername();
  const nickName = await generateUniqueNickname(profile.name);

  const result = await registerAccount({
    email: profile.email,
    username,
    nickName,
    password: generateRandomPassword(),
  });

  if (!result.ok) return redirectLogin();

  await linkOAuthAccount(provider, profile, result.accountIDX);
  await setSessionOn(res, username);
  return res;
}