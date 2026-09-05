import type { Metadata } from "next";
import SettingsForm from "@/components/dashboard/settings-form";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Settings</h1>
      </header>
      <SettingsForm />
    </div>
  );
}
