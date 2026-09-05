export const PLAYER = {
  name: "VanguardX",
  title: "Season 12 Duelist",
  level: 87,
  xp: 18450,
  xpNext: 22000,
  tier: "Diamond III",
  lp: 1640,
  lpNext: 1800,
  winsToPromotion: 2,
  winrate: 63.4,
  matches: 1284,
  streak: 7,
  bestRank: "Legend IV",
  gold: 45200,
  gems: 1280,
  memberSince: "Season 4",
  seasonEndsIn: "23d 6h",
};

export const TIER_STYLES: Record<string, { from: string; to: string }> = {
  Bronze: { from: "#c9915e", to: "#8a5a32" },
  Silver: { from: "#dfe6ff", to: "#9aa8ff" },
  Gold: { from: "#ffd76a", to: "#ff8a2a" },
  Platinum: { from: "#7dd8ff", to: "#2ab5ff" },
  Diamond: { from: "#b06aff", to: "#7a3bff" },
  Legend: { from: "#ff2a8a", to: "#a02bff" },
};

export const DAILY_CONTRACTS: {
  name: string;
  progress: number;
  goal: number;
  reward: string;
  claimed: boolean;
}[] = [
  { name: "Win 3 ranked matches", progress: 2, goal: 3, reward: "500 Gold", claimed: false },
  { name: "Deal 50,000 total damage", progress: 50000, goal: 50000, reward: "100 Gems", claimed: true },
  { name: "Play 5 matches with a Rare+ hero", progress: 3, goal: 5, reward: "1 Gashapon Key", claimed: false },
  { name: "Open 1 Gashapon", progress: 0, goal: 1, reward: "300 Gold", claimed: false },
];
