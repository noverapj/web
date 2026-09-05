import type { Rarity } from "./heroes";

export type PassReward = {
  name: string;
  rarity: Rarity;
} | null;

export type PassTier = {
  tier: number;
  free: PassReward;
  premium: PassReward;
  big?: boolean;
};

export const SEASON_PASS = {
  season: "Season 12 — Crimson Awakening",
  currentTier: 18,
  maxTier: 30,
  premiumOwned: false,
  premiumPrice: 980, // gems
  endsIn: "23d 6h",
  tierXp: 720,
  tierXpNext: 1000,
};

const r = (name: string, rarity: Rarity): PassReward => ({ name, rarity });

export const TIERS: PassTier[] = [
  { tier: 1, free: r("300 Gold", "normal"), premium: r("Gashapon Key x1", "rare") },
  { tier: 2, free: r("Crimson Emblem", "normal"), premium: r("Iron Knight - Crimson Skin", "rare") },
  { tier: 3, free: null, premium: r("Gems x50", "rare"), big: true },
  { tier: 4, free: r("500 Gold", "normal"), premium: r("Cape: Dusk Shroud", "normal") },
  { tier: 5, free: r("Gashapon Key x1", "normal"), premium: r("Gashapon Key x3", "rare") },
  { tier: 6, free: r("Emote: Salute", "normal"), premium: r("Kage Ninja - Ash Skin", "rare") },
  { tier: 7, free: null, premium: r("Hero: Vampire", "rare"), big: true },
  { tier: 8, free: r("300 Gold", "normal"), premium: r("Gems x50", "rare") },
  { tier: 9, free: r("Title: Rising Blade", "normal"), premium: r("Weapon Trail: Violet", "rare") },
  { tier: 10, free: r("Gashapon Key x1", "normal"), premium: r("Gashapon Key x5", "premium") },
  { tier: 11, free: r("400 Gold", "normal"), premium: r("Taunt: Shadow Laugh", "rare") },
  { tier: 12, free: null, premium: r("Hero: Gigasuit", "unique"), big: true },
  { tier: 13, free: r("Repair Kit x5", "normal"), premium: r("Gems x100", "premium") },
  { tier: 14, free: r("Gashapon Key x1", "normal"), premium: r("Grim Reaper - Wraith Skin", "premium") },
  { tier: 15, free: r("Badge Frame: Iron", "normal"), premium: r("Gashapon Key x5", "premium") },
  { tier: 16, free: r("500 Gold", "normal"), premium: r("Cape: Blood Moon", "rare") },
  { tier: 17, free: r("Emote: Flex", "normal"), premium: r("Gems x100", "premium") },
  { tier: 18, free: r("Gashapon Key x2", "rare"), premium: r("Gashapon Key x5", "premium") },
  { tier: 19, free: r("600 Gold", "normal"), premium: r("Cowboy - Gunslinger Skin", "premium") },
  { tier: 20, free: null, premium: r("Hero: Hercules", "unique"), big: true },
  { tier: 21, free: r("Gashapon Key x1", "normal"), premium: r("Gems x150", "premium") },
  { tier: 22, free: r("Title: Arena Menace", "rare"), premium: r("Weapon Trail: Inferno", "premium") },
  { tier: 23, free: r("700 Gold", "normal"), premium: r("Gashapon Key x8", "premium") },
  { tier: 24, free: r("Repair Kit x10", "normal"), premium: r("Taekwon - Master Skin", "premium") },
  { tier: 25, free: null, premium: r("Costume: Midnight Ronin", "unique"), big: true },
  { tier: 26, free: r("800 Gold", "normal"), premium: r("Gems x150", "premium") },
  { tier: 27, free: r("Gashapon Key x2", "rare"), premium: r("Emote: Legend Pose", "premium") },
  { tier: 28, free: r("Badge Frame: Crimson", "rare"), premium: r("Gashapon Key x10", "premium") },
  { tier: 29, free: r("1000 Gold", "rare"), premium: r("Gems x200", "premium") },
  { tier: 30, free: null, premium: r("Hero: Hercules - Ascended Skin", "unique"), big: true },
];
