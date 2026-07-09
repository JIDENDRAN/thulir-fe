import { createFileRoute } from "@tanstack/react-router";
import { Phone, Pin, Zap, Hand, Footprints, Check, Heart, Leaf, Shield, Activity, Smile, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import treatmentsBg from "../assets/treatments-bg.jpg";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/acupuncture")({
  component: AcupuncturePage,
});

const modalities = [
  {
    icon: Pin,
    title: "Traditional Acupuncture",
    tamil: "அக்குபஞ்சர்",
    desc: "Single-use, sterile needles placed on meridian points to stimulate endorphins and regulate the flow of Qi (energy).",
  },
  {
    icon: Zap,
    title: "Electro Acupuncture",
    tamil: "எலக்ட்ரோ அக்குபஞ்சர்",
    desc: "A micro-current electrical pulse passed through the needles. Highly effective for nerve damage and chronic pain management.",
  },
  {
    icon: Hand,
    title: "Acupressure",
    tamil: "அக்குபிரசர்",
    desc: "Needle-free therapy applying precise finger pressure to key acupoints. Excellent for releasing deep muscular tension.",
  },
  {
    icon: Footprints,
    title: "Foot Reflexology",
    tamil: "பாத அழுத்த சிகிச்சை",
    desc: "Targeted massage stimulation on precise reflex zones of the feet, promoting overall body detoxification and relaxation.",
  },
];

const expectations = [
  {
    icon: Shield,
    title: "100% Safe & Sterile",
    desc: "We strictly use disposable, single-use surgical steel needles. There is zero risk of infection.",
  },
  {
    icon: Smile,
    title: "Virtually Painless",
    desc: "Needles are thinner than a human hair. Most patients feel only a tiny tap.",
  },
  {
    icon: Activity,
    title: "Deeply Relaxing",
    desc: "Patients often fall asleep during the 30-min session due to natural endorphin release.",
  },
];

const benefits = [
  "Relieves chronic back & neck pain",
  "Reduces headache & migraine frequency",
  "Improves nerve regeneration",
  "Induces deep relaxation & resolves insomnia",
  "Boosts digestive health & metabolism",
  "Regulates hormonal imbalances (PCOD/Thyroid)",
  "Accelerates stroke & paralysis recovery",
  "Provides rapid relief from Sciatica"
];

const faqs = [
  {
    q: "Does Acupuncture hurt?",
    a: "No. The needles used are completely different from injection needles—they are solid, flexible, and thinner than a strand of hair. You might feel a dull ache or a slight tingling sensation (which indicates the energy is flowing), but it is not painful."
  },
  {
    q: "How many sessions will I need?",
    a: "This depends entirely on your condition. Acute issues (like a recent muscle sprain) may require only 2-3 sessions. Chronic conditions (like severe arthritis or paralysis) may require 10-15 sessions. We will discuss a personalized treatment plan during your consultation."
  },
  {
    q: "Is it safe during pregnancy?",
    a: "Yes, acupuncture is very safe during pregnancy when performed by a trained professional. It can effectively relieve morning sickness, lower back pain, and help balance hormones."
  },
  {
    q: "What should I wear to my appointment?",
    a: "Please wear loose, comfortable clothing. We often need access to your arms, lower legs, and back depending on your specific treatment plan."
  }
];

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="border border-border bg-card rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none bg-card hover:bg-muted/50 transition-colors"
            >
              <h4 className="text-base sm:text-lg font-bold text-foreground">
                {faq.q}
              </h4>
              <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${isOpen ? 'rotate-180 bg-leaf text-white' : 'bg-muted text-muted-foreground'}`}>
                <ChevronDown className="h-5 w-5" />
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-border/50">
                {faq.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AcupuncturePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <img
          src={treatmentsBg}
          alt="Acupuncture therapy session"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/50 backdrop-blur-[2px]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl text-leaf-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Leaf className="h-4 w-4" /> Meridian Therapy in Coimbatore
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-white">
              Acupuncture <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-tamil text-white/90 mt-2 block">அக்குபஞ்சர் சிகிச்சை</span>
            </h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl font-medium">
              A highly precise system of healing that clears blockages in the body's energy pathways to initiate rapid, natural self-healing. Pain-free, chemical-free, and highly effective.
            </p>
          </div>
        </div>
      </section>

      {/* Structure 1: Clean Split Layout (How it Works) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-b border-border">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              The Science of Qi
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              According to ancient medical principles, your body's life energy (called "Qi" or "Prana") flows through specific pathways known as Meridians. Stress, poor diet, injury, or emotional trauma can block this flow, leading to pain and illness.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              By inserting ultra-fine needles into specific "Acupoints" along these meridians, we remove these blockages. This signals the nervous system to release endorphins (natural painkillers) and boosts blood flow, effectively telling your body to heal itself.
            </p>
          </div>
          <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6">The Healing Response</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                <p className="text-muted-foreground">Releases natural painkillers (Endorphins).</p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                <p className="text-muted-foreground">Increases micro-circulation in injured tissues.</p>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-leaf shrink-0 mt-0.5" />
                <p className="text-muted-foreground">Resets the nervous system to 'rest and digest'.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Structure 2: 3-Column Standard Cards (What to Expect) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              What to Expect During Your Session
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Our acupuncture sessions are designed to be safe, comfortable, and deeply restorative.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {expectations.map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf/10 text-leaf mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure 3: Standard 2x2 Grid (Our Modalities) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-leaf/5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Our Healing Modalities
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer multiple forms of meridian-based therapy, customizing the approach to exactly what your body needs.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {modalities.map((modality, idx) => (
              <div key={idx} className="bg-background border border-border rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:border-leaf/50 transition-colors">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf/10 text-leaf mt-1">
                  <modality.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{modality.title}</h3>
                  <p className="text-xs text-leaf font-semibold font-tamil mb-2">{modality.tamil}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{modality.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure 4: Grouped 2-Column Checklist (Benefits) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-extrabold text-foreground sm:text-4xl">Proven Benefits</h3>
            <p className="text-lg text-muted-foreground font-tamil mt-3">அக்குபஞ்சர் சிகிச்சையின் நன்மைகள்</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 border-b border-border/50 pb-4">
                <Check className="h-5 w-5 text-leaf shrink-0" />
                <span className="text-base font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure 5: Accordion (FAQ) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 leaf-gradient" />
        <div className="mx-auto max-w-4xl text-center text-leaf-foreground">
          <h2 className="text-3xl font-bold sm:text-5xl leading-tight text-white">
            Ready to start your healing journey?
          </h2>
          <p className="mt-4 text-xl font-semibold text-earth font-tamil">
            இன்றே இலவச ஆலோசனை பெறுங்கள்
          </p>
          <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto">
            Book an appointment today to meet with our experienced doctors and take the first step towards a healthier, pain-free life.
          </p>
          <a
            href={`tel:+91${phoneNumber}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-lg font-bold text-foreground shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <Phone className="h-5 w-5" /> Book Consultation: +91 {phoneNumber}
          </a>
        </div>
      </section>
    </div>
  );
}
