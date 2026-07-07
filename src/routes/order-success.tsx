import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Home } from "lucide-react";
import { z } from "zod";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/order-success")({
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Order Placed — Thulir Healthcare" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Success,
});

function Success() {
  const { id } = Route.useSearch();
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
