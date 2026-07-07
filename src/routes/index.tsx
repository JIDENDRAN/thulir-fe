import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowRight, Leaf, ShieldCheck, HeartPulse, Sparkles, Clock, Award, Users, CheckCircle2, Stethoscope, Activity } from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";
import treatmentsBg from "../assets/treatments-bg.jpg";
import productsBg from "../assets/products-bg.jpg";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thulir Healthcare | Siddha & Acupuncture Clinic in Coimbatore" },
      { name: "description", content: "Side-effect-free Siddha medicine, Acupuncture, Electro Acupuncture, Acupressure & natural therapies in Coimbatore. Free consultation: 9944250948." },
      { property: "og:title", content: "Thulir Healthcare | Siddha & Acupuncture Clinic" },
      { property: "og:description", content: "Natural healing rooted in tradition. Book your free consultation today." },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: ShieldCheck, title: "Side-effect free / பக்க விளைவுகள் இல்லை", desc: "Safe treatments with no side-effects. பக்க விளைவுகள் இல்லாத பாதுகாப்பான சிகிச்சை." },
  { icon: HeartPulse, title: "Root-cause healing / மூல காரண சிகிச்சை", desc: "Treating the cause, not just symptoms. நோயின் மூல காரணத்தை கண்டறிந்து சிகிச்சை." },
  { icon: Sparkles, title: "Herbal products / மூலிகை தயாரிப்புகள்", desc: "In-house herbal capsules and oils. எங்களின் சொந்த தயாரிப்பு மூலிகை எண்ணெய்கள்." },
  { icon: Clock, title: "Home service / இல்லம் தேடி சிகிச்சை", desc: "Available within 5 km of the clinic. கிளினிக்கில் இருந்து 5 கிமீ வரை இல்லம் தேடி சிகிச்சை." },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroBg}
          alt="Fresh Siddha medicinal herbs"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/30" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl text-leaf-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Leaf className="h-4 w-4" /> Natural Healing in Coimbatore
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl flex flex-col gap-1">
              <span>Thulir Healthcare</span>
              <span className="text-2xl font-bold text-white/80 sm:text-3xl lg:text-4xl mt-0.5">
                துளிர் ஹெல்த்கேர்
              </span>
              <span className="text-xl font-semibold text-earth sm:text-2xl lg:text-3xl mt-1.5">
                Siddha & Acupuncture Clinic
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/90">
              பாரம்பரிய சித்த மருத்துவம் & அக்குபஞ்சர் மூலம் பக்க விளைவுகள் இல்லாத பாதுகாப்பான சிகிச்சை. Heal naturally with time-tested therapies.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row flex-wrap">
              <a
                href={`tel:+91${phoneNumber}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3 text-base font-semibold text-leaf-foreground shadow-xl transition-transform hover:scale-105"
              >
                <Phone className="h-5 w-5" /> Free Consultation
              </a>
              <Link
                to="/siddha-medicine"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Siddha Medicine <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/acupuncture"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Acupuncture <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, desc }) => {
            const [engTitle, tamTitle] = title.split(" / ");
            const [engDesc, tamDesc] = desc.split(". ");
            return (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-leaf/10 text-leaf">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-card-foreground leading-tight">
                    {engTitle}
                    {tamTitle && (
                      <span className="block text-xs font-semibold text-leaf mt-1">
                        {tamTitle}
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{engDesc}.</p>
                  {tamDesc && (
                    <p className="mt-1.5 text-xs text-muted-foreground/75 leading-relaxed border-t border-border/40 pt-1.5">
                      {tamDesc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <Link to="/siddha-medicine" className="group relative isolate overflow-hidden rounded-3xl shadow-lg min-h-[320px] flex flex-col justify-end">
            <img src={heroBg} alt="Siddha herbs and preparation" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
            <div className="p-6 text-leaf-foreground">

              <h3 className="mt-1.5 text-xl font-bold">Siddha Medicine</h3>
              <p className="mt-2 text-xs text-white/90 leading-relaxed">
                Traditional Tamil medicine using natural herbs.
              </p>
              <p className="mt-1 text-[11px] text-white/70 leading-relaxed">
                பாரம்பரிய தமிழ் சித்த மருத்துவம்.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold">
                Explore Siddha <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
          <Link to="/acupuncture" className="group relative isolate overflow-hidden rounded-3xl shadow-lg min-h-[320px] flex flex-col justify-end">
            <img src={treatmentsBg} alt="Acupuncture session" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
            <div className="p-6 text-leaf-foreground">

              <h3 className="mt-1.5 text-xl font-bold">Acupuncture</h3>
              <p className="mt-2 text-xs text-white/90 leading-relaxed">
                Sterile needle therapies and foot reflexology.
              </p>
              <p className="mt-1 text-[11px] text-white/70 leading-relaxed">
                அக்குபஞ்சர் மற்றும் பாத அழுத்த சிகிச்சை.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold">
                Explore Acupuncture <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
          <Link to="/products" className="group relative isolate overflow-hidden rounded-3xl shadow-lg min-h-[320px] flex flex-col justify-end">
            <img src={productsBg} alt="Herbal products" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/60 to-transparent" />
            <div className="p-6 text-leaf-foreground">

              <h3 className="mt-1.5 text-xl font-bold">Healthcare Products</h3>
              <p className="mt-2 text-xs text-white/90 leading-relaxed">
                In-house herbal capsules and pure oils.
              </p>
              <p className="mt-1 text-[11px] text-white/70 leading-relaxed">
                எங்களின் இயற்கை மூலிகை தயாரிப்புகள்.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold">
                Shop Products <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Left Column: Simple Clinical Image */}
            <div>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-border">
                <img 
                  src={treatmentsBg} 
                  alt="Traditional Siddha herbs and clinical healing" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Narrative & Stats */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-leaf">
                  About Us / எங்களைப் பற்றி
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Thulir Healthcare
                </h2>
                <p className="text-lg font-semibold text-earth font-tamil">
                  சித்த மருத்துவம் & அக்குபஞ்சர் கிளினிக்
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  At <strong>Thulir Healthcare</strong>, we believe true healing starts by addressing the root cause of illnesses rather than merely masking the symptoms. Located in Coimbatore, our clinic integrates the wisdom of ancient <strong>Siddha medicine</strong> with the precision of <strong>clinical Acupuncture</strong> to offer safe, side-effect-free treatments.
                </p>
                <p className="font-tamil text-sm text-foreground/80 border-l-2 border-leaf pl-4 py-1 leading-relaxed">
                  துளிர் ஹெல்த்கேர் கிளினிக்கில், நோயின் அறிகுறிகளுக்கு மட்டும் சிகிச்சை அளிக்காமல், அதன் மூல காரணத்தை கண்டறிந்து பக்கவிளைவுகள் இல்லாத நிரந்தர தீர்வை வழங்குகிறோம். பாரம்பரிய சித்த மருத்துவம் மற்றும் நவீன அக்குபஞ்சர் சிகிச்சைகளை ஒன்றிணைத்து சிறந்த முறையில் குணப்படுத்துகிறோம்.
                </p>
              </div>

              {/* Stats & Actions */}
              <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-6">
                <div className="flex gap-8">
                  <div>
                    <span className="block text-2xl font-bold text-foreground">10+ Years</span>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wider">Experience</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-foreground">5000+</span>
                    <span className="block text-xs text-muted-foreground uppercase tracking-wider">Recoveries</span>
                  </div>
                </div>
                
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-leaf-foreground shadow-sm hover:bg-leaf/90 transition-transform hover:scale-102 cursor-pointer"
                >
                  Book Appointment / முன்பதிவு செய்ய <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
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
            <Phone className="h-5 w-5" /> +91 {phoneNumber}
          </a>
        </div>
      </section>
    </>
  );
}
