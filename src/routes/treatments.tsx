import { createFileRoute } from "@tanstack/react-router";
import { Phone, Leaf, HeartPulse, ShieldCheck, Check, BookOpen, Activity, Search, Pill, Utensils, Pin, Zap, Hand, Footprints, Shield, Smile, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import aboutBg from "../assets/about-bg.jpg";
import treatmentsBg from "../assets/treatments-bg.jpg";
import { phoneNumber } from "../components/Layout";
import { fetchApi } from "@/lib/api";

export const Route = createFileRoute("/treatments")({
  component: TreatmentsPage,
});

// --- SIDDHA DATA ---
const siddhaPrinciples = [
  {
    icon: Leaf,
    title: "Vatham / வாதம்",
    desc: "Governs movement, nervous system, and joint lubrication. Imbalance causes pain and arthritis.",
    tamilDesc: "இது உடலின் அசைவுகள் மற்றும் மூட்டுகளை சீராக்குகிறது.",
  },
  {
    icon: HeartPulse,
    title: "Pitham / பித்தம்",
    desc: "Governs metabolism, digestion, and heat production. Imbalance leads to acidity, liver issues, and hair loss.",
    tamilDesc: "இது உடலின் வெப்பம் மற்றும் செரிமானத்தை சீராக்குகிறது.",
  },
  {
    icon: ShieldCheck,
    title: "Kapham / கபம்",
    desc: "Governs structure, stability, fluid balance, and immunity. Imbalance causes congestion and weight gain.",
    tamilDesc: "இது உடலின் நிலைத்தன்மை மற்றும் நோய் எதிர்ப்பு சக்தியை சீராக்குகிறது.",
  },
];

const siddhaProcessSteps = [
  {
    icon: Activity,
    title: "Pulse Diagnosis",
    tamil: "நாடி பார்த்தல்",
    desc: "We evaluate your internal health and Vatham-Pitham-Kapham balance by precisely reading your pulse.",
  },
  {
    icon: Search,
    title: "Root Cause Analysis",
    tamil: "மூல காரணம் அறிதல்",
    desc: "We analyze your symptoms and daily habits to identify the underlying cause of your illness.",
  },
  {
    icon: Pill,
    title: "Natural Medicine",
    tamil: "மூலிகை மருந்து",
    desc: "Customized, 100% natural herbal powders (Choornam) and oils formulated directly for you.",
  },
  {
    icon: Utensils,
    title: "Dietary Guidance",
    tamil: "பத்தியம்",
    desc: "Personalized dietary and lifestyle modifications (Pathiyam) to ensure a permanent cure.",
  },
];

const conditionCategories = [
  {
    title: "Joint & Bone Health",
    items: ["Joint Pain & Arthritis", "Knee Pain", "Neck Pain & Sciatica"]
  },
  {
    title: "Digestion & Metabolism",
    items: ["Ulcers & Acidity", "Constipation & Piles", "Liver Issues & Diabetes"]
  },
  {
    title: "Hair & Skin Health",
    items: ["Hair Fall & Greying", "Dandruff & Scalp Issues", "Skin Allergies & Acne"]
  },
  {
    title: "Women's & Men's Health",
    items: ["Menstrual Issues & PCOD", "Infertility Support", "Thyroid Imbalances"]
  }
];

const siddhaFaqs = [
  {
    q: "Are there any side effects to Siddha medicine?",
    a: "No. Siddha medicines are prepared using 100% natural herbs, roots, and purified minerals following strict traditional protocols. They are completely safe and side-effect free when taken under a doctor's guidance."
  },
  {
    q: "How long does it take to see results?",
    a: "Because Siddha treats the root cause rather than just suppressing symptoms, chronic conditions may take a few weeks to show significant improvement. Acute issues like indigestion or muscle sprains can see relief much faster."
  },
  {
    q: "Can I take Siddha medicine alongside Allopathic (English) medicines?",
    a: "Yes. In most cases, Siddha medicines can be safely taken alongside your regular medications. However, always inform our doctors about any medications you are currently taking so they can guide you correctly."
  },
  {
    q: "Do I have to follow strict diet restrictions (Pathiyam)?",
    a: "Pathiyam literally means 'following a disciplined lifestyle'. Depending on your condition, we may restrict certain foods (like tamarind, non-veg, or cold items) temporarily to allow the medicine to work optimally."
  }
];

// --- ACUPUNCTURE DATA ---
const acupunctureModalities = [
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

const acupunctureExpectations = [
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

const acupunctureBenefits = [
  "Relieves chronic back & neck pain",
  "Reduces headache & migraine frequency",
  "Improves nerve regeneration",
  "Induces deep relaxation & resolves insomnia",
  "Boosts digestive health & metabolism",
  "Regulates hormonal imbalances (PCOD/Thyroid)",
  "Accelerates stroke & paralysis recovery",
  "Provides rapid relief from Sciatica"
];

const acupunctureFaqs = [
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

function FaqAccordion({ faqs }: { faqs: {q: string, a: string}[] }) {
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

function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState<'siddha' | 'acupuncture'>('siddha');
  const [treatmentItems, setTreatmentItems] = useState<any[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchApi('/treatment-items');
        setTreatmentItems(data);
      } catch (err) {
        console.error("Failed to fetch treatments", err);
      }
    };
    loadItems();
  }, []);


  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <img
          src={activeTab === 'siddha' ? aboutBg : treatmentsBg}
          alt="Treatment Hero Background"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-700"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/50 backdrop-blur-[2px]" />
        
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          {/* Tabs Control */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur-md border border-white/20">
              <button
                onClick={() => setActiveTab('siddha')}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                  activeTab === 'siddha'
                    ? "bg-white text-forest shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Siddha Medicine
              </button>
              <button
                onClick={() => setActiveTab('acupuncture')}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                  activeTab === 'acupuncture'
                    ? "bg-white text-forest shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Acupuncture
              </button>
            </div>
          </div>

          {activeTab === 'siddha' ? (
            <div className="max-w-3xl text-leaf-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
                <Leaf className="h-4 w-4" /> Traditional Tamil Healing
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-white">
                Siddha Medicine <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl font-tamil text-white/90 mt-2 block">சித்த மருத்துவம்</span>
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl font-medium">
                Siddha is one of the oldest medical systems in the world, originating in Tamil Nadu. We focus on balancing your body's vital humors to achieve a permanent, side-effect-free cure.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl text-leaf-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          )}
        </div>
      </section>

      {/* Dynamic Content Based on Tab */}
      {activeTab === 'siddha' ? (
        <div className="animate-in fade-in duration-500">
          {/* Dynamic Siddha Treatments */}
          {treatmentItems.filter(t => t.category === 'SIDDHA').length > 0 && (
            <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-b border-border">
              <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    Our Specific Treatments
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {treatmentItems
                    .filter(t => t.category === 'SIDDHA')
                    .map(t => (
                      <div key={t.id} className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 w-full overflow-hidden">
                          <img src={t.image} alt={t.title} className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-3">{t.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}

          {/* Siddha Philosophy */}
          <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-b border-border">
            <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Our Philosophy
                </h2>
                <p className="mt-4 text-xl text-leaf font-semibold font-tamil">
                  "உணவே மருந்து, மருந்தே உணவு" <br /> (Food is Medicine, Medicine is Food)
                </p>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Founded by the great Sage Agasthiyar and the 18 Siddhars, the Siddha system operates on the fundamental principle that diet and lifestyle are inextricably linked to health. We believe that disease occurs when your body's natural harmony is disrupted by improper diet, lifestyle, or environmental factors.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Our goal is not merely to suppress your pain temporarily, but to restore your internal balance completely through natural means.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                  <BookOpen className="h-8 w-8 text-earth mb-4" />
                  <h4 className="font-bold text-lg text-foreground mb-2">Ancient Wisdom</h4>
                  <p className="text-sm text-muted-foreground">Thousands of years of documented herbal formulas designed to treat the root cause.</p>
                </div>
                <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                  <ShieldCheck className="h-8 w-8 text-leaf mb-4" />
                  <h4 className="font-bold text-lg text-foreground mb-2">Zero Side Effects</h4>
                  <p className="text-sm text-muted-foreground">100% natural, safe, and holistic healing without relying on harsh chemicals.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Three Humors */}
          <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  The Three Humors (முக்குற்றம்)
                </h2>
                <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                  Disease arises only when these three physiological forces are out of balance. Perfect health requires all three to be in harmony.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {siddhaPrinciples.map((prin, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                    <div className="h-16 w-16 bg-leaf/10 text-leaf rounded-full flex items-center justify-center mb-6">
                      <prin.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{prin.title}</h3>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{prin.desc}</p>
                    <p className="text-xs text-muted-foreground/80 mt-3 font-tamil">{prin.tamilDesc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Healing Process */}
          <section className="px-4 py-20 sm:px-6 lg:px-8 bg-leaf text-leaf-foreground">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-extrabold sm:text-4xl">The 4-Step Healing Process</h2>
                <p className="mt-4 text-white/90 text-lg">Our structured approach to diagnosing and treating your condition safely.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {siddhaProcessSteps.map((step, idx) => (
                  <div key={idx} className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm relative">
                    <div className="absolute top-6 right-6 text-4xl font-black text-white/10">0{idx + 1}</div>
                    <step.icon className="h-8 w-8 text-white mb-4" />
                    <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-white/70 font-tamil mb-4">{step.tamil}</p>
                    <p className="text-sm text-white/90 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Conditions We Treat */}
          <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Conditions We Treat
                </h2>
                <p className="mt-4 text-muted-foreground text-lg">
                  We provide highly effective, permanent solutions for a wide range of chronic and acute conditions.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
                {conditionCategories.map((category, idx) => (
                  <div key={idx} className="border-t-2 border-leaf pt-4">
                    <h3 className="font-bold text-xl text-foreground mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-leaf shrink-0" />
                          <span className="text-base text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* FAQ */}
          <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-t border-border">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Frequently Asked Questions (Siddha)
                </h2>
              </div>
              <FaqAccordion faqs={siddhaFaqs} />
            </div>
          </section>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          {/* Dynamic Acupuncture Treatments */}
          {treatmentItems.filter(t => t.category === 'ACUPUNCTURE').length > 0 && (
            <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-b border-border">
              <div className="mx-auto max-w-6xl">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    Our Specific Treatments
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {treatmentItems
                    .filter(t => t.category === 'ACUPUNCTURE')
                    .map(t => (
                      <div key={t.id} className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 w-full overflow-hidden">
                          <img src={t.image} alt={t.title} className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-3">{t.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}

          {/* Acupuncture Science */}
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

          {/* What to Expect */}
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
                {acupunctureExpectations.map((item, idx) => (
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

          {/* Modalities */}
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
                {acupunctureModalities.map((modality, idx) => (
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

          {/* Benefits */}
          <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <h3 className="text-3xl font-extrabold text-foreground sm:text-4xl">Proven Benefits</h3>
                <p className="text-lg text-muted-foreground font-tamil mt-3">அக்குபஞ்சர் சிகிச்சையின் நன்மைகள்</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {acupunctureBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 border-b border-border/50 pb-4">
                    <Check className="h-5 w-5 text-leaf shrink-0" />
                    <span className="text-base font-medium text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>





          {/* FAQ */}
          <section className="px-4 py-20 sm:px-6 lg:px-8 bg-card/30 border-t border-border">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Frequently Asked Questions (Acupuncture)
                </h2>
              </div>
              <FaqAccordion faqs={acupunctureFaqs} />
            </div>
          </section>
        </div>
      )}

      {/* Global CTA Section */}
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
