import type { ReactNode } from "react";

const PARTICLES = [
  { left: "8%", top: "18%", size: 5, color: "rgb(59 107 255 / 0.7)", delay: "0s" },
  { left: "18%", top: "72%", size: 3, color: "rgb(226 59 255 / 0.6)", delay: "1.4s" },
  { left: "38%", top: "30%", size: 4, color: "rgb(255 138 42 / 0.5)", delay: "0.7s" },
  { left: "62%", top: "78%", size: 5, color: "rgb(59 107 255 / 0.55)", delay: "2s" },
  { left: "78%", top: "22%", size: 3, color: "rgb(59 251 176 / 0.6)", delay: "1.1s" },
  { left: "90%", top: "60%", size: 4, color: "rgb(143 168 255 / 0.55)", delay: "2.6s" },
];

const STREAKS = [
  { left: "15%", duration: "11s", delay: "0.5s" },
  { left: "52%", duration: "13s", delay: "3s" },
  { left: "84%", duration: "10s", delay: "1.6s" },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* backdrop layers */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_-10%,rgb(59_107_255/0.22),transparent_70%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_85%_80%,rgb(226_59_255/0.14),transparent_70%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_10%_85%,rgb(255_138_42/0.1),transparent_70%)]" aria-hidden />

      {/* diagonal streaks + particles */}
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

      {/* content */}
      <div className="relative z-10 w-full max-w-4xl">{children}</div>

      {/* copyright */}
      <p className="relative z-10 mt-8 text-center text-xs text-dim">
        Copyright NOVERA OSS — All Rights Reserved
      </p>
    </div>
  );
}
