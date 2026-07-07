import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Pin, Zap, Hand, Footprints, Check, Heart, Leaf, ArrowRight } from "lucide-react";
import treatmentsBg from "../assets/treatments-bg.jpg";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/acupuncture")({
  head: () => ({
    meta: [
      { title: "Acupuncture & Pressure Therapies — Thulir Healthcare" },
      { name: "description", content: "Restore your body's natural energy flow with Acupuncture, Electro-Acupuncture, Acupressure, and Foot Reflexology in Coimbatore." },
      { property: "og:title", content: "Acupuncture — Thulir Healthcare" },
      { property: "og:description", content: "Safe, sterile needle therapies and pressure point healing for pain relief, nerve stimulation, and stress management." },
    ],
  }),
  component: AcupuncturePage,
});

const modalities = [
  {
    icon: Pin,
    title: "Traditional Acupuncture / அக்குபஞ்சர்",
    desc: "Uses single-use sterile hair-thin needles on specific meridian points to stimulate natural endorphins and regulate energy flow.",
  },
  {
    icon: Zap,
    title: "Electro Acupuncture / எலக்ட்ரோ அக்குபஞ்சர்",
    desc: "A modern enhancement passing a gentle, micro-current electrical pulse through needles to accelerate nerve recovery and pain relief.",
  },
  {
    icon: Hand,
    title: "Acupressure / அக்குபிரசர்",
    desc: "Needle-free therapy applying precise finger pressure to release muscular tension and promote blood circulation.",
  },
  {
    icon: Footprints,
    title: "Foot Reflexology / பாத அழுத்த சிகிச்சை",
    desc: "Massage stimulation on precise reflex zones of the feet corresponding to vital organs for overall body detoxification.",
  },
];

const benefits = [
  "Relieves chronic back pain, neck pain, and joint stiffness",
  "Reduces headache, migraine frequency and intensity",
  "Improves blood circulation and nerve regeneration",
  "Deep relaxation, stress relief and resolves insomnia",
  "Boosts digestive health and metabolism",
  "Regulates hormonal imbalances and supports immunity",
];

function AcupuncturePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={treatmentsBg}
          alt="Acupuncture therapy session"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/30" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl text-leaf-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Leaf className="h-4 w-4" /> Reflex & Meridian Therapy in Coimbatore
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl flex flex-col gap-1">
              <span>Acupuncture</span>
              <span className="text-2xl font-bold text-white/80 sm:text-3xl lg:text-4xl mt-0.5">
                அக்குபஞ்சர் சிகிச்சை
              </span>
              <span className="text-xl font-semibold text-earth sm:text-2xl lg:text-3xl mt-1.5">
                Reflexology & Pressure Therapies
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/90">
              A precise system of healing that clears blockages in the body's energy pathways (meridians) to initiate rapid, natural self-healing. பக்க விளைவுகள் இல்லாத அக்குபஞ்சர் மற்றும் பாத அழுத்த சிகிச்சை.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-leaf bg-leaf/10 px-3 py-1 rounded-full">
              Our Services / சேவைகள்
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Our Healing Modalities
            </h2>
            <p className="text-muted-foreground">
              We offer multiple forms of meridian-based and pressure therapy customized to your body's healing needs.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {modalities.map(({ icon: Icon, title, desc }) => {
              const [engTitle, tamTitle] = title.split(" / ");
              return (
                <div key={title} className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-leaf/30 hover:shadow-md flex flex-col justify-between">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-card-foreground leading-tight">
                      {engTitle}
                      {tamTitle && (
                        <span className="block text-xs font-semibold text-leaf mt-1">
                          {tamTitle}
                        </span>
                      )}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 border-t border-b border-border">
        <div className="mx-auto max-w-4xl rounded-3xl bg-card border border-border p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Proven Benefits of Acupuncture</h3>
              <p className="text-xs text-muted-foreground font-tamil mt-0.5">அக்குபஞ்சர் சிகிச்சையின் நன்மைகள்</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm font-medium text-card-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 leaf-gradient" />
        <div className="mx-auto max-w-3xl text-center text-leaf-foreground">
          <h2 className="text-3xl font-bold sm:text-4xl leading-tight flex flex-col gap-2">
            <span>Get Free Consultation Today</span>
            <span className="text-xl sm:text-2xl font-semibold text-earth">
              இன்றே இலவச ஆலோசனை பெறுங்கள்
            </span>
          </h2>
          <a
            href={`tel:+91${phoneNumber}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-base font-bold text-foreground shadow-lg transition-transform hover:scale-105"
          >
            <Phone className="h-5 w-5" /> Book Consultation: +91 {phoneNumber}
          </a>
        </div>
      </section>
    </>
  );
}
