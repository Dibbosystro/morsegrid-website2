import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, Library, Sparkles } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { articles } from "@/data/articles";

const universityCourses = [
  {
    title: "Agent design fundamentals",
    description: "Designing AOPs that hold up in production—decisions, escalations, and recovery patterns.",
    duration: "4 modules · 1.5h",
  },
  {
    title: "Voice operations 101",
    description: "Latency budgets, barge-in tuning, and the rituals that keep voice agents on-brand.",
    duration: "5 modules · 2h",
  },
  {
    title: "Measuring what matters",
    description: "Going from CSAT theater to outcome-based scorecards your exec team will trust.",
    duration: "3 modules · 1h",
  },
];

const glossaryTerms = [
  {
    term: "AOP (Agent Operating Procedure)",
    definition: "A versioned, testable workflow that defines how an agent handles a class of conversations.",
  },
  {
    term: "Grounded response",
    definition: "An answer constrained to verified knowledge sources, with citations available to reviewers.",
  },
  {
    term: "Watchtower",
    definition: "Continuous QA that scores every conversation in real time and routes exceptions to humans.",
  },
  {
    term: "Warm transfer",
    definition: "Handing a live conversation to a human with full context, history, and suggested next steps.",
  },
];

export default function Resources() {
  usePageMeta({
    title: "Resources",
    description: "Articles, courses, and a glossary for teams running AI agents in production.",
    path: "/resources",
  });
  useHashScroll();

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Resources.</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Playbooks, courses, and the vocabulary your team needs to run AI agents in production.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 space-y-24">
        {articles.length > 0 && (
          <section>
            <FadeIn className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Articles & playbooks</h2>
              <p className="text-muted-foreground mt-2">How we solve problems — shared openly.</p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((res, idx) => (
                <FadeIn key={res.slug} delay={idx * 0.1}>
                  <Link href={`/resources/${res.slug}`} className="group block h-full">
                    <article className="bg-card border border-border p-8 rounded-3xl h-full flex flex-col transition-all group-hover:border-primary/40 group-hover:shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                          <BookOpen className="w-3 h-3" />
                          {res.type}
                        </span>
                        <span className="text-sm text-muted-foreground">{res.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{res.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-1">{res.description}</p>
                      <div className="text-sm font-medium mt-auto inline-flex items-center gap-2 text-foreground">
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </article>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        <section id="university" className="scroll-mt-32">
          <FadeIn className="mb-10 flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Morsegrid University</h2>
              <p className="text-muted-foreground mt-2">Hands-on courses for the people running agents day to day.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {universityCourses.map((c, idx) => (
              <FadeIn key={c.title} delay={idx * 0.08}>
                <div className="bg-card border border-border p-6 rounded-2xl h-full flex flex-col">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">{c.duration}</div>
                  <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="glossary" className="scroll-mt-32">
          <FadeIn className="mb-10 flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Library className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Glossary</h2>
              <p className="text-muted-foreground mt-2">The terms we use, defined plainly.</p>
            </div>
          </FadeIn>
          <div className="bg-card border border-border rounded-3xl divide-y divide-border">
            {glossaryTerms.map((g) => (
              <div key={g.term} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6">
                <div className="md:col-span-4 font-semibold">{g.term}</div>
                <div className="md:col-span-8 text-muted-foreground leading-relaxed">{g.definition}</div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="proactive-agents"
          className="scroll-mt-32 bg-muted/50 p-10 md:p-14 rounded-3xl border border-border/50"
        >
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5">
              <Sparkles className="w-3 h-3" />
              Spring '26 Release
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl">Proactive Agents</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8">
              Agents that reach out before customers do—with the right context, on the right channel. Trigger on order
              events, billing changes, or anything in your warehouse.
            </p>
            <Button asChild className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
              <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer">
                Get a walkthrough
              </a>
            </Button>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
