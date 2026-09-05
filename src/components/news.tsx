import { HiArrowRight } from "react-icons/hi2";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

const TAG_STYLES: Record<string, string> = {
  Update: "bg-electric/15 text-ice border-electric/40",
  Event: "bg-magenta/15 text-magenta border-magenta/30",
  Maintenance: "bg-tangerine/15 text-tangerine border-tangerine/30",
};

const NEWS = [
  {
    date: { day: "28", month: "FEB" },
    tag: "Update",
    title: "Patch v2.4 — Grim Reaper Rework & New Arena",
    excerpt:
      "Grim Reaper gets a full skill rework, the Crimson Colosseum map enters rotation, and ladder decay is now more forgiving for inactive players.",
  },
  {
    date: { day: "21", month: "FEB" },
    tag: "Event",
    title: "Guild War Spring Cup — Registration Open",
    excerpt:
      "Sign your guild up for the Spring Cup. Weekly brackets, casted finals, and a limited 'Conqueror' costume set for the champions.",
  },
  {
    date: { day: "14", month: "FEB" },
    tag: "Event",
    title: "Double Gashapon Rate Weekend",
    excerpt:
      "All gashapon machines get 2x rate-up for epic-tier drops this weekend only. Stock up on keys from daily login rewards.",
  },
  {
    date: { day: "07", month: "FEB" },
    tag: "Maintenance",
    title: "Server Maintenance — EU Relay Upgrade",
    excerpt:
      "Scheduled downtime Thursday 02:00–05:00 UTC while we upgrade the EU relay nodes for lower latency routing.",
  },
];

export default function News() {
  return (
    <section id="news" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Fresh Off the Patch"
        title="News & Patch Notes"
        description="Every balance change, event, and maintenance — straight from the dev team."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {NEWS.map((n, i) => (
          <Reveal key={n.title} delay={(i % 2) * 80}>
            <article className="card-glow flex h-full gap-5 rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur">
              {/* date badge */}
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-abyss-2 font-display">
                <span className="text-2xl font-bold leading-none text-white">{n.date.day}</span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-dim">
                  {n.date.month}
                </span>
              </div>

              <div>
                <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${TAG_STYLES[n.tag]}`}>
                  {n.tag}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white transition-colors hover:text-ice">
                  {n.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{n.excerpt}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center" delay={100}>
        <a
          href="#news"
          className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/15 px-7 py-3 text-sm font-bold text-mist transition-all hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
        >
          View all patch notes
          <HiArrowRight className="text-base" aria-hidden />
        </a>
      </Reveal>
    </section>
  );
}
