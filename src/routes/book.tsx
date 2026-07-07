import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MessageCircle, User, Phone as PhoneIcon, Stethoscope, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Appointment — Thulir Healthcare Siddha & Acupuncture Clinic" },
      { name: "description", content: "Book a free consultation at Thulir Healthcare. Choose your date, time and treatment — confirmation via WhatsApp." },
      { property: "og:title", content: "Book Free Consultation — Thulir Healthcare" },
      { property: "og:description", content: "Free Siddha & Acupuncture consultation in Coimbatore. Instant WhatsApp confirmation." },
    ],
  }),
  component: BookPage,
});

const TREATMENTS = [
  "Siddha Consultation",
  "Acupuncture",
  "Electro Acupuncture",
  "Acupressure",
  "Foot Reflexology",
  "Naturopathy",
  "General Wellness",
];

const SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];

function BookPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    treatment: TREATMENTS[0],
    concern: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    form.name.trim() && /^\d{10}$/.test(form.phone) && date && slot && form.treatment;

  const submit = async () => {
    if (!canSubmit || !date) return;
    setSubmitting(true);
    const dateStr = format(date, "EEEE, dd MMM yyyy");
    
    try {
      // 1. Save to backend
      const { fetchApi } = await import('@/lib/api');
      const appointment = await fetchApi('/appointments', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          age: form.age,
          treatment: form.treatment,
          concern: form.concern,
          date: date.toISOString(),
          slot
        })
      });

      const bookingId = appointment.id.slice(0, 8).toUpperCase();

      // 2. Format WhatsApp message
      const msg = [
        `*New Appointment Request — Thulir Healthcare*`,
        `Booking ID: ${bookingId}`,
        ``,
        `*Name:* ${form.name}`,
        `*Phone:* +91 ${form.phone}`,
        form.age ? `*Age:* ${form.age}` : "",
        ``,
        `*Date:* ${dateStr}`,
        `*Time:* ${slot}`,
        `*Treatment:* ${form.treatment}`,
        form.concern ? `*Concern:* ${form.concern}` : "",
        ``,
        `Please confirm my appointment. Thank you 🙏`,
      ].filter(Boolean).join("\n");

      const waUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank", "noopener");
      setTimeout(() => navigate({ to: "/order-success", search: { id: bookingId } }), 500);
    } catch (error) {
      console.error(error);
      alert("Failed to submit appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-earth">Free Consultation</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Book Your Appointment</h1>
        <p className="mt-3 text-muted-foreground">
          சிகிச்சை நேரம் பதிவு செய்யுங்கள் — WhatsApp வழியாக உறுதிப்படுத்தப்படும்
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name*" icon={<User className="h-4 w-4" />}>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Phone (10-digit)*" icon={<PhoneIcon className="h-4 w-4" />}>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                className={inputCls}
                inputMode="numeric"
                placeholder="9876543210"
              />
            </Field>
            <Field label="Age">
              <input value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value.replace(/\D/g, "").slice(0, 3) })} className={inputCls} inputMode="numeric" />
            </Field>
            <Field label="Treatment*" icon={<Stethoscope className="h-4 w-4" />}>
              <select value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} className={inputCls}>
                {TREATMENTS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Concern / Symptoms">
            <textarea value={form.concern} onChange={(e) => setForm({ ...form, concern: e.target.value })} rows={3} className={inputCls} placeholder="Briefly describe your health concern..." />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Preferred Date*" icon={<CalendarIcon className="h-4 w-4" />}>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(inputCls, "text-left", !date && "text-muted-foreground")}>
                    {date ? format(date, "PPP") : "Pick a date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field label="Preferred Time*" icon={<Clock className="h-4 w-4" />}>
              <div className="flex items-center rounded-lg border border-input bg-background px-3 py-2 text-sm">
                {slot || <span className="text-muted-foreground">Select a slot below</span>}
              </div>
            </Field>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-foreground">Available Time Slots</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-xs font-medium transition-colors",
                    slot === s
                      ? "border-leaf bg-leaf text-leaf-foreground"
                      : "border-border bg-background text-foreground hover:border-leaf",
                  )}
                >
                  {slot === s && <Check className="mr-1 inline h-3 w-3" />}
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={submit}
            disabled={!canSubmit || submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground disabled:opacity-50"
          >
            <MessageCircle className="h-4 w-4" />
            {submitting ? "Sending..." : "Confirm via WhatsApp"}
          </button>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-leaf/5 p-6">
          <h3 className="text-lg font-bold text-foreground">Why Book Online?</h3>
          <ul className="space-y-3 text-sm text-foreground">
            {[
              "Free first consultation",
              "Instant WhatsApp confirmation",
              "Skip the waiting line",
              "Choose your convenient slot",
              "Side-effect-free Siddha treatments",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-background p-4 text-sm">
            <p className="font-semibold">Need help?</p>
            <a href={`tel:+91${phoneNumber}`} className="mt-1 flex items-center gap-2 text-leaf">
              <PhoneIcon className="h-4 w-4" /> +91 {phoneNumber}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf";

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
        {icon}{label}
      </span>
      {children}
    </label>
  );
}
