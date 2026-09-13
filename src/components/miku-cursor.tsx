"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FRAMES = Array.from(
  { length: 14 },
  (_, i) => `/cursors/miku/frame-${String(i).padStart(2, "0")}.png`,
);

const RATES_MS = [1000, 67, 67, 67, 67, 67, 67, 67, 500, 100, 100, 100, 100, 100];

const SIZE = 48;
const HOTX = 12;
const HOTY = 0;

export default function MikuCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    FRAMES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("miku-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let raf = 0;
    let pressing = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onDown = () => {
      pressing = true;
    };
    const onUp = () => {
      pressing = false;
    };

    const loop = () => {
      x += (mouseX - x) * 0.45;
      y += (mouseY - y) * 0.45;
      el.style.transform = `translate(${x - HOTX}px, ${y - HOTY}px)${
        pressing ? " scale(0.85)" : ""
      }`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    let idx = 0;
    let timer = 0;
    const tick = () => {
      setFrame(idx);
      const current = idx;
      idx = (idx + 1) % FRAMES.length;
      timer = window.setTimeout(tick, RATES_MS[current] ?? 1000);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.documentElement.classList.remove("miku-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ width: SIZE, height: SIZE, willChange: "transform" }}
    >
      <Image
        src={FRAMES[frame]}
        width={SIZE}
        height={SIZE}
        alt=""
        draggable={false}
        priority
      />
    </div>
  );
}