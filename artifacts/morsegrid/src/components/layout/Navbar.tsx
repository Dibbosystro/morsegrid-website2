import { Link, useLocation } from "wouter";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/config/nav";
import { Mic, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { VoiceModal } from "./VoiceModal";
import { MegaMenu } from "./MegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@/lib/analytics";
import { useBanner, BANNER_HEIGHT } from "./AnnouncementBanner";

const OPEN_DELAY = 80;
const CLOSE_DELAY = 140;

interface NavbarProps {
  forceLight?: boolean;
}

export function Navbar({ forceLight = false }: NavbarProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [rawScrollY, setRawScrollY] = useState(0);
  const { bannerVisible } = useBanner();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let scrollBackTimer: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      const y = window.scrollY;
      setRawScrollY(y);
      if (y > 20) {
        if (scrollBackTimer) {
          clearTimeout(scrollBackTimer);
          scrollBackTimer = null;
        }
        setScrolled(true);
      } else {
        // Debounce scrolling back to top to avoid Lenis-init oscillation
        if (scrollBackTimer) clearTimeout(scrollBackTimer);
        scrollBackTimer = setTimeout(() => setScrolled(false), 80);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollBackTimer) clearTimeout(scrollBackTimer);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const scheduleOpen = (label: string) => {
    clearTimers();
    openTimer.current = setTimeout(() => {
      setOpenMenu((current) => {
        if (current !== label) {
          track("nav_dropdown_open", { menu: label });
        }
        return label;
      });
    }, OPEN_DELAY);
  };

  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY);
  };

  const closeNow = () => {
    clearTimers();
    setOpenMenu(null);
  };

  const lightMode = forceLight && !scrolled;
  // Hero pages (forceLight) blend transparently over the hero at the very top,
  // then solidify on scroll. Non-hero pages are solid from the top — matching
  // the previous live site's sticky nav behaviour.
  const solid = scrolled || !forceLight;

  return (
    <>
      <header
        className="fixed inset-x-0 z-50"
        style={{ top: bannerVisible ? Math.max(0, BANNER_HEIGHT - rawScrollY) : 0 }}
        data-light={lightMode ? "true" : "false"}
      >
        {/* Inset floating pill — geometry stays constant; only the background
            transitions transparent -> frosted white on scroll, so it blends with
            the hero at the top and becomes a solid sticky bar once you scroll. */}
        <div className="px-4 sm:px-6 pt-2 sm:pt-3">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: solid ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)",
            borderColor: solid ? "rgba(0,0,0,0.07)" : "rgba(0,0,0,0)",
            boxShadow: solid ? "0 4px 24px rgba(0,0,0,0.08)" : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`relative w-full rounded-[22px] border ${solid ? "backdrop-blur-md" : ""}`}
        >
          <div className="flex items-center h-16 w-full px-5 md:px-8 md:grid md:grid-cols-[auto_1fr_auto] md:items-center">
          <Link href="/" className="flex items-center gap-2 group relative z-50 shrink-0">
            <img
              src="/systro-logo.svg"
              alt="Morsegrid"
              className="w-9 h-9 rounded-md opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className={`font-bold text-lg tracking-tight transition-colors duration-[250ms] ease-out ${lightMode ? "text-white" : "text-foreground"}`}>
              Morsegrid
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 justify-self-center">
            {navLinks.map((link) => {
              const isOpen = openMenu === link.label;
              const isActive = location === link.href;

              if (!link.dropdown) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-base font-medium transition-colors duration-[250ms] ease-out flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm ${
                      lightMode
                        ? isActive ? "text-white" : "text-white/75 hover:text-white"
                        : isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => scheduleOpen(link.label)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    aria-current={isActive ? "page" : undefined}
                    onFocus={() => scheduleOpen(link.label)}
                    onClick={() => closeNow()}
                    className={`text-base font-medium transition-colors duration-[250ms] ease-out flex items-center gap-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-sm ${
                      lightMode
                        ? isOpen ? "text-white" : isActive ? "text-white" : "text-white/75 hover:text-white"
                        : isOpen ? "text-primary" : isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </Link>
                  <MegaMenu
                    open={isOpen}
                    dropdown={link.dropdown}
                    onItemClick={closeNow}
                    onMouseEnter={clearTimers}
                    onMouseLeave={scheduleClose}
                  />
                </div>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0 justify-self-end">
            <button
              onClick={() => {
                track("cta_voice_modal_open", { location: "nav" });
                setVoiceModalOpen(true);
              }}
              className={`flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-all duration-[250ms] ease-out px-4 py-1.5 rounded-full border whitespace-nowrap ${
                lightMode
                  ? "text-white border-white/35"
                  : "text-foreground border-black/10"
              }`}
              aria-label="Ask anything"
              data-testid="button-ask-anything"
            >
              <Mic className={`w-3.5 h-3.5 transition-colors duration-[250ms] ${lightMode ? "text-white/85" : "text-primary"}`} />
              <span className="hidden lg:inline">Ask anything</span>
            </button>
            <a
              href={siteConfig.links.bookCall}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_book_call_click", { location: "nav" })}
              className={`text-sm font-medium hover:opacity-90 transition-all duration-[250ms] ease-out px-4 py-1.5 rounded-full whitespace-nowrap ${
                lightMode
                  ? "bg-white text-foreground"
                  : "bg-foreground text-background"
              }`}
              data-testid="link-book-call-nav"
            >
              Book a call
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center z-50 ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-[250ms] ease-out ${lightMode ? "text-white" : "text-foreground"}`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          </div>
        </motion.div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-background pt-16 px-4 pb-6 flex flex-col md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link) => {
                if (!link.dropdown) {
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-xl font-semibold py-3 px-2 ${
                        location === link.href ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }
                const expanded = mobileExpanded === link.label;
                return (
                  <div key={link.label} className="border-b border-border/40 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : link.label)}
                      className={`w-full flex items-center justify-between py-3 px-2 text-xl font-semibold ${
                        location === link.href ? "text-primary" : "text-foreground"
                      }`}
                      aria-expanded={expanded}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-2 pb-3 flex flex-col gap-1">
                            {link.dropdown.overview && (
                              <Link
                                href={link.dropdown.overview.href}
                                className="flex items-center gap-3 py-2 px-2 rounded-lg text-base text-foreground"
                              >
                                <span className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                  <link.dropdown.overview.icon className="w-4 h-4 text-primary" />
                                </span>
                                <span className="font-medium">{link.dropdown.overview.label}</span>
                              </Link>
                            )}
                            {link.dropdown.groups.map((group, gi) => (
                              <div key={gi} className="pt-2">
                                {group.heading && (
                                  <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    {group.heading}
                                  </div>
                                )}
                                {group.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-start gap-3 py-2 px-2 rounded-lg text-base text-foreground"
                                  >
                                    <span className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                                      <item.icon className="w-4 h-4 text-primary" />
                                    </span>
                                    <span className="flex-1 pt-0.5">
                                      <span className="block font-medium leading-tight">{item.label}</span>
                                      {item.subtitle && (
                                        <span className="block text-xs text-muted-foreground mt-0.5">{item.subtitle}</span>
                                      )}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            ))}
                            {link.dropdown.featured && (
                              <Link
                                href={link.dropdown.featured.href}
                                className="mt-3 block rounded-xl p-4 bg-primary/10 border border-primary/20"
                              >
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                                  {link.dropdown.featured.eyebrow}
                                </div>
                                <div className="text-base font-semibold text-foreground mb-1">
                                  {link.dropdown.featured.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {link.dropdown.featured.description}
                                </div>
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => {
                  track("cta_voice_modal_open", { location: "mobile_nav" });
                  setMobileMenuOpen(false);
                  setVoiceModalOpen(true);
                }}
                className="w-full rounded-full py-4 text-base font-medium border border-black/10 flex items-center justify-center gap-2"
              >
                <Mic className="w-4 h-4 text-primary" /> Ask anything
              </button>
              <a
                href={siteConfig.links.bookCall}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("cta_book_call_click", { location: "mobile_nav" })}
                className="w-full rounded-full py-4 text-base text-center font-medium bg-foreground text-background"
              >
                Book a call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VoiceModal open={voiceModalOpen} onOpenChange={setVoiceModalOpen} />
    </>
  );
}
