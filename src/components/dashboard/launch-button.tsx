"use client";

import { useFormStatus } from "react-dom";
import { FaPlay } from "react-icons/fa";
import { launchGameAction } from "@/actions/game";

function PlayButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Play NOVERA"
      className="btn-gradient group inline-flex h-36 w-full items-center justify-center gap-3 rounded-2xl text-2xl font-bold text-white shadow-[0_10px_30px_rgba(226_59_255/0.35)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_14px_40px_rgba(226_59_255/0.55)] disabled:opacity-60"
    >
      <FaPlay className="text-3xl transition-transform duration-200 group-hover:scale-110" aria-hidden />
      {pending ? "Launching?" : "Play Now"}
    </button>
  );
}

export default function LaunchButton() {
  return (
    <form action={launchGameAction} className="w-full">
      <PlayButton />
    </form>
  );
}