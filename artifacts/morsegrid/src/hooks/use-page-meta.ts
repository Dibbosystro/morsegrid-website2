import { useEffect } from "react";

const SITE_URL = "https://morsegrid.com";
const DEFAULT_OG = "/opengraph.jpg";
const SUFFIX = "Morsegrid";

export type PageMetaJsonLd = Record<string, unknown> | Record<string, unknown>[];

export interface PageMetaOptions {
  /** Page title (without the " | Morsegrid" suffix). Pass `null` to omit suffix. */
  title: string;
  /** Meta description (and default for og:description / twitter:description). */
  description?: string;
  /** Path of the page (e.g. "/products"). Used for canonical + og:url. */
  path?: string;
  /** Open Graph image. Defaults to /opengraph.jpg. */
  image?: string;
  /** og:type (default "website"; use "article" on article pages). */
  type?: "website" | "article" | "product";
  /** Whether to include the " | Morsegrid" suffix in the document title. */
  suffix?: boolean;
  /** JSON-LD structured data injected into <head>. Single object or array of objects. */
  jsonLd?: PageMetaJsonLd;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_ATTR = "data-page-jsonld";

function setJsonLd(payload?: PageMetaJsonLd) {
  document
    .head
    .querySelectorAll(`script[type="application/ld+json"][${JSONLD_ATTR}]`)
    .forEach((node) => node.remove());

  if (!payload) return;
  const arr = Array.isArray(payload) ? payload : [payload];
  for (const obj of arr) {
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute(JSONLD_ATTR, "");
    tag.textContent = JSON.stringify(obj);
    document.head.appendChild(tag);
  }
}

const SITE_JSONLD: PageMetaJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Morsegrid",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph.jpg`,
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Morsegrid",
    url: SITE_URL,
  },
];

/**
 * Hook with two call shapes:
 *   usePageMeta("Title", "Description")  // back-compat
 *   usePageMeta({ title, description, path, image, type, jsonLd })
 */
export function usePageMeta(options: PageMetaOptions): void;
export function usePageMeta(title: string, description?: string): void;
export function usePageMeta(
  arg: PageMetaOptions | string,
  description?: string,
): void {
  const opts: PageMetaOptions =
    typeof arg === "string" ? { title: arg, description } : arg;

  const {
    title,
    description: desc,
    path,
    image = DEFAULT_OG,
    type = "website",
    suffix = true,
    jsonLd,
  } = opts;

  useEffect(() => {
    document.title = suffix ? `${title} | ${SUFFIX}` : title;

    if (desc) {
      setMeta("name", "description", desc);
      setMeta("property", "og:description", desc);
      setMeta("name", "twitter:description", desc);
    }

    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);
    setMeta("property", "og:type", type);

    const absImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
    setMeta("property", "og:image", absImage);
    setMeta("name", "twitter:image", absImage);
    setMeta("name", "twitter:card", "summary_large_image");

    if (path) {
      const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
      setMeta("property", "og:url", url);
      setLink("canonical", url);
    }

    const allJson: PageMetaJsonLd[] = [SITE_JSONLD];
    if (jsonLd) allJson.push(jsonLd);
    setJsonLd(allJson.flat() as PageMetaJsonLd);
  }, [title, desc, path, image, type, suffix, JSON.stringify(jsonLd)]);
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}
