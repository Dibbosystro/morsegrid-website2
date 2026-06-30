import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Loader2, Calendar, Sparkles } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

interface ReportPayload {
  token: string;
  overall: number;
  tier: { label: string; blurb: string };
  categories: { id: string; title: string; score: number; recommendation: string }[];
  weakest: { id: string; title: string; score: number; recommendation: string }[];
  contact: { name: string; company: string };
  createdAt: number;
}

export default function AssessmentReportPage() {
  const [, params] = useRoute("/assessment/report/:token");
  const token = params?.token;
  const reduce = useReducedMotion();
  const [data, setData] = useState<ReportPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  usePageMeta({
    title: data ? `Your Systemization Score: ${data.overall}` : "Your Systemization Report",
    description: "Your personalized Morsegrid Systemization Score and recommendations.",
    path: token ? `/assessment/report/${token}` : "/assessment/report",
  });

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const apiBase = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
        const res = await fetch(`${apiBase}/api/assessment/${encodeURIComponent(token)}`);
        if (!res.ok) {
          if (cancelled) return;
          setError(
            res.status === 404
              ? "We couldn't find that report. The link may have expired."
              : "Something went wrong loading your report.",
          );
          setLoading(false);
          return;
        }
        const json = (await res.json()) as ReportPayload;
        if (cancelled) return;
        setData(json);
        setLoading(false);
      } catch {
        if (cancelled) return;
        setError("We couldn't reach our servers. Check your connection and try again.");
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-foreground/70 mb-4">No report token in URL.</p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm"
          >
            Take the assessment
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-foreground/50" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold mb-3">Report unavailable</h1>
          <p className="text-foreground/70 mb-6" data-testid="text-report-error">
            {error || "Unknown error."}
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm"
          >
            Take the assessment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <header className="px-6 md:px-10 py-5 border-b border-black/5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              <div className="bg-foreground rounded-sm" />
              <div className="bg-foreground rounded-sm" />
              <div className="bg-foreground rounded-sm" />
              <div className="bg-primary rounded-sm" />
            </div>
            <span className="font-bold text-base tracking-tight">Morsegrid</span>
          </Link>
          <span className="text-xs text-foreground/50">Systemization Report</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-12 md:py-20">
        {/* Hero score */}
        <section>
          <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">
            Your Systemization Score
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
            <motion.div
              initial={reduce ? false : { scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              data-testid="text-overall-score"
            >
              <ScoreRing score={data.overall} />
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
                You're{" "}
                <span className="text-primary" data-testid="text-tier-label">
                  {data.tier.label}
                </span>
                .
              </h1>
              <p className="mt-4 text-foreground/75 leading-relaxed max-w-lg">{data.tier.blurb}</p>
              {data.contact.name && (
                <p className="mt-3 text-sm text-foreground/55">
                  Generated for {data.contact.name}
                  {data.contact.company ? ` at ${data.contact.company}` : ""}.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Per-category bars */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">By category</h2>
          <div className="space-y-4" data-testid="report-categories">
            {data.categories.map((c) => (
              <CategoryBar key={c.id} title={c.title} score={c.score} />
            ))}
          </div>
        </section>

        {/* Top 3 weakest */}
        <section className="mt-16 md:mt-20">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2">
            Where to focus first
          </h2>
          <p className="text-foreground/65 mb-8 max-w-xl">
            These three areas scored lowest. Each comes with a concrete first move you can make this week.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-testid="report-weakest">
            {data.weakest.map((c, i) => (
              <div
                key={c.id}
                className="rounded-2xl border border-black/10 bg-white p-6"
                data-testid={`weakest-${i}`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  Focus #{i + 1}
                </div>
                <div className="font-semibold text-lg mb-2">{c.title}</div>
                <div className="text-3xl font-semibold tabular-nums mb-4">{c.score}<span className="text-base text-foreground/40">/100</span></div>
                <p className="text-sm text-foreground/70 leading-relaxed">{c.recommendation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 md:mt-24 rounded-3xl bg-[#0d0d0d] text-white p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary font-semibold mb-3">
                <Sparkles className="w-3 h-3" /> Next step
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                Want help making these the easiest wins of your year?
              </h3>
              <p className="mt-3 text-white/70 max-w-lg">
                A 30-minute call with our ops team — we'll map your weakest categories to specific Morsegrid
                playbooks you could ship in the first 30 days.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.links.bookCall}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("report_cta_clicked", { cta: "book_call", token, score: data.overall })
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                data-testid="link-report-book-call"
              >
                <Calendar className="w-4 h-4" /> Book a call
              </a>
              <Link
                href="/products"
                onClick={() =>
                  track("report_cta_clicked", { cta: "explore_products", token, score: data.overall })
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors justify-center"
                data-testid="link-report-products"
              >
                Explore products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/50">
            Share this report:{" "}
            <code className="bg-white/10 px-2 py-1 rounded text-white/80 break-all" data-testid="text-share-url">
              {typeof window !== "undefined" ? window.location.href : ""}
            </code>
          </div>
        </section>
      </main>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 64;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="block">
      <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="12" />
      <motion.circle
        cx="80"
        cy="80"
        r={r}
        fill="none"
        stroke="#7d6cf0"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - dash }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 80 80)"
      />
      <text
        x="80"
        y="86"
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 36, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
      >
        {score}
      </text>
      <text x="80" y="108" textAnchor="middle" className="fill-foreground/50" style={{ fontSize: 11 }}>
        / 100
      </text>
    </svg>
  );
}

function CategoryBar({ title, score }: { title: string; score: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-sm font-semibold tabular-nums text-foreground/80">{score}</div>
      </div>
      <div className="h-2 bg-black/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
