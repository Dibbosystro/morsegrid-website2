import { Link, useRoute } from "wouter";
import { Check } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { getJobBySlug } from "@/data/jobs";
import NotFound from "@/pages/not-found";

const APPLY_URL =
  "https://forms.clickup.com/90181345630/f/2kzkm8ay-7618/DKX2YG95YX1REVOLHF";

export default function JobDetail() {
  const [, params] = useRoute("/careers/:slug");
  const slug = params?.slug ?? "";
  const job = getJobBySlug(slug);

  if (!job) {
    return <NotFound />;
  }

  return <JobDetailView job={job} />;
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </div>
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-primary" />
          </div>
          <span className="text-foreground/80 leading-relaxed text-sm md:text-base">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function JobDetailView({ job }: { job: NonNullable<ReturnType<typeof getJobBySlug>> }) {
  usePageMeta(
    job.title,
    `${job.title} — Join the Morsegrid team. ${job.overview.slice(0, 120)}...`,
  );

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-16 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link
                href="/careers"
                className="hover:text-foreground transition-colors"
              >
                Careers
              </Link>
              <span>/</span>
              <span className="text-foreground">{job.title}</span>
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary mb-4">
              Open Role
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {job.title}
            </h1>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl space-y-16">
        <FadeIn>
          <section>
            <SectionHeading label="About the role" title="Position Overview" />
            <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
              {job.overview}
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.04}>
          <section>
            <SectionHeading label="What you'll do" title="Key Responsibilities" />
            <BulletList items={job.responsibilities} />
          </section>
        </FadeIn>

        <FadeIn delay={0.08}>
          <section>
            <SectionHeading label="What we need" title="Required Qualifications" />
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-semibold mb-4 text-muted-foreground uppercase tracking-wide text-xs">
                  Education & Experience
                </h3>
                <BulletList items={job.requiredExperience} />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-4 text-muted-foreground uppercase tracking-wide text-xs">
                  Technical Skills
                </h3>
                <BulletList items={job.requiredTechnical} />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-4 text-muted-foreground uppercase tracking-wide text-xs">
                  Soft Skills
                </h3>
                <BulletList items={job.requiredSoft} />
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.12}>
          <section>
            <SectionHeading label="Nice to have" title="Preferred Qualifications" />
            <BulletList items={job.preferred} />
          </section>
        </FadeIn>

        <FadeIn delay={0.16}>
          <section>
            <SectionHeading label="What you get" title="Compensation & Benefits" />
            <BulletList items={job.benefits} />
          </section>
        </FadeIn>

        {job.note && (
          <FadeIn delay={0.2}>
            <div className="bg-muted/40 border border-border rounded-2xl p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                {job.note}
              </p>
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.24} className="text-center bg-muted/50 p-10 md:p-14 rounded-3xl border border-border/50">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to apply?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm md:text-base">
            Fill out the application form and tell us about what you've built. We review every submission and respond to candidates who meet the bar.
          </p>
          <Button
            asChild
            className="rounded-full px-10 py-3 bg-foreground text-background hover:bg-foreground/90 text-base"
          >
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-apply-now"
            >
              Apply now
            </a>
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
