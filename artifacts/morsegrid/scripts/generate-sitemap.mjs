#!/usr/bin/env node
/**
 * Build-time sitemap.xml generator.
 * Reads route + data modules and writes sitemap.xml into the dist output.
 *
 * Invoked by the Vite plugin in vite.config.ts after build (closeBundle).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE_URL = "https://morsegrid.com";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

async function loadData() {
  const industries = await import(
    pathToFileURL(join(ROOT, "src/data/industries.ts")).href
  ).catch(() => null);
  const caseStudies = await import(
    pathToFileURL(join(ROOT, "src/data/case-studies.ts")).href
  ).catch(() => null);
  const articles = await import(
    pathToFileURL(join(ROOT, "src/data/articles.ts")).href
  ).catch(() => null);
  return {
    industries: industries?.industries ?? [],
    caseStudies: caseStudies?.caseStudies ?? [],
    articles: articles?.articles ?? [],
  };
}

function staticUrls() {
  return [
    "/",
    "/products",
    "/industries",
    "/customers",
    "/case-studies",
    "/resources",
    "/company",
  ];
}

export async function buildSitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = new Set(staticUrls());

  // Best-effort dynamic routes — read raw source if module import fails.
  let dynamic = { industries: [], caseStudies: [], articles: [] };
  try {
    dynamic = await loadData();
  } catch {
    // ignore — we'll fall back to regex extraction below
  }

  if (!dynamic.industries.length || !dynamic.caseStudies.length || !dynamic.articles.length) {
    const { readFileSync } = await import("node:fs");
    const grabSlugs = (file) => {
      try {
        const txt = readFileSync(join(ROOT, "src/data", file), "utf8");
        return [...txt.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
      } catch {
        return [];
      }
    };
    if (!dynamic.industries.length) {
      dynamic.industries = grabSlugs("industries.ts").map((slug) => ({ slug }));
    }
    if (!dynamic.caseStudies.length) {
      dynamic.caseStudies = grabSlugs("case-studies.ts").map((slug) => ({ slug }));
    }
    if (!dynamic.articles.length) {
      dynamic.articles = grabSlugs("articles.ts").map((slug) => ({ slug }));
    }
  }

  for (const i of dynamic.industries) urls.add(`/industries/${i.slug}`);
  for (const c of dynamic.caseStudies) urls.add(`/case-studies/${c.slug}`);
  for (const a of dynamic.articles) urls.add(`/resources/${a.slug}`);

  const body = [...urls]
    .map(
      (path) =>
        `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export async function writeSitemap(outDir) {
  const xml = await buildSitemapXml();
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "sitemap.xml"), xml, "utf8");
  return join(outDir, "sitemap.xml");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const out = process.argv[2] ?? join(ROOT, "dist/public");
  writeSitemap(out).then((p) => console.log(`Wrote ${p}`));
}
