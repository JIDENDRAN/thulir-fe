import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Home, Loader2 } from "lucide-react";
import { z } from "zod";
import { phoneNumber } from "../components/Layout";
import { useEffect, useState } from "react";
import { fetchApi } from "../lib/api";

export const Route = createFileRoute("/order-success")({
  validateSearch: z.object({ id: z.string().optional(), cf_order_id: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Order Placed — Thulir Healthcare" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Success,
});

function Success() {
  const { id, cf_order_id } = Route.useSearch();
  const [verifying, setVerifying] = useState(!!cf_order_id);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cf_order_id && id) {
      fetchApi('/payments/verify-cf', {
        method: 'POST',
        body: JSON.stringify({ orderId: id })
      })
      .then(res => {
        if (!res.success) setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setVerifying(false));
    }
  }, [cf_order_id, id]);

  if (verifying) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <Loader2 className="mx-auto h-12 w-12 text-leaf animate-spin" />
        <h1 className="mt-6 text-2xl font-bold text-foreground">Verifying Payment...</h1>
        <p className="mt-2 text-muted-foreground">Please do not close this window.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="mt-6 text-3xl font-bold text-red-600">Payment Issue</h1>
        <p className="mt-4 text-muted-foreground">We could not verify your payment automatically. If your money was deducted, please contact us on WhatsApp.</p>
        <Link to="/checkout" className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground">Return to Checkout</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <CheckCircle2 className="mx-auto h-20 w-20 text-leaf" />
      <h1 className="mt-6 text-3xl font-bold text-foreground">Order Placed Successfully!</h1>
      {id && <p className="mt-2 text-muted-foreground">Order ID: <span className="font-mono font-semibold text-foreground">{id}</span></p>}
      <p className="mt-4 text-muted-foreground">
        We've sent your order details to our WhatsApp. Our team will confirm within a few hours.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={`https://wa.me/91${phoneNumber}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground"
        >
          <MessageCircle className="h-4 w-4" /> Message us on WhatsApp
        </a>
        <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground">
          <Home className="h-4 w-4" /> Back Home
        </Link>
      </div>
    </section>
  );
}
