import { Link } from "wouter";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { FadeIn } from "@/components/ui/fade-in";
import { changelog, type ChangelogEntry } from "@/data/changelog";

const TAG_STYLE: Record<NonNullable<ChangelogEntry["tag"]>, string> = {
  Release: "bg-primary/10 text-primary",
  Improvement: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Fix: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Security: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function Changelog() {
  usePageMeta(
    "Changelog",
    "Releases, improvements, and security updates from the Morsegrid team.",
  );
  useHashScroll();

  // Re-trigger hash scroll once entries render
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    }
  }, []);

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <FadeIn>
            <div className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
              Changelog
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              What's new in Morsegrid.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Releases ship every other week. Bigger ones make it here, with the why behind each change.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 max-w-4xl">
        <ol className="relative border-l border-border/60 ml-3 md:ml-4">
          {changelog.map((entry, idx) => {
            const tag = entry.tag ?? "Release";
            return (
              <li key={entry.id} id={entry.id} className="scroll-mt-32 mb-14 ml-8 md:ml-10">
                <span className="absolute -left-[7px] mt-2 w-3.5 h-3.5 rounded-full bg-primary border-4 border-background" />
                <FadeIn delay={Math.min(idx, 4) * 0.04}>
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                    <time dateTime={entry.isoDate} className="text-muted-foreground">
                      {entry.date}
                    </time>
                    <span className="text-muted-foreground/50">·</span>
                    <span className="font-mono text-xs text-muted-foreground">{entry.version}</span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${TAG_STYLE[tag]}`}
                    >
                      {tag}
                    </span>
                    <a
                      href={`#${entry.id}`}
                      className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Anchor link to ${entry.title}`}
                    >
                      #
                    </a>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                    {entry.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{entry.summary}</p>
                  {entry.bullets && entry.bullets.length > 0 && (
                    <ul className="space-y-2 pl-5 list-disc text-muted-foreground marker:text-primary/60">
                      {entry.bullets.map((b, bi) => (
                        <li key={bi} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </FadeIn>
              </li>
            );
          })}
        </ol>

        <FadeIn className="mt-12 text-center text-sm text-muted-foreground">
          That's everything we've shipped in public.{" "}
          <Link href="/resources" className="text-foreground underline underline-offset-4">
            Read the playbooks
          </Link>{" "}
          for the why behind a lot of it.
        </FadeIn>
      </div>
    </div>
  );
}
