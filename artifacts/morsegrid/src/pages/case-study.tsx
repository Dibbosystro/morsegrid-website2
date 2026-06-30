import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowUpRight, Quote } from "lucide-react";
import { usePageMeta, buildBreadcrumbJsonLd } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import {
  type CaseStudy,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from "@/data/case-studies";
import { track } from "@/lib/analytics";
import NotFound from "@/pages/not-found";

export default function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const study = params.slug ? getCaseStudyBySlug(params.slug) : undefined;

  if (!study) {
    return <NotFound />;
  }

  return <CaseStudyView study={study} />;
}

function CaseStudyView({ study }: { study: CaseStudy }) {
  usePageMeta({
    title: `${study.customer} — Case study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    image: `/og/case-studies/${study.slug}.png`,
    type: "article",
    jsonLd: [
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Case studies", path: "/case-studies" },
        { name: study.customer, path: `/case-studies/${study.slug}` },
      ]),
    ],
  });
  const related = getRelatedCaseStudies(study.slug, 2);

  return (
    <div className="flex flex-col pb-24">
      <div
        className={`relative pt-40 pb-20 border-b border-border/50 bg-gradient-to-br ${study.accent}`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <FadeIn>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-8 -ml-3 rounded-full"
            >
              <Link href="/case-studies">
                <ArrowLeft className="w-4 h-4 mr-2" /> All case studies
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold uppercase tracking-wider text-foreground">
                {study.industry}
              </span>
              <span className="text-sm text-muted-foreground">
                {study.location}
              </span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                {study.companySize}
              </span>
            </div>

            <div className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              {study.customer}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-8 max-w-4xl">
              {study.headline}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {study.summary}
            </p>
          </FadeIn>
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-8 max-w-5xl pt-16">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-border/60 py-10">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {m.value}
                </div>
                <div className="text-sm text-muted-foreground leading-snug">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="container mx-auto px-4 md:px-8 max-w-5xl pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <aside className="lg:col-span-1">
            <FadeIn>
              <div className="sticky top-28 space-y-8">
                {study.thumbnail && (
                  <div
                    className={`relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-border bg-gradient-to-br ${study.accent}`}
                  >
                    <img
                      src={study.thumbnail}
                      alt={`${study.customer}`}
                      className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
                    />
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Engagement
                    </div>
                    <div className="text-sm text-foreground">
                      {study.engagement}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.stack.map((tool) => (
                        <span
                          key={tool}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </aside>

          <article className="lg:col-span-2">
            <FadeIn>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-12">
                {study.intro}
              </p>

              {study.sections.map((section, idx) => (
                <section key={idx} className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-3 my-6 pl-5 list-disc text-base md:text-lg text-muted-foreground marker:text-primary/60">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="leading-relaxed pl-2">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <figure className="my-12 rounded-3xl border border-border bg-muted/40 p-8 md:p-10">
                <Quote className="w-8 h-8 text-primary/70 mb-4" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-foreground mb-6">
                  &ldquo;{study.quote.text}&rdquo;
                </blockquote>
                <figcaption className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {study.quote.attribution}
                  </span>
                  {" — "}
                  {study.quote.role}
                </figcaption>
              </figure>

              <div className="border-t border-border/50 pt-10">
                <p className="text-base md:text-lg leading-relaxed text-foreground/90 italic">
                  {study.closing}
                </p>
              </div>
            </FadeIn>
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mx-auto px-4 md:px-8 max-w-5xl pt-24">
          <FadeIn>
            <div className="border-t border-border/50 pt-12">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                More customer stories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/case-studies/${r.slug}`}
                    className="group block"
                  >
                    <div
                      className={`relative aspect-[5/3] rounded-2xl overflow-hidden border border-border bg-gradient-to-br ${r.accent} mb-4`}
                    >
                      {r.thumbnail && (
                        <img
                          src={r.thumbnail}
                          alt={r.customer}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:scale-[1.02] transition-transform"
                        />
                      )}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      {r.industry}
                    </div>
                    <div className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {r.customer}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {r.headline}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      <section className="container mx-auto px-4 md:px-8 max-w-5xl pt-16">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/case-studies">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to case studies
            </Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link
              href="/company"
              onClick={() => track("cta_book_call_click", { location: `case_study_${study.slug}` })}
            >
              Talk to us about your operations
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
