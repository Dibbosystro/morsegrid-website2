import { useState } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Star,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  problemTitle,
  problemIntro,
  problems,
  outcomesTitle,
  outcomes,
  methodologyTitle,
  methodologyIntro,
  phases,
  deliverablesTitle,
  deliverablesIntro,
  deliverables,
  proofTitle,
  proofIntro,
  vignettes,
  tiersTitle,
  tiersIntro,
  tiers,
  guaranteeTitle,
  guaranteeBody,
  guaranteePoints,
  faqs,
} from "@/data/clickup-blueprint";
import { caseStudies } from "@/data/case-studies";

const ACCENT = "#7d6cf0";

export default function ClickUpPage() {
  usePageMeta({
    title: "ClickUp Implementation — the Morsegrid Blueprint",
    description:
      "A 90-day, productized ClickUp implementation for agencies. Workspace design, dashboards, automations, and adoption coaching — all in the Morsegrid Blueprint.",
    path: "/products/clickup",
    type: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Morsegrid ClickUp Blueprint",
      provider: { "@type": "Organization", name: "Morsegrid" },
      serviceType: "ClickUp implementation",
      areaServed: "Worldwide",
      description:
        "A 90-day, productized ClickUp implementation methodology for agencies and growing service teams.",
    },
  });
  useHashScroll();

  return (
    <div className="flex flex-col pb-24">
      <Hero />
      <Problem />
      <Outcomes />
      <Methodology />
      <Deliverables />
      <Proof />
      <Pricing />
      <Guarantee />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-[#1f1c3a] via-[#241f4b] to-[#0f1a3a] text-white">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 w-[520px] h-[520px] rounded-full pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle at center, ${ACCENT}99, transparent 65%)`,
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -left-32 bottom-0 w-[420px] h-[420px] rounded-full pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at center, ${ACCENT}66, transparent 65%)`,
          filter: "blur(28px)",
        }}
      />
      <div className="container relative mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
          <Link href="/products" className="hover:text-white transition-colors" data-testid="link-breadcrumb-products-clickup">
            Product
          </Link>
          <span>/</span>
          <span className="text-white">ClickUp Implementation</span>
        </div>
        <FadeIn>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium">
            <Star className="w-3 h-3 text-[#9d8cf5]" /> Flagship product · {heroEyebrow}
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.04] max-w-4xl"
            data-testid="text-clickup-hero-title"
          >
            {heroTitle}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl">
            {heroSubtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#7d6cf0] text-white text-sm font-medium hover:bg-[#8c7df3] transition-colors"
              data-testid="link-clickup-hero-cta"
            >
              Talk to us about the Blueprint <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors"
              data-testid="link-clickup-hero-methodology"
            >
              See the methodology
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/55">
            <span>90-day fixed engagement</span>
            <span>·</span>
            <span>Productized methodology</span>
            <span>·</span>
            <span>Adoption guarantee</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="bg-background py-24 md:py-32 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            The problem
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">{problemTitle}</h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-2xl leading-relaxed">{problemIntro}</p>
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <FadeIn key={p.title} delay={Math.min(i, 3) * 0.05}>
              <div className="p-7 rounded-2xl border border-border bg-card shadow-sm h-full">
                <div className="text-xs font-semibold tracking-widest uppercase text-[#7d6cf0] mb-2">
                  Failure mode 0{i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="bg-muted/30 py-20 md:py-24 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Outcomes
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">{outcomesTitle}</h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((o, i) => (
            <FadeIn key={o.label} delay={Math.min(i, 3) * 0.05}>
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                <div className="text-4xl md:text-5xl font-semibold tracking-tight text-[#7d6cf0]">
                  {o.stat}
                </div>
                <div className="mt-3 text-sm text-foreground/75 leading-snug">{o.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section id="methodology" className="bg-background py-24 md:py-32 border-b border-border/40 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            The methodology
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">{methodologyTitle}</h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-2xl leading-relaxed">{methodologyIntro}</p>
        </FadeIn>
        <div className="mt-16 space-y-6">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <FadeIn key={phase.number} delay={Math.min(i, 3) * 0.04}>
                <article
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10 rounded-3xl border border-border bg-card shadow-sm"
                  data-testid={`phase-${phase.number}`}
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#7d6cf0]/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#7d6cf0]" />
                      </div>
                      <div className="text-sm font-mono text-muted-foreground">Phase {phase.number}</div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{phase.name}</h3>
                    <div className="mt-2 text-sm font-medium text-[#7d6cf0]">{phase.duration}</div>
                    <p className="mt-4 text-foreground/75 leading-relaxed">{phase.summary}</p>
                  </div>
                  <div className="lg:col-span-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      What happens
                    </div>
                    <ul className="space-y-2.5">
                      {phase.whatHappens.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Deliverables
                    </div>
                    <ul className="space-y-2.5">
                      {phase.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                          <Check className="w-4 h-4 text-[#7d6cf0] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Deliverables() {
  return (
    <section className="bg-muted/30 py-24 md:py-32 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Deliverables
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">{deliverablesTitle}</h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-2xl leading-relaxed">{deliverablesIntro}</p>
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deliverables.map((d, i) => {
            const Icon = d.icon;
            return (
              <FadeIn key={d.title} delay={Math.min(i, 7) * 0.03}>
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#7d6cf0]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#7d6cf0]" />
                  </div>
                  <h3 className="font-semibold mb-1.5 leading-tight">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const featured = caseStudies
    .filter((c) => ["vertex-solutions", "scaling-ecommerce-fulfillment"].includes(c.slug))
    .slice(0, 2);
  return (
    <section className="bg-background py-24 md:py-32 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">{proofTitle}</h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-2xl leading-relaxed">{proofIntro}</p>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {vignettes.map((v, i) => (
            <FadeIn key={v.customer} delay={Math.min(i, 1) * 0.05}>
              <article className="p-7 rounded-2xl border border-border bg-card shadow-sm h-full flex flex-col">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {v.context}
                </div>
                <h3 className="text-lg font-semibold mb-3">{v.customer}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed flex-1">{v.body}</p>
                <div className="mt-6 pt-6 border-t border-border/60 flex items-baseline gap-3">
                  <div className="text-3xl font-semibold text-[#7d6cf0] tracking-tight">{v.stat}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{v.statLabel}</div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="mt-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
              Featured case studies
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
                  data-testid={`link-clickup-proof-${cs.slug}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold">{cs.customer}</div>
                    <div className="text-xs text-muted-foreground">{cs.industry}</div>
                  </div>
                  <blockquote className="text-foreground/85 leading-relaxed italic mb-5">
                    &ldquo;{cs.quote.text}&rdquo;
                  </blockquote>
                  <div className="mt-auto">
                    <div className="text-sm font-medium">{cs.quote.attribution}</div>
                    <div className="text-xs text-muted-foreground">{cs.quote.role}</div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#7d6cf0]">
                      Read the case study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 py-24 md:py-32 border-b border-border/40 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Pricing & packages
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">{tiersTitle}</h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-2xl leading-relaxed">{tiersIntro}</p>
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={Math.min(i, 2) * 0.05}>
              <div
                className={`relative p-8 rounded-3xl border shadow-sm h-full flex flex-col ${
                  tier.highlight
                    ? "bg-[#1f1c3a] text-white border-transparent shadow-lg shadow-[#7d6cf0]/20"
                    : "bg-card border-border"
                }`}
                data-testid={`tier-${tier.name.toLowerCase()}`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-8 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#7d6cf0] text-white text-xs font-semibold">
                    <Sparkles className="w-3 h-3" /> Most teams
                  </span>
                )}
                <div className="text-sm font-semibold tracking-wider uppercase mb-2 opacity-80">
                  {tier.name}
                </div>
                <p className={`text-sm leading-relaxed mb-6 ${tier.highlight ? "text-white/70" : "text-muted-foreground"}`}>
                  {tier.tagline}
                </p>
                <div className="mb-1 text-3xl md:text-4xl font-semibold tracking-tight">{tier.price}</div>
                <div className={`text-xs mb-6 ${tier.highlight ? "text-white/55" : "text-muted-foreground"}`}>
                  {tier.priceNote}
                </div>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${tier.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  Best for
                </div>
                <p className={`text-sm leading-relaxed mb-6 ${tier.highlight ? "text-white/85" : "text-foreground/80"}`}>
                  {tier.bestFor}
                </p>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${tier.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  Includes
                </div>
                <ul className="space-y-2.5 flex-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? "text-[#9d8cf5]" : "text-[#7d6cf0]"}`}
                      />
                      <span className={tier.highlight ? "text-white/85" : "text-foreground/85"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={siteConfig.links.bookCall}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-sm font-medium transition-colors ${
                    tier.highlight
                      ? "bg-[#7d6cf0] text-white hover:bg-[#8c7df3]"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                  data-testid={`link-tier-cta-${tier.name.toLowerCase()}`}
                >
                  Talk to us <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="bg-background py-24 md:py-32 border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <FadeIn className="lg:col-span-5">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Guarantee
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{guaranteeTitle}</h2>
            <p className="mt-5 text-lg text-foreground/75 leading-relaxed">{guaranteeBody}</p>
          </FadeIn>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            {guaranteePoints.map((g, i) => {
              const Icon = g.icon;
              return (
                <FadeIn key={g.title} delay={Math.min(i, 2) * 0.05}>
                  <div className="p-6 rounded-2xl border border-border bg-card shadow-sm h-full">
                    <div className="w-10 h-10 rounded-xl bg-[#7d6cf0]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#7d6cf0]" />
                    </div>
                    <h3 className="font-semibold mb-2 leading-tight">{g.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-trigger-${index}`}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        data-testid={`faq-trigger-${index}`}
      >
        <span className="text-base md:text-lg font-medium text-foreground leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 mt-1 transition-transform ${open ? "rotate-180 text-[#7d6cf0]" : ""}`}
        />
      </button>
      <motion.div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p className="pb-6 pr-10 text-sm md:text-base text-foreground/75 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="bg-muted/30 py-24 md:py-32 border-b border-border/40 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <FadeIn className="lg:col-span-4">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Questions teams ask before they sign.</h2>
            <p className="mt-5 text-foreground/70 leading-relaxed">
              Don't see yours? <a href={`mailto:${siteConfig.contact.email}`} className="text-[#7d6cf0] underline underline-offset-4">Email us</a> and we'll answer within a day.
            </p>
          </FadeIn>
          <div className="lg:col-span-8">
            {faqs.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-background pt-20 md:pt-28 px-3 md:px-6">
      <div className="relative max-w-6xl mx-auto rounded-[28px] overflow-hidden bg-gradient-to-br from-[#1f1c3a] via-[#241f4b] to-[#0f1a3a] text-white p-10 md:p-16">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle at center, ${ACCENT}88, transparent 65%)`,
            filter: "blur(20px)",
          }}
        />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Stop relaunching ClickUp every six months.
          </h2>
          <p className="mt-5 text-white/75 leading-relaxed">
            Book a 30-minute working session. We'll walk you through the Blueprint, look at your current workspace,
            and tell you honestly whether the engagement fits.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#7d6cf0] text-white text-sm font-medium hover:bg-[#8c7df3] transition-colors"
              data-testid="link-clickup-final-cta"
            >
              Book a working session <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors"
              data-testid="link-clickup-final-products"
            >
              See the rest of the platform
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

