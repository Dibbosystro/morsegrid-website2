import { useCallback, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { caseStudies, caseStudyLogos } from "@/data/case-studies";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { track } from "@/lib/analytics";

export default function CaseStudies() {
  usePageMeta({
    title: "Case studies",
    description: "In-depth stories from operators who rebuilt their stack with Morsegrid.",
    path: "/case-studies",
  });

  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [videoOpen, setVideoOpen] = useState(false);
  const total = caseStudies.length;

  const goTo = useCallback(
    (next: number) => {
      const normalised = ((next % total) + total) % total;
      setDirection(next >= active ? 1 : -1);
      setActive(normalised);
    },
    [active, total]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const story = caseStudies[active];

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-28 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Customer stories
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Case studies.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              How operators across e-commerce, services, and healthcare rebuilt
              their stack into something that quietly works.
            </p>
          </FadeIn>
        </div>
      </div>

      <section
        className="container mx-auto px-4 md:px-8 pt-20 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:rounded-3xl"
        aria-roledescription="carousel"
        aria-label="Featured case studies"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <FadeIn>
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`media-${story.slug}`}
                  custom={direction}
                  initial={reduce ? false : { opacity: 0, x: direction * 24 }}
                  animate={reduce ? undefined : { opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="order-1 lg:order-1"
                >
                  <div
                    className={`relative aspect-[4/3] md:aspect-[5/4] w-full rounded-3xl overflow-hidden border border-border bg-gradient-to-br ${story.accent} group`}
                  >
                    {story.thumbnail && (
                      <img
                        src={story.thumbnail}
                        alt={`${story.customer} case study`}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-semibold uppercase tracking-wider text-foreground">
                      {story.industry}
                    </div>
                    <button
                      type="button"
                      aria-label={`Play ${story.customer} story`}
                      onClick={() => {
                        track("cta_video_lightbox_open", { kind: "case_study", slug: story.slug });
                        setVideoOpen(true);
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                      data-testid={`button-play-video-${story.slug}`}
                    >
                      <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-background/95 text-foreground flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Play className="w-7 h-7 ml-1" fill="currentColor" />
                      </span>
                    </button>
                    <div className="absolute bottom-6 left-6 right-6 text-background">
                      <div className="text-xs uppercase tracking-wider opacity-80">
                        Featured customer
                      </div>
                      <div className="text-2xl font-bold">{story.customer}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`copy-${story.slug}`}
                  custom={direction}
                  initial={reduce ? false : { opacity: 0, x: direction * 24 }}
                  animate={reduce ? undefined : { opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="order-2 lg:order-2 flex flex-col justify-center"
                >
                  <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    {story.customer}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                    {story.headline}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                    {story.summary}
                  </p>
                  <MagneticButton>
                    <Link
                      href={story.link}
                      className="inline-flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors group w-fit"
                      data-testid="link-case-study-cta"
                    >
                      {story.linkLabel}
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </MagneticButton>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-10 lg:mt-12">
              <div className="flex items-center gap-2" role="tablist" aria-label="Select case study">
                {caseStudies.map((s, i) => (
                  <button
                    key={s.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Go to slide ${i + 1}: ${s.customer}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === active
                        ? "bg-foreground w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous case study"
                  className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center text-foreground"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next case study"
                  className="w-12 h-12 rounded-full border border-border bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="container mx-auto px-4 md:px-8 mt-24">
        <FadeIn delay={0.1}>
          <div className="border-t border-border/50 pt-12">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-10">
              Trusted by teams running on Morsegrid
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-20 opacity-50 grayscale mix-blend-multiply">
              {caseStudyLogos.map((logo) => (
                <span key={logo.name} className={logo.className}>
                  {logo.name}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <VideoLightbox
        open={videoOpen}
        onOpenChange={setVideoOpen}
        videoUrl={story.videoUrl}
        title={`${story.customer} customer story video`}
        description={story.headline}
      />
    </div>
  );
}
