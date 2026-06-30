import { Link, useParams } from "wouter";
import { ArrowLeft, ScrollText } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { getLegalDoc, legalDocs } from "@/data/legal";
import NotFound from "@/pages/not-found";

const SIBLINGS: { slug: keyof typeof legalDocs; label: string }[] = [
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "terms", label: "Terms of Service" },
  { slug: "dpa", label: "Data Processing Addendum" },
];

export default function Legal() {
  const params = useParams<{ slug: string }>();
  const doc = params.slug ? getLegalDoc(params.slug) : undefined;
  if (!doc) return <NotFound />;
  return <LegalView slug={doc.slug} />;
}

function LegalView({ slug }: { slug: keyof typeof legalDocs }) {
  const doc = legalDocs[slug];
  usePageMeta(doc.title, doc.description);

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <FadeIn>
            <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 rounded-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Morsegrid
              </Link>
            </Button>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
              <ScrollText className="w-3 h-3" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {doc.title}
            </h1>
            <p className="text-base text-muted-foreground">Last updated {doc.lastUpdated}</p>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-8 flex flex-wrap gap-2">
            {SIBLINGS.map((s) => (
              <Link
                key={s.slug}
                href={`/legal/${s.slug}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  s.slug === slug
                    ? "bg-foreground text-background border-foreground"
                    : "border-border hover:border-foreground/30"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
        <FadeIn>
          <article className="prose-article">
            <p className="text-lg leading-relaxed mb-10 text-foreground/90">{doc.intro}</p>
            {doc.sections.map((section, idx) => (
              <section key={idx} className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5 mt-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-base md:text-lg leading-relaxed text-muted-foreground mb-5">
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
            <div className="border-t border-border/50 pt-10 mt-12">
              <p className="text-sm text-muted-foreground italic">
                This document uses plain-language template content for illustrative purposes. Customers signing a paid
                contract receive the executed Master Services Agreement, Order Form, and DPA as the controlling
                documents.
              </p>
            </div>
          </article>
        </FadeIn>
      </div>
    </div>
  );
}
