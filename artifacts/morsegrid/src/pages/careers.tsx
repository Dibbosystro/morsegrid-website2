import { Users, Heart, Zap, Globe } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";

const values = [
  {
    icon: Heart,
    title: "People over process",
    body: "We care about the humans behind the businesses we work with — and we bring that same care to how we work with each other. Clear communication, mutual respect, no ego.",
  },
  {
    icon: Zap,
    title: "Bias toward action",
    body: "We move quickly, ship often, and learn from the results. Perfect is the enemy of done. If something is broken, we fix it now and document why later.",
  },
  {
    icon: Globe,
    title: "Work from anywhere",
    body: "We're a distributed team. You do your best work where you're most comfortable — we trust you to manage your time and deliver results.",
  },
  {
    icon: Users,
    title: "Build for the long run",
    body: "We don't build throwaway systems or take shortcuts that hurt our clients down the road. We're proud of what we ship and we stand behind it.",
  },
];

const roles = [
  {
    slug: "ai-native-developer",
    title: "AI-Native Developer",
    summary:
      "Build and maintain AI-powered workflows, automations, and integrations that sit at the core of our client delivery. You're comfortable with LLM APIs, prompt engineering, and wiring together modern tooling.",
  },
  {
    slug: "google-meta-ads-specialist",
    title: "Google & Meta Ads Specialist",
    summary:
      "Own paid acquisition for our clients across Google and Meta — from strategy and copy to execution and reporting. You know how to make budgets work hard and can communicate results clearly.",
  },
  {
    slug: "graphics-designer",
    title: "Graphics Designer",
    summary:
      "Create sharp, on-brand visuals for client campaigns, social content, and internal collateral. You move fast, take feedback well, and have a portfolio that speaks for itself.",
  },
  {
    slug: "no-code-developer",
    title: "No-Code Developer",
    summary:
      "Design and build business workflows using tools like Make, Zapier, Airtable, and Webflow. You translate messy manual processes into clean, reliable automations that teams actually use.",
  },
  {
    slug: "shopify-developer",
    title: "Shopify Developer",
    summary:
      "Build, customise, and optimise Shopify storefronts for e-commerce clients. You're fluent in Liquid, comfortable with theme architecture, and know your way around the Shopify ecosystem.",
  },
  {
    slug: "video-editor",
    title: "Video Editor (YouTube / Shorts / Repurposing)",
    summary:
      "Edit long-form YouTube content and cut it into high-retention Shorts and social clips. You understand pacing, hooks, and what keeps viewers watching — and you deliver fast.",
  },
];

export default function Careers() {
  usePageMeta(
    "Careers",
    "Join the Morsegrid team. We're building the internal systems and automations that growing businesses actually run on.",
  );

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <FadeIn>
            <div className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
              Careers
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Come build with us.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Morsegrid is a small, focused team building the operational backbone for ambitious businesses.
              We care about craft, clarity, and outcomes — and we'd love to hear from people who do too.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 max-w-6xl space-y-24">
        <section>
          <FadeIn className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Why work here</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              The values we actually operate by — not a list we made for the website.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={Math.min(i, 3) * 0.05}>
                <div className="bg-card border border-border p-6 rounded-2xl h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section>
          <FadeIn className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Open roles</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Positions we're actively hiring for right now.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roles.map((role, i) => (
              <FadeIn key={role.title} delay={Math.min(i, 5) * 0.05}>
                <div className="bg-card border border-border p-6 rounded-2xl h-full flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-5">
                    {role.summary}
                  </p>
                  <div>
                    <Link
                      href={`/careers/${role.slug}`}
                      className="inline-flex items-center justify-center rounded-full px-6 py-2 bg-foreground text-background text-sm font-medium hover:bg-foreground/80 transition-colors"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 bg-muted/40 border border-border rounded-2xl p-8 md:p-10 text-center">
              <p className="text-muted-foreground max-w-md mx-auto mb-5 text-sm">
                Don't see your role listed? We're always interested in meeting exceptional people.
                Send us your CV and we'll keep it on file.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("CV — speculative application")}`}
                className="inline-flex items-center justify-center rounded-full px-8 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/80 transition-colors"
              >
                Send your CV
              </a>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
