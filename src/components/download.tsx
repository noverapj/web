import { FaDownload } from "react-icons/fa";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

const SPECS = [
  { label: "OS", min: "Windows 7 SP1 (64-bit)", rec: "Windows 10/11 (64-bit)" },
  { label: "CPU", min: "Intel Core i3 / AMD FX-6300", rec: "Intel Core i5 / AMD Ryzen 5" },
  { label: "RAM", min: "4 GB", rec: "8 GB" },
  { label: "GPU", min: "GeForce GT 730 / Radeon R7 240", rec: "GTX 1050 Ti / Radeon RX 570" },
  { label: "Storage", min: "6 GB free space", rec: "10 GB free space (SSD)" },
  { label: "Network", min: "Broadband 3 Mbps", rec: "Broadband 10 Mbps" },
];

const STEPS = [
  {
    n: "1",
    title: "Download the launcher",
    desc: "Grab the NOVERA OSS installer from the button above — it's free, no subscription, ever.",
  },
  {
    n: "2",
    title: "Install & patch",
    desc: "Run the installer, then let the launcher auto-patch to the latest version of the game.",
  },
  {
    n: "3",
    title: "Log in & pick a hero",
    desc: "Create your account, claim the rookie mercenary bundle, and jump straight into your first PvP room.",
  },
];

export default function Download() {
  return (
    <section id="download" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        kicker="Ready to Rumble"
        title="Download NOVERA OSS"
        description="Free to play. Small footprint. Runs on a potato — seriously."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* requirements + button */}
        <Reveal className="lg:col-span-3">
          <div className="h-full rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur sm:p-8">
            <h3 className="mb-5 font-display text-lg font-bold text-white">
              System Requirements
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[440px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-abyss-2/80 font-display text-xs font-bold uppercase tracking-widest text-dim">
                    <th className="px-4 py-3">Spec</th>
                    <th className="px-4 py-3">Minimum</th>
                    <th className="px-4 py-3">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  {SPECS.map((s) => (
                    <tr key={s.label} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-semibold text-ice">{s.label}</td>
                      <td className="px-4 py-3 text-mist">{s.min}</td>
                      <td className="px-4 py-3 text-mist">{s.rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <a href="#download" className="btn-gradient mt-7 flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white">
              <FaDownload className="text-lg" aria-hidden />
              Download for Windows — Free
            </a>
            <p className="mt-3 text-center text-xs text-dim">
              v2.4.1 • 1.2 GB • Full patcher included
            </p>
          </div>
        </Reveal>

        {/* install steps */}
        <Reveal className="lg:col-span-2" delay={110}>
          <div className="flex h-full flex-col gap-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="card-glow flex flex-1 items-start gap-4 rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric to-magenta font-display text-lg font-bold text-white">
                  {s.n}
                </span>
                <div>
                  <h4 className="font-display text-base font-bold text-white">{s.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
