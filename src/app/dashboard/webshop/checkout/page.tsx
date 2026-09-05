import type { Metadata } from "next";
import { HiShoppingBag } from "react-icons/hi2";
import CheckoutForm, { type CartLine } from "@/components/dashboard/checkout-form";
import { FEATURED_BUNDLES, GEM_PACKS, GOLD_PACKS } from "@/data/webshop";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage({
  searchParams,
}: PageProps<"/dashboard/webshop/checkout">) {
  const params = await searchParams;
  const itemId = typeof params.item === "string" ? params.item : "";

  const bundle = FEATURED_BUNDLES.find((b) => b.id === itemId);
  const pack = [...GOLD_PACKS, ...GEM_PACKS].find((p) => p.id === itemId);

  let line: CartLine;
  if (bundle) {
    const priceNum = Number(bundle.price.replace(/,/g, ""));
    line = {
      id: bundle.id,
      name: bundle.name,
      desc: bundle.desc,
      price: priceNum,
      currency: bundle.currency,
    };
  } else if (pack) {
    line = {
      id: pack.id,
      name: `${pack.amount} ${GOLD_PACKS.some((p) => p.id === pack.id) ? "Gold" : "Gems"}`,
      desc: `Instant currency top-up${pack.bonus ? ` with ${pack.bonus} bonus` : ""}.`,
      price: Number(pack.price.replace("$", "")),
      currency: "usd",
    };
  } else {
    line = {
      id: "starter",
      name: "Rookie Starter Pack",
      desc: "5,000 Gold · 3 Gashapon Keys · 7-day XP Boost",
      price: 490,
      currency: "gems",
    };
  }

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-dim">Webshop</p>
        <h1 className="mt-1 inline-flex items-center gap-3 font-display text-3xl font-bold text-white">
          <HiShoppingBag className="text-2xl text-ice" aria-hidden />
          Checkout
        </h1>
      </header>
      <CheckoutForm line={line} />
    </div>
  );
}
