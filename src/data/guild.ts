export type GuildRole = "Guild Master" | "Officer" | "Member";

export type GuildMember = {
  name: string;
  role: GuildRole;
  hero: string;
  contribution: number;
  online: boolean;
};

export const GUILD = {
  name: "Novera Vanguard",
  tag: "NVX",
  level: 24,
  gp: 48200,
  gpNext: 50000,
  memberCount: 28,
  memberCap: 30,
  description:
    "Top 8 guild of Season 12. We run Guild War nights every weekend and help new duelists climb. English & Bahasa Indonesia welcome.",
};

export const ROSTER: GuildMember[] = [
  { name: "VanguardX", role: "Guild Master", hero: "Kage Ninja", contribution: 4820, online: true },
  { name: "ShadowKing77", role: "Officer", hero: "Grim Reaper", contribution: 4310, online: true },
  { name: "RizkyBlade", role: "Officer", hero: "Hercules", contribution: 3980, online: false },
  { name: "MissTaekwon", role: "Member", hero: "Taekwon Master", contribution: 3510, online: true },
  { name: "PixelPirate", role: "Member", hero: "Captain Hook", contribution: 3260, online: false },
  { name: "GrimmjowLS", role: "Member", hero: "Fire Mage", contribution: 2890, online: true },
  { name: "AutoBot99", role: "Member", hero: "Gigasuit", contribution: 2440, online: false },
  { name: "SirLoinID", role: "Member", hero: "Iron Knight", contribution: 2110, online: true },
  { name: "Zombae.exe", role: "Member", hero: "Vampire", contribution: 1780, online: false },
  { name: "QuickDrawDan", role: "Member", hero: "Cowboy", contribution: 1420, online: true },
];

export const NEXT_GUILD_WAR = {
  opponent: "Crimson Legion",
  date: "Saturday, Sep 12",
  time: "20:00 WIB",
  inDays: 7,
};

export const RECENT_WARS: { date: string; opponent: string; result: "win" | "loss"; score: string }[] = [
  { date: "Sep 05", opponent: "Iron Wolves", result: "win", score: "3 - 1" },
  { date: "Aug 29", opponent: "Crimson Legion", result: "loss", score: "2 - 3" },
  { date: "Aug 22", opponent: "Night Owls", result: "win", score: "3 - 0" },
  { date: "Aug 15", opponent: "Golden Squad", result: "win", score: "3 - 2" },
];
