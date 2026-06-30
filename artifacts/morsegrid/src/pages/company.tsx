import { usePageMeta } from "@/hooks/use-page-meta";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { FadeIn } from "@/components/ui/fade-in";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Building2, Lock, MapPin } from "lucide-react";

const securityPoints = [
  {
    title: "We work within your existing tools",
    description: "No new data silos. We configure and connect the systems you already own. Your stack stays yours.",
  },
  {
    title: "Your data stays where it is",
    description: "Morsegrid does not host or store your data. We configure automations that run inside your platforms.",
  },
  {
    title: "Everything is documented and handed over",
    description: "Every workflow we build is fully documented in plain language and handed to your team. No black boxes.",
  },
];

const founder = {
  name: "Maksudur Rahman",
  title: "Founder, Head of AI Solutions",
  image: "/team/maks.png",
};

const team = [
  {
    name: "Dibbo Das",
    title: "Performance Marketing Manager",
    image: "/team/dibbo.png",
  },
  {
    name: "Arshi Irtiaz",
    title: "Sales Development Representative",
    image: "/team/arshi.jpg",
  },
  {
    name: "Faiyaz Hossain",
    title: "Full Stack Developer",
    image: "/team/faiyaz.jpg",
  },
  {
    name: "Z B Nishat",
    title: "GTM Engineer",
    image: "/team/nishat.jpg",
  },
  {
    name: "Albhi Fahad",
    title: "Head Of Delivery",
    image: "/team/albhi.jpg",
  },
  {
    name: "Fatema Lele",
    title: "Marketing Copywriter",
    image: "/team/fatema.jpg",
  },
];

export default function Company() {
  usePageMeta({
    title: "Company",
    description: "About Morsegrid — who we are, how we work, and how to reach us.",
    path: "/company",
  });
  useHashScroll();

  return (
    <div className="flex flex-col pb-24">
      <div className="container mx-auto px-4 md:px-8 pt-40 pb-20 space-y-24">

        {/* Hero: two-column layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <img
              src={founder.image}
              alt={founder.name}
              className="w-full aspect-[4/5] object-cover object-top rounded-3xl"
            />
          </FadeIn>
          <FadeIn delay={0.15} className="flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">About</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              I'm Maksudur Rahman. People call me Maks.
            </h1>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                Morsegrid was built to fix a problem Maks saw repeatedly: growing businesses drowning in manual work
                that should have been automated months ago. Every week of delay is revenue lost. We fix the bottleneck.
              </p>
            </div>
            <div>
              <Button asChild className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
                <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer">
                  Find a time to talk →
                </a>
              </Button>
            </div>
          </FadeIn>
        </section>

        {/* Philosophy */}
        <section id="about" className="scroll-mt-32">
          <FadeIn className="mb-10 flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">About</h2>
              <p className="text-muted-foreground mt-2">A small, focused team that builds systems, not slide decks.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Our philosophy</h3>
            <div className="space-y-6 text-foreground leading-relaxed">
              <p>
                Software should serve the business, not the other way around. Most teams adapt their processes to
                fit their tools. We bend the tools to fit your ideal process.
              </p>
              <p>
                When you work with us, you work with the people actually building the systems. No account managers,
                no juniors learning on your dime.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Team */}
        <section>
          <FadeIn className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Team</h2>
            <p className="text-muted-foreground mt-2">The people who build and deliver your systems.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[4/3] object-cover object-top"
                  />
                  <div className="p-5">
                    <div className="font-semibold text-lg">{member.name}</div>
                    <div className="text-sm text-primary mt-1">{member.title}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Security */}
        <section id="security" className="scroll-mt-32">
          <FadeIn className="mb-10 flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Security</h2>
              <p className="text-muted-foreground mt-2">How we handle your clients' data.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityPoints.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.06}>
                <div className="bg-card border border-border p-6 rounded-2xl h-full">
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Contact — bottom of page */}
        <section id="contact" className="scroll-mt-32">
          <FadeIn>
            <div className="bg-muted/30 p-8 md:p-12 rounded-3xl border border-border">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Contact</h2>
              <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
                <div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Email</div>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Location</div>
                  <div className="text-lg flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-muted-foreground" />
                    <span>Remote-first.<br />Incorporated in Wyoming, US.</span>
                  </div>
                </div>
                <div className="md:ml-auto">
                  <Button asChild className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
                    <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer">
                      Book an introduction
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>
    </div>
  );
}
