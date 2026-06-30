import { Link, useParams } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";
import { usePageMeta, buildBreadcrumbJsonLd } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/data/articles";
import NotFound from "@/pages/not-found";

export default function Article() {
  const params = useParams<{ slug: string }>();
  const article = params.slug ? getArticleBySlug(params.slug) : undefined;

  if (!article) {
    return <NotFound />;
  }

  return <ArticleView article={article} />;
}

function ArticleView({ article }: { article: NonNullable<ReturnType<typeof getArticleBySlug>> }) {
  usePageMeta({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
    image: `/og/resources/${article.slug}.png`,
    type: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        author: { "@type": "Organization", name: article.author },
        publisher: { "@type": "Organization", name: "Morsegrid" },
        datePublished: article.publishedOn,
        mainEntityOfPage: `https://morsegrid.com/resources/${article.slug}`,
      },
      buildBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
        { name: article.title, path: `/resources/${article.slug}` },
      ]),
    ],
  });

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <FadeIn>
            <Button asChild variant="ghost" size="sm" className="mb-8 -ml-3 rounded-full">
              <Link href="/resources">
                <ArrowLeft className="w-4 h-4 mr-2" /> All resources
              </Link>
            </Button>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                <BookOpen className="w-3 h-3" />
                {article.type}
              </span>
              <span className="text-sm text-muted-foreground">{article.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {article.description}
            </p>

            <div className="text-sm text-muted-foreground">
              {article.author} &middot; {article.publishedOn}
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-3xl">
        <FadeIn>
          <article className="prose-article">
            <p className="text-lg leading-relaxed mb-10 text-foreground/90">
              {article.intro}
            </p>

            {article.sections.map((section, idx) => (
              <section key={idx} className="mb-10">
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-5 mt-2">
                    {section.heading}
                  </h2>
                )}

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

            <div className="border-t border-border/50 pt-10 mt-12">
              <p className="text-base md:text-lg leading-relaxed text-foreground/90 italic">
                {article.closing}
              </p>
            </div>
          </article>

          <div className="mt-16 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/resources">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to resources
              </Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/company">Talk to us about your operations</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
