import Image from "next/image";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

type MercenaryType = "melee" | "range" | "magic" | "special";
type Rarity = "normal" | "rare" | "premium" | "unique" | "idol";

type Mercenary = {
  name: string;
  code: string;
  type: MercenaryType;
  rarity: Rarity;
  art: string;
};

const MERCENARIES: Mercenary[] = [
  { name: "Iron Knight", code: "001", type: "melee", rarity: "normal", art: "/heroes/iron-knight.png" },
  { name: "Captain Hook", code: "002", type: "melee", rarity: "normal", art: "/heroes/captain-hook.png" },
  { name: "Cowboy", code: "003", type: "range", rarity: "normal", art: "/heroes/cowboy.png" },
  { name: "Fire Mage", code: "004", type: "magic", rarity: "normal", art: "/heroes/fire-mage.png" },
  { name: "Gigasuit", code: "239", type: "special", rarity: "unique", art: "/heroes/gigasuit.png" },
  { name: "Kage Ninja", code: "017", type: "melee", rarity: "normal", art: "/heroes/kage-ninja.png" },
  { name: "Taekwon Master", code: "019", type: "melee", rarity: "normal", art: "/heroes/taekwon-master.png" },
  { name: "Grim Reaper", code: "023", type: "melee", rarity: "normal", art: "/heroes/grim-reaper.png" },
  { name: "Vampire", code: "102", type: "melee", rarity: "rare", art: "/heroes/vampire.png" },
  { name: "Hercules", code: "228", type: "melee", rarity: "unique", art: "/heroes/hercules.png" },
];

const TYPE_STYLES: Record<MercenaryType, string> = {
  melee: "bg-tangerine/15 text-tangerine border-tangerine/30",
  range: "bg-electric/15 text-ice border-electric/40",
  magic: "bg-magenta/15 text-magenta border-magenta/30",
  special: "bg-mint/15 text-mint border-mint/30",
};

const RARITY_STYLES: Record<Rarity, { from: string; to: string; glow: string }> = {
  normal: { from: "#3b6bff", to: "#6f9bff", glow: "rgb(59 107 255 / 0.45)" },
  rare: { from: "#7a3bff", to: "#b06aff", glow: "rgb(122 59 255 / 0.5)" },
  premium: { from: "#e23bff", to: "#ff6ad5", glow: "rgb(226 59 255 / 0.5)" },
  unique: { from: "#ff8a2a", to: "#ffc46a", glow: "rgb(255 138 42 / 0.55)" },
  idol: { from: "#ff5b9a", to: "#ff9ac6", glow: "rgb(255 91 154 / 0.5)" },
};

export default function Mercenaries() {
  return (
    <section id="mercenaries" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Choose Your Fighter"
        title="Mercenary Showcase"
        description="Every hero has a unique kit, combo routes, and playstyle. Pick your main, swap mid-match, and dominate the arena."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {MERCENARIES.map((m, i) => {
          const r = RARITY_STYLES[m.rarity];
          return (
            <Reveal key={m.code} delay={(i % 5) * 70}>
              <article
                className="card-glow group relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur"
                style={{ boxShadow: `0 0 0 0 ${r.glow}` }}
              >
                {/* art slot */}
                <div
                  className="relative flex aspect-[3/4] items-end justify-center overflow-hidden"
                  style={{ background: `linear-gradient(165deg, ${r.from}30, ${r.to}0d 55%, #0b0e1a)` }}
                >
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 opacity-70"
                    style={{ background: `linear-gradient(180deg, transparent, ${r.from}26)` }}
                  />
                  <Image
                    src={m.art}
                    alt={`${m.name} artwork`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain object-bottom p-3 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                  />
                  {/* rarity glow edge */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 46px ${r.glow}` }}
                  />
                  <span
                    className="absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur"
                    style={{ borderColor: `${r.to}66`, color: r.to, background: `${r.from}22` }}
                  >
                    {m.rarity}
                  </span>
                </div>

                {/* info */}
                <div className="space-y-2 p-4">
                  <h3 className="font-display text-base font-bold text-white sm:text-lg">
                    {m.name}
                  </h3>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${TYPE_STYLES[m.type]}`}
                  >
                    {m.type}
                  </span>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 text-center" delay={120}>
        <p className="text-sm text-dim">
          280+ mercenaries in the full roster — <span className="font-semibold text-ice">collect them all via Gashapon</span>
        </p>
      </Reveal>
    </section>
  );
}
