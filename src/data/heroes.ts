import type { IconType } from "react-icons";
import {
  GiDeathSkull,
  GiExecutionerHood,
  GiFlame,
  GiHighKick,
  GiNinjaHeroicStance,
  GiPirateFlag,
  GiRevolver,
  GiRobotAntennas,
  GiSpartan,
  GiWingedShield,
} from "react-icons/gi";

export type Rarity = "normal" | "rare" | "premium" | "unique" | "idol";
export type MercenaryType = "melee" | "range" | "magic" | "special";

export type HeroRef = {
  name: string;
  code: string;
  type: MercenaryType;
  rarity: Rarity;
  art: string;
  icon: IconType;
};

export const HEROES: HeroRef[] = [
  { name: "Iron Knight", code: "001", type: "melee", rarity: "normal", art: "/heroes/iron-knight.png", icon: GiWingedShield },
  { name: "Captain Hook", code: "002", type: "melee", rarity: "normal", art: "/heroes/captain-hook.png", icon: GiPirateFlag },
  { name: "Cowboy", code: "003", type: "range", rarity: "normal", art: "/heroes/cowboy.png", icon: GiRevolver },
  { name: "Fire Mage", code: "004", type: "magic", rarity: "normal", art: "/heroes/fire-mage.png", icon: GiFlame },
  { name: "Gigasuit", code: "239", type: "special", rarity: "unique", art: "/heroes/gigasuit.png", icon: GiRobotAntennas },
  { name: "Kage Ninja", code: "017", type: "melee", rarity: "normal", art: "/heroes/kage-ninja.png", icon: GiNinjaHeroicStance },
  { name: "Taekwon Master", code: "019", type: "melee", rarity: "normal", art: "/heroes/taekwon-master.png", icon: GiHighKick },
  { name: "Grim Reaper", code: "023", type: "melee", rarity: "normal", art: "/heroes/grim-reaper.png", icon: GiExecutionerHood },
  { name: "Vampire", code: "102", type: "melee", rarity: "rare", art: "/heroes/vampire.png", icon: GiDeathSkull },
  { name: "Hercules", code: "228", type: "melee", rarity: "unique", art: "/heroes/hercules.png", icon: GiSpartan },
];

export function heroByName(name: string): HeroRef {
  return HEROES.find((h) => h.name === name) ?? HEROES[0];
}

export const RARITY_STYLES: Record<
  Rarity,
  { from: string; to: string; glow: string; text: string }
> = {
  normal: { from: "#3b6bff", to: "#6f9bff", glow: "rgb(59 107 255 / 0.45)", text: "#8fa8ff" },
  rare: { from: "#7a3bff", to: "#b06aff", glow: "rgb(122 59 255 / 0.5)", text: "#b06aff" },
  premium: { from: "#e23bff", to: "#ff6ad5", glow: "rgb(226 59 255 / 0.5)", text: "#ff6ad5" },
  unique: { from: "#ff8a2a", to: "#ffc46a", glow: "rgb(255 138 42 / 0.55)", text: "#ffb46a" },
  idol: { from: "#ff5b9a", to: "#ff9ac6", glow: "rgb(255 91 154 / 0.5)", text: "#ff9ac6" },
};
