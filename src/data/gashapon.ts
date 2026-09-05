import type { Rarity } from "./heroes";

export type Pull = {
  id: number;
  date: string;
  type: "hero" | "costume" | "gear";
  name: string;
  rarity: Rarity;
  isNew: boolean;
};

export const FEATURED_BANNER = {
  hero: "Hercules",
  title: "Hercules Rate-Up",
  detail: "Unique-tier drop rate +50% for a limited time",
  endsIn: "3d 12h",
};

export const PITY = {
  current: 23,
  guaranteed: 30,
};

export const PULLS: Pull[] = [
  { id: 12, date: "Sep 05", type: "hero", name: "Vampire", rarity: "rare", isNew: true },
  { id: 11, date: "Sep 05", type: "gear", name: "Sanguine Cape", rarity: "premium", isNew: true },
  { id: 10, date: "Sep 05", type: "costume", name: "Iron Knight - Crimson Blade", rarity: "rare", isNew: true },
  { id: 9, date: "Sep 04", type: "gear", name: "Grim Scythe Handle", rarity: "normal", isNew: false },
  { id: 8, date: "Sep 04", type: "costume", name: "Taekwon - Black Belt", rarity: "normal", isNew: false },
  { id: 7, date: "Sep 03", type: "hero", name: "Gigasuit", rarity: "unique", isNew: true },
  { id: 6, date: "Sep 02", type: "gear", name: "Pirate Bomb Pouch", rarity: "normal", isNew: false },
  { id: 5, date: "Sep 02", type: "costume", name: "Cowboy - Midnight Duster", rarity: "rare", isNew: false },
  { id: 4, date: "Aug 31", type: "gear", name: "Fire Staff Ember Core", rarity: "premium", isNew: false },
  { id: 3, date: "Aug 31", type: "costume", name: "Kage Ninja - Shadow Weave", rarity: "rare", isNew: false },
  { id: 2, date: "Aug 30", type: "gear", name: "Knight Plate Polish", rarity: "normal", isNew: false },
  { id: 1, date: "Aug 29", type: "hero", name: "Captain Hook", rarity: "normal", isNew: false },
];
