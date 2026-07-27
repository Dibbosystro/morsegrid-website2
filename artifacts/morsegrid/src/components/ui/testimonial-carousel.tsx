import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Entry = {
  id: number;
  company: string;
  logoText: string;
  logoColor: string;
  quote: string;
  name: string;
  title: string;
  stat: string;
  statLabel: string;
  readHref: string;
};

/**
 * Real clients only. Quote, name, title and stat stay empty until that client
 * approves wording in writing; the panel hides whatever is still blank rather
 * than putting invented words or numbers under a real company's name.
 */
const ENTRIES: Entry[] = [
  {
    id: 0,
    company: "Cafe Racer Garage",
    logoText: "Cafe Racer Garage",
    logoColor: "#5b45d6",
    quote: "",
    name: "",
    title: "",
    stat: "",
    statLabel: "",
    readHref: "/customers",
  },
  {
    id: 1,
    company: "Only Crits",
    logoText: "Only Crits",
    logoColor: "#7d6cf0",
    quote: "",
    name: "",
    title: "",
    stat: "",
    statLabel: "",
    readHref: "/customers",
  },
  {
    id: 2,
    company: "Prana Thrive",
    logoText: "Prana Thrive",
    logoColor: "#9d8cf5",
    quote: "",
    name: "",
    title: "",
    stat: "",
    statLabel: "",
    readHref: "/customers",
  },
  {
    id: 3,
    company: "22 Workflows",
    logoText: "22 Workflows",
    logoColor: "#6a3f9e",
    quote: "",
    name: "",
    title: "",
    stat: "",
    statLabel: "",
    readHref: "/customers",
  },
];

const INTERVAL_MS = 6000;

export function TestimonialCarousel() {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const resetTimer = useCallback(
    (nextIndex?: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrent((c) => {
          const n = (c + 1) % ENTRIES.length;
          scrollTabIntoView(n);
          return n;
        });
      }, INTERVAL_MS);
      if (nextIndex !== undefined) scrollTabIntoView(nextIndex);
    },
    [],
  );

  function scrollTabIntoView(index: number) {
    const container = tabsRef.current;
    if (!container) return;
    const tab = container.children[index] as HTMLElement | undefined;
    if (!tab) return;
    // Scroll the tab strip horizontally within its OWN container only.
    // element.scrollIntoView() here scrolled the whole page down to the carousel
    // (it sits below the fold), which yanked the homepage down ~6s after load.
    const target = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleTab = (i: number) => {
    goTo(i);
    resetTimer(i);
  };

  const entry = ENTRIES[current];

  const panelVariants = {
    enter: { opacity: 0, y: reduce ? 0 : 12 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -8 },
  };

  return (
    <section className="bg-background py-20 md:py-28 border-t border-border/40">
      <div className="container mx-auto px-6 md:px-10 max-w-screen-xl">

        {/* Logo tab row */}
        <div
          ref={tabsRef}
          className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none"
          role="tablist"
          aria-label="Customer testimonials"
        >
          {ENTRIES.map((e, i) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={i === current}
              aria-controls={`testimonial-panel-${e.id}`}
              onClick={() => handleTab(i)}
              className={`
                flex-shrink-0 px-5 py-2.5 rounded-lg border text-sm font-semibold
                transition-all duration-200 whitespace-nowrap
                ${
                  i === current
                    ? "border-foreground/30 bg-foreground/5 text-foreground shadow-sm"
                    : "border-transparent text-foreground/45 hover:text-foreground/70 hover:border-foreground/15"
                }
              `}
            >
              <span style={{ color: i === current ? e.logoColor : undefined }}>
                {e.logoText}
              </span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-6 mb-8 h-px bg-border/50" />

        {/* Two-column panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={entry.id}
            id={`testimonial-panel-${entry.id}`}
            role="tabpanel"
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_280px] gap-8 md:gap-0"
          >
            {/* Left — quote + attribution, shown only once approved */}
            <div className="flex flex-col justify-between gap-6 pr-0 md:pr-12">
              <div>
                <svg
                  aria-hidden
                  className="w-10 h-10 mb-4 opacity-80"
                  viewBox="0 0 40 32"
                  fill="none"
                >
                  <path
                    d="M0 32V19.636C0 8.485 6.061 2.303 18.182 0l1.939 3.394C14.03 4.697 10.758 7.394 9.697 12H18V32H0Zm22 0V19.636C22 8.485 28.061 2.303 40.182 0L42.121 3.394C36.03 4.697 32.758 7.394 31.697 12H40V32H22Z"
                    fill="#7d6cf0"
                  />
                </svg>

                <blockquote className="text-lg md:text-xl font-medium text-foreground/80 leading-relaxed">
                  {entry.quote || `${entry.company} runs its operations on Morsegrid.`}
                </blockquote>
              </div>

              {entry.name && (
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: entry.logoColor }}
                    aria-hidden
                  >
                    {entry.name.charAt(0)}
                  </div>
                  <p className="text-sm text-foreground/55 leading-snug">
                    <span className="font-medium text-foreground/80">{entry.name}</span>
                    <br />
                    {entry.title}
                  </p>
                </div>
              )}
            </div>

            {/* Vertical divider (desktop only) */}
            <div className="hidden md:block w-px bg-border/50 mx-4 self-stretch" />

            {/* Right — stat + read story */}
            <div className="flex flex-col justify-center gap-3 pl-0 md:pl-8">
              {entry.stat && (
                <>
                  <p
                    className="text-6xl md:text-7xl font-extrabold leading-none tracking-tight"
                    style={{ color: "#7d6cf0" }}
                  >
                    {entry.stat}
                  </p>
                  <p className="text-sm text-foreground/55 max-w-[180px] leading-snug">
                    {entry.statLabel}
                  </p>
                </>
              )}
              <a
                href={entry.readHref}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors mt-1 group"
              >
                See our customers
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
