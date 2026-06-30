import { useState } from "react";
import { ArrowRight, Play, Zap, Radio, Eye, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PreFooterAssessment } from "@/components/layout/PreFooterAssessment";
import { siteConfig } from "@/config/site";

const COPY = {
  eyebrow: "Fall 2026 Release",
  headline: "Proactive Agents",
  subhead:
    "Your AI agents don't wait. They act on the moment that matters — surfacing the right message, to the right customer, before the problem lands.",
  cta: {
    primary: "Book a demo",
    secondary: "Read more",
  },
  capabilities: {
    heading: "A new set of capabilities powering Proactive Agents",
    cta: "Schedule a demo",
    cards: [
      {
        gradient: "from-[#4f46e5] to-[#7c3aed]",
        iconBg: "bg-white/20",
        icon: Zap,
        title: "Real-Time Triggers",
        body: "Monitor live signals — abandoned carts, missed payments, flagged conversations — and fire the instant a threshold is crossed.",
      },
      {
        gradient: "from-[#db2777] to-[#7c3aed]",
        iconBg: "bg-white/20",
        icon: Radio,
        title: "Channel-Aware Delivery",
        body: "Every outreach picks the channel most likely to land: voice for urgency, email for follow-through, chat for in-session nudges.",
      },
      {
        gradient: "from-[#ea580c] to-[#f59e0b]",
        iconBg: "bg-white/20",
        icon: Eye,
        title: "Watchtower Integration",
        body: "Plug directly into Watchtower's always-on monitoring layer. When anomalies are flagged, your agents are already composing the response.",
      },
    ],
  },
  triggers: {
    eyebrow: "REAL-TIME TRIGGERS",
    headline: "Act on the signals your customers send before they ask for help",
    features: [
      {
        title: "Continuity across sessions",
        body: "Agents retain full context of every prior interaction — so outreach feels like a follow-up, not a cold call.",
      },
      {
        title: "Signal-specific insights",
        body: "Each trigger carries enriched metadata: recency, severity, channel history, and predicted intent.",
      },
      {
        title: "Enterprise-grade governance",
        body: "Rate limits, suppression windows, and compliance rules are enforced automatically across every fired action.",
      },
    ],
  },
  channelAware: {
    eyebrow: "CHANNEL-AWARE DELIVERY",
    headline: "Route every outreach to the channel that will actually land",
    features: [
      {
        title: "AOPs at the core",
        body: "Automated Outreach Programs define channel logic once — agents follow the rules at scale without manual review.",
      },
      {
        title: "Call routing intelligence",
        body: "High-urgency escalations are routed directly to live agents with full conversation context pre-loaded.",
      },
      {
        title: "Personalized interactions",
        body: "Every message is personalized using CRM data, behavioral signals, and product usage history.",
      },
    ],
    quote: {
      text: "Morsegrid's proactive outreach cut our churn intervention time by 60% — we're reaching customers before they even realize there's a problem.",
      name: "Sarah Chen",
      title: "Head of Customer Success, Vantaflow",
    },
  },
  watchtower: {
    eyebrow: "WATCHTOWER INTEGRATION",
    headline: "Debug agent behavior before it reaches the customer",
    features: [
      {
        title: "Faster root cause diagnosis",
        body: "Every agent action is logged with its triggering signal, decision rationale, and outcome — searchable in seconds.",
      },
      {
        title: "Agent behavior transparency",
        body: "See exactly what the agent saw, what it considered, and what it chose — no black-box inference.",
      },
      {
        title: "Actionable guidance",
        body: "Watchtower surfaces configuration changes that would improve agent accuracy based on historical outcomes.",
      },
    ],
  },
  closingCta: {
    heading: "Deliver proactive experiences your customers deserve",
    cta: "Get a demo",
  },
};

function ConcentricArcs() {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {[100, 180, 260, 340, 420, 500, 580].map((r, i) => (
        <circle
          key={r}
          cx="400"
          cy="800"
          r={r}
          stroke="rgba(125,108,240,0.12)"
          strokeWidth="1"
          fill="none"
          opacity={1 - i * 0.1}
        />
      ))}
      {[100, 180, 260, 340, 420, 500, 580].map((r, i) => (
        <circle
          key={`glow-${r}`}
          cx="400"
          cy="800"
          r={r}
          stroke="rgba(125,108,240,0.06)"
          strokeWidth="6"
          fill="none"
          opacity={1 - i * 0.12}
        />
      ))}
    </svg>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #050c1f 0%, #0a1428 60%, #0d0824 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(125,108,240,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-80"
      >
        <ConcentricArcs />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7d6cf0]/40 bg-[#7d6cf0]/10 text-xs font-semibold tracking-widest uppercase text-[#b8aff8]">
            {COPY.eyebrow}
          </span>
        </FadeIn>

        <FadeIn delay={0.07}>
          <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02] text-white">
            {COPY.headline}
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            {COPY.subhead}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <a
                href={siteConfig.links.bookCall}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7d6cf0] hover:bg-[#8c7df3] text-white text-sm font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" aria-hidden />
                {COPY.cta.primary}
              </a>
            </MagneticButton>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/80 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {COPY.cta.secondary} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function VideoSection({ onVideoOpen }: { onVideoOpen: () => void }) {
  return (
    <section className="bg-background py-16 px-6">
      <FadeIn>
        <div className="max-w-[860px] mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "16/9" }}
            onClick={onVideoOpen}
            role="button"
            aria-label="Play product overview video"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1a1433 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(125,108,240,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(125,108,240,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#7d6cf0]/60 group-hover:border-[#7d6cf0]/60 transition-colors">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-medium whitespace-nowrap">
              Watch: Proactive Agents overview · 3 min
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function CapabilitiesGrid() {
  return (
    <section id="capabilities" className="bg-background py-24 md:py-32 px-6 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#7d6cf0] mb-4">
              What's new
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight max-w-2xl mx-auto">
              {COPY.capabilities.heading}
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="flex justify-center mt-8 mb-14">
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-85 transition-opacity"
            >
              {COPY.capabilities.cta} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COPY.capabilities.cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div
                  className={`h-full rounded-2xl p-7 flex flex-col gap-5 bg-gradient-to-br ${card.gradient}`}
                >
                  <div className={`w-11 h-11 rounded-full ${card.iconBg} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                    <p className="text-white/75 leading-relaxed text-sm">{card.body}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TriggersMockup() {
  const signals = [
    { label: "Abandoned Cart", value: "$847", status: "firing", color: "bg-amber-500" },
    { label: "Missed Payment", value: "3 days", status: "pending", color: "bg-red-500" },
    { label: "Flagged Chat", value: "CSAT 2/5", status: "resolved", color: "bg-emerald-500" },
  ];
  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-lg shadow-black/8 p-5 space-y-3">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
          Signal Monitor
        </span>
        <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>
      {signals.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 rounded-xl bg-foreground/[0.03] border border-black/6 px-4 py-3"
        >
          <span className={`w-2 h-2 rounded-full ${s.color} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{s.label}</p>
            <p className="text-xs text-foreground/50">{s.value}</p>
          </div>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
              s.status === "firing"
                ? "bg-amber-100 text-amber-700"
                : s.status === "pending"
                ? "bg-red-100 text-red-600"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {s.status}
          </span>
        </div>
      ))}
      <div className="mt-4 rounded-xl bg-[#7d6cf0]/6 border border-[#7d6cf0]/15 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#7d6cf0]/15 flex items-center justify-center flex-shrink-0">
          <Zap className="w-4 h-4 text-[#7d6cf0]" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-foreground">Agent fired</p>
          <p className="text-[11px] text-foreground/50">Email sent · 2 seconds ago</p>
        </div>
        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
      </div>
    </div>
  );
}

function ChannelMockup() {
  const channels = [
    { name: "Voice", icon: "🎙", pct: 28, color: "bg-[#7d6cf0]" },
    { name: "Email", icon: "✉️", pct: 52, color: "bg-blue-500" },
    { name: "Chat", icon: "💬", pct: 20, color: "bg-emerald-500" },
  ];
  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-lg shadow-black/8 p-5">
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
          Channel Distribution
        </span>
        <span className="text-xs text-foreground/40">Last 30 days</span>
      </div>
      <div className="space-y-3">
        {channels.map((ch) => (
          <div key={ch.name}>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="flex items-center gap-2 font-medium text-foreground">
                <span>{ch.icon}</span> {ch.name}
              </span>
              <span className="text-foreground/50 text-xs">{ch.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-foreground/8">
              <div className={`h-2 rounded-full ${ch.color}`} style={{ width: `${ch.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-black/6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-foreground/[0.03] border border-black/6 p-3">
          <p className="text-xs text-foreground/50 mb-1">Open rate</p>
          <p className="text-xl font-semibold text-foreground">84%</p>
        </div>
        <div className="rounded-xl bg-foreground/[0.03] border border-black/6 p-3">
          <p className="text-xs text-foreground/50 mb-1">Avg response</p>
          <p className="text-xl font-semibold text-foreground">4.2m</p>
        </div>
      </div>
    </div>
  );
}

function WatchtowerMockup() {
  const messages = [
    { role: "user", text: "My order hasn't arrived and it's been 10 days." },
    { role: "agent", text: "I can see order #48291 left the warehouse on the 3rd. Let me check the carrier status now." },
    { role: "agent", text: "Carrier flagged a delivery exception at your zip code. I've already initiated a reship — you'll get a new tracking number within 2 hours." },
  ];
  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-lg shadow-black/8 p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
          Agent Debug View
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-[#7d6cf0]/10 text-[#7d6cf0]">
          <Eye className="w-3 h-3" /> Watchtower
        </span>
      </div>
      <div className="space-y-2.5 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-foreground text-background rounded-tr-sm"
                  : "bg-foreground/[0.05] border border-black/6 text-foreground rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-[#7d6cf0]/6 border border-[#7d6cf0]/15 px-3.5 py-3 flex items-start gap-2.5">
        <Eye className="w-3.5 h-3.5 text-[#7d6cf0] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[11px] font-semibold text-[#7d6cf0] mb-0.5">Analysis</p>
          <p className="text-[11px] text-foreground/60 leading-relaxed">
            Agent correctly escalated to reship without human intervention. Trigger: carrier exception webhook.
          </p>
        </div>
      </div>
    </div>
  );
}

function DeepDiveSection({
  eyebrow,
  headline,
  features,
  mockup,
  flip = false,
}: {
  eyebrow: string;
  headline: string;
  features: { title: string; body: string }[];
  mockup: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
            flip ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <FadeIn direction={flip ? "right" : "up"}>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#7d6cf0] mb-4">
                {eyebrow}
              </p>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground leading-snug mb-6">
                {headline}
              </h2>
              <a
                href={siteConfig.links.bookCall}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#7d6cf0] hover:underline mb-8"
              >
                Learn more <ChevronRight className="w-3.5 h-3.5" />
              </a>
              <div className="space-y-0 divide-y divide-black/8">
                {features.map((f) => (
                  <div key={f.title} className="py-4 first:pt-0 last:pb-0">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction={flip ? "up" : "left"}>
            {mockup}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ onVideoOpen }: { onVideoOpen: () => void }) {
  return (
    <section className="bg-white pb-0 pt-2 px-6">
      <FadeIn>
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1a1433 100%)",
            }}
            onClick={onVideoOpen}
            role="button"
            aria-label="Play customer story video"
          >
            <div className="relative flex flex-col md:flex-row items-center gap-8 px-8 md:px-12 py-10">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#7d6cf0]/70 group-hover:border-[#7d6cf0]/60 transition-colors">
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium mb-4">
                  "{COPY.channelAware.quote.text}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-white">{COPY.channelAware.quote.name}</p>
                  <p className="text-xs text-white/55">{COPY.channelAware.quote.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function LightClosingBand() {
  return (
    <section className="bg-background py-24 md:py-32 px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(125,108,240,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <FadeIn>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-8">
            {COPY.closingCta.heading}
          </h2>
          <MagneticButton>
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7d6cf0] hover:bg-[#8c7df3] text-white font-medium transition-colors"
            >
              {COPY.closingCta.cta} <ArrowRight className="w-4 h-4" />
            </a>
          </MagneticButton>
        </div>
      </FadeIn>
    </section>
  );
}

export default function ProactiveAgents() {
  usePageMeta({
    title: "Proactive Agents — Fall 2026 Release",
    description:
      "Morsegrid Proactive Agents reach out to customers before they reach out to you — triggered by real-time signals like abandoned carts, missed payments, and flagged conversations.",
    path: "/proactive-agents",
  });

  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Hero />
      <VideoSection onVideoOpen={() => setVideoOpen(true)} />
      <CapabilitiesGrid />

      <DeepDiveSection
        eyebrow={COPY.triggers.eyebrow}
        headline={COPY.triggers.headline}
        features={COPY.triggers.features}
        mockup={<TriggersMockup />}
      />

      <DeepDiveSection
        eyebrow={COPY.channelAware.eyebrow}
        headline={COPY.channelAware.headline}
        features={COPY.channelAware.features}
        mockup={<ChannelMockup />}
        flip
      />

      <QuoteCard onVideoOpen={() => setVideoOpen(true)} />

      <DeepDiveSection
        eyebrow={COPY.watchtower.eyebrow}
        headline={COPY.watchtower.headline}
        features={COPY.watchtower.features}
        mockup={<WatchtowerMockup />}
      />

      <LightClosingBand />
      <PreFooterAssessment />

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video coming soon"
        >
          <div
            className="max-w-lg w-full mx-4 rounded-2xl bg-[#0d0d0d] border border-white/10 p-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-[#7d6cf0]/15 border border-[#7d6cf0]/25 flex items-center justify-center mx-auto mb-6">
              <Play className="w-6 h-6 text-[#b8aff8] ml-1" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Video coming soon</h3>
            <p className="text-white/55 text-sm leading-relaxed mb-8">
              We're putting the finishing touches on the Proactive Agents demo video. In the meantime, book a live walkthrough with our team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={siteConfig.links.bookCall}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7d6cf0] hover:bg-[#8c7df3] text-white text-sm font-medium transition-colors"
              >
                Book a live demo <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setVideoOpen(false)}
                className="px-5 py-2.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
