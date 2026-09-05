import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiShoppingBag } from "react-icons/hi2";
import { GiCoins, GiGems } from "react-icons/gi";
import { RARITY_STYLES } from "@/data/heroes";
import { PLAYER } from "@/data/player";
import { FEATURED_BUNDLES, GEM_PACKS, GOLD_PACKS, type CurrencyPack, type ShopItem } from "@/data/webshop";

export const metadata: Metadata = {
  title: "Webshop",
};

function BundleCard({ item }: { item: ShopItem }) {
  const r = RARITY_STYLES[item.rarity];
  return (
    <article className="card-glow group relative overflow-hidden rounded-2xl border border-white/10 bg-panel/60 backdrop-blur">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${r.from}26, transparent 75%)` }}
        aria-hidden
      />
      {item.tag && (
        <span
          className="absolute right-4 top-4 z-10 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur"
          style={{ borderColor: `${r.to}66`, color: r.text, background: `${r.from}26` }}
        >
          {item.tag}
        </span>
      )}
      <div className="relative mx-auto h-44 w-full sm:h-52">
        <Image
          src={item.icon}
          alt={`${item.name} bundle`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-bottom p-4 drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="relative border-t border-white/10 p-5">
        <h3 className="font-display text-lg font-bold text-white">{item.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-mist">{item.desc}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 font-display text-base font-bold text-white">
            {item.currency === "gold" ? (
              <GiCoins className="text-xl text-tangerine" aria-hidden />
            ) : (
              <GiGems className="text-xl text-ice" aria-hidden />
            )}
            {item.price}
          </span>
          <Link
            href={`/dashboard/webshop/checkout?item=${item.id}`}
            className="btn-gradient rounded-xl px-5 py-2 text-sm font-bold text-white"
          >
            Buy
          </Link>
        </div>
      </div>
    </article>
  );
}

function PackGrid({ packs, currency }: { packs: CurrencyPack[]; currency: "gold" | "gems" }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {packs.map((p) => (
        <div
          key={p.id}
          className="card-glow flex flex-col rounded-2xl border border-white/10 bg-panel/60 p-5 text-center backdrop-blur"
        >
          {currency === "gold" ? (
            <GiCoins className="mx-auto text-4xl text-tangerine" aria-hidden />
          ) : (
            <GiGems className="mx-auto text-4xl text-ice" aria-hidden />
          )}
          <div className="mt-3 flex items-center justify-center gap-2">
            <p className="font-display text-xl font-bold text-white">{p.amount}</p>
            {p.bonus && (
              <span className="rounded-full border border-mint/30 bg-mint/10 px-2 py-0.5 text-[10px] font-bold text-mint">
                {p.bonus}
              </span>
            )}
          </div>
          <p className="text-xs uppercase tracking-widest text-dim">{currency}</p>
          <Link
            href={`/dashboard/webshop/checkout?item=${p.id}`}
            className="mt-4 rounded-xl border-2 border-electric/50 bg-electric/10 px-4 py-2 text-sm font-bold text-ice transition-all hover:border-electric hover:bg-electric/20"
          >
            {p.price}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function WebshopPage() {
  return (
    <div>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Command Center</p>
          <h1 className="mt-1 inline-flex items-center gap-3 font-display text-3xl font-bold text-white">
            <HiShoppingBag className="text-2xl text-ice" aria-hidden />
            Webshop
          </h1>
        </div>
        <div className="flex gap-3">
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
            <GiCoins className="text-lg text-tangerine" aria-hidden />
            {PLAYER.gold.toLocaleString("en-US")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-abyss-2/70 px-3.5 py-2 text-sm font-bold text-white">
            <GiGems className="text-lg text-ice" aria-hidden />
            {PLAYER.gems.toLocaleString("en-US")}
          </span>
        </div>
      </header>

      <div className="space-y-10">
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-white">Featured Bundles</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_BUNDLES.map((item) => (
              <BundleCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-white">Gold Packs</h2>
          <PackGrid packs={GOLD_PACKS} currency="gold" />
        </section>

        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-white">Gem Packs</h2>
          <PackGrid packs={GEM_PACKS} currency="gems" />
        </section>
      </div>
    </div>
  );
}
