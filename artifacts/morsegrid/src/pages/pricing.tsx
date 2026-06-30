import { useState } from "react";
import { Check, Minus, ChevronDown } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

type Tier = {
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Foundation",
    tagline: "For one channel and a single workflow team.",
    price: "$2,400",
    cadence: "/ month, billed annually",
    features: [
      "One production channel (voice, chat, or email)",
      "Up to 25,000 conversations / month",
      "Five Agent Operating Procedures",
      "Watchtower QA on 100% of conversations",
      "Standard integrations (HubSpot, Zendesk, Slack, Sheets)",
      "Email support, 1 business day response",
    ],
    cta: "Talk to sales",
  },
  {
    name: "Build",
    tagline: "For teams running multiple channels with real ops volume.",
    price: "$6,800",
    cadence: "/ month, billed annually",
    highlight: true,
    features: [
      "All channels — voice, chat, and email",
      "Up to 150,000 conversations / month",
      "Unlimited Agent Operating Procedures",
      "Experiments, Suggestions, and BI exports",
      "All integrations including Salesforce and NetSuite",
      "Shared Slack channel with our delivery team",
    ],
    cta: "Book a build session",
  },
  {
    name: "Scale",
    tagline: "For multi-region deployments and regulated workloads.",
    price: "$14,500",
    cadence: "/ month, billed annually",
    features: [
      "Everything in Build, with no volume cap",
      "EU and US data residency, customer-managed keys",
      "Single-tenant deployment option",
      "Dedicated solutions architect",
      "99.95% uptime SLA with credits",
      "Quarterly business reviews",
    ],
    cta: "Talk to sales",
  },
];

const comparisonRows: { feature: string; values: [string | boolean, string | boolean, string | boolean] }[] = [
  { feature: "Channels", values: ["1 of voice / chat / email", "All channels", "All channels"] },
  { feature: "Conversations / month", values: ["25,000", "150,000", "Unlimited"] },
  { feature: "Agent Operating Procedures", values: ["5", "Unlimited", "Unlimited"] },
  { feature: "Watchtower QA", values: [true, true, true] },
  { feature: "Experiments", values: [false, true, true] },
  { feature: "Suggestions", values: [false, true, true] },
  { feature: "BI exports & webhooks", values: [false, true, true] },
  { feature: "Salesforce + NetSuite connectors", values: [false, true, true] },
  { feature: "EU data residency", values: [false, "Add-on", true] },
  { feature: "Customer-managed encryption keys", values: [false, false, true] },
  { feature: "Single-tenant deployment", values: [false, false, true] },
  { feature: "Uptime SLA", values: ["99.5%", "99.9%", "99.95% w/ credits"] },
  { feature: "Support response", values: ["1 business day", "Shared Slack", "Dedicated SA"] },
];

const faqs = [
  {
    q: "Is this really the price? No enterprise haggle?",
    a: "Yes. Foundation, Build, and Scale are the three plans we sell. We publish them so you don't have to sit through three discovery calls just to find out whether we're in your range.",
  },
  {
    q: "What counts as a conversation?",
    a: "A conversation is a discrete session with a single end-user — one voice call, one chat thread, or one email thread. We don't bill per token, per turn, or per minute, and overage is billed at $0.18 per conversation, prorated monthly.",
  },
  {
    q: "What if I need a custom integration?",
    a: "Build and Scale include scoped engineering time for one custom integration per quarter. Beyond that, we estimate and quote per integration based on the source system.",
  },
  {
    q: "Can I start monthly and switch to annual?",
    a: "Yes. Monthly pricing is 20% above the annual rates listed here. You can switch to annual at any renewal and get the lower price applied to the new term.",
  },
  {
    q: "Do you offer a startup or non-profit discount?",
    a: "We discount Foundation by 30% for funded startups under 25 people and registered non-profits. Reach out and we'll send a one-page application.",
  },
  {
    q: "What does onboarding look like?",
    a: "Two to four weeks for Foundation, four to eight for Build, eight to twelve for Scale. We don't take fees until your first agent is live in production handling real traffic.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
      >
        <span className="text-base md:text-lg font-semibold pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 mt-1 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="text-muted-foreground leading-relaxed pb-6 max-w-3xl">{a}</p>
      )}
    </div>
  );
}

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-primary mx-auto" />;
  if (value === false) return <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  return <span className="text-sm text-foreground">{value}</span>;
}

export default function Pricing() {
  usePageMeta(
    "Pricing",
    "Three plans, published prices, no enterprise haggle. Foundation, Build, and Scale tiers for Morsegrid.",
  );

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <FadeIn>
            <div className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
              Pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Plain pricing for serious operations.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Three plans. Published prices. No enterprise haggle, no per-seat traps, no surprise overage bills at the
              end of the quarter.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            {[
              { v: "6 weeks", l: "median time to first agent in production" },
              { v: "70%", l: "of conversations resolved without a human" },
              { v: "$0", l: "in fees until you're live" },
            ].map((s) => (
              <div key={s.l} className="bg-card border border-border rounded-2xl p-5">
                <div className="text-2xl md:text-3xl font-semibold text-primary">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, idx) => (
            <FadeIn key={tier.name} delay={idx * 0.08}>
              <div
                className={`rounded-3xl p-8 h-full flex flex-col ${
                  tier.highlight
                    ? "bg-[#0d0d0d] text-white border border-[#0d0d0d]"
                    : "bg-card border border-border"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  {tier.highlight && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                      Most teams
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-8 ${tier.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                  {tier.tagline}
                </p>
                <div className="mb-8">
                  <div className="text-4xl md:text-5xl font-semibold tracking-tight">{tier.price}</div>
                  <div className={`text-sm mt-2 ${tier.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                    {tier.cadence}
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-relaxed">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${tier.highlight ? "text-primary" : "text-primary"}`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`rounded-full w-full ${
                    tier.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer">
                    {tier.cta}
                  </a>
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What's included</h2>
          <p className="text-muted-foreground mb-8">
            Side-by-side, the easy version. Everything in the table is included in the listed price.
          </p>

          <div className="bg-card border border-border rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {tiers.map((t) => (
                      <th key={t.name} className="p-4 font-semibold text-center">
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
                    >
                      <td className="p-4 font-medium">{row.feature}</td>
                      {row.values.map((v, vi) => (
                        <td key={vi} className="p-4 text-center">
                          <CellValue value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Pricing FAQ</h2>
          <p className="text-muted-foreground mb-6">The questions we get on the first sales call.</p>
          <div className="bg-card border border-border rounded-3xl px-8">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-20 bg-[#0d0d0d] text-white rounded-3xl p-10 md:p-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Talk to a real engineer, not a sales bot.
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              We'll spend 30 minutes on your actual workflows, tell you what we'd build first, and send a written
              recommendation within a week — whether you sign with us or not.
            </p>
            <Button asChild className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer">
                Book a 30-minute call
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
