import type { IconType } from "react-icons";
import { FaUsers } from "react-icons/fa";
import { GiDiceTarget, GiPodium, GiTheaterCurtains } from "react-icons/gi";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

const FEATURES: {
  title: string;
  icon: IconType;
  desc: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    title: "Gashapon & Costumes",
    icon: GiDiceTarget,
    desc: "The beloved gacha system is back. Roll for mercenaries, epic costumes, and rare gear — then flex your drip in every room.",
    gradient: "from-magenta/25 to-electric/10",
    iconBg: "bg-magenta/15",
    iconColor: "text-magenta",
  },
  {
    title: "Guild & Community",
    icon: FaUsers,
    desc: "Join a guild, chat in the lounge, run Guild War nights, and grow with the friendliest player base in the region.",
    gradient: "from-electric/25 to-mint/10",
    iconBg: "bg-electric/15",
    iconColor: "text-ice",
  },
  {
    title: "Tournament Ladder",
    icon: GiPodium,
    desc: "Seasonal ranked ladder with points, tiers, and seasonal rewards. From Bronze rookie to Legend-tier duelist.",
    gradient: "from-tangerine/25 to-magenta/10",
    iconBg: "bg-tangerine/15",
    iconColor: "text-tangerine",
  },
  {
    title: "20+ Mercenaries",
    icon: GiTheaterCurtains,
    desc: "Swap heroes mid-match like the original. Master every kit, counter every pick, and keep the mind games flowing.",
    gradient: "from-mint/20 to-electric/10",
    iconBg: "bg-mint/15",
    iconColor: "text-mint",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Why Players Stay"
        title="Built for Veterans & New Challengers"
        description="Everything you loved about the golden era — rebuilt, rebalanced, and running smooth."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 2) * 90}>
            <div className="card-glow group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-panel/60 p-7 backdrop-blur sm:p-9">
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-60 transition-opacity duration-300 group-hover:opacity-100`} aria-hidden />
              <div className="relative flex items-start gap-5">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${f.iconBg}`}>
                  <f.icon className={`text-3xl ${f.iconColor}`} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-mist">{f.desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
