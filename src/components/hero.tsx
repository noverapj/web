import { FaDiscord, FaDownload } from "react-icons/fa";

const PARTICLES = [
  { left: "6%", top: "22%", size: 5, color: "rgb(59 107 255 / 0.8)", delay: "0s" },
  { left: "14%", top: "68%", size: 3, color: "rgb(226 59 255 / 0.7)", delay: "1.2s" },
  { left: "24%", top: "38%", size: 4, color: "rgb(255 138 42 / 0.6)", delay: "0.5s" },
  { left: "33%", top: "82%", size: 3, color: "rgb(59 251 176 / 0.6)", delay: "2.1s" },
  { left: "42%", top: "16%", size: 5, color: "rgb(226 59 255 / 0.55)", delay: "1.7s" },
  { left: "52%", top: "60%", size: 3, color: "rgb(143 168 255 / 0.7)", delay: "0.9s" },
  { left: "61%", top: "28%", size: 4, color: "rgb(255 138 42 / 0.55)", delay: "2.6s" },
  { left: "70%", top: "74%", size: 5, color: "rgb(59 107 255 / 0.65)", delay: "0.3s" },
  { left: "79%", top: "34%", size: 3, color: "rgb(59 251 176 / 0.7)", delay: "1.4s" },
  { left: "88%", top: "58%", size: 4, color: "rgb(226 59 255 / 0.6)", delay: "2.9s" },
  { left: "94%", top: "18%", size: 3, color: "rgb(143 168 255 / 0.6)", delay: "0.7s" },
];

const STREAKS = [
  { left: "12%", duration: "9s", delay: "0s" },
  { left: "36%", duration: "12s", delay: "3.5s" },
  { left: "58%", duration: "10s", delay: "1.8s" },
  { left: "82%", duration: "13s", delay: "6.2s" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16">
      {/* backdrop layers */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgb(59_107_255/0.25),transparent_70%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_80%_75%,rgb(226_59_255/0.16),transparent_70%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_15%_80%,rgb(255_138_42/0.12),transparent_70%)]" aria-hidden />

      {/* diagonal light streaks + particles */}
      <div className="absolute inset-0" aria-hidden>
        {STREAKS.map((s, i) => (
          <span key={i} className="streak" style={{ left: s.left, animationDuration: s.duration, animationDelay: s.delay }} />
        ))}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size * 2,
              height: p.size * 2,
              background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
        {/* server status pill */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-panel/60 px-4 py-2 text-sm font-semibold text-mint backdrop-blur">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
          </span>
          SERVER ONLINE
          <span className="text-dim">•</span>
          <span className="text-mist">1,284 players online</span>
        </div>

        {/* logo lockup */}
        <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.5em] text-ice">
          Lost Saga Revival
        </p>
        <h1 className="font-display text-5xl font-bold leading-none tracking-tight sm:text-7xl lg:text-8xl">
          <span className="text-white drop-shadow-[0_0_35px_rgb(59_107_255/0.45)]">NOVERA</span>{" "}
          <span className="text-gradient">OSS</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg font-medium text-mist sm:text-xl">
          The Mercenary Legend Returns! The classic fast-paced PvP action
          brawler — insane combos, gashapon, guild wars, and 20+ heroes to
          master.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#download" className="btn-gradient inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white sm:w-auto">
            <FaDownload className="text-lg" />
            Download Game
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-electric/50 bg-electric/10 px-8 py-4 text-base font-bold text-ice backdrop-blur transition-all hover:-translate-y-0.5 hover:border-electric hover:bg-electric/20 hover:shadow-[0_0_30px_rgb(59_107_255/0.35)] sm:w-auto"
          >
            <FaDiscord className="text-xl" />
            Join Discord
          </a>
        </div>

        {/* quick stats */}
        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-3 sm:gap-6">
          {[
            { value: "20+", label: "Mercenaries" },
            { value: "8", label: "Game Modes" },
            { value: "150K+", label: "Registered Accounts" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl px-3 py-4 sm:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-xs text-dim sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-abyss" aria-hidden />
    </section>
  );
}
