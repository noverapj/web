import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const SECTIONS = [
  {
    title: "1. Data We Collect",
    body: "When you create an account we store the username, nickname, email address, and a secure representation of your password. While you use the site we may record your IP address, browser information, and pages visited to operate and secure the service.",
  },
  {
    title: "2. In-Game Data",
    body: "Your in-game profile — level, currency, battle records, guild membership, and items — is stored in the game database and used solely to provide and display your account state on the website and in the game.",
  },
  {
    title: "3. Third-Party Login",
    body: "If you sign in with Discord or Google, we receive the identity identifier, email address, and display name associated with that provider. We use them only to authenticate you and to link the provider to your account. We never post or act on your behalf.",
  },
  {
    title: "4. Cookies and Advertising",
    body: "We use an essential session cookie to keep you signed in. Third-party advertising partners (such as Google AdSense) may set their own cookies and use standard identifiers to serve and measure ads. You can control ad personalization through your browser settings or Google's ad settings.",
  },
  {
    title: "5. How We Use Your Data",
    body: "We use your data to authenticate you, display your account information, prevent fraud and abuse, respond to support requests, and operate the service. We do not sell your personal data to anyone.",
  },
  {
    title: "6. Data Sharing",
    body: "We do not share your personal data with third parties except: advertising partners as described above, and legal authorities when required by law. Your game account data is never exposed to other players beyond what the game itself displays.",
  },
  {
    title: "7. Data Retention",
    body: "Account data is retained while your account exists. You may request deletion of your account, which removes your ability to log in; certain game records may be retained for operational and legal reasons.",
  },
  {
    title: "8. Security",
    body: "Passwords are never stored in plain text. Access to the game database is limited to the website backend and the game server. Despite these measures, no method of transmission or storage is completely secure.",
  },
  {
    title: "9. Your Rights",
    body: "You may access, correct, or request deletion of your personal data at any time by contacting us through the community channels listed on the website.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this policy as the service evolves. Material changes will be announced on the website. Continued use of the service constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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