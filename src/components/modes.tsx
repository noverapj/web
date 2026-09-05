import type { IconType } from "react-icons";
import {
  GiCrossedSwords,
  GiCrown,
  GiHandcuffs,
  GiShield,
  GiSoccerBall,
  GiSpikedDragonHead,
  GiTrophy,
  GiWaveCrest,
} from "react-icons/gi";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

const MODES: {
  name: string;
  icon: IconType;
  desc: string;
  span: string;
  from: string;
  border: string;
}[] = [
  {
    name: "Boss Raid",
    icon: GiSpikedDragonHead,
    desc: "Team up with 4–8 players and take down a colossal raid boss with devastating mechanics.",
    span: "md:col-span-2 md:row-span-2",
    from: "rgb(255 91 42 / 0.22)",
    border: "border-tangerine/30",
  },
  {
    name: "Ladder PvP 1v1",
    icon: GiCrossedSwords,
    desc: "Ranked solo duels. Climb the ladder, earn points, and prove who the true mercenary is.",
    span: "",
    from: "rgb(59 107 255 / 0.2)",
    border: "border-electric/30",
  },
  {
    name: "Guild War",
    icon: GiShield,
    desc: "Guild vs guild all-out war for territory and eternal bragging rights.",
    span: "",
    from: "rgb(226 59 255 / 0.2)",
    border: "border-magenta/30",
  },
  {
    name: "Survival",
    icon: GiWaveCrest,
    desc: "Endless waves of enemies. How long can your squad survive?",
    span: "",
    from: "rgb(59 251 176 / 0.16)",
    border: "border-mint/30",
  },
  {
    name: "Football Mode",
    icon: GiSoccerBall,
    desc: "The classic chaos mode — smash, tackle, and score goals with your skills.",
    span: "",
    from: "rgb(42 181 255 / 0.18)",
    border: "border-electric/30",
  },
  {
    name: "Hidden King",
    icon: GiCrown,
    desc: "One secret king per team. Protect yours, slay theirs. Trust no one.",
    span: "md:col-span-2",
    from: "rgb(255 200 60 / 0.16)",
    border: "border-tangerine/30",
  },
  {
    name: "Prisoner",
    icon: GiHandcuffs,
    desc: "Capture and escort enemy players to your prison before time runs out.",
    span: "",
    from: "rgb(122 59 255 / 0.2)",
    border: "border-magenta/30",
  },
  {
    name: "Crown Battle",
    icon: GiTrophy,
    desc: "Hold the crown as long as possible while the entire lobby hunts you down.",
    span: "",
    from: "rgb(255 138 42 / 0.2)",
    border: "border-tangerine/30",
  },
];

export default function Modes() {
  return (
    <section id="modes" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Never Fight Alone"
        title="Game Modes"
        description="From sweaty ranked ladders to absurd football brawls — there is always a room waiting for you."
      />

      <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {MODES.map((mode, i) => (
          <Reveal key={mode.name} delay={(i % 4) * 70} className={mode.span}>
            <div
              className={`card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-panel/60 p-6 backdrop-blur ${mode.border}`}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse 90% 70% at 20% 0%, ${mode.from}, transparent 70%)` }}
                aria-hidden
              />
              <mode.icon
                className="relative text-4xl text-white/90 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                aria-hidden
              />
              <h3 className="relative mt-4 font-display text-lg font-bold text-white">
                {mode.name}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-mist">
                {mode.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
