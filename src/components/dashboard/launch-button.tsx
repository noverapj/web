"use client";

import { useActionState } from "react";
import { FaPlay } from "react-icons/fa";
import { launchGameAction } from "@/actions/game";

function PlayButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Play NOVERA"
      className="btn-gradient group inline-flex h-36 w-full items-center justify-center gap-3 rounded-2xl text-2xl font-bold text-white shadow-[0_10px_30px_rgba(226_59_255/0.35)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_14px_40px_rgba(226_59_255/0.55)] disabled:opacity-60"
    >
      <FaPlay className="text-3xl transition-transform duration-200 group-hover:scale-110" aria-hidden />
      {pending ? "Launching..." : "Play Now"}
    </button>
  );
}

export default function LaunchButton() {
  const [state, formAction, pending] = useActionState(launchGameAction, {});

  return (
    <form action={formAction} className="w-full">
      <PlayButton pending={pending} />
      {state.error && (
        <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-center text-xs font-semibold text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}