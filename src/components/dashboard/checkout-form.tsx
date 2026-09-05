"use client";

import { useState } from "react";
import Link from "next/link";
import { HiArrowLeft, HiCheck, HiLockClosed } from "react-icons/hi2";

type PaymentMethod = { id: string; label: string; note: string };

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "card", label: "Credit / Debit Card", note: "Visa · Mastercard · JCB" },
  { id: "gopay", label: "GoPay", note: "Instant e-wallet" },
  { id: "ovo", label: "OVO", note: "Instant e-wallet" },
  { id: "dana", label: "DANA", note: "Instant e-wallet" },
];

export type CartLine = {
  id: string;
  name: string;
  desc: string;
  price: number;
  currency: "gold" | "gems" | "usd";
};

export default function CheckoutForm({ line }: { line: CartLine }) {
  const [method, setMethod] = useState(PAYMENT_METHODS[0].id);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const vat = Math.round(line.price * 0.11 * 100) / 100;
  const total = Math.round((line.price + vat) * 100) / 100;

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setOrderId(`NVX-${Math.floor(Math.random() * 900000 + 100000)}`);
      setPlacing(false);
    }, 900);
  };

  if (orderId) {
    return (
      <div className="glass mx-auto max-w-md rounded-2xl p-10 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-mint/30 to-electric/20">
          <HiCheck className="text-4xl text-mint" aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-white">Purchase Complete</h2>
        <p className="mt-2 text-sm text-mist">
          Your items have been delivered to your locker. See you in the arena, mercenary.
        </p>
        <p className="mt-4 font-mono text-xs text-dim">Order ID: {orderId}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/dashboard/webshop" className="rounded-xl border-2 border-white/15 px-6 py-2.5 text-sm font-bold text-mist transition-all hover:border-white/30 hover:text-white">
            Back to Shop
          </Link>
          <Link href="/dashboard" className="btn-gradient rounded-xl px-6 py-2.5 text-sm font-bold text-white">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* payment methods */}
      <section className="rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur lg:col-span-3 sm:p-8">
        <h2 className="font-display text-lg font-bold text-white">Payment Method</h2>
        <ul className="mt-5 space-y-3">
          {PAYMENT_METHODS.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setMethod(m.id)}
                className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                  method === m.id
                    ? "border-magenta/50 bg-magenta/10"
                    : "border-white/10 bg-abyss-2/50 hover:border-white/20"
                }`}
              >
                <span>
                  <span className="block text-sm font-bold text-white">{m.label}</span>
                  <span className="mt-0.5 block text-xs text-dim">{m.note}</span>
                </span>
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                    method === m.id ? "border-magenta" : "border-white/20"
                  }`}
                >
                  {method === m.id && <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-electric to-magenta" />}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-center gap-2 text-xs text-dim">
          <HiLockClosed className="text-sm" aria-hidden />
          Payments are processed securely. This is a demo checkout — no real charge.
        </p>
      </section>

      {/* order summary */}
      <section className="rounded-2xl border border-white/10 bg-panel/60 p-6 backdrop-blur lg:col-span-2 sm:p-8">
        <h2 className="font-display text-lg font-bold text-white">Order Summary</h2>
        <div className="mt-5 space-y-4">
          <div className="rounded-xl border border-white/10 bg-abyss-2/50 p-4">
            <p className="text-sm font-bold text-white">{line.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-dim">{line.desc}</p>
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-dim">Subtotal</dt>
              <dd className="font-semibold text-white">
                {line.currency === "usd"
                  ? `$${line.price.toFixed(2)}`
                  : `${line.price.toLocaleString("en-US")} ${line.currency}`}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-dim">VAT (11%)</dt>
              <dd className="font-semibold text-white">${vat.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3">
              <dt className="font-display font-bold text-white">Total</dt>
              <dd className="font-display text-lg font-bold text-gradient">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <button
            type="button"
            disabled={placing}
            onClick={placeOrder}
            className="btn-gradient w-full rounded-xl px-6 py-3.5 text-base font-bold text-white disabled:opacity-60"
          >
            {placing ? "Processing…" : "Place Order"}
          </button>

          <Link
            href="/dashboard/webshop"
            className="flex items-center justify-center gap-1.5 text-sm font-semibold text-dim transition-colors hover:text-white"
          >
            <HiArrowLeft className="text-base" aria-hidden />
            Continue shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
