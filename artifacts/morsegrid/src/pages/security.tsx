import { ShieldCheck, Settings, FileText, Lock } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const principles = [
  {
    icon: Settings,
    title: "We work within your existing tools and platforms",
    body: "No new data silos. We configure and connect the systems you already own — Shopify, HubSpot, Airtable, and the rest. Your stack stays your stack.",
  },
  {
    icon: Lock,
    title: "Your data stays in the systems you already control",
    body: "Morsegrid does not host, store, or warehouse your customer data. We configure automations that run inside your platforms. You own everything.",
  },
  {
    icon: FileText,
    title: "Every automation is documented and handed over",
    body: "No black boxes. Every workflow we build is fully documented in plain language and handed to your team. You can read it, edit it, or run it without us.",
  },
  {
    icon: ShieldCheck,
    title: "We operate on a need-to-know basis",
    body: "We request only the minimum permissions required for each integration. Credentials are stored in your systems, not ours, and can be revoked at any time.",
  },
];

export default function Security() {
  usePageMeta(
    "Trust Center",
    "How Morsegrid handles your data and your clients' data. No black boxes, no new silos.",
  );

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <FadeIn>
            <div className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
              Trust Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              No new silos. No black boxes.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Morsegrid configures and connects your existing tools. We don't host your data, store your customers'
              information, or build anything we can't hand over and explain in plain English.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 max-w-6xl space-y-24">
        <section>
          <FadeIn className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">How we handle data</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              The principles that govern every engagement.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={Math.min(i, 3) * 0.05}>
                <div className="bg-card border border-border p-6 rounded-2xl h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section>
          <FadeIn className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Responsible disclosure</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              If you believe you've found a vulnerability in any Morsegrid product or surface, please tell us before
              going public. We commit to acknowledging within one business day.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Where to report
              </div>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Security disclosure")}`}
                className="text-lg font-semibold hover:text-primary transition-colors"
              >
                {siteConfig.contact.email}
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Mark the subject line "Security disclosure."
              </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Acknowledgement
              </div>
              <div className="text-lg font-semibold">Within 1 business day</div>
              <p className="text-sm text-muted-foreground mt-2">
                We'll confirm receipt and share a named owner within one business day.
              </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-2xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Safe harbor
              </div>
              <div className="text-lg font-semibold">Good-faith research is welcome</div>
              <p className="text-sm text-muted-foreground mt-2">
                We will not pursue legal action against research conducted in line with responsible disclosure norms.
              </p>
            </div>
          </div>
        </section>

        <FadeIn className="bg-[#0d0d0d] text-white rounded-3xl p-10 md:p-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Security questions before you engage?
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              We're happy to walk through exactly what permissions we need, what we access, and how you can revoke
              everything — before the first call.
            </p>
            <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Security questions")}`}>
                Ask us a question
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
