import { createHmac, randomBytes, timingSafeEqual } from "crypto";

type SessionPayload = { uid: string; exp: number };

const SESSION_SECRET = process.env.SESSION_SECRET ?? randomBytes(32).toString("hex");

function sign(value: string): string {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

export function createSessionToken(userID: string, remember: boolean): string {
  const exp =
    Math.floor(Date.now() / 1000) + (remember ? 30 : 7) * 24 * 60 * 60;
  const payload = Buffer.from(
    JSON.stringify({ uid: userID, exp } satisfies SessionPayload),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(sig);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null;
  }

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (typeof data.uid !== "string" || typeof data.exp !== "number") {
      return null;
    }

    if (data.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}