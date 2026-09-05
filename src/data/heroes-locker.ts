export type LockerHero = {
  hero: string;
  level: number;
  mastery: number; // 0-5 stars
  equipped?: boolean;
};

export const LOCKER: LockerHero[] = [
  { hero: "Kage Ninja", level: 42, mastery: 5, equipped: true },
  { hero: "Grim Reaper", level: 38, mastery: 4 },
  { hero: "Hercules", level: 27, mastery: 3 },
  { hero: "Vampire", level: 24, mastery: 3 },
  { hero: "Gigasuit", level: 19, mastery: 2 },
  { hero: "Taekwon Master", level: 31, mastery: 4 },
  { hero: "Cowboy", level: 22, mastery: 2 },
  { hero: "Iron Knight", level: 35, mastery: 4 },
  { hero: "Captain Hook", level: 18, mastery: 1 },
  { hero: "Fire Mage", level: 26, mastery: 3 },
];

export const LOCKED_SLOTS = 6;

export const LOCKER_TOTAL = 100;
