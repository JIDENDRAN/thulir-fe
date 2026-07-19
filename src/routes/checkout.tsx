import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Smartphone, Truck, MessageCircle, Lock } from "lucide-react";
import { useCart, inr } from "@/lib/cart";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Thulir Healthcare" },
      { name: "description", content: "Complete your herbal products order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

type Method = "online" | "cod";

function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("online");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
    notes: "",
  });

  const isTamilNadu = form.state === "Tamil Nadu";
  const shipping = method === "online" ? 0 : (isTamilNadu ? 100 : 200);
  const grand = total + shipping;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/products" className="mt-6 inline-block rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground">
          Shop Products
        </Link>
      </section>
    );
  }

  const canSubmit =
    form.name.trim() && /^\d{10}$/.test(form.phone) && form.address.trim() && /^\d{6}$/.test(form.pincode);

  const buildWhatsAppMessage = (orderId: string, paymentStatus: string) => {
    const lines = [
      `*New Order — Thulir Healthcare*`,
      `Order ID: ${orderId}`,
      ``,
      `*Customer:* ${form.name}`,
      `*Phone:* +91 ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : "",
      `*Address:* ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      form.notes ? `*Notes:* ${form.notes}` : "",
      ``,
      `*Items:*`,
      ...items.map((i) => `• ${i.title} × ${i.qty} — ${inr(i.price * i.qty)}`),
      ``,
      `Subtotal: ${inr(total)}`,
      `Shipping: ${shipping === 0 ? "Free" : inr(shipping)}`,
      `*Total: ${inr(grand)}*`,
      ``,
      `Payment: ${paymentStatus}`,
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  };

  const placeOrder = async () => {
    if (!canSubmit) return;
    setPlacing(true);

    try {
      const { fetchApi } = await import('@/lib/api');
      const order = await fetchApi('/orders', {
        method: 'POST',
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          email: form.email,
          address: `${form.address}, ${form.state}`,
          city: form.city,
          pincode: form.pincode,
          notes: form.notes,
          paymentMethod: method,
          totalAmount: grand,
          items: items.map(i => ({ id: i.id, qty: i.qty, price: i.price }))
        })
      });

      const orderId = order.id.slice(0, 8).toUpperCase();

      if (method === "cod") {
        const msg = buildWhatsAppMessage(orderId, "Cash on Delivery");
        const waUrl = `https://wa.me/91${phoneNumber}?text=${msg}`;
        clear();
        window.open(waUrl, "_blank", "noopener");
        navigate({ to: "/order-success", search: { id: orderId } });
        return;
      }

      // --- CASHFREE ONLINE PAYMENT ---
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        try {
          const { fetchApi } = await import('@/lib/api');
          const session = await fetchApi('/payments/create-cf-order', {
            method: 'POST',
            body: JSON.stringify({ orderId: order.id })
          });
          
          if (session.payment_session_id) {
            const cfEnv = import.meta.env.VITE_CASHFREE_ENV || "sandbox";
            const cashfree = (window as any).Cashfree({ mode: cfEnv });
            cashfree.checkout({
              paymentSessionId: session.payment_session_id,
              redirectTarget: "_self",
            });
          } else {
            alert("Failed to initialize payment gateway.");
            setPlacing(false);
          }
        } catch (err) {
          console.error(err);
          alert("Failed to contact payment server.");
          setPlacing(false);
        }
      };
      script.onerror = () => {
        alert("Failed to load Cashfree script.");
        setPlacing(false);
      };
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Fill your delivery details. Order confirmation will be sent via WhatsApp.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Delivery Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name*">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Phone (10-digit)*">
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} className={inputCls} inputMode="numeric" />
              </Field>
              <Field label="Email" className="sm:col-span-2">
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Address*" className="sm:col-span-2">
                <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} className={inputCls} />
              </Field>
              <Field label="City">
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
              </Field>
              <Field label="State*">
                <select 
                  value={form.state} 
                  onChange={(e) => setForm({ ...form, state: e.target.value })} 
                  className={inputCls}
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Other State">Other State</option>
                </select>
              </Field>
              <Field label="Pincode*">
                <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })} className={inputCls} inputMode="numeric" />
              </Field>
              <Field label="Order Notes" className="sm:col-span-2">
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className={inputCls} />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold">Payment Method</h2>
            <div className="mt-4 grid gap-3">
              <PayOption current={method} value="online" onChange={setMethod} icon={<CreditCard className="h-5 w-5" />} title="Pay Online" desc="UPI, Credit/Debit Cards, Netbanking via Cashfree" />
              <PayOption current={method} value="cod" onChange={setMethod} icon={<Truck className="h-5 w-5" />} title="Cash on Delivery" desc="Pay when your order arrives" />
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> Your details are shared only with the clinic via WhatsApp.
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <ul className="mt-4 divide-y divide-border text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3 py-2">
                <span className="text-muted-foreground">{i.title} × {i.qty}</span>
                <span className="font-medium">{inr(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(total)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : inr(shipping)}</dd></div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt><dd className="font-bold text-leaf">{inr(grand)}</dd>
            </div>
          </dl>
          <button
            onClick={placeOrder}
            disabled={!canSubmit || placing}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground disabled:opacity-50"
          >
            <MessageCircle className="h-4 w-4" />
            {placing ? "Placing Order..." : `Place Order — ${inr(grand)}`}
          </button>
        </aside>
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function PayOption({ current, value, onChange, icon, title, desc }: {
  current: Method; value: Method; onChange: (m: Method) => void; icon: React.ReactNode; title: string; desc: string;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${active ? "border-leaf bg-leaf/5" : "border-border hover:border-leaf/60"}`}
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${active ? "bg-leaf text-leaf-foreground" : "bg-muted text-foreground"}`}>{icon}</span>
      <span className="flex-1">
        <span className="block font-semibold text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
      <span className={`h-4 w-4 rounded-full border-2 ${active ? "border-leaf bg-leaf" : "border-border"}`} />
    </button>
  );
}
