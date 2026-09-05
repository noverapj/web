import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Mercenaries from "@/components/mercenaries";
import Modes from "@/components/modes";
import Features from "@/components/features";
import News from "@/components/news";
import Ranking from "@/components/ranking";
import Download from "@/components/download";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Mercenaries />
        <Modes />
        <Features />
        <News />
        <Ranking />
        <Download />
      </main>
      <Footer />
    </>
  );
}
