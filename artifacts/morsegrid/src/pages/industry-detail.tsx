import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePageMeta, buildBreadcrumbJsonLd } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { IndustryHeroIllustration } from "@/components/industry-hero-illustration";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { siteConfig } from "@/config/site";
import { getIndustryBySlug, industries, type Industry } from "@/data/industries";
import { track } from "@/lib/analytics";
import NotFound from "@/pages/not-found";

function Hero({ industry, onWatchVideo }: { industry: Industry; onWatchVideo: () => void }) {
  return (
    <section className="relative pt-40 md:pt-48 pb-16 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
            style={{
              color: industry.accent,
              backgroundColor: industry.accentSoft,
              borderColor: `${industry.accent}33`,
            }}
            data-testid="badge-industry-pill"
          >
            {industry.pillLabel}
          </span>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]">
            {industry.hero.headline}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, ${industry.gradientFrom}, ${industry.gradientTo})`,
              }}
            >
              {industry.hero.accentPhrase}
            </span>{" "}
            {industry.hero.headlineSuffix}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-7 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {industry.hero.subhead}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_industry_hero_demo", { industry: industry.slug })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: industry.accent }}
              data-testid="link-hero-demo"
            >
              Get a demo
            </a>
            <button
              type="button"
              onClick={() => {
                track("cta_industry_watch_video", { industry: industry.slug });
                onWatchVideo();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border bg-white text-sm font-medium hover:bg-black/5 transition-colors"
              style={{ color: industry.accent, borderColor: `${industry.accent}55` }}
              aria-label={`Watch customer stories from ${industry.name} teams`}
              data-testid="link-hero-watch"
            >
              <Play className="w-3.5 h-3.5" aria-hidden="true" /> Watch customer stories
            </button>
          </div>
        </FadeIn>
      </div>
      <FadeIn delay={0.2}>
        <div
          className="mt-14 md:mt-20 mx-auto w-full max-w-md md:max-w-xl"
          role="img"
          aria-label={industry.hero.illustration.alt}
        >
          <IndustryHeroIllustration industry={industry} />
        </div>
      </FadeIn>
    </section>
  );
}

function TestimonialBlock({ industry }: { industry: Industry }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const avatars = industry.testimonial.avatars;
  const total = avatars.length;

  return (
    <section className="px-3 md:px-6 pb-20 md:pb-28">
      <div
        className="max-w-6xl mx-auto rounded-[28px] p-8 md:p-14 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center"
        style={{ backgroundColor: industry.accentSoft }}
      >
        <div className="md:col-span-3">
          <div className="flex items-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => setActive((a) => (a - 1 + total) % total)}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-foreground transition-colors"
              aria-label="Previous quote"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center -space-x-3">
              {avatars.map((a, i) => (
                <button
                  key={a.initials + i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white transition-transform ${
                    i === active ? "z-10 scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: a.color }}
                  aria-label={`View testimonial ${i + 1}`}
                  data-testid={`button-avatar-${i}`}
                >
                  {a.initials}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActive((a) => (a + 1) % total)}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-foreground transition-colors"
              aria-label="Next quote"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <Quote className="w-7 h-7 mb-5" style={{ color: industry.accent }} strokeWidth={2.5} />
              <p className="text-lg md:text-xl text-foreground leading-relaxed">
                {industry.testimonial.quote}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <div>
                  <div className="font-semibold text-foreground">{industry.testimonial.author}</div>
                  <div className="text-sm text-foreground/60">{industry.testimonial.role}</div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-foreground/15" />
                <div className={`text-foreground/70 text-lg ${industry.testimonial.companyStyle}`}>
                  {industry.testimonial.company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:col-span-2 md:border-l md:border-foreground/10 md:pl-12">
          <div
            className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
            style={{ color: industry.accent }}
            data-testid="text-headline-stat"
          >
            {industry.testimonial.headlineStat}
          </div>
          <div className="mt-3 text-foreground/80 text-lg max-w-xs">
            {industry.testimonial.statCaption}
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCaseGrid({ industry }: { industry: Industry }) {
  return (
    <section className="bg-background py-20 md:py-28 border-t border-black/5">
      <div className="container mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-wider text-foreground/50">
              Use cases
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Built for {industry.shortName}.
            </h2>
            <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
              The jobs we see come up over and over inside {industry.shortName} teams — handled with one playbook engine instead of a dozen point tools.
            </p>
          </div>
        </FadeIn>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {industry.useCases.map((uc, i) => (
            <FadeIn key={uc.title} delay={i * 0.05}>
              <div className="h-full p-8 rounded-3xl border border-black/10 bg-card hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-sm font-semibold"
                  style={{ backgroundColor: industry.accentSoft, color: industry.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{uc.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{uc.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsStrip({ industry }: { industry: Industry }) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 md:px-10">
        <div
          className="rounded-[28px] px-8 md:px-14 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center"
          style={{
            backgroundImage: `linear-gradient(120deg, ${industry.gradientFrom}, ${industry.gradientTo})`,
          }}
        >
          {industry.metrics.map((m, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div>
                <div className="text-5xl md:text-6xl font-semibold tracking-tight text-white">
                  {m.value}
                </div>
                <div className="mt-3 text-white/85 text-sm md:text-base max-w-[18rem] mx-auto">
                  {m.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoWall({ industry }: { industry: Industry }) {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-black/5">
      <div className="container mx-auto px-6 md:px-10">
        <FadeIn>
          <p className="text-center text-sm font-medium uppercase tracking-wider text-foreground/50 mb-12">
            {industry.name} teams running on Morsegrid
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-6 items-center">
            {industry.logos.map((logo) => (
              <div
                key={logo.name}
                className={`text-foreground/40 text-base md:text-lg text-center select-none ${logo.style}`}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function OtherIndustries({ industry }: { industry: Industry }) {
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <section className="py-16 md:py-20 bg-background border-t border-black/5">
      <div className="container mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-foreground/50">
                Other industries we serve
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                Explore another vertical
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              data-testid="link-other-industries-all"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {others.map((other, i) => (
            <FadeIn key={other.slug} delay={i * 0.04}>
              <Link
                href={`/industries/${other.slug}`}
                className="group flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl border border-black/10 bg-card hover:shadow-md transition-all hover:-translate-y-0.5"
                style={{ borderColor: `${other.accent}33` }}
                data-testid={`link-other-industry-${other.slug}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: other.accent }}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-foreground truncate">
                    {other.shortName}
                  </span>
                </div>
                <ArrowRight
                  className="w-3.5 h-3.5 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                  style={{ color: other.accent }}
                />
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta({ industry }: { industry: Industry }) {
  return (
    <section className="px-3 md:px-6 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto rounded-[28px] bg-[#0d0d0d] text-white px-8 md:px-14 py-16 md:py-20 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-2xl mx-auto leading-tight">
            {industry.closingCta.title}
          </h2>
          <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            {industry.closingCta.body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_industry_final_demo", { industry: industry.slug })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: industry.accent }}
              data-testid="link-cta-demo"
            >
              Get a demo <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/customers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              data-testid="link-cta-customers"
            >
              See customer stories
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function IndustryDetail() {
  const [, params] = useRoute("/industries/:slug");
  const slug = params?.slug ?? "";
  const industry = getIndustryBySlug(slug);
  const [videoOpen, setVideoOpen] = useState(false);

  usePageMeta({
    title: industry?.meta.title ?? "Industries",
    description: industry?.meta.description,
    path: industry ? `/industries/${industry.slug}` : "/industries",
    image: industry ? `/og/industries/${industry.slug}.png` : undefined,
    jsonLd: industry
      ? [
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
        ]
      : undefined,
  });

  if (!industry) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col">
      <Hero industry={industry} onWatchVideo={() => setVideoOpen(true)} />
      <TestimonialBlock industry={industry} />
      <UseCaseGrid industry={industry} />
      <MetricsStrip industry={industry} />
      <LogoWall industry={industry} />
      <OtherIndustries industry={industry} />
      <ClosingCta industry={industry} />
      <VideoLightbox
        open={videoOpen}
        onOpenChange={setVideoOpen}
        videoUrl={industry.videoUrl}
        title={`${industry.name} customer story video`}
        description={industry.hero.subhead}
      />
    </div>
  );
}
