import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CUSTOMERS } from "@/data/customers";

export default function Customers() {
  usePageMeta({
    title: "Customers",
    description: "The businesses that trust Morsegrid to run their operations.",
    path: "/customers",
  });

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Built for operators.</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              We measure our success by the amount of manual, repetitive work we eliminate from our clients' days.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 space-y-24">
        <section>
          <FadeIn className="mb-16">
            <p className="text-center text-sm font-medium text-muted-foreground mb-10 uppercase tracking-wider">
              Businesses running on Morsegrid
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 items-center max-w-4xl mx-auto">
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
          </FadeIn>
        </section>

        <FadeIn>
          <div className="rounded-[28px] bg-[#0d0d0d] text-white p-8 md:p-14 overflow-hidden relative">
            <div
              className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full opacity-30 pointer-events-none blur-3xl"
              style={{ backgroundColor: "#7d6cf0" }}
            />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
                Want to see what we've built for a business like yours?
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                We'll walk you through the systems we've built for businesses in your vertical — what we automated, how long it took, and what changed for the team.
              </p>
              <a
                href={siteConfig.links.bookCall}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-white text-[#0d0d0d] text-sm font-semibold hover:bg-white/90 transition-colors"
                data-testid="link-case-study-cta"
              >
                Book a discovery call <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
