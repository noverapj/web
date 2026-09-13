import { createHash, randomBytes } from "crypto";

export type OAuthProvider = "discord" | "google";

export type OAuthProfile = {
  providerUserID: string;
  email: string;
  emailVerified: boolean;
  name: string;
};

const PROVIDERS: Record<
  OAuthProvider,
  { authorizeUrl: string; tokenUrl: string; userinfoUrl: string; scope: string; clientId: string; clientSecret: string }
> = {
  discord: {
    authorizeUrl: "https://discord.com/oauth2/authorize",
    tokenUrl: "https://discord.com/api/oauth2/token",
    userinfoUrl: "https://discord.com/api/users/@me",
    scope: "identify email",
    clientId: process.env.DISCORD_CLIENT_ID ?? "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
  },
  google: {
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userinfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
    scope: "openid email profile",
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  },
};

export const OAUTH_BASE_URL = process.env.OAUTH_BASE_URL ?? "http://localhost:3000";

export function isOAuthProvider(value: string): value is OAuthProvider {
  return value === "discord" || value === "google";
}

export function generateOAuthState(): string {
  return randomBytes(32).toString("base64url");
}

export function generatePKCEVerifier(): string {
  return randomBytes(32).toString("base64url");
}

function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function buildAuthorizeUrl(
  provider: OAuthProvider,
  state: string,
  verifier: string,
): string | null {
  const p = PROVIDERS[provider];
  if (!p.clientId) return null;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: p.clientId,
    redirect_uri: `${OAUTH_BASE_URL}/api/auth/oauth/${provider}/callback`,
    scope: p.scope,
    state,
    code_challenge: pkceChallenge(verifier),
    code_challenge_method: "S256",
    prompt: "consent",
  });

  return `${p.authorizeUrl}?${params.toString()}`;
}

export async function exchangeCode(
  provider: OAuthProvider,
  code: string,
  verifier: string,
): Promise<string | null> {
  const p = PROVIDERS[provider];

  const res = await fetch(p.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: p.clientId,
      client_secret: p.clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: `${OAUTH_BASE_URL}/api/auth/oauth/${provider}/callback`,
      code_verifier: verifier,
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  return typeof data.access_token === "string" ? data.access_token : null;
}

export async function fetchOAuthProfile(
  provider: OAuthProvider,
  accessToken: string,
): Promise<OAuthProfile | null> {
  const p = PROVIDERS[provider];

  const res = await fetch(p.userinfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) return null;

  const data = await res.json();

  if (provider === "discord") {
    if (typeof data.id !== "string" || typeof data.email !== "string") {
      return null;
    }
    return {
      providerUserID: data.id,
      email: data.email.slice(0, 50),
      emailVerified: data.verified === true,
      name: String(data.global_name ?? data.username ?? ""),
    };
  }

  if (typeof data.sub !== "string" || typeof data.email !== "string") {
    return null;
  }
  return {
    providerUserID: data.sub,
    email: data.email.slice(0, 50),
    emailVerified: data.email_verified === true,
    name: String(data.name ?? ""),
  };
}