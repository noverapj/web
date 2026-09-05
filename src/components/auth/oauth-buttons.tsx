import { FaDiscord, FaGoogle } from "react-icons/fa";

export default function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="bubble-sheen flex items-center justify-center gap-2.5 rounded-full border border-[#5865F2]/50 bg-[#5865F2]/15 px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-[#5865F2] hover:bg-[#5865F2]/25"
      >
        <FaDiscord className="text-lg" aria-hidden />
        Discord
      </button>
      <button
        type="button"
        className="bubble-sheen flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
      >
        <FaGoogle className="text-lg" aria-hidden />
        Google
      </button>
    </div>
  );
}
