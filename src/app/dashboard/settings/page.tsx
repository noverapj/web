import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/dashboard/settings-form";
import { getSessionUserID } from "@/server/dashboard";
import { getSettingsData } from "@/server/settings";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const userID = await getSessionUserID();
  if (!userID) redirect("/login");

  const data = await getSettingsData(userID);
  if (!data) redirect("/login");

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Settings</h1>
      </header>
      <SettingsForm data={data} />
    </div>
  );
}