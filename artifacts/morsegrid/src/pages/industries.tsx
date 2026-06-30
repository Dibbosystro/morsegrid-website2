import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { FadeIn } from "@/components/ui/fade-in";
import { industries } from "@/data/industries";

export default function Industries() {
  usePageMeta({
    title: "Industries",
    description:
      "Operations systems built for e-commerce, health and wellness, professional services, and technology teams.",
    path: "/industries",
  });
  useHashScroll();

  return (
    <div className="flex flex-col pb-24">
      <div className="container mx-auto px-4 md:px-8 pt-40 pb-20">
        <FadeIn className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Built for the way your industry actually runs.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            We have worked inside e-commerce brands, health clinics, professional services firms,
            and technology businesses. See what we build for yours.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((ind, idx) => (
            <FadeIn key={ind.slug} delay={idx * 0.05}>
              <Link
                href={`/industries/${ind.slug}`}
                data-testid={`link-industry-${ind.slug}`}
                className="block h-full group"
              >
                <div
                  id={ind.slug}
                  className="scroll-mt-32 relative h-full rounded-3xl border border-border bg-card p-8 md:p-10 overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div
                    className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-60 blur-2xl pointer-events-none transition-opacity group-hover:opacity-90"
                    style={{
                      backgroundImage: `linear-gradient(120deg, ${ind.gradientFrom}, ${ind.gradientTo})`,
                    }}
                  />
                  <div className="relative">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        color: ind.accent,
                        borderColor: `${ind.accent}33`,
                        backgroundColor: ind.accentSoft,
                      }}
                    >
                      {ind.pillLabel}
                    </span>
                    <h2 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight">
                      {ind.hero.headline}{" "}
                      <span style={{ color: ind.accent }}>{ind.hero.accentPhrase}</span>{" "}
                      {ind.hero.headlineSuffix}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-2">
                      {ind.hero.subhead}
                    </p>
                    <div
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color: ind.accent }}
                    >
                      See how <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
