export type BattleTypeRecord = {
  type: number;
  name: string;
  win: number;
  lose: number;
  kill: number;
  death: number;
};

export const RECORD_TYPE_NAMES: Record<number, string> = {
  1: "Battle",
  2: "Ladder",
  3: "Hero Match",
  4: "Hero Match Season",
};

export type BattleHistoryRow = {
  idx: number;
  modeType: number;
  win: number;
  lose: number;
  kill: number;
  death: number;
  playTime: number;
  date: Date;
  result: "win" | "loss" | "draw";
};

export const MODE_TYPE_NAMES: Record<number, string> = {
  1: "Symbol",
  2: "Catch",
  3: "King",
  4: "Training",
  5: "Survival",
  6: "Team Survival",
  7: "Boss",
  8: "Monster Survival",
  9: "Football",
  10: "Hero Match",
  11: "Gangsi",
  12: "Dungeon A",
  13: "Headquarters",
  14: "Catch Running Man",
  15: "Fight Club",
  16: "Tower Defense",
  17: "Dark Xmas",
  18: "Fire Temple",
  19: "Double Crown",
  20: "Shuffle Bonus",
  21: "Factory",
  22: "Team Survival AI",
  23: "House",
  24: "My Room",
  25: "Underwear",
  26: "CBT",
  27: "Raid",
  28: "Succession",
  29: "Practice",
  30: "Flag",
  31: "Arena",
  32: "Battle",
  33: "Farming",
};

export type DashboardData = {
  nickName: string;
  userID: string;
  regDate: Date;
  level: number;
  exp: number;
  peso: number;
  cash: number;
  bonus: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  winrate: number;
  matches: number;
  types: BattleTypeRecord[];
};