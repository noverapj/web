import { randomBytes } from "crypto";
import { SignJWT, jwtVerify } from "jose";

const SESSION_SECRET = process.env.SESSION_SECRET ?? randomBytes(32).toString("hex");
const secret = new TextEncoder().encode(SESSION_SECRET);
const ALGORITHM = "HS256";

export type SessionPayload = { uid: string };

export async function createSessionToken(
  userID: string,
  remember: boolean,
): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + (remember ? 30 : 7) * 24 * 60 * 60;

  return await new SignJWT({ uid: userID })
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [ALGORITHM],
    });

    if (typeof payload.uid !== "string") return null;

    return { uid: payload.uid };
  } catch {
    return null;
  }
}