"use client";

import { useState } from "react";
import Image from "next/image";
import { HiArrowRightOnRectangle, HiExclamationTriangle } from "react-icons/hi2";
import { heroByName } from "@/data/heroes";
import { PLAYER } from "@/data/player";

type ToggleKey = "notifications" | "guildInvites" | "friendRequests" | "spectators";

const TOGGLES: { key: ToggleKey; label: string; desc: string }[] = [
  { key: "notifications", label: "Push Notifications", desc: "Match invites, guild war reminders, and event news" },
  { key: "guildInvites", label: "Guild Invites", desc: "Allow other guilds to send you invitations" },
  { key: "friendRequests", label: "Friend Requests", desc: "Let players add you from the post-match screen" },
  { key: "spectators", label: "Allow Spectators", desc: "Let others watch your ranked matches live" },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors ${
        checked ? "border-magenta/50 bg-magenta/25" : "border-white/15 bg-abyss-2"
      }`}
    >
      <span
        className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all ${
          checked
            ? "left-6 bg-gradient-to-r from-electric to-magenta shadow-[0_0_10px_rgb(226_59_255/0.6)]"
            : "left-1 bg-white/40"
        }`}
      />
    </button>
  );
}

export default function SettingsForm() {
  const hero = heroByName("Kage Ninja");
  const [toggles, setToggles] = useState<Record<ToggleKey, boolean>>({
    notifications: true,
    guildInvites: true,
    friendRequests: false,
    spectators: true,
  });
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      {/* profile */}
      <section className="rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur sm:p-8">
        <h2 className="font-display text-lg font-bold text-white">Profile</h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative mx-auto h-36 w-28 shrink-0 sm:mx-0">
            <Image
              src={hero.art}
              alt={`${hero.name} avatar`}
              fill
              sizes="112px"
              className="object-contain object-bottom drop-shadow-[0_10px_24px_rgba(122_59_255/0.4)]"
            />
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
                Username
              </span>
              <input
                defaultValue={PLAYER.name}
                className="w-full rounded-xl border border-white/10 bg-abyss-2/70 px-4 py-2.5 text-sm font-semibold text-white outline-none focus:border-electric/60"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
                Title
              </span>
              <select
                defaultValue={PLAYER.title}
                className="w-full rounded-xl border border-white/10 bg-abyss-2/70 px-4 py-2.5 text-sm font-semibold text-white outline-none focus:border-electric/60"
              >
                <option>{PLAYER.title}</option>
                <option>Rising Blade</option>
                <option>Arena Menace</option>
                <option>Guild Warrior</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-dim">
                Language
              </span>
              <select
                defaultValue="en"
                className="w-full rounded-xl border border-white/10 bg-abyss-2/70 px-4 py-2.5 text-sm font-semibold text-white outline-none focus:border-electric/60"
              >
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="kr">한국어</option>
              </select>
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 1600);
                }}
                className="btn-gradient w-full rounded-xl px-6 py-2.5 text-sm font-bold text-white"
              >
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* privacy / gameplay */}
      <section className="rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur sm:p-8">
        <h2 className="font-display text-lg font-bold text-white">Privacy & Gameplay</h2>
        <ul className="mt-5 space-y-5">
          {TOGGLES.map((t) => (
            <li key={t.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">{t.label}</p>
                <p className="mt-0.5 text-xs text-dim">{t.desc}</p>
              </div>
              <Toggle
                label={t.label}
                checked={toggles[t.key]}
                onChange={() => setToggles((prev) => ({ ...prev, [t.key]: !prev[t.key] }))}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* account */}
      <section className="rounded-2xl border border-red-500/20 bg-panel/60 p-6 backdrop-blur sm:p-8">
        <h2 className="font-display text-lg font-bold text-white">Account</h2>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/15 px-5 py-2.5 text-sm font-bold text-mist transition-all hover:border-white/30 hover:text-white"
            >
              <HiArrowRightOnRectangle className="text-base" aria-hidden />
              Sign Out
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-red-500/40 bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-400 transition-all hover:border-red-500/70 hover:bg-red-500/20"
            >
              <HiExclamationTriangle className="text-base" aria-hidden />
              Delete Account
            </button>
          </div>
          <p className="text-xs text-dim">
            Deleting your account is permanent. Heroes, costumes, and progress cannot be
            recovered.
          </p>
        </div>
      </section>
    </div>
  );
}
