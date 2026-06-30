import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { siteConfig } from "@/config/site";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackProps = Record<string, string | number | boolean | undefined | null>;

export function track(event: string, props?: TrackProps): void {
  if (typeof window === "undefined") return;
  const cleaned: Record<string, string | number | boolean> = {};
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v === undefined || v === null) continue;
      cleaned[k] = v as string | number | boolean;
    }
  }

  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, Object.keys(cleaned).length ? { props: cleaned } : undefined);
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", event, cleaned);
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...cleaned });
    }
  } catch {
    // analytics must never throw
  }

  if (!import.meta.env.PROD) {
    // eslint-disable-next-line no-console
    console.debug("[analytics:dev]", event, cleaned);
  }
}

export function injectPlausible(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (!import.meta.env.PROD) return;
  if (document.querySelector('script[data-plausible]')) return;

  const domain = siteConfig.analytics.plausibleDomain;
  const src = siteConfig.analytics.plausibleSrc;
  if (!domain || !src) return;

  const script = document.createElement("script");
  script.defer = true;
  script.setAttribute("data-domain", domain);
  script.setAttribute("data-plausible", "true");
  script.src = src;
  document.head.appendChild(script);

  const init = document.createElement("script");
  init.setAttribute("data-plausible", "init");
  init.text =
    "window.plausible = window.plausible || function(){(window.plausible.q = window.plausible.q || []).push(arguments)};";
  document.head.appendChild(init);
}

export function useTrackPageView(): void {
  const [location] = useLocation();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    const from = prev.current;
    const to = location;
    if (from === to) return;
    track("route_change", { from: from ?? "(initial)", to });
    prev.current = to;
  }, [location]);
}
