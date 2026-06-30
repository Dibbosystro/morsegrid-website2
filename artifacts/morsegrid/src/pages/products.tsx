import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export default function Products() {
  usePageMeta({
    title: "Product",
    description:
      "Voice, chat, and email agents with the build, optimize, and scale tools to run them in production — led by our flagship ClickUp Implementation Blueprint.",
    path: "/products",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Morsegrid",
      description:
        "Voice, chat, and email agents with the build, optimize, and scale tools to run them in production.",
      brand: { "@type": "Brand", name: "Morsegrid" },
      url: "https://morsegrid.com/products",
    },
  });

  const flagship = products.find((p) => p.flagship);
  const rest = products.filter((p) => !p.flagship);
  const groups = Array.from(new Set(rest.map((p) => p.group)));

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">The Morsegrid platform.</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Our flagship ClickUp Implementation Blueprint, plus the channels and tooling to run AI agents in production.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 space-y-16">
        {flagship && (
          <FadeIn>
            <section>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-6">
                Flagship product
              </div>
              <Link
                href={flagship.href ?? `/products/${flagship.slug}`}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 rounded-3xl border border-transparent overflow-hidden text-white bg-gradient-to-br from-[#1f1c3a] via-[#241f4b] to-[#0f1a3a] hover:shadow-xl hover:shadow-[#7d6cf0]/20 transition-shadow"
                data-testid={`link-product-${flagship.slug}`}
              >
                <div
                  aria-hidden
                  className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full pointer-events-none opacity-50"
                  style={{
                    background: "radial-gradient(circle at center, rgba(125,108,240,0.55), transparent 65%)",
                    filter: "blur(20px)",
                  }}
                />
                <div className="relative lg:col-span-7">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium">
                    <Star className="w-3 h-3 text-[#9d8cf5]" /> Flagship · Core product
                  </span>
                  <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                    {flagship.title}
                  </h2>
                  <p className="mt-4 text-white/80 leading-relaxed text-base md:text-lg max-w-xl">
                    {flagship.tagline}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#9d8cf5]">
                    Explore the Blueprint
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
                <div className="relative lg:col-span-5 grid grid-cols-2 gap-3 self-center">
                  {[
                    { k: "90 days", v: "Fixed engagement" },
                    { k: "4 phases", v: "Discover → Adopt" },
                    { k: "8+", v: "Productized deliverables" },
                    { k: "100%", v: "Adoption guarantee" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-2xl font-semibold tracking-tight">{s.k}</div>
                      <div className="text-xs text-white/65 mt-1 leading-snug">{s.v}</div>
                    </div>
                  ))}
                </div>
              </Link>
            </section>
          </FadeIn>
        )}

        {groups.map((group, gi) => (
          <FadeIn key={group} delay={Math.min(gi, 4) * 0.05}>
            <section>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-6">
                {group}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest
                  .filter((p) => p.group === group)
                  .map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.slug}
                        href={p.href ?? `/products/${p.slug}`}
                        className="group p-8 rounded-3xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
                        data-testid={`link-product-${p.slug}`}
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.tagline}</p>
                        <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Explore {p.title}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </section>
          </FadeIn>
        ))}

        <FadeIn delay={0.2} className="mt-8 text-center bg-muted/50 p-12 rounded-3xl border border-border/50">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">See it on your own data.</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We'll wire a working agent to a slice of your real traffic so you can judge it on your conversations, not a demo script.
          </p>
          <Button asChild className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
            <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer">
              Book a working session
            </a>
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
