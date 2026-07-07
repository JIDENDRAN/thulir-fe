import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Leaf, ArrowRight } from "lucide-react";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";
import heroBg from "../assets/hero-bg.jpg";
import treatmentsBg from "../assets/treatments-bg.jpg";
import productsBg from "../assets/products-bg.jpg";
import { phoneNumber } from "../components/Layout";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Thulir Healthcare — Siddha & Acupuncture Clinic" },
      { name: "description", content: "A look inside Thulir Healthcare — our clinic, treatments, herbs and herbal products." },
      { property: "og:title", content: "Gallery — Thulir Healthcare" },
      { property: "og:description", content: "Photos from our Coimbatore Siddha & Acupuncture clinic." },
    ],
  }),
  component: Gallery,
});

const images = [
  { src: g1, title: "Clinic Treatment Room", titleTam: "சிகிச்சை அறை" },
  { src: heroBg, title: "Siddha Herb Preparation", titleTam: "மூலிகை தயாரிப்பு" },
  { src: g2, title: "Fresh Medicinal Herbs", titleTam: "மூலிகைகள்" },
  { src: treatmentsBg, title: "Acupuncture Therapy", titleTam: "அக்குபஞ்சர் சிகிச்சை" },
  { src: g3, title: "Sterile Clinical Needles", titleTam: "அக்குபஞ்சர் ஊசிகள்" },
  { src: productsBg, title: "Natural Herbal Products", titleTam: "மூலிகை பொருட்கள்" },
];

function Gallery() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={g1}
          alt="Thulir Healthcare Clinic interior"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/70 to-forest/30" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl text-leaf-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <Leaf className="h-4 w-4" /> Gallery / புகைப்படத் தொகுப்பு
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl flex flex-col gap-1">
              <span>Our Clinic Gallery</span>
              <span className="text-2xl font-bold text-white/80 sm:text-3xl lg:text-4xl mt-0.5">
                புகைப்படத் தொகுப்பு
              </span>
              <span className="text-xl font-semibold text-earth sm:text-2xl lg:text-3xl mt-1.5">
                A Look Inside Thulir Healthcare
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Warm, calming spaces designed for healing — where traditional Siddha meets modern clinical acupuncture in Coimbatore.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-leaf bg-leaf/10 px-3 py-1 rounded-full">
              Clinic Spaces / கிளினிக் காட்சியகம்
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Interior & Treatments
            </h2>
            <p className="text-muted-foreground">
              Take a visual tour of our clean, sterile clinical facilities and traditional remedies.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="overflow-hidden aspect-[4/3] relative">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy" 
                  />
                </div>
                <div className="p-4 border-t border-border bg-card">
                  <h4 className="font-bold text-foreground text-sm">{img.title}</h4>
                  <p className="text-xs text-leaf font-tamil mt-0.5">{img.titleTam}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 border-t border-border">
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
