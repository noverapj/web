"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { HiArrowLeft, HiCog, HiShoppingBag } from "react-icons/hi2";
import {
  GiCrossedSwords,
  GiDiceTarget,
  GiLaurelsTrophy,
  GiShield,
  GiSwordman,
  GiTheaterCurtains,
} from "react-icons/gi";

const ITEMS: { href: string; label: string; icon: IconType }[] = [
  { href: "/dashboard", label: "Overview", icon: GiSwordman },
  { href: "/dashboard/matches", label: "Matches", icon: GiCrossedSwords },
  { href: "/dashboard/heroes", label: "Locker", icon: GiTheaterCurtains },
  { href: "/dashboard/guild", label: "Guild", icon: GiShield },
  { href: "/dashboard/gashapon", label: "Gashapon", icon: GiDiceTarget },
  { href: "/dashboard/season-pass", label: "Pass", icon: GiLaurelsTrophy },
  { href: "/dashboard/webshop", label: "Shop", icon: HiShoppingBag },
  { href: "/dashboard/settings", label: "Settings", icon: HiCog },
];

function isActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
}

export default function NavRail() {
  const pathname = usePathname();

  return (
    <>
      {/* desktop floating capsule ? hugs the content column, top-aligned */}
      <aside
        className="fixed top-6 z-40 hidden md:flex"
        style={{ left: "max(0.25rem, calc((100vw - 78rem) / 2))" }}
      >
        <div className="glass relative flex flex-col items-center rounded-[2.75rem] px-3.5 py-5">
          {/* drifting background blobs */}
          <span
            className="animate-blob pointer-events-none absolute left-0 top-14 h-16 w-16 rounded-full bg-electric/25 blur-2xl"
            aria-hidden
          />
          <span
            className="animate-blob pointer-events-none absolute bottom-14 right-0 h-14 w-14 rounded-full bg-magenta/20 blur-2xl"
            style={{ animationDelay: "3.5s" }}
            aria-hidden
          />

          <nav
            aria-label="Dashboard"
            className="relative flex max-h-[calc(100vh-10rem)] flex-col items-center gap-2 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ITEMS.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <span
                  key={item.href}
                  className="animate-bubble flex flex-col items-center gap-1"
                  style={{ animationDelay: `${i * 0.45}s` }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`bubble-sheen flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 ${
                      active
                        ? "scale-110 border-transparent bg-gradient-to-br from-electric via-magenta to-magenta text-white shadow-[0_6px_24px_rgb(226_59_255/0.6)] ring-2 ring-white/20"
                        : "border-white/10 bg-white/[0.06] text-dim hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="text-2xl" aria-hidden />
                  </Link>
                  <span
                    className={`text-[10px] font-semibold leading-none ${
                      active ? "text-white" : "text-dim"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
              );
            })}
          </nav>

          {/* divider + back to site */}
          <span className="relative my-3 h-1.5 w-1.5 rounded-full bg-white/15" aria-hidden />
          <span
            className="animate-bubble relative flex flex-col items-center gap-1"
            style={{ animationDelay: "2.2s" }}
          >
            <Link
              href="/"
              className="bubble-sheen flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-dim transition-all duration-200 hover:scale-105 hover:border-tangerine/40 hover:bg-tangerine/10 hover:text-tangerine"
            >
              <HiArrowLeft className="text-xl" aria-hidden />
            </Link>
            <span className="text-[10px] font-semibold leading-none text-dim">Site</span>
          </span>
        </div>
      </aside>

      {/* mobile bottom bubbles */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex gap-1 overflow-x-auto border-t border-white/10 bg-panel/80 px-2 py-2 backdrop-blur md:hidden"
        aria-label="Dashboard"
      >
        {ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-[3.25rem] flex-1 flex-col items-center gap-1 rounded-2xl py-1 ${
                active ? "text-white" : "text-dim"
              }`}
            >
              <span
                className={`bubble-sheen flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
                  active
                    ? "scale-105 border-transparent bg-gradient-to-br from-electric to-magenta text-white shadow-[0_4px_18px_rgb(226_59_255/0.55)] ring-2 ring-white/20"
                    : "border-white/10 bg-white/[0.06]"
                }`}
              >
                <item.icon className="text-xl" aria-hidden />
              </span>
              <span className="text-[10px] font-semibold leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
