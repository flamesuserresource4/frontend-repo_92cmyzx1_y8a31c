import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Menu({ onAdd }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/menu`);
        if (!res.ok) throw new Error("Failed to load menu");
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section id="menu" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-4">Menu</h2>
        <p className="text-white/70">Loading menu...</p>
      </section>
    );
  }

  return (
    <section id="menu" className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">Menu</h2>
        <button
          onClick={async () => {
            await fetch(`${API}/api/seed`, { method: "POST" });
            const res = await fetch(`${API}/api/menu`);
            setItems(await res.json());
          }}
          className="text-sm px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20"
        >
          Seed demo items
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-semibold">{p.title}</h3>
                <span className="text-indigo-300 font-semibold">${p.price.toFixed(2)}</span>
              </div>
              <p className="text-white/70 text-sm mb-3">{p.description}</p>
              <button
                onClick={() => onAdd(p)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
