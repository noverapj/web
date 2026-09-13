export type GuildInfo = {
  name: string;
  level: number;
  memberCount: number;
  memberCap: number;
  description: string;
  point: number;
  todayPoint: number;
  todayVc: number;
  totalVc: number;
  ranking: number;
};

export type GuildMember = {
  nickName: string;
  role: string;
};

export type GuildWarRecord = {
  win: number;
  lose: number;
  kill: number;
  death: number;
};

export type GuildData = {
  guild: GuildInfo | null;
  roster: GuildMember[];
  warRecord: GuildWarRecord | null;
};