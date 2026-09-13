import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Mercenaries from "@/components/mercenaries";
import Modes from "@/components/modes";
import Features from "@/components/features";
import News from "@/components/news";
import Ranking from "@/components/ranking";
import Download from "@/components/download";
import Footer from "@/components/footer";
import AdSlot from "@/components/ad-slot";
import { getSessionUserID } from "@/server/dashboard";

export default async function Home() {
  const isAuthenticated = (await getSessionUserID()) !== null;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <Hero />
        <Mercenaries />
        <Modes />
        <Features />
        <News />
        <AdSlot adSlot="1234567890" className="mx-auto max-w-6xl px-4 py-8 sm:px-6" />
        <Ranking />
        <Download />
      </main>
      <Footer />
    </>
  );
}
