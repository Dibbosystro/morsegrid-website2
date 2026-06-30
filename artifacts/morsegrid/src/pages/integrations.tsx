import { useMemo, useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  integrations,
  INTEGRATION_CATEGORIES,
  type Integration,
  type IntegrationCategory,
  type IntegrationStatus,
} from "@/data/integrations";

type Filter = "All" | IntegrationCategory;

const STATUS_STYLE: Record<IntegrationStatus, string> = {
  Live: "bg-primary/10 text-primary",
  Beta: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  "Coming soon": "bg-muted text-muted-foreground",
};

function IntegrationLogo({ integration, className = "w-12 h-12" }: { integration: Integration; className?: string }) {
  if (integration.logoSlug) {
    return (
      <div
        className={`${className} rounded-xl bg-white border border-border/60 flex items-center justify-center shrink-0 p-2`}
        aria-hidden="true"
      >
        <img
          src={`https://cdn.simpleicons.org/${integration.logoSlug}`}
          alt={integration.name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
  return (
    <div
      className={`${className} rounded-xl flex items-center justify-center text-white font-semibold text-lg shrink-0`}
      style={{ backgroundColor: integration.color }}
      aria-hidden="true"
    >
      {integration.wordmark.slice(0, 1).toUpperCase()}
    </div>
  );
}

function IntegrationCard({ integration, onClick }: { integration: Integration; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left bg-card border border-border rounded-2xl p-5 h-full flex flex-col gap-3 hover:border-primary/40 hover:shadow-sm transition-all"
      data-testid={`integration-card-${integration.slug}`}
    >
      <div className="flex items-start justify-between gap-3">
        <IntegrationLogo integration={integration} />
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${
            STATUS_STYLE[integration.status]
          }`}
        >
          {integration.status}
        </span>
      </div>
      <div className="flex-1">
        <div className="font-semibold mb-1">{integration.name}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{integration.summary}</div>
      </div>
      <div className="text-xs text-muted-foreground">{integration.category}</div>
    </button>
  );
}

export default function Integrations() {
  usePageMeta(
    "Integrations",
    "Pre-built connectors for the operations, CRM, commerce, communications, and data tools you already run.",
  );

  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Integration | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return integrations;
    return integrations.filter((i) => i.category === filter);
  }, [filter]);

  const filters: Filter[] = ["All", ...INTEGRATION_CATEGORIES];

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <FadeIn>
            <div className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
              Integrations
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Plug into the stack you already run.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Pre-built connectors for the operations, CRM, commerce, and comms tools your team already runs. If
              we don't have it yet, our typed SDK and signed webhooks get you there in an afternoon.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 max-w-6xl">
        <FadeIn className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                filter === f
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border hover:border-foreground/30"
              }`}
              data-testid={`filter-${f.toLowerCase()}`}
            >
              {f}
            </button>
          ))}
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((i, idx) => (
            <FadeIn key={i.slug} delay={Math.min(idx, 6) * 0.03}>
              <IntegrationCard integration={i} onClick={() => setActive(i)} />
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No integrations in this category yet.</p>
        )}

        <FadeIn className="mt-20 bg-[#0d0d0d] text-white rounded-3xl p-10 md:p-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Don't see what you need?
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Tell us the system and the workflow. If it's a fit for the platform, we'll prioritize it — and if it's
              one-off, our typed SDK plus signed webhooks will get you there fast.
            </p>
            <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Integration request")}`}>
                Request an integration
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          {active && (
            <>
              <div className="flex items-start gap-4 mb-2">
                <IntegrationLogo integration={active} className="w-14 h-14" />
                <div className="flex-1 pt-1">
                  <DialogTitle className="text-xl">{active.name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{active.category}</span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        STATUS_STYLE[active.status]
                      }`}
                    >
                      {active.status}
                    </span>
                  </div>
                </div>
              </div>
              <DialogDescription className="text-base text-foreground/80 leading-relaxed pt-2">
                {active.description}
              </DialogDescription>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  asChild
                  className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                      `Integration: ${active.name}`,
                    )}`}
                  >
                    Talk to us about this integration
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer">
                    Book a call
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
