import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronDown, Plus, Gauge, Star, SquareKanban, Check, Route, Film, User, FileText, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/fade-in";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CUSTOMERS } from "@/data/customers";
import { track } from "@/lib/analytics";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

type ResponsiveImageProps = {
  name: string;
  widths: number[];
  sizes: string;
  className?: string;
  alt?: string;
  loading?: "lazy" | "eager";
};

function ResponsiveImage({
  name,
  widths,
  sizes,
  className,
  alt = "",
  loading = "lazy",
}: ResponsiveImageProps) {
  const srcSet = (ext: string) =>
    widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallbackWidth = widths[Math.min(1, widths.length - 1)];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/images/${name}-${fallbackWidth}.jpg`}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

const ACCENT = "text-[#7d6cf0]";
const ACCENT_BG = "bg-[#7d6cf0]";

function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-medium text-foreground shadow-sm">
      <Plus className="w-3 h-3" /> {children}
    </span>
  );
}

/* ---------- 2. Hero ---------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HERO_ICONS: Record<string, LucideIcon> = {
  check: Check,
  route: Route,
  film: Film,
  user: User,
  doc: FileText,
  send: Send,
};

type HeroEvent = {
  icon: keyof typeof HERO_ICONS;
  color: string;
  bg: string;
  action: string;
  client: string;
  time: string;
};

const HERO_EVENTS: HeroEvent[] = [
  { icon: "check", color: "#2D5016", bg: "#EBF5E8", action: "Invoice #1042 sent automatically", client: "Omar City", time: "just now" },
  { icon: "route", color: "#1a5276", bg: "#EBF5F9", action: "New lead routed to CRM", client: "Nexus Advisor", time: "1 min ago" },
  { icon: "film", color: "#6C3483", bg: "#F4ECF7", action: "YouTube video → newsletter draft", client: "Cafe Racer Garage", time: "3 min ago" },
  { icon: "user", color: "#7B241C", bg: "#FDEDEC", action: "Intake form submitted, practitioner notified", client: "Prana Thrive", time: "5 min ago" },
  { icon: "check", color: "#2D5016", bg: "#EBF5E8", action: "Order fulfilled, tracking sent", client: "Omar City", time: "7 min ago" },
  { icon: "doc", color: "#1E8449", bg: "#EAFAF1", action: "Subcontractor contract generated", client: "Nexus Advisor", time: "9 min ago" },
  { icon: "send", color: "#1a5276", bg: "#EBF5F9", action: "Follow-up email sent to prospect", client: "Nexus Advisor", time: "11 min ago" },
  { icon: "film", color: "#6C3483", bg: "#F4ECF7", action: "Video transcript → social captions", client: "Cafe Racer Garage", time: "13 min ago" },
  { icon: "check", color: "#2D5016", bg: "#EBF5E8", action: "Billing synced to Xero", client: "Omar City", time: "15 min ago" },
  { icon: "user", color: "#7B241C", bg: "#FDEDEC", action: "Patient intake thread closed cleanly", client: "Prana Thrive", time: "18 min ago" },
];

function Hero() {
  const reduce = useReducedMotion();
  const [feed, setFeed] = useState(() =>
    HERO_EVENTS.slice(0, 5).map((ev, i) => ({ ...ev, key: i })),
  );
  const [count, setCount] = useState(247);

  useEffect(() => {
    if (reduce) return;
    let idx = 5;
    const id = setInterval(() => {
      const ev = HERO_EVENTS[idx % HERO_EVENTS.length];
      idx += 1;
      const nextKey = idx;
      setCount((c) => c + 1);
      setFeed((prev) => [{ ...ev, key: nextKey }, ...prev].slice(0, 5));
    }, 2800);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 pb-6">
      <div
        className="relative rounded-[24px] overflow-hidden min-h-[calc(100dvh-6rem)] shadow-[0_2px_48px_rgba(0,0,0,0.09)]"
        style={{
          background:
            "linear-gradient(140deg,#EDE8E0 0%,#E4DDD4 18%,#D8D4C8 38%,#D0D8C4 58%,#C8D8B8 80%,#BFD4AC 100%)",
        }}
      >
        <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 items-center min-h-[calc(100dvh-6rem)] gap-6 lg:gap-0">
          {/* LEFT: copy */}
          <div className="flex flex-col px-6 pt-28 pb-6 md:px-12 lg:pl-20 lg:pr-4 lg:pt-20 lg:pb-10">
            <FadeIn>
              <span className="inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#131313]/50 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5016]" />
                Systems &amp; automation studio
              </span>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="font-extrabold tracking-[-0.038em] leading-[1.03] text-[#131313] text-[clamp(2.25rem,4.5vw,5rem)] text-balance">
                A small studio that<br />builds the systems<br />your business runs on.
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-5 text-[17px] leading-[1.65] text-[#131313]/60 max-w-[470px]">
                We work with a handful of growing companies a year. Quietly, carefully,
                and in a way you can hand to your team when we're done.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <div className="mt-8 flex items-center gap-2 flex-wrap">
                <a
                  href={siteConfig.links.bookCall}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("cta_book_call_click", { location: "hero" })}
                  className="rounded-full bg-[#131313] text-white px-6 py-3 text-sm font-medium hover:bg-[#2D5016] transition-colors"
                >
                  Book a call
                </a>
                <a
                  href="#stories"
                  className="rounded-full px-4 py-3 text-sm font-semibold text-[#131313]/60 hover:text-[#131313] hover:bg-white/40 transition-colors"
                >
                  See how it works →
                </a>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT: live activity panel */}
          <div className="hidden lg:flex items-center justify-center relative pr-14 pl-4" aria-hidden="true">
            <div className="flex flex-row items-end gap-3">
              {/* floating notification badge */}
              <div className="shrink-0 rounded-[14px] bg-[#131313] text-white px-[18px] py-[14px] text-[13px] font-semibold leading-snug max-w-[150px] shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                Your order has been fulfilled automatically.
                <div className="mt-1.5 text-[11px] font-medium text-white/55">just now · Omar City</div>
              </div>

              {/* activity panel */}
              <div className="w-[420px] max-w-full rounded-[22px] overflow-hidden border border-white/90 bg-white/[0.68] backdrop-blur-xl shadow-[0_8px_48px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,0.6)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.07]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                    <span className="text-[12.5px] font-bold text-[#131313] tracking-tight">Live automations</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#2D5016] bg-[#EBF5E8] rounded-full px-2.5 py-[3px]">Running</span>
                </div>

                <div className="px-4 pt-3 pb-4 flex flex-col gap-1.5 max-h-[310px] overflow-hidden">
                  <AnimatePresence initial={false}>
                    {feed.map((ev) => {
                      const Icon = HERO_ICONS[ev.icon];
                      return (
                        <motion.div
                          key={ev.key}
                          layout
                          initial={reduce ? false : { opacity: 0, y: 14, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.98 }}
                          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-2.5 px-4 py-3 rounded-[13px] bg-white/[0.72] border border-black/[0.06]"
                        >
                          <span
                            className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0"
                            style={{ background: ev.bg, color: ev.color }}
                          >
                            <Icon className="w-[15px] h-[15px]" strokeWidth={2.5} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-[13px] font-semibold text-[#131313] leading-[1.35] truncate">{ev.action}</span>
                            <span className="flex items-center gap-1.5 text-[11.5px] text-[#131313]/45 whitespace-nowrap overflow-hidden">
                              <span className="font-semibold text-[#131313]/55">{ev.client}</span>
                              <span className="opacity-35">·</span>
                              <span>{ev.time}</span>
                            </span>
                          </span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 px-5 py-[18px] border-t border-black/[0.06]">
                  <Check className="w-3.5 h-3.5 text-[#2D5016]" strokeWidth={2.5} />
                  <span className="text-[12px] text-[#131313]/55 font-medium">All systems healthy</span>
                  <span className="ml-auto text-[11.5px] font-semibold text-[#131313]/55">
                    <span className="text-[#2D5016] text-[14px] font-bold tabular-nums">{count}</span> tasks today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scroll chevron */}
        <a
          href="#stories"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-[#131313] hover:bg-white transition-colors shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

/* ---------- 3. Logo wall ---------- */
function LogoWall() {
  return (
    <section id="stories" className="bg-background pt-24 md:pt-32 pb-16 md:pb-20">
      <div className="container mx-auto px-6 md:px-10">
        <FadeIn>
          <PillBadge>Customer stories</PillBadge>
        </FadeIn>
        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground max-w-2xl leading-tight">
              Powering operations for growing teams across the country.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/customers"
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-[#7d6cf0] text-[#7d6cf0] text-sm font-medium hover:bg-[#7d6cf0]/10 transition-colors whitespace-nowrap"
              data-testid="link-all-stories"
            >
              See all customer stories
            </Link>
          </FadeIn>
        </div>
        <div className="border-t border-black/10 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 items-center">
            {CUSTOMERS.map(({ slug, name, Logo }) => (
              <div
                key={slug}
                className="flex justify-center items-center text-foreground/40 hover:text-foreground/70 transition-colors"
                title={name}
              >
                <Logo className="h-7 md:h-8 w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4b. Free assessment band ---------- */
function AssessmentBand() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-background pt-12 pb-20 md:pb-24 px-3 md:px-6">
      <div className="relative max-w-6xl mx-auto rounded-[28px] overflow-hidden bg-gradient-to-br from-[#1f1c3a] via-[#241f4b] to-[#0f1a3a] text-white p-8 md:p-14">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full pointer-events-none opacity-50"
          style={{
            background:
              "radial-gradient(circle at center, rgba(125,108,240,0.55), transparent 65%)",
            filter: "blur(20px)",
          }}
        />
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium">
              <Gauge className="w-3 h-3 text-[#9d8cf5]" /> Free, ~10-minute assessment
            </span>
            <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              How systemized<br /> is your team?
            </h2>
            <p className="mt-5 text-white/75 leading-relaxed max-w-lg">
              Get a personalized Systemization Score across seven categories — plus the three areas where
              your next 30 days of work will move the needle most.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#7d6cf0] text-white text-sm font-medium hover:bg-[#8c7df3] transition-colors"
                  data-testid="link-home-assessment-cta"
                >
                  Take Your Free Assessment <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </MagneticButton>
              <span className="text-xs text-white/55">No credit card. Results instantly.</span>
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative justify-self-center md:justify-self-end"
            aria-hidden
          >
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="72" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <motion.circle
                  cx="90"
                  cy="90"
                  r="72"
                  fill="none"
                  stroke="#9d8cf5"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 72}
                  initial={{ strokeDashoffset: 2 * Math.PI * 72 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 72 * (1 - 0.68) }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  transform="rotate(-90 90 90)"
                />
                <text x="90" y="92" textAnchor="middle" fill="white" fontSize="36" fontWeight="600">
                  68
                </text>
                <text x="90" y="114" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11">
                  Sample score
                </text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4c. Flagship ClickUp band ---------- */
function FlagshipClickUp() {
  return (
    <section className="bg-background pt-4 pb-20 md:pb-24 px-3 md:px-6">
      <Link
        href="/products/clickup"
        className="group relative block max-w-6xl mx-auto rounded-[28px] overflow-hidden bg-gradient-to-br from-[#1f1c3a] via-[#241f4b] to-[#0f1a3a] text-white p-8 md:p-14 hover:shadow-xl hover:shadow-[#7d6cf0]/20 transition-shadow"
        data-testid="link-home-flagship-clickup"
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 w-[480px] h-[480px] rounded-full pointer-events-none opacity-50"
          style={{
            background: "radial-gradient(circle at center, rgba(125,108,240,0.55), transparent 65%)",
            filter: "blur(20px)",
          }}
        />
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium">
              <Star className="w-3 h-3 text-[#9d8cf5]" /> Flagship product
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] max-w-2xl">
              The Morsegrid <span className={ACCENT}>ClickUp Blueprint</span>.
            </h2>
            <p className="mt-5 text-white/75 leading-relaxed max-w-xl">
              A 90-day, productized ClickUp implementation for agencies and growing service teams. Workspace
              architecture, dashboards your leadership opens, and adoption coaching — shipped in one Blueprint.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#7d6cf0] text-white text-sm font-medium group-hover:bg-[#8c7df3] transition-colors">
                Explore the Blueprint <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-xs text-white/55">90 days · Fixed fee · Adoption guaranteed</span>
            </div>
          </div>
          <div className="relative justify-self-center md:justify-self-end">
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur">
              <SquareKanban className="w-20 h-20 md:w-24 md:h-24 text-[#9d8cf5]" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

/* ---------- 5. Morsegrid difference ---------- */
function Difference() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10">
        <FadeIn>
          <PillBadge>The Morsegrid difference</PillBadge>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Move past brittle scripts with{" "}
              <span className={ACCENT}>Operational Playbooks</span>{" "}
              that quietly run your business.
            </h2>
            <p className="mt-8 text-lg text-foreground/70 leading-relaxed max-w-md">
              Define the way your business should run in plain language, then let Morsegrid enforce it across every tool you already use — no more tangled spreadsheets or one-off scripts.
            </p>
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                track("cta_book_call_click", { location: "home_difference" });
                track("cta_difference");
              }}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0d0d0d] text-white text-sm font-medium hover:bg-black transition-colors"
              data-testid="link-difference-learn"
            >
              Learn more
            </a>
          </FadeIn>

          <FadeIn direction="left">
            <div className="relative" style={{ perspective: "1200px" }}>
              <div
                className="relative bg-white rounded-2xl border border-black/10 p-7 max-w-md ml-auto"
                style={{
                  transform: "rotateX(14deg) rotateY(-18deg) rotateZ(6deg)",
                  boxShadow:
                    "0 30px 60px -20px rgba(125,108,240,0.35), 0 18px 36px -10px rgba(0,0,0,0.18)",
                }}
              >
                <div className="text-xs font-semibold tracking-widest uppercase text-[#7d6cf0] mb-3">
                  Order routing playbook
                </div>
                <ol className="space-y-2.5 text-sm text-foreground/85">
                  <li>1. Verify SKU and inventory in 3PL</li>
                  <li>2. Check shipping eligibility and zones</li>
                  <li>3. Apply discount and partner pricing rules</li>
                  <li>4. Route to nearest fulfillment node</li>
                  <li>5. Notify customer and sync to CRM</li>
                </ol>
              </div>
              <div
                className="absolute -bottom-6 left-10 right-10 h-24 rounded-full blur-3xl opacity-50 pointer-events-none"
                style={{ backgroundColor: "#7d6cf0" }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Black scroll-pinned timeline ---------- */
function TimelineNode({
  num,
  containerRef,
  index,
  total,
}: {
  num: number | "+";
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
  total: number;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const range = [index / total, (index + 0.6) / total];
  const bg = useTransform(scrollYProgress, range, ["#2a2a2a", "#7d6cf0"]);
  const color = useTransform(scrollYProgress, range, ["#888", "#fff"]);
  return (
    <motion.div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border border-white/10"
      style={{ backgroundColor: bg, color }}
    >
      {num}
    </motion.div>
  );
}

function ScrollTimeline() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const steps = [
    {
      kw: "Build",
      title: "your operations",
      body: "Define how your business should run in plain language. Morsegrid translates your playbook into the integrations, automations, and dashboards your team uses every day.",
      mockup: <BuildMockup />,
      side: "left" as const,
    },
    {
      kw: "Optimize",
      title: "what's working",
      body: "Watch every routing decision, every handoff, every exception. Tune thresholds and rules with confidence — and see the lift in CSAT, accuracy, and cycle time.",
      mockup: <OptimizeMockup />,
      side: "right" as const,
    },
    {
      kw: "Scale",
      title: "across your stack",
      body: "Plug new tools, channels, and partners into the same playbooks. Your operations grow with the business without adding more spreadsheets or more headcount.",
      mockup: <ScaleMockup />,
      side: "left" as const,
    },
  ];
  const total = steps.length + 1;

  return (
    <section className="bg-[#0d0d0d] text-white py-20 md:py-28 px-3 md:px-6 mt-12">
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto rounded-[28px] bg-[#0d0d0d] py-20 md:py-28 px-6 md:px-12 overflow-hidden"
      >
        <div className="flex justify-center mb-16 md:mb-24">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white">
            <Plus className="w-3 h-3" /> Complete, unified platform
          </span>
        </div>

        <div className="relative">
          {/* Center rail */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10 hidden md:block" />

          <div>
            {steps.map((s, i) => {
              const text = (
                <div>
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    <span className={ACCENT}>{s.kw}</span> {s.title}
                  </h3>
                  <p className="mt-5 text-white/70 leading-relaxed max-w-md">{s.body}</p>
                </div>
              );
              const mockup = <div>{s.mockup}</div>;
              return (
                <div
                  key={i}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-center md:min-h-[80vh] py-16 md:py-0"
                >
                  {/* Left col */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="md:pr-12 md:text-right"
                  >
                    {s.side === "left" ? text : mockup}
                  </motion.div>

                  {/* Sticky center node — sticks within this step's row, then releases */}
                  <div className="hidden md:flex justify-center w-10 self-stretch">
                    <div className="sticky top-[calc(50vh-1.25rem)] h-10 z-10">
                      <TimelineNode
                        num={i + 1}
                        containerRef={containerRef}
                        index={i}
                        total={total}
                      />
                    </div>
                  </div>

                  {/* Right col */}
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="md:pl-12"
                  >
                    {s.side === "left" ? mockup : text}
                  </motion.div>
                </div>
              );
            })}

            {/* Final + node */}
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] pt-8">
              <div />
              <div className="hidden md:flex justify-center w-10">
                <TimelineNode num="+" containerRef={containerRef} index={steps.length} total={total} />
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildMockup() {
  return (
    <div className="relative">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 max-w-sm space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] uppercase tracking-wider text-white/60 shrink-0">
            Sys
          </div>
          <div className="bg-white/5 border border-white/10 text-white/85 text-sm rounded-xl rounded-tl-sm px-3.5 py-2">
            Define your routing logic.
          </div>
        </div>
        <div className="flex items-start gap-2.5 justify-end">
          <div className="bg-[#7d6cf0]/90 text-white text-sm rounded-xl rounded-tr-sm px-3.5 py-2">
            Got it. Routing 3PL orders by SKU + region.
          </div>
          <div className="w-7 h-7 rounded-full bg-[#7d6cf0] flex items-center justify-center text-[10px] font-semibold text-white shrink-0">
            AG
          </div>
        </div>
        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-3.5 text-xs text-white/85 font-mono leading-relaxed">
          <div>1. Look up <span className="text-[#9d8cf5]">@order.sku</span> in inventory</div>
          <div>2. If <span className="text-[#9d8cf5]">region === "WEST"</span> → node:LAX</div>
          <div>3. Else if <span className="text-[#9d8cf5]">@order.weight &gt; 30</span> → node:DFW</div>
          <div>4. Else → nearest_node(<span className="text-[#9d8cf5]">@ship_to.zip</span>)</div>
          <div>5. Notify customer + sync CRM</div>
        </div>
      </div>
      <div className="absolute -bottom-6 left-12 right-12 h-24 rounded-full blur-3xl opacity-60 bg-[#7d6cf0] pointer-events-none" />
    </div>
  );
}

function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(decimals === 0 ? "0" : "0".padEnd(2 + decimals, "0").replace(/^0/, "0."));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return controls.stop;
  }, [inView, to, decimals, mv]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 100;
  const h = 28;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min || 1)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7 mt-3" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7d6cf0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7d6cf0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-grad)" />
      <path d={path} fill="none" stroke="#9d8cf5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OptimizeMockup() {
  const cards = [
    {
      label: "Routing accuracy",
      to: 80.9,
      suffix: "%",
      decimals: 1,
      sparkline: [42, 48, 55, 60, 64, 71, 76, 81],
    },
    {
      label: "CSAT",
      to: 4.6,
      suffix: "",
      decimals: 1,
      sparkline: [3.6, 3.8, 3.9, 4.1, 4.2, 4.3, 4.5, 4.6],
    },
  ];
  return (
    <div className="relative flex gap-4 justify-center">
      {cards.map((c) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 w-44 relative z-10"
        >
          <div className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">
            {c.label}
          </div>
          <div className="text-3xl md:text-4xl font-semibold text-white tabular-nums">
            <CountUp to={c.to} suffix={c.suffix} decimals={c.decimals} />
          </div>
          <Sparkline points={c.sparkline} />
          <div className="mt-1 text-[10px] text-white/40 uppercase tracking-wider">8-week trend</div>
        </motion.div>
      ))}
      <div className="absolute -bottom-8 inset-x-8 h-28 rounded-full blur-3xl opacity-60 bg-[#7d6cf0] pointer-events-none" />
    </div>
  );
}

function ScaleMockup() {
  const bars = [22, 30, 38, 44, 52, 61, 73, 88];
  return (
    <div className="relative h-72 flex items-center justify-center" style={{ perspective: "1200px" }}>
      {/* Back tile - blurred */}
      <div
        className="absolute bg-[#1a1a1a] border border-white/10 rounded-2xl w-48 h-56 p-3 opacity-50"
        style={{
          transform: "translateX(-44px) translateY(14px) rotateY(-26deg) rotateX(8deg)",
          filter: "blur(6px)",
          background: "linear-gradient(160deg, #1a1a1a, #251f3a)",
          zIndex: 0,
        }}
      />
      {/* Middle tile - softly blurred */}
      <div
        className="absolute bg-[#1a1a1a] border border-white/15 rounded-2xl w-48 h-56 p-3 opacity-75"
        style={{
          transform: "translateX(-22px) translateY(7px) rotateY(-22deg) rotateX(6deg)",
          filter: "blur(2.5px)",
          background: "linear-gradient(160deg, #1a1a1a, #2a2540)",
          zIndex: 1,
        }}
      />
      {/* Front tile - real bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#1a1a1a] border border-white/15 rounded-2xl w-48 h-56 p-4"
        style={{
          transform: "rotateY(-18deg) rotateX(4deg)",
          background: "linear-gradient(160deg, #1a1a1a, #2a2540)",
          zIndex: 2,
          boxShadow: "0 24px 50px -10px rgba(125,108,240,0.4)",
        }}
      >
        <div className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Volume</div>
        <div className="text-lg font-semibold text-white mb-3 tabular-nums">12,840</div>
        <svg viewBox="0 0 100 70" className="w-full h-32" preserveAspectRatio="none">
          {bars.map((h, i) => {
            const x = (i / bars.length) * 100 + 1;
            const w = 100 / bars.length - 2;
            const barH = (h / 100) * 70;
            return (
              <motion.rect
                key={i}
                x={x}
                y={70 - barH}
                width={w}
                height={barH}
                rx={1.5}
                fill="#7d6cf0"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${x + w / 2}px 70px` }}
              />
            );
          })}
        </svg>
        <div className="mt-2 flex items-center gap-1 text-[10px] text-[#9d8cf5]">
          <span className="font-semibold">+34%</span>
          <span className="text-white/50">vs. prior 8 weeks</span>
        </div>
      </motion.div>
      <div className="absolute -bottom-4 inset-x-12 h-28 rounded-full blur-3xl opacity-60 bg-[#7d6cf0] pointer-events-none" />
    </div>
  );
}

/* ---------- 7. Your business evolves card ---------- */
function EvolvesCard() {
  return (
    <section className="bg-background pt-12 pb-20 md:pb-28 px-3 md:px-6">
      <div className="relative max-w-6xl mx-auto bg-[#141414] text-white rounded-[28px] p-8 md:p-14">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#7d6cf0] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" /></svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-12 grid-rows-6 gap-3 h-72 md:h-80">
            <div className="col-span-7 row-span-3 rounded-xl overflow-hidden">
              <ResponsiveImage name="collage-1" widths={[480, 720, 1080]} sizes="(min-width: 768px) 360px, 60vw" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-5 row-span-4 rounded-xl overflow-hidden">
              <ResponsiveImage name="collage-2" widths={[480, 720, 1080]} sizes="(min-width: 768px) 260px, 40vw" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-7 row-span-3 rounded-xl overflow-hidden">
              <ResponsiveImage name="collage-3" widths={[480, 720, 1080]} sizes="(min-width: 768px) 360px, 60vw" className="w-full h-full object-cover" />
            </div>
            <div className="col-span-5 row-span-2 rounded-xl bg-white/5 border border-white/10" />
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              <span className={ACCENT}>Your business evolves.</span><br />
              Your operations should too.
            </h3>
            <p className="mt-5 text-white/70 leading-relaxed">
              Every change to how your team works shouldn't require a months-long project or a new vendor.
            </p>
            <p className="mt-4 text-white/70 leading-relaxed">
              Morsegrid lets you adjust playbooks in plain language and ship the change across your stack the same day.
            </p>
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                track("cta_book_call_click", { location: "home_evolves" });
                track("cta_evolves");
              }}
              className="mt-8 inline-flex items-center px-5 py-2.5 rounded-full border border-[#7d6cf0] text-[#7d6cf0] text-sm font-medium hover:bg-[#7d6cf0]/10 transition-colors"
              data-testid="link-evolves-learn"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Omnichannel stacked words ---------- */
const CHANNELS = [
  { word: "Shopify", caption: "Inventory, orders, and customer events sync the moment they happen — no nightly batch jobs." },
  { word: "HubSpot", caption: "Leads, contacts, and deals stay clean and routed without manual sweeps from your ops team." },
  { word: "Stripe", caption: "Subscriptions, refunds, and reconciliation just flow into the systems your finance team trusts." },
];

function Omnichannel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CHANNELS.length), 3000);
    return () => clearInterval(id);
  }, [paused, reduce]);
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10">
        <FadeIn>
          <PillBadge>Built where you already work</PillBadge>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                Plug into the tools<br />you already use.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-foreground/70 leading-relaxed max-w-md">
                Morsegrid sits on top of the platforms your team already lives in, unifying their data and rules behind a single playbook.
              </p>
            </FadeIn>

            <div
              className="mt-10 space-y-1"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {CHANNELS.map((c, i) => (
                <button
                  key={c.word}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`block text-6xl md:text-7xl font-semibold tracking-tight transition-colors text-left ${
                    i === active ? `${ACCENT} underline underline-offset-8 decoration-2` : "text-foreground"
                  }`}
                  data-testid={`channel-${c.word.toLowerCase()}`}
                >
                  {c.word}
                </button>
              ))}
            </div>

            <div className="mt-8 border-t border-black/10 pt-6 min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-foreground/75 max-w-md"
                >
                  {CHANNELS[active].caption}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <FadeIn direction="left">
            <div className="relative rounded-3xl overflow-hidden">
              <ResponsiveImage name="omnichannel" widths={[640, 960, 1440]} sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto object-cover" />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(125,108,240,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(125,108,240,0.25) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}



/* ---------- 10. Final CTA ---------- */
function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-background pt-20 pb-32 overflow-hidden">
      <motion.div
        animate={reduce ? undefined : { scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-32 w-[900px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,140,90,0.55), rgba(125,108,240,0.45) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative container mx-auto px-6 md:px-10 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-3xl mx-auto">
            Build the operations<br />your team deserves.
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-10 inline-block">
            <MagneticButton>
              <a
                href={siteConfig.links.bookCall}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  track("cta_book_call_click", { location: "home_final" });
                  track("cta_final");
                }}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#0d0d0d] text-white text-sm font-medium hover:bg-black transition-colors"
                data-testid="link-final-cta"
              >
                Book a call <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  usePageMeta({
    title: "The operations studio for growing businesses",
    description: "Build, optimize, and scale the internal systems that growing teams actually run on.",
    path: "/",
  });

  return (
    <div className="flex flex-col">
      <Hero />
      <FlagshipClickUp />
      <LogoWall />
      <TestimonialCarousel />
      <Difference />
      <ScrollTimeline />
      <EvolvesCard />
      <Omnichannel />
      <FinalCTA />
    </div>
  );
}
