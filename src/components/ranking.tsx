import type { IconType } from "react-icons";
import { HiArrowRight } from "react-icons/hi2";
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
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

const PLAYERS: { rank: number; name: string; hero: string; icon: IconType; points: number }[] = [
  { rank: 1, name: "VanguardX", hero: "Kage Ninja", icon: GiNinjaHeroicStance, points: 24850 },
  { rank: 2, name: "ShadowKing77", hero: "Grim Reaper", icon: GiExecutionerHood, points: 24120 },
  { rank: 3, name: "RizkyBlade", hero: "Hercules", icon: GiSpartan, points: 23740 },
  { rank: 4, name: "MissTaekwon", hero: "Taekwon Master", icon: GiHighKick, points: 22980 },
  { rank: 5, name: "PixelPirate", hero: "Captain Hook", icon: GiPirateFlag, points: 22110 },
  { rank: 6, name: "GrimmjowLS", hero: "Fire Mage", icon: GiFlame, points: 21560 },
  { rank: 7, name: "AutoBot99", hero: "Gigasuit", icon: GiRobotAntennas, points: 20940 },
  { rank: 8, name: "SirLoinID", hero: "Iron Knight", icon: GiWingedShield, points: 19870 },
  { rank: 9, name: "Zombae.exe", hero: "Vampire", icon: GiDeathSkull, points: 19230 },
  { rank: 10, name: "QuickDrawDan", hero: "Cowboy", icon: GiRevolver, points: 18890 },
];

const RANK_STYLES = [
  "bg-gradient-to-br from-[#ffd76a] to-[#ff8a2a] text-abyss",
  "bg-gradient-to-br from-[#dfe6ff] to-[#9aa8ff] text-abyss",
  "bg-gradient-to-br from-[#ff9a6a] to-[#c96a3a] text-abyss",
];

export default function Ranking() {
  return (
    <section id="ranking" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Hall of Legends"
        title="Ladder Ranking"
        description="The current Top 10 duellists of the season. Think you can climb higher?"
      />

      <Reveal>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur">
          {/* table header */}
          <div className="hidden grid-cols-[64px_1fr_180px_120px] items-center gap-4 border-b border-white/10 bg-abyss-2/80 px-6 py-4 font-display text-xs font-bold uppercase tracking-widest text-dim md:grid">
            <span>Rank</span>
            <span>Player</span>
            <span>Main Hero</span>
            <span className="text-right">Points</span>
          </div>

          <ol>
            {PLAYERS.map((p) => (
              <li
                key={p.rank}
                className="grid grid-cols-[48px_1fr_48px] items-center gap-3 border-b border-white/5 px-4 py-4 transition-colors last:border-0 hover:bg-white/[0.04] sm:px-6 md:grid-cols-[64px_1fr_180px_120px] md:gap-4"
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-xl font-display text-sm font-bold ${
                    p.rank <= 3 ? RANK_STYLES[p.rank - 1] : "border border-white/10 bg-white/5 text-mist"
                  }`}
                >
                  {p.rank}
                </span>
                <span className="truncate font-display text-base font-bold text-white">
                  {p.name}
                </span>
                <span className="flex items-center gap-2 text-mist" title={p.hero}>
                  <p.icon className="text-lg" aria-hidden />
                  <span className="hidden truncate md:inline">{p.hero}</span>
                </span>
                <span className="hidden text-right font-display text-base font-bold text-gradient md:inline">
                  {p.points.toLocaleString("en-US")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal className="mt-10 text-center" delay={100}>
        <a
          href="#ranking"
          className="btn-gradient inline-flex items-center gap-2 rounded-2xl px-7 py-3 text-sm font-bold text-white"
        >
          View Full Ranking
          <HiArrowRight className="text-base" aria-hidden />
        </a>
      </Reveal>
    </section>
  );
}
