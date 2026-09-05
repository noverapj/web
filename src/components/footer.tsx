import { FaDiscord, FaFacebook } from "react-icons/fa";

const LINK_GROUPS = [
  {
    heading: "Game",
    links: [
      { label: "Download", href: "#download" },
      { label: "Patch Notes", href: "#news" },
      { label: "Ranking", href: "#ranking" },
      { label: "Mercenaries", href: "#mercenaries" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discord", href: "https://discord.com", external: true },
      { label: "Facebook", href: "https://facebook.com", external: true },
      { label: "Guild War Events", href: "#news" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-8 border-t border-white/10 bg-abyss-2/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <a href="#hero" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric via-magenta to-tangerine font-display text-lg font-bold text-white shadow-lg shadow-magenta/30">
                N
              </span>
              <span className="font-display text-lg font-bold tracking-wide">
                NOVERA <span className="text-gradient">OSS</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              A community revival of the classic mercenary brawler Lost Saga.
              Built by veterans, for veterans — and everyone brave enough to
              join the arena.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-all hover:-translate-y-0.5 hover:border-electric/50 hover:bg-electric/15"
              >
                <FaDiscord className="text-lg text-mist" aria-hidden />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-all hover:-translate-y-0.5 hover:border-electric/50 hover:bg-electric/15"
              >
                <FaFacebook className="text-lg text-mist" aria-hidden />
              </a>
            </div>
          </div>

          {/* link groups */}
          {LINK_GROUPS.map((g) => (
            <nav key={g.heading} aria-label={g.heading}>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                {g.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-mist transition-colors hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-dim">
            Copyright NOVERA OSS — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
