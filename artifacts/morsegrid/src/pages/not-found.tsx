import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { usePageMeta } from "@/hooks/use-page-meta";

const HELPFUL_LINKS: { label: string; href: string; subtitle: string }[] = [
  { label: "Product", href: "/products", subtitle: "Channels, build, optimize, and scale." },
  { label: "Industries", href: "/industries", subtitle: "Retail, travel, technology, finance, and more." },
  { label: "Customers", href: "/customers", subtitle: "Operators running on Morsegrid." },
  { label: "Case studies", href: "/case-studies", subtitle: "In-depth stories from real teams." },
  { label: "Resources", href: "/resources", subtitle: "Field notes, playbooks, and the glossary." },
  { label: "Company", href: "/company", subtitle: "About, careers, and security." },
];

export default function NotFound() {
  usePageMeta("Page not found", "We couldn't find that page on Morsegrid.");
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setLocation(q ? `/resources#${encodeURIComponent(q)}` : "/resources");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center pt-40 pb-32 px-6">
      <div className="w-full max-w-3xl">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            404
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-foreground leading-[1.04]">
            Page not found.
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-xl">
            The link may be old or mistyped. Here are a few places to try, or search for what you were after.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mt-8 flex items-center gap-2 max-w-xl bg-card rounded-full border border-border p-1.5"
          >
            <div className="pl-3 text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What were you looking for?"
              aria-label="Search"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              data-testid="input-404-search"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 bg-foreground text-background rounded-full px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
              data-testid="button-404-search"
            >
              Search <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
            {HELPFUL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-start justify-between gap-4 px-5 py-4 rounded-2xl border border-border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all"
                data-testid={`link-404-${l.href.replace("/", "")}`}
              >
                <div className="min-w-0">
                  <div className="font-medium text-foreground">{l.label}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{l.subtitle}</div>
                </div>
                <ArrowRight className="w-4 h-4 mt-1 text-muted-foreground transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7d6cf0] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              data-testid="link-404-home"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
