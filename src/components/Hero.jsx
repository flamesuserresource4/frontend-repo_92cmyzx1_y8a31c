import { Coffee } from "lucide-react";

export default function Hero({ onOrderClick }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(124,58,237,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.25),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm mb-4">
            <Coffee className="w-4 h-4" /> Freshly brewed daily
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Blue Bean Coffee
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8">
            Specialty coffee and baked goods. Order ahead and skip the line.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={onOrderClick} className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold shadow-lg shadow-indigo-500/30 transition">
              Order Now
            </button>
            <a href="#menu" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition">
              View Menu
            </a>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" alt="Coffee" className="rounded-2xl shadow-2xl shadow-black/40 border border-white/10" />
          <div className="absolute -bottom-4 -left-4 bg-black/50 backdrop-blur border border-white/10 text-white px-4 py-3 rounded-xl text-sm">
            Open 7am - 6pm
          </div>
        </div>
      </div>
    </section>
  );
}
