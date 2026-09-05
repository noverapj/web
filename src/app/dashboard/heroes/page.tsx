import type { Metadata } from "next";
import Image from "next/image";
import { HiLockClosed, HiStar } from "react-icons/hi2";
import { heroByName, RARITY_STYLES } from "@/data/heroes";
import { LOCKED_SLOTS, LOCKER, LOCKER_TOTAL } from "@/data/heroes-locker";

export const metadata: Metadata = {
  title: "Mercenary Locker",
};

export default function LockerPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">Mercenary Locker</h1>
        <p className="mt-2 text-sm text-mist">
          <span className="font-bold text-white">{LOCKER.length}</span> / {LOCKER_TOTAL} heroes
          owned — {LOCKER_TOTAL - LOCKER.length} waiting in the Gashapon.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {LOCKER.map((slot) => {
          const hero = heroByName(slot.hero);
          const r = RARITY_STYLES[hero.rarity];
          return (
            <article
              key={hero.code}
              className={`card-glow group relative overflow-hidden rounded-2xl border bg-panel/60 backdrop-blur ${
                slot.equipped ? "border-magenta/50 shadow-[0_0_24px_rgb(226_59_255/0.25)]" : "border-white/10"
              }`}
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
                  src={hero.art}
                  alt={`${hero.name} artwork`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className={`object-contain object-bottom p-3 drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 ${
                    slot.equipped ? "" : ""
                  }`}
                />
                {/* level badge */}
                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-abyss/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                  Lv {slot.level}
                </span>
                {/* rarity badge */}
                <span
                  className="absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur"
                  style={{ borderColor: `${r.to}66`, color: r.text, background: `${r.from}22` }}
                >
                  {hero.rarity}
                </span>
                {/* equipped ribbon */}
                {slot.equipped && (
                  <span className="absolute inset-x-0 top-0 bg-gradient-to-r from-electric via-magenta to-tangerine py-0.5 text-center text-[9px] font-bold uppercase tracking-widest text-white">
                    Equipped
                  </span>
                )}
              </div>

              {/* info */}
              <div className="space-y-2 p-4">
                <h3 className="font-display text-base font-bold text-white">{hero.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wide text-dim">{hero.type}</span>
                  <span className="flex items-center gap-0.5" aria-label={`Mastery ${slot.mastery} of 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <HiStar
                        key={i}
                        className={`text-[11px] ${i < slot.mastery ? "text-tangerine" : "text-white/15"}`}
                        aria-hidden
                      />
                    ))}
                  </span>
                </div>
              </div>
            </article>
          );
        })}

        {/* locked slots */}
        {Array.from({ length: LOCKED_SLOTS }).map((_, i) => (
          <article
            key={`locked-${i}`}
            className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-panel/30 p-4"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-abyss-2/60">
              <HiLockClosed className="text-2xl text-dim" aria-hidden />
            </span>
            <p className="font-display text-base font-bold text-dim">???</p>
            <p className="text-center text-[11px] leading-snug text-dim">
              Unlock via Gashapon
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
