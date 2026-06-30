import { useEffect } from "react";

const NAV_OFFSET = 96;

export function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;

      requestAnimationFrame(() => {
        const lenis = window.__lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -NAV_OFFSET });
          return;
        }
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      });
    };

    const t = window.setTimeout(scrollToHash, 80);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
}
