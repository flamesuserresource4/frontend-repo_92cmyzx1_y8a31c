import { useMemo } from "react";
import { Trash2 } from "lucide-react";

export default function Cart({ items, onRemove, onCheckout, customerName, setCustomerName, submitting }) {
  const total = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-white mb-4">Your Order</h2>
      {items.length === 0 ? (
        <p className="text-white/70">Your cart is empty.</p>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <ul className="divide-y divide-white/10">
            {items.map((it) => (
              <li key={it.title} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">{it.title} <span className="text-white/60">× {it.qty}</span></p>
                  <p className="text-white/60 text-sm">${it.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-indigo-300 font-semibold">${(it.price * it.qty).toFixed(2)}</p>
                  <button onClick={() => onRemove(it.title)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <div className="w-full sm:w-1/2">
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-white/80">Total:</p>
              <p className="text-2xl font-bold text-white">${total.toFixed(2)}</p>
              <button
                disabled={submitting || !customerName || items.length === 0}
                onClick={() => onCheckout(total)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-semibold"
              >
                {submitting ? "Placing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
