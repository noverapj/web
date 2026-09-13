"use server";

import { redirect } from "next/navigation";
import { getSessionUserID } from "@/server/dashboard";
import { headers } from "next/headers";
import { LosaGameDB } from "@/db";
import { Encode15 } from "@/utils/ioencrypt/ioEcnrypt";
import { NationType } from "@/utils/ioencrypt/seed_constant";

export type LaunchState = { error?: string };

export async function launchGameAction(
  _prevState: LaunchState,
  _formData: FormData,
): Promise<LaunchState> {
  const userID = await getSessionUserID();

  if (!userID) redirect("/login");

  //SERVER STATE GETTER
  const serverKey = await LosaGameDB.selectFrom("define_encode_key")
    .orderBy("regDate", "desc")
    .selectAll()
    .executeTakeFirst();

  if (!serverKey) {
    return {
      error: "Failed to get server info. Please contact admin!",
    };
  }

  const serverList = await LosaGameDB.selectFrom("define_game_server")
    .orderBy("regDate", "desc")
    .selectAll()
    .execute();

  if (serverList.length <= 0) {
    return {
      error: "Failed to get server info. Please contact admin!",
    };
  }
  // END SERVER STATE

  const header = await headers();

  //should be ipv4, we can't accept ipv6
  const ip =
    header.get("CF-Connecting-IP") ||
    header.get("X-Real-IP") ||
    header.get("X-Forwarded-For") ||
    "127.0.0.1";

  const existAccount = await LosaGameDB.selectFrom("userMemberDB")
    .where("userID", "=", userID)
    .selectAll()
    .executeTakeFirst();

  if (!existAccount) {
    return {
      error: "Account not found!",
    };
  }

  if (existAccount.limitType == 100) {
    return {
      error: "Account has been blocked!",
    };
  }

  const loginInfo = await LosaGameDB.selectFrom("userLoginDB")
    .where("accountIDX", "=", existAccount.accountIDX)
    .selectAll()
    .executeTakeFirst();

  if (!loginInfo) {
    return {
      error: "Invalid login data. Please contact support",
    };
  }

  if (loginInfo && loginInfo.gameServerID > 0) {
    return {
      error: "Your account currently logged in.",
    };
  }

  const updateLogin = await LosaGameDB.updateTable("userLoginDB")
    .set({
      userIP: ip,
      connDate: new Date(),
    })
    .outputAll("inserted")
    .where("userLoginDB.accountIDX", "=", existAccount.accountIDX)
    .executeTakeFirst();

  if (!updateLogin) {
    console.error("Failed to update login info!", existAccount.userID);
    return {
      error: "Failed to update login info!",
    };
  }

  const randSvrID = serverList[Math.floor(Math.random() * serverList.length)];

  const encryptedUserKey = Encode15(
    loginInfo.encodeKey,
    loginInfo.encodeKey,
    NationType.NT_KOREA,
  );

  // encryptedUserID: User's userID encrypted with server encodeKey and NationType.NT_KOREA
  const encryptedUserID = Encode15(
    existAccount.userID,
    serverKey.encodeKey,
    NationType.NT_KOREA,
  );

  // encryptedUserIP: User's public IP encrypted with server encodeKey and NationType.NT_KOREA
  const encryptedUserIP = Encode15(
    updateLogin.userIP!,
    serverKey.encodeKey,
    NationType.NT_KOREA,
  );

  const result =
    `${encryptedUserKey}${encryptedUserID},${encryptedUserKey}${encryptedUserIP},` +
    `${randSvrID.serverID.toString()},0,0`;

  redirect(`novera://${result}`);
}
