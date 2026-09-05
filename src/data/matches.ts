export type Match = {
  id: number;
  mode: string;
  hero: string;
  result: "win" | "loss";
  kills: number;
  deaths: number;
  assists: number;
  duration: string;
  date: string;
  time: string;
  opponent: string;
  lpDelta: number | null;
  mvp: boolean;
};

export const MODES = [
  "Ladder PvP 1v1",
  "Guild War",
  "Boss Raid",
  "Crown Battle",
  "Football Mode",
  "Survival",
  "Hidden King",
  "Prisoner",
] as const;

export const MATCHES: Match[] = [
  { id: 1, mode: "Ladder PvP 1v1", hero: "Kage Ninja", result: "win", kills: 7, deaths: 2, assists: 0, duration: "12:41", date: "Sep 05", time: "21:40", opponent: "ShadowKing77", lpDelta: 45, mvp: true },
  { id: 2, mode: "Guild War", hero: "Grim Reaper", result: "win", kills: 14, deaths: 6, assists: 9, duration: "18:22", date: "Sep 05", time: "20:05", opponent: "Crimson Legion", lpDelta: 30, mvp: true },
  { id: 3, mode: "Ladder PvP 1v1", hero: "Kage Ninja", result: "win", kills: 5, deaths: 3, assists: 0, duration: "09:58", date: "Sep 05", time: "18:31", opponent: "MissTaekwon", lpDelta: 41, mvp: false },
  { id: 4, mode: "Football Mode", hero: "Taekwon Master", result: "loss", kills: 2, deaths: 4, assists: 6, duration: "15:03", date: "Sep 04", time: "22:17", opponent: "Ballers FC", lpDelta: null, mvp: false },
  { id: 5, mode: "Ladder PvP 1v1", hero: "Grim Reaper", result: "win", kills: 8, deaths: 1, assists: 0, duration: "11:24", date: "Sep 04", time: "21:02", opponent: "QuickDrawDan", lpDelta: 47, mvp: true },
  { id: 6, mode: "Boss Raid", hero: "Iron Knight", result: "win", kills: 21, deaths: 8, assists: 12, duration: "24:36", date: "Sep 04", time: "19:44", opponent: "Infernal Dragon", lpDelta: null, mvp: false },
  { id: 7, mode: "Crown Battle", hero: "Hercules", result: "loss", kills: 9, deaths: 9, assists: 4, duration: "16:45", date: "Sep 03", time: "23:11", opponent: "Royal Blood", lpDelta: null, mvp: false },
  { id: 8, mode: "Ladder PvP 1v1", hero: "Kage Ninja", result: "win", kills: 6, deaths: 4, assists: 0, duration: "13:09", date: "Sep 03", time: "20:48", opponent: "GrimmjowLS", lpDelta: 43, mvp: false },
  { id: 9, mode: "Hidden King", hero: "Vampire", result: "win", kills: 11, deaths: 5, assists: 7, duration: "14:52", date: "Sep 03", time: "19:20", opponent: "Night Owls", lpDelta: null, mvp: true },
  { id: 10, mode: "Ladder PvP 1v1", hero: "Grim Reaper", result: "loss", kills: 3, deaths: 5, assists: 0, duration: "10:12", date: "Sep 02", time: "22:35", opponent: "RizkyBlade", lpDelta: -28, mvp: false },
  { id: 11, mode: "Prisoner", hero: "Captain Hook", result: "win", kills: 12, deaths: 7, assists: 10, duration: "17:31", date: "Sep 02", time: "21:14", opponent: "Jailbreak Crew", lpDelta: null, mvp: false },
  { id: 12, mode: "Ladder PvP 1v1", hero: "Kage Ninja", result: "win", kills: 9, deaths: 3, assists: 0, duration: "12:02", date: "Sep 02", time: "18:57", opponent: "AutoBot99", lpDelta: 44, mvp: true },
  { id: 13, mode: "Survival", hero: "Gigasuit", result: "loss", kills: 32, deaths: 18, assists: 21, duration: "21:44", date: "Sep 01", time: "23:03", opponent: "Wave 27", lpDelta: null, mvp: false },
  { id: 14, mode: "Guild War", hero: "Hercules", result: "win", kills: 16, deaths: 5, assists: 11, duration: "19:18", date: "Sep 01", time: "20:00", opponent: "Iron Wolves", lpDelta: 31, mvp: true },
  { id: 15, mode: "Ladder PvP 1v1", hero: "Cowboy", result: "win", kills: 4, deaths: 2, assists: 0, duration: "08:47", date: "Sep 01", time: "17:26", opponent: "SirLoinID", lpDelta: 39, mvp: false },
  { id: 16, mode: "Boss Raid", hero: "Fire Mage", result: "loss", kills: 15, deaths: 12, assists: 8, duration: "22:10", date: "Aug 31", time: "21:30", opponent: "Frozen Colossus", lpDelta: null, mvp: false },
  { id: 17, mode: "Ladder PvP 1v1", hero: "Kage Ninja", result: "win", kills: 7, deaths: 1, assists: 0, duration: "11:38", date: "Aug 31", time: "19:05", opponent: "Zombae.exe", lpDelta: 46, mvp: true },
  { id: 18, mode: "Crown Battle", hero: "Vampire", result: "win", kills: 13, deaths: 6, assists: 5, duration: "15:27", date: "Aug 31", time: "17:41", opponent: "Golden Squad", lpDelta: null, mvp: false },
];
