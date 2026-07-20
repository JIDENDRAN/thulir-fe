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
                Siddha Treatment & Acupuncture Clinic
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
                to="/treatments"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                Siddha Medicine <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/treatments"
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
          <Link to="/treatments" className="group relative isolate overflow-hidden rounded-3xl shadow-lg min-h-[320px] flex flex-col justify-end">
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
          <Link to="/treatments" className="group relative isolate overflow-hidden rounded-3xl shadow-lg min-h-[320px] flex flex-col justify-end">
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

            {/* Left Column: Logo Display */}
            <div className="flex justify-center items-center h-full w-full py-6 lg:py-0">
              <div className="relative w-full max-w-md flex items-center justify-center rounded-3xl bg-gradient-to-br from-background via-leaf/5 to-earth/5 p-6 sm:p-8 shadow-sm border border-border/60">
                <img
                  src="/logo.png"
                  alt="Thulir Healthcare Logo"
                  className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Right Column: Narrative & Stats */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-bold uppercase tracking-widest text-leaf">
                  About Us / எங்களைப் பற்றி
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  Thulir Healthcare
                </h2>
                <p className="text-xl font-semibold text-earth font-tamil mt-1">
                  சித்த மருத்துவம் & அக்குபஞ்சர் கிளினிக்
                </p>
              </div>

              <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  At <strong>Thulir Healthcare</strong>, we believe true healing starts by addressing the root cause of illnesses rather than merely masking the symptoms. Located in Coimbatore, our clinic integrates the wisdom of ancient <strong>Siddha medicine</strong> with the precision of <strong>clinical Acupuncture</strong> to offer safe, side-effect-free treatments.
                </p>
                <p className="font-tamil text-base sm:text-lg text-foreground/80 border-l-4 border-leaf pl-5 py-2 leading-relaxed">
                  துளிர் ஹெல்த்கேர் கிளினிக்கில், நோயின் அறிகுறிகளுக்கு மட்டும் சிகிச்சை அளிக்காமல், அதன் மூல காரணத்தை கண்டறிந்து பக்கவிளைவுகள் இல்லாத நிரந்தர தீர்வை வழங்குகிறோம். பாரம்பரிய சித்த மருத்துவம் மற்றும் நவீன அக்குபஞ்சர் சிகிச்சைகளை ஒன்றிணைத்து சிறந்த முறையில் குணப்படுத்துகிறோம்.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Conditions We Treat Section (Split Layout) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-leaf/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Header for Conditions */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-sm font-bold uppercase tracking-widest text-leaf">
                Conditions We Treat
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-tamil leading-tight">
                பக்க விளைவுகள் இல்லாத சிகிச்சை
              </h2>
              <div className="h-1 w-20 bg-leaf mt-6 rounded-full"></div>
              <p className="mt-6 text-muted-foreground text-base leading-relaxed">
                We offer safe, natural, and permanent solutions for various chronic and acute conditions without any harmful side effects.
              </p>
            </div>

            {/* Right List for Conditions */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "தசை பிடிப்பு / சுளுக்கு",
                  "எலும்பு / தசை / நரம்பு ஆகியவற்றால் ஏற்படும் வலி வீக்கம்",
                  "முடி உதிர்வு / தலைவலி / மைகிரேன்",
                  "மூட்டு வலி / சியாட்டிகா",
                  "பக்கவாதம் / கீல்வாதம் / முகவாதம்",
                  "கண் சுழற்சி / தூக்கமின்மை",
                  "மனஅழுத்தம் / கவலை / மன சோர்வு",
                  "தலைமுடி செலுத்து வளர / இளநரை",
                  "வயிற்று வலி / வயிற்றுப்புண் (Ulcer)",
                  "மலச்சிக்கல்",
                  "சர்க்கரை / கல்லீரல் பாதிப்பு",
                  "சிறுநீரக சார்ந்த நோய்",
                  "பித்தப்பை சார்ந்த நோய்",
                  "சைனஸ் / டஸ்ட் அலர்ஜி",
                  "தைராய்டு",
                  "உடல் எடை குறைய / அதிகரிக்க",
                  "கர்ப்பப்பை சார்ந்த நோய்",
                  "ஆண்மை குறைவு",
                  "நரம்புத் தளர்ச்சி",
                  "குழந்தையின்மை"
                ].map((condition, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-sm border border-transparent hover:border-leaf/30 hover:shadow-md transition-all group cursor-default"
                  >
                    <CheckCircle2 className="h-5 w-5 text-leaf shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-tamil text-foreground/90 font-medium">{condition}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-24 pt-24 border-t border-border/40 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Header for Therapies */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-sm font-bold uppercase tracking-widest text-leaf">
                Our Therapies
              </span>
              <h3 className="mt-3 text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                Integrated Natural Healing
              </h3>
              <div className="h-1 w-20 bg-leaf mt-6 rounded-full"></div>
              <p className="mt-6 text-muted-foreground text-base leading-relaxed">
                Combining the wisdom of traditional Siddha medicine with modern clinical practices.
              </p>
            </div>

            {/* Right List for Therapies */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { tamil: "சித்த மருத்துவம்", english: "Siddha Medicine" },
                  { tamil: "அக்குபஞ்சர்", english: "Acupuncture" },
                  { tamil: "எலக்ட்ரோ அக்குபஞ்சர்", english: "Electro Acupuncture" },
                  { tamil: "அக்குபிரசர்", english: "Acupressure" },
                  { tamil: "பாத அழுத்த சிகிச்சை", english: "Reflexology" },
                  { tamil: "இயற்கை சிகிச்சை", english: "Naturopathy" }
                ].map((therapy, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-card shadow-sm border border-transparent hover:border-leaf/30 hover:shadow-md transition-all group cursor-default">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-leaf/10 text-leaf shadow-inner group-hover:scale-110 transition-transform">
                      <Leaf className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-tamil font-bold text-lg text-foreground leading-tight">{therapy.tamil}</span>
                      <span className="text-base text-muted-foreground font-semibold mt-0.5">{therapy.english}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-leaf">
              Watch & Learn / காணொளிகள்
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Featured Videos
            </h2>
            <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
              Learn more about our treatments, patient experiences, and natural healing methods through our videos.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
            {[
              "Y_rBgwDVJ74",
              "X1b8G9nCFT4",
              "VAlqZHywbB8",
              "TgbcE_7_tGs"
            ].map((videoId, idx) => (
              <div key={idx} className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-border/50 bg-background" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Thulir Healthcare YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
            <Phone className="h-5 w-5" /> +91 {phoneNumber}
          </a>
        </div>
      </section>
    </>
  );
}
