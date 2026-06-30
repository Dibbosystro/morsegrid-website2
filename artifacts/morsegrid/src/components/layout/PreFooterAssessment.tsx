import { Link } from "wouter";
import { ArrowRight, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PreFooterAssessment() {
  return (
    <section className="bg-[#0d0d0d] px-6 md:px-10 pt-16 pb-4">
      <div className="max-w-6xl mx-auto relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1733] via-[#1e1a42] to-[#0f1530] border border-white/10 px-8 py-12 md:px-14 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(125,108,240,0.6), transparent 65%)",
            filter: "blur(24px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 w-[320px] h-[320px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle at center, rgba(125,108,240,0.5), transparent 65%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-white/90">
              <Gauge className="w-3 h-3 text-[#9d8cf5]" />
              Free Assessment
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-white">
              How systemized<br className="hidden sm:block" /> is your team?
            </h2>
            <p className="mt-4 text-white/65 leading-relaxed max-w-md text-sm md:text-base">
              Get a personalized Systemization Score across seven categories — plus the three highest-leverage areas for your next 30 days.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="rounded-full bg-[#7d6cf0] hover:bg-[#8c7df3] border-none text-white px-6 py-3 text-sm font-medium gap-1.5"
              >
                <Link href="/assessment">
                  Take the Free Assessment <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
              <span className="text-xs text-white/45">~10 minutes. Results instantly.</span>
            </div>
          </div>

          <div aria-hidden className="flex-shrink-0 flex items-center justify-center md:justify-end">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="9"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  fill="none"
                  stroke="#9d8cf5"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 62 * 0.68} ${2 * Math.PI * 62 * 0.32}`}
                  strokeDashoffset={2 * Math.PI * 62 * 0.25}
                  transform="rotate(-90 80 80)"
                />
                <text x="80" y="82" textAnchor="middle" fill="white" fontSize="32" fontWeight="600">
                  68
                </text>
                <text x="80" y="100" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10">
                  Sample score
                </text>
              </svg>

              <div className="absolute -bottom-3 -right-3 bg-[#7d6cf0]/90 border border-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-xs font-medium shadow-lg">
                7 categories
              </div>
              <div className="absolute -top-3 -left-3 bg-white/10 border border-white/15 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-xs font-medium shadow-lg">
                Free report
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
