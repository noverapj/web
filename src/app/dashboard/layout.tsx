import type { Metadata } from "next";
import NavRail from "@/components/dashboard/nav-rail";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="relative min-h-screen">
      {/* backdrop */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_-10%,rgb(59_107_255/0.12),transparent_70%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_10%_100%,rgb(226_59_255/0.08),transparent_70%)]" aria-hidden />

      <NavRail />
      <main className="relative md:pl-24">
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 md:pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
