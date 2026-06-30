#!/usr/bin/env node
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

async function generateResponsiveVariants(srcRel, name, widths) {
  const src = resolve(ROOT, srcRel);
  const outDir = resolve(PUBLIC, "images");
  ensureDir(outDir);
  const input = sharp(src);
  for (const w of widths) {
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(resolve(outDir, `${name}-${w}.webp`));
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 55 })
      .toFile(resolve(outDir, `${name}-${w}.avif`));
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(resolve(outDir, `${name}-${w}.jpg`));
  }
  console.log(`${name} variants written to`, outDir);
}

async function generateHeroVariants() {
  await generateResponsiveVariants("src/assets/hero-band.png", "hero-band", [1280, 1920, 2560]);
}

async function generateContentVariants() {
  await generateResponsiveVariants("src/assets/collage-1.png", "collage-1", [480, 720, 1080]);
  await generateResponsiveVariants("src/assets/collage-2.png", "collage-2", [480, 720, 1080]);
  await generateResponsiveVariants("src/assets/collage-3.png", "collage-3", [480, 720, 1080]);
  await generateResponsiveVariants("src/assets/omnichannel.png", "omnichannel", [640, 960, 1440]);
  await generateResponsiveVariants("src/assets/resource-network.png", "resource-network", [480, 720, 1080]);
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c])
  );
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function ogSvg({ eyebrow, title }) {
  const lines = wrapText(title, 28).slice(0, 4);
  const startY = 320 - (lines.length - 1) * 50;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2D5016"/>
      <stop offset="1" stop-color="#7C9A5C"/>
    </linearGradient>
    <linearGradient id="overlay" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#overlay)"/>
  <g transform="translate(80, 80)">
    <circle cx="14" cy="14" r="14" fill="#F5F5DC"/>
    <circle cx="50" cy="14" r="14" fill="#F5F5DC" opacity="0.55"/>
    <circle cx="14" cy="50" r="14" fill="#F5F5DC" opacity="0.55"/>
    <circle cx="50" cy="50" r="14" fill="#F5F5DC"/>
    <text x="90" y="42" font-family="Geist, system-ui, sans-serif" font-size="32" font-weight="600" fill="#F5F5DC">Morsegrid</text>
  </g>
  <text x="80" y="${startY - 60}" font-family="Geist, system-ui, sans-serif" font-size="28" font-weight="500" fill="#F5F5DC" opacity="0.85" letter-spacing="2">${escapeXml((eyebrow || "").toUpperCase())}</text>
  ${lines
    .map(
      (l, i) =>
        `<text x="80" y="${startY + i * 88}" font-family="Geist, system-ui, sans-serif" font-size="76" font-weight="700" fill="#F5F5DC">${escapeXml(l)}</text>`
    )
    .join("\n  ")}
  <text x="80" y="570" font-family="Geist, system-ui, sans-serif" font-size="24" font-weight="500" fill="#F5F5DC" opacity="0.75">morsegrid.com</text>
</svg>`;
}

async function renderOg(svg, outPath) {
  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

async function generateOgImages() {
  const baseOut = resolve(PUBLIC, "og");
  const groups = [
    { dir: "industries", file: "src/data/industries.ts", eyebrow: "Industry" },
    { dir: "case-studies", file: "src/data/case-studies.ts", eyebrow: "Case study" },
    { dir: "resources", file: "src/data/articles.ts", eyebrow: "Article" },
  ];
  for (const g of groups) {
    const out = resolve(baseOut, g.dir);
    ensureDir(out);
    const txt = readFileSync(resolve(ROOT, g.file), "utf8");
    const re = /\{\s*[^{}]*?slug:\s*"([^"]+)"[\s\S]*?(?:headline|title|name):\s*"([^"]+)"/g;
    let m;
    const seen = new Set();
    while ((m = re.exec(txt))) {
      const slug = m[1];
      if (seen.has(slug)) continue;
      seen.add(slug);
      const title = m[2];
      const svg = ogSvg({ eyebrow: g.eyebrow, title });
      await renderOg(svg, resolve(out, `${slug}.png`));
    }
    console.log(`og ${g.dir}: ${seen.size} images written`);
  }
}

await generateHeroVariants();
await generateContentVariants();
await generateOgImages();
