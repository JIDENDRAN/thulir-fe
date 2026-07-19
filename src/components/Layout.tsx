import { Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail, Leaf, Menu, X, ShoppingCart, Calendar, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductsProvider } from "@/lib/products-context";
import { FloatingContact } from "./FloatingContact";

export const clinicName = "Thulir Healthcare";
export const clinicTagline = "Siddha & Acupuncture Clinic";
export const phoneNumber = "9944250948";
export const email = "allwin948@gmail.com";
export const address = {
  street: "42/1, Siva Nagar, TVS Nagar Bus Stop,",
  area: "Thadagam Road,",
  city: "Coimbatore – 641025",
};

const nav = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/products", label: "Healthcare Products" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

function CartLink({ onClick }: { onClick?: () => void }) {
  const { count } = useCart();
  return (
    <Link
      to="/cart"
      onClick={onClick}
      aria-label="Cart"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:text-leaf"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1 text-[10px] font-bold text-leaf-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

function LayoutInner({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="Thulir Healthcare Logo" className="h-10 w-10 object-contain" />
            <div className="flex flex-col">
              <span className="text-base font-bold leading-tight text-foreground sm:text-lg">{clinicName}</span>
              <span className="text-[10px] font-medium leading-tight text-muted-foreground sm:text-[11px]">{clinicTagline}</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 xl:gap-6 text-sm font-medium text-foreground lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "text-leaf" }}
                activeOptions={{ exact: n.to === "/" }}
                className="transition-colors hover:text-leaf"
              >
                {n.label}
              </Link>
            ))}
            <div className="group relative py-2">
              <button className="flex items-center gap-1 transition-colors hover:text-leaf outline-none">
                Other <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute top-full right-0 mt-0 hidden w-40 flex-col rounded-xl border border-border/60 bg-background/95 backdrop-blur-md shadow-xl overflow-hidden group-hover:flex transition-all">
                <Link to="/patient-intake" activeProps={{ className: "bg-leaf/10 text-leaf" }} className="px-4 py-2.5 hover:bg-muted transition-colors text-sm">Patient Intake</Link>
                <Link to="/admin" activeProps={{ className: "bg-leaf/10 text-leaf" }} className="px-4 py-2.5 hover:bg-muted transition-colors text-sm">Admin</Link>
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/book"
              className="hidden items-center gap-2 rounded-full border border-leaf px-4 py-2 text-sm font-semibold text-leaf transition-colors hover:bg-leaf/10 md:inline-flex"
            >
              <Calendar className="h-4 w-4" /> Book
            </Link>
            <CartLink onClick={() => setOpen(false)} />
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-leaf" }}
                  activeOptions={{ exact: n.to === "/" }}
                  className="py-2 text-base font-medium text-foreground transition-colors hover:text-leaf"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/patient-intake"
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-leaf"
              >
                Patient Intake
              </Link>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-leaf"
              >
                Admin
              </Link>
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium text-leaf"
              >
                Book Appointment
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-forest text-forest-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Thulir Healthcare Logo" className="h-10 w-10 object-contain" />
                <span className="text-lg font-bold">{clinicName}</span>
              </div>
              <p className="mt-3 text-sm text-forest-foreground/80">
                {clinicTagline}. Natural, side-effect-free healing for the Coimbatore community — rooted in tradition, guided by care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-forest-foreground/85">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="hover:text-leaf-foreground hover:underline">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/book" className="hover:text-leaf-foreground hover:underline">Book Appointment</Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-leaf-foreground hover:underline">Cart</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Contact</h4>
              <ul className="mt-3 space-y-2 text-sm text-forest-foreground/85">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{address.street} {address.area} {address.city}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:+91${phoneNumber}`} className="hover:underline">+91 {phoneNumber}</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-forest-foreground/20 pt-6 text-center text-sm text-forest-foreground/70">
            © {new Date().getFullYear()} {clinicName}. All rights reserved.
          </div>
        </div>
      </footer>
      <FloatingContact />
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ProductsProvider>
      <CartProvider>
        <LayoutInner>{children}</LayoutInner>
      </CartProvider>
    </ProductsProvider>
  );
}
