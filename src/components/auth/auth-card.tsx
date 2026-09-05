import type { ReactNode } from "react";
import Image from "next/image";
import { heroByName } from "@/data/heroes";

const FLOATERS = [
  { left: "12%", top: "20%", size: 8, color: "rgb(59 107 255 / 0.5)", delay: "0s" },
  { left: "80%", top: "32%", size: 6, color: "rgb(226 59 255 / 0.45)", delay: "1.2s" },
  { left: "30%", top: "70%", size: 5, color: "rgb(143 168 255 / 0.4)", delay: "2.1s" },
];

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const hero = heroByName("Kage Ninja");

  return (
    <div className="glass overflow-hidden rounded-[2.5rem]">
      <div className="grid lg:grid-cols-2">
        {/* art panel */}
        <div
          className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex"
          style={{ background: "linear-gradient(165deg, rgb(59 107 255 / 0.18), rgb(226 59 255 / 0.08) 55%, #0b0e1a)" }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgb(122 59 255 / 0.16), transparent 70%)" }}
          />

          {/* floating bubbles */}
          {FLOATERS.map((f, i) => (
            <span
              key={i}
              className="animate-bubble absolute rounded-full"
              style={{
                left: f.left,
                top: f.top,
                width: f.size * 2,
                height: f.size * 2,
                background: `radial-gradient(circle at 35% 30%, ${f.color}, transparent 70%)`,
                animationDelay: f.delay,
              }}
            />
          ))}

          <div className="relative">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.4em] text-ice">
              NOVERA OSS
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">
              The Mercenary Legend Returns. Your heroes, your guild, and your ladder are
              waiting.
            </p>
          </div>

          <div className="relative mx-auto h-72 w-full">
            <Image
              src={hero.art}
              alt={`${hero.name} artwork`}
              fill
              sizes="440px"
              className="object-contain object-bottom drop-shadow-[0_14px_40px_rgba(122_59_255/0.45)]"
              priority
            />
          </div>

          <div className="relative flex gap-2" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-electric/70" />
            <span className="h-2 w-2 rounded-full bg-magenta/70" />
            <span className="h-2 w-2 rounded-full bg-tangerine/70" />
          </div>
        </div>

        {/* form panel */}
        <div className="p-8 sm:p-10">
          <div className="mb-7">
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-mist">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
