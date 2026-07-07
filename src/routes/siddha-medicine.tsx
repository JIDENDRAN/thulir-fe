import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Leaf, HeartPulse, ShieldCheck, Sparkles, Check, ArrowRight } from "lucide-react";
import aboutBg from "../assets/about-bg.jpg";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/siddha-medicine")({
  head: () => ({
    meta: [
      { title: "Siddha Medicine | traditional Tamil Healing — Thulir Healthcare" },
      { name: "description", content: "Experience time-tested Siddha Medicine in Coimbatore. We use traditional herbs, minerals & lifestyle guidance to restore Vatham, Pitham, and Kapham." },
      { property: "og:title", content: "Siddha Medicine — Thulir Healthcare" },
      { property: "og:description", content: "Natural, side-effect-free Siddha treatments for chronic health issues, joint pain, hair, and digestion." },
    ],
  }),
  component: SiddhaMedicine,
});

const principles = [
  {
    icon: Leaf,
    title: "Vatham / வாதம்",
    desc: "Governs movement, nervous system, and joint lubrication. Imbalance causes pain and arthritis. இது உடலின் அசைவுகள் மற்றும் மூட்டுகளை சீராக்குகிறது.",
  },
  {
    icon: HeartPulse,
    title: "Pitham / பித்தம்",
    desc: "Governs metabolism, digestion, and heat production. Imbalance leads to acidity, liver issues, and hair loss. இது உடலின் வெப்பம் மற்றும் செரிமானத்தை சீராக்குகிறது.",
  },
  {
    icon: ShieldCheck,
    title: "Kapham / கபம்",
    desc: "Governs structure, stability, fluid balance, and immunity. Imbalance causes congestion and weight gain. இது உடலின் நிலைத்தன்மை மற்றும் நோய் எதிர்ப்பு சக்தியை சீராக்குகிறது.",
  },
];

const features = [
  {
    title: "Natural Herbs & Minerals",
    desc: "Herbal powders (Choornam), oils (Thailam), capsules, and traditional formulations sourced purely from nature.",
  },
  {
    title: "Root-Cause Diagnosis",
    desc: "Pulse diagnosis (Naadi paarthal) and looking at physical symptoms to identify the root imbalance.",
  },
  {
    title: "Lifestyle & Food Guidance",
    desc: "Practical dietary guidelines aligned with your body constitution to ensure permanent recovery.",
  },
];

const conditions = [
  "மூட்டு வலி / வாத நோய்கள் (Joint & Arthritis pain)",
  "தலைமுடி உதிர்வு / இளநரை (Hair fall & Premature greying)",
  "செரிமான கோளாறுகள் / அல்சர் (Indigestion & Ulcers)",
  "மலச்சிக்கல் / மூலம் (Constipation & Piles)",
  "சர்க்கரை / கல்லீரல் பாதிப்பு (Diabetes & Liver disorders)",
  "சைனஸ் / அலர்ஜி (Sinusitis & Dust allergies)",
  "நரம்புத் தளர்ச்சி (Nervous weakness)",
  "ஹார்மோன் / மாதவிடாய் கோளாறுகள் (Hormonal & Uterine issues)",
  "குழந்தையின்மை (Infertility)",
  "உடல் எடை மேலாண்மை (Weight loss & gain)",
];

function SiddhaMedicine() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={aboutBg}
          alt="Traditional Siddha medicinal herbs and preparation"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/30" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl text-leaf-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Leaf className="h-4 w-4" /> Tamil Traditional Healing in Coimbatore
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl flex flex-col gap-1">
              <span>Siddha Medicine</span>
              <span className="text-2xl font-bold text-white/80 sm:text-3xl lg:text-4xl mt-0.5">
                சித்த மருத்துவம்
              </span>
              <span className="text-xl font-semibold text-earth sm:text-2xl lg:text-3xl mt-1.5">
                Balancing Body, Mind & Spirit
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/90">
              One of the oldest medical systems in the world, Siddha focuses on balancing body humors using natural herbs, minerals, and lifestyle corrections. பக்க விளைவுகள் இல்லாத சித்த சிகிச்சை.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-leaf bg-leaf/10 px-3 py-1 rounded-full">
              Siddha Humors / முக்குற்றம்
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              The Three Humors (முக்குற்றம்)
            </h2>
            <p className="text-muted-foreground">
              According to Siddha philosophy, the human body is governed by three physiological forces. Perfect health is maintained when these are in balance.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map(({ icon: Icon, title, desc }) => {
              const [engTitle, tamTitle] = title.split(" / ");
              const [engDesc, tamDesc] = desc.split(". ");
              return (
                <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-leaf/30 hover:shadow-lg flex flex-col justify-between">
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
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{engDesc}.</p>
                    {tamDesc && (
                      <p className="mt-1.5 text-xs text-muted-foreground/75 leading-relaxed border-t border-border/40 pt-1.5 font-tamil">
                        {tamDesc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 border-t border-b border-border">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 items-start">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-leaf bg-leaf/10 px-3 py-1 rounded-full">
                Our Approach / சிகிச்சை முறை
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-3">
                Our Siddha Approach
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                At Thulir Healthcare, our Siddha treatments are strictly natural and side-effect free. We focus on long-term wellness rather than quick symptom relief.
              </p>
            </div>
            <div className="space-y-6 pt-4">
              {features.map(({ title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-leaf-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm">
            <h3 className="text-2xl font-bold text-foreground">Conditions Treated</h3>
            <p className="text-xs text-muted-foreground font-tamil mt-0.5 mb-6">சிகிச்சை அளிக்கப்படும் நோய்கள்</p>
            <div className="space-y-3.5">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-card-foreground">{condition}</span>
                </div>
              ))}
            </div>
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
