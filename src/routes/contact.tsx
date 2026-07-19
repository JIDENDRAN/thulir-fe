import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Leaf, Send, User } from "lucide-react";
import contactBg from "../assets/contact-bg.jpg";
import { phoneNumber, email, address } from "../components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Thulir Healthcare — Siddha & Acupuncture Clinic Coimbatore" },
      { name: "description", content: "Visit Thulir Healthcare at TVS Nagar, Coimbatore. Call 9944250948 or email allwin948@gmail.com for a free consultation." },
      { property: "og:title", content: "Contact Thulir Healthcare" },
      { property: "og:description", content: "Free consultation. Home service within 5 km. Call 9944250948." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const items: Array<{ icon: typeof Phone; title: string; value: string; href?: string; external?: boolean }> = [
    { icon: Phone, title: "Call Us / அலைபேசி", value: `+91 ${phoneNumber}`, href: `tel:+91${phoneNumber}` },
    { icon: MessageCircle, title: "WhatsApp / வாட்ஸ்அப்", value: `+91 ${phoneNumber}`, href: `https://wa.me/91${phoneNumber}`, external: true },
    { icon: Mail, title: "Email / மின்னஞ்சல்", value: email, href: `mailto:${email}` },
    { icon: Clock, title: "Timings / நேரம்", value: "Mon – Sat, 9 AM – 8 PM" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const formattedMsg = [
      `*New Inquiry — Thulir Healthcare*`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* +91 ${phone}`,
      `*Message:* ${message}`,
      ``,
      `Please get back to me. Thank you 🙏`
    ].join("\n");

    const waUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(formattedMsg)}`;
    window.open(waUrl, "_blank", "noopener");
  };

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={contactBg} alt="Green medicinal leaves" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/30" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl text-leaf-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Leaf className="h-4 w-4" /> Get in Touch / தொடர்பு கொள்ள
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl flex flex-col gap-1">
              <span>Contact Us</span>
              <span className="text-2xl font-bold text-white/80 sm:text-3xl lg:text-4xl mt-0.5">
                தொடர்பு கொள்ள
              </span>
              <span className="text-xl font-semibold text-earth sm:text-2xl lg:text-3xl mt-1.5">
                Free Medical Consultation
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Call us today for a free consultation. Home service available within 5 km of the clinic in Coimbatore.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl space-y-16">
          {/* Top Quick Contact Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ icon: Icon, title, value, href, external }) => {
              const [engTitle, tamTitle] = title.split(" / ");
              const content = (
                <div className="flex items-center gap-4 w-full">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf/10 text-leaf transition-colors group-hover:bg-leaf group-hover:text-leaf-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none">
                      {engTitle}
                    </span>
                    {tamTitle && (
                      <span className="block text-[11px] font-semibold text-leaf font-tamil leading-none mt-1">
                        {tamTitle}
                      </span>
                    )}
                    <span className="block mt-1.5 text-[15px] font-bold text-foreground truncate tracking-tight">
                      {value}
                    </span>
                  </div>
                </div>
              );
              const cls = "group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-leaf/30 hover:shadow-md flex items-center justify-between cursor-default";
              if (href) {
                return (
                  <a key={title} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={`${cls} cursor-pointer`}>
                    {content}
                  </a>
                );
              }
              return <div key={title} className={cls}>{content}</div>;
            })}
          </div>

          {/* Main Grid: Form and Map */}
          <div className="grid gap-8 lg:grid-cols-12 items-stretch">
            
            {/* Left Side: Map & Address Details (Spans 5 cols) */}
            <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col h-full">
              <div className="flex gap-4 mb-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Visit Our Clinic</h3>
                  <p className="text-xs text-muted-foreground font-tamil mt-0.5">எங்களது முகவரி</p>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                    {address.street} {address.area} {address.city}, Tamil Nadu
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Thulir+Healthcare+TVS+Nagar+Coimbatore"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-2xl border border-border shadow-sm bg-card flex-1 min-h-[300px]">
                <iframe
                  title="Thulir Healthcare location"
                  src="https://www.google.com/maps?q=TVS+Nagar+Bus+Stop,+Thadagam+Road,+Coimbatore&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Side: Message Form (Spans 7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm space-y-6 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Send us a Message</h3>
                <p className="text-xs text-muted-foreground font-tamil mt-0.5">மின்னஞ்சல் / வாட்ஸ்அப் செய்தி அனுப்ப</p>
                <p className="text-sm text-muted-foreground mt-3">
                  Have any questions or health concerns? Write to us, and we will get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Your Name / பெயர் *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          <User className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2.5 text-sm text-foreground focus:border-leaf focus:outline-none"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Phone Number / தொலைபேசி *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                        </span>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2.5 text-sm text-foreground focus:border-leaf focus:outline-none"
                          placeholder="10-digit number"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Message / உங்கள் செய்தி *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-leaf focus:outline-none"
                      placeholder="Describe your symptoms or health queries here..."
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground shadow-md transition-transform hover:scale-102 hover:bg-leaf/90 cursor-pointer"
                  >
                    <Send className="h-4 w-4" /> Send Inquiry via WhatsApp
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
