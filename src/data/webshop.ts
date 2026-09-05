import type { Rarity } from "./heroes";

export type ShopItem = {
  id: string;
  name: string;
  desc: string;
  price: string;
  currency: "gold" | "gems" | "usd";
  tag?: string;
  rarity: Rarity;
  icon: string; // hero art path or emoji-free fallback handled in page
};

export const FEATURED_BUNDLES: ShopItem[] = [
  {
    id: "starter",
    name: "Rookie Starter Pack",
    desc: "5,000 Gold · 3 Gashapon Keys · 7-day XP Boost",
    price: "490",
    currency: "gems",
    tag: "Best Value",
    rarity: "rare",
    icon: "/heroes/iron-knight.png",
  },
  {
    id: "hercules-bundle",
    name: "Hercules Arrival Bundle",
    desc: "Hercules unlock · Ascended skin · 10 Gashapon Keys",
    price: "1,900",
    currency: "gems",
    tag: "Limited",
    rarity: "unique",
    icon: "/heroes/hercules.png",
  },
  {
    id: "guild-pack",
    name: "Guild War Supply Pack",
    desc: "10 Repair Kits · Guild banner · 3-day GP Boost",
    price: "12,000",
    currency: "gold",
    rarity: "premium",
    icon: "/heroes/captain-hook.png",
  },
];

export type CurrencyPack = {
  id: string;
  amount: string;
  bonus?: string;
  price: string;
};

export const GOLD_PACKS: CurrencyPack[] = [
  { id: "g1", amount: "5,000", price: "$1.99" },
  { id: "g2", amount: "12,000", bonus: "+10%", price: "$3.99" },
  { id: "g3", amount: "30,000", bonus: "+20%", price: "$8.99" },
  { id: "g4", amount: "70,000", bonus: "+30%", price: "$17.99" },
];

export const GEM_PACKS: CurrencyPack[] = [
  { id: "p1", amount: "100", price: "$0.99" },
  { id: "p2", amount: "300", bonus: "+10%", price: "$2.49" },
  { id: "p3", amount: "800", bonus: "+20%", price: "$5.99" },
  { id: "p4", amount: "2,000", bonus: "+30%", price: "$13.99" },
];
