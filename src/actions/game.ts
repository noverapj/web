"use server";

import { redirect } from "next/navigation";
import { getSessionUserID } from "@/server/dashboard";

const LAUNCH_URL = "losa://play";

export async function launchGameAction() {
  const userID = await getSessionUserID();
  if (!userID) redirect("/login");

  redirect(LAUNCH_URL);
}