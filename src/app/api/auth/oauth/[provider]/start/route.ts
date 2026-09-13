import { NextResponse } from "next/server";
import {
  buildAuthorizeUrl,
  generateOAuthState,
  generatePKCEVerifier,
  isOAuthProvider,
} from "@/server/oauth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  if (!isOAuthProvider(provider)) {
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  }

  const state = generateOAuthState();
  const verifier = generatePKCEVerifier();

  const url = buildAuthorizeUrl(provider, state, verifier);
  if (!url) {
    return NextResponse.json(
      { error: "OAuth provider is not configured" },
      { status: 500 },
    );
  }

  const res = NextResponse.redirect(url);
  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  res.cookies.set("oauth_verifier", verifier, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return res;
}