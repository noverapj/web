import { randomBytes } from "crypto";
import { LosaGameDB } from "@/db";
import { generateRandomStringWithSalt } from "@/utils/generator";

export type RegisterInput = {
  email: string;
  username: string;
  nickName: string;
  password: string;
};

export type RegisterResult =
  | { ok: true; accountIDX: number }
  | { ok: false; error: string };

export async function registerAccount(
  input: RegisterInput,
): Promise<RegisterResult> {
  const { email, username, nickName, password } = input;

  const [existUser, existEmail, existNickname] = await Promise.all([
    LosaGameDB.selectFrom("userMemberDB")
      .where("userID", "=", username)
      .select("userID")
      .executeTakeFirst(),
    LosaGameDB.selectFrom("userMemberDB")
      .where("email", "=", email)
      .select("email")
      .executeTakeFirst(),
    LosaGameDB.selectFrom("userMemberDB")
      .where("nickName", "=", nickName)
      .select("nickName")
      .executeTakeFirst(),
  ]);

  if (existUser || existNickname || existEmail) {
    return { ok: false, error: "Username or Email or Nickname already registered." };
  }

  const generatedKey = generateRandomStringWithSalt(username + nickName);

  try {
    let accountIDX = 0;

    await LosaGameDB.transaction().execute(async (trx) => {
      const newUser = await trx
        .insertInto("userMemberDB")
        .values({
          email,
          userID: username,
          nickName,
          userPWD: password,
          joinType: 100,
          userType: 10,
          mailling: 0,
        })
        .outputAll("inserted")
        .executeTakeFirst();

      accountIDX = newUser?.accountIDX ?? 0;

      await trx
        .insertInto("userInfoDB")
        .values({
          accountIDX,
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
          accountIDX,
        })
        .execute();

      await trx
        .insertInto("userCashDB")
        .values({
          accountIDX,
          amtBonus: 0,
          amtCash: 10_000_000,
          amtLimit: 99999999,
          amtSum: 10_000_000,
        })
        .execute();

      await trx
        .insertInto("userGameDB")
        .values({
          accountIDX,
          gameMoney: 10_000_000,
        })
        .execute();

      await trx
        .insertInto("userLoginDB")
        .values({
          accountIDX,
          encodeKey: generateRandomStringWithSalt(generatedKey),
        })
        .execute();
    });

    return { ok: true, accountIDX };
  } catch (error) {
    console.error(error);
    return { ok: false, error: "Failed to Register" };
  }
}

const ALNUM = "abcdefghijklmnopqrstuvwxyz0123456789";

function randomString(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALNUM[Math.floor(Math.random() * ALNUM.length)];
  }
  return out;
}

async function isUsernameTaken(username: string): Promise<boolean> {
  return (
    (await LosaGameDB.selectFrom("userMemberDB")
      .where("userID", "=", username)
      .select("userID")
      .executeTakeFirst()) !== undefined
  );
}

async function isNicknameTaken(nickName: string): Promise<boolean> {
  return (
    (await LosaGameDB.selectFrom("userMemberDB")
      .where("nickName", "=", nickName)
      .select("nickName")
      .executeTakeFirst()) !== undefined
  );
}

export async function generateUniqueUsername(): Promise<string> {
  for (;;) {
    const candidate = `user${randomString(5)}`;
    if (!(await isUsernameTaken(candidate))) return candidate;
  }
}

export async function generateUniqueNickname(
  displayName: string,
): Promise<string> {
  const cleaned = displayName.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (cleaned.length < 4) return generateRandomNickname();

  const base = cleaned.slice(0, 20);
  if (!(await isNicknameTaken(base))) return base;

  for (let i = 0; i < 20; i++) {
    const candidate = `${base.slice(0, 18)}${Math.floor(
      Math.random() * 100,
    )
      .toString()
      .padStart(2, "0")}`;
    if (!(await isNicknameTaken(candidate))) return candidate;
  }

  return generateRandomNickname();
}

async function generateRandomNickname(): Promise<string> {
  for (;;) {
    const candidate = `player${randomString(4)}`;
    if (!(await isNicknameTaken(candidate))) return candidate;
  }
}

export function generateRandomPassword(): string {
  return randomBytes(16).toString("base64url");
}