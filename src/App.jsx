import { useState } from "react";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Cart from "./components/Cart";

const API = import.meta.env.VITE_BACKEND_URL || "";

function App() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.title === p.title);
      if (existing) {
        return prev.map((i) => (i.title === p.title ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { title: p.title, price: p.price, qty: 1 }];
    });
  };

  const removeFromCart = (title) => {
    setCart((prev) => prev.filter((i) => i.title !== title));
  };

  const placeOrder = async (total) => {
    try {
      setSubmitting(true);
      const items = cart.map((c) => ({
        product_id: c.title,
        title: c.title,
        price: c.price,
        quantity: c.qty,
      }));
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_name: customerName, items }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("Order failed");
      alert(`Order placed! Total: $${data.total.toFixed(2)}`);
      setCart([]);
      setCustomerName("");
    } catch (e) {
      alert("Sorry, something went wrong placing your order.");
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Hero onOrderClick={() => {
        const el = document.getElementById("menu");
        el?.scrollIntoView({ behavior: "smooth" });
      }} />
      <Menu onAdd={addToCart} />
      <Cart
        items={cart}
        onRemove={removeFromCart}
        onCheckout={placeOrder}
        customerName={customerName}
        setCustomerName={setCustomerName}
        submitting={submitting}
      />
      <footer className="max-w-6xl mx-auto px-6 py-10 text-white/60">
        © {new Date().getFullYear()} Blue Bean Coffee
      </footer>
    </div>
  );
}

export default App;
