import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By creating an account, downloading the client, or accessing NOVERA OSS in any way, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.",
  },
  {
    title: "2. Accounts",
    body: "You are responsible for keeping your login credentials secure and for all activity under your account. One person may maintain multiple accounts, but shared or traded accounts are used at your own risk. We may suspend or terminate accounts that are created fraudulently, sold, or used to evade bans.",
  },
  {
    title: "3. Acceptable Use",
    body: "You agree not to: use cheats, automation tools, or third-party software that alters the game; exploit bugs or errors for unfair advantage; harass, threaten, or abuse other players; impersonate staff; or interfere with the operation of the servers. Violations may result in temporary or permanent account action without refund.",
  },
  {
    title: "4. Virtual Items and Currency",
    body: "All virtual items, currency, and progress are licensed to you for use within the game only. They have no monetary value, cannot be transferred outside the game, and are not refundable except where required by applicable law. We may adjust, restore, or remove virtual goods to correct errors or enforce these terms.",
  },
  {
    title: "5. Content and Intellectual Property",
    body: "The NOVERA OSS project operates as a community revival. All character names, artwork, and game data are used for historical preservation purposes. If you believe any content infringes your rights, contact us and we will review the claim promptly.",
  },
  {
    title: "6. Termination",
    body: "We may suspend or terminate access to the service at any time, with or without notice, for conduct that violates these terms or harms the community. You may stop using the service at any time; however, accounts and progress are not portable.",
  },
  {
    title: "7. Limitation of Liability",
    body: "The service is provided as-is and without warranty of any kind. To the maximum extent permitted by law, the operator is not liable for any damages arising from use of, or inability to use, the service, including loss of virtual items, data, or downtime.",
  },
  {
    title: "8. Changes to These Terms",
    body: "We may update these terms from time to time. Material changes will be announced on the website. Continued use of the service after changes take effect constitutes acceptance of the revised terms.",
  },
  {
    title: "9. Contact",
    body: "Questions about these terms can be sent through the community channels listed on the website.",
  },
];

export default function TosPage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_-10%,rgb(59_107_255/0.12),transparent_70%)]" aria-hidden />

      <main className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-ice transition-colors hover:text-white"
        >
          Back to home
        </Link>

        <header className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Legal</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-mist">Last updated: September 2026</p>
        </header>

        <div className="mt-8 space-y-6">
          {SECTIONS.map((s) => (
            <section key={s.title} className="rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur">
              <h2 className="font-display text-lg font-bold text-white">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}