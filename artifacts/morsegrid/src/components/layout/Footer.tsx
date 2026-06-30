import { useState } from "react";
import { Link } from "wouter";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

type FooterLink = { label: string; href: string; external?: boolean };

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Overview", href: "/products" },
        { label: "Pricing", href: "/pricing" },
        { label: "Integrations", href: "/integrations" },
        { label: "Changelog", href: "/changelog" },
        { label: "Operational Playbooks", href: "/products" },
        { label: "Internal AI Tools", href: "/products" },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "E-commerce", href: "/industries/ecommerce" },
        { label: "Health & Wellness", href: "/industries/health-wellness" },
        { label: "Professional Services", href: "/industries/professional-services" },
        { label: "Technology & AI", href: "/industries/technology" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Customers", href: "/customers" },
        { label: "Case studies", href: "/case-studies" },
        { label: "Field Notes", href: "/resources" },
        { label: "Glossary", href: "/resources#glossary" },
        { label: "Free Assessment", href: "/assessment" },
      ],
    },
    {
      title: "Trust",
      links: [
        { label: "Trust Center", href: "/security" },
        { label: "Status", href: "https://status.morsegrid.com", external: true },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "DPA", href: "/legal/dpa" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/company#about" },
        { label: "Team", href: "/company" },
        { label: "Security", href: "/security" },
        { label: "Contact", href: `mailto:${siteConfig.contact.email}`, external: true },
      ],
    },
  ];

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  }

  return (
    <footer className="bg-[#0d0d0d] text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-14 rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-md">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
              Field notes
            </div>
            <h3 className="text-xl md:text-2xl font-semibold leading-snug">
              One short email a month on what we're shipping and learning.
            </h3>
          </div>
          {subscribed ? (
            <div
              role="status"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 text-primary text-sm font-medium"
              data-testid="newsletter-thanks"
            >
              Thanks — we'll be in touch.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
              data-testid="newsletter-form"
            >
              <label htmlFor="footer-email" className="sr-only">
                Work email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 min-w-[260px]"
                data-testid="newsletter-email"
              />
              <button
                type="submit"
                className="rounded-full bg-white text-[#0d0d0d] px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                data-testid="newsletter-submit"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/systro-logo.svg"
                alt="Morsegrid"
                className="w-7 h-7 rounded-sm"
              />
              <span className="font-bold text-lg tracking-tight">Morsegrid</span>
            </Link>
            <p className="text-sm text-white/50 max-w-[200px] leading-relaxed">
              The internal systems and automations that growing businesses actually run on.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-white/50 text-sm mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) =>
                  l.external ? (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onClick={() => track("nav_footer_click", { label: l.label, href: l.href })}
                        target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="text-sm text-white/90 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        onClick={() => track("nav_footer_click", { label: l.label, href: l.href })}
                        className="text-sm text-white/90 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm text-white/50">
              © {currentYear} {siteConfig.legalName}. All rights reserved.
            </p>
            <p className="text-xs text-white/30">{siteConfig.address}</p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
