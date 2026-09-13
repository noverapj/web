import { createHash, randomBytes } from "crypto";

export function generateRandomStringWithSalt(
  salt: string,
  length: number = 15,
) {
  const randomData = randomBytes(32).toString("hex");

  const saltData = randomData + salt;

  const hash = createHash("sha256").update(saltData).digest("base64");

  const alphanumbericHash = hash.replace(/[^a-zA-Z0-9]/g, "");

  return alphanumbericHash.substring(0, length);
}
