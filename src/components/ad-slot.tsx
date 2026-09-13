"use client";

import { useEffect, useRef } from "react";

const pushedAds = new WeakSet<HTMLElement>();

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  adSlot: string;
  className?: string;
};

export default function AdSlot({ adSlot, className }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.adsbygoogle) return;

    const ins = insRef.current;
    if (!ins || pushedAds.has(ins)) return;

    pushedAds.add(ins);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, [adSlot]);

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}