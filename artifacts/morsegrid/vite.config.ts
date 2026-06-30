import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const SITE_URL = "https://morsegrid.com";

function sitemapPlugin(): Plugin {
  return {
    name: "morsegrid-sitemap",
    apply: "build",
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const staticPaths = [
        "/",
        "/products",
        "/industries",
        "/customers",
        "/case-studies",
        "/resources",
        "/company",
      ];
      const dataDir = path.resolve(import.meta.dirname, "src/data");
      const grabSlugs = (file: string) => {
        try {
          const txt = readFileSync(path.join(dataDir, file), "utf8");
          return [...txt.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1]);
        } catch {
          return [];
        }
      };
      const all = new Set<string>(staticPaths);
      grabSlugs("industries.ts").forEach((s) => all.add(`/industries/${s}`));
      grabSlugs("case-studies.ts").forEach((s) => all.add(`/case-studies/${s}`));
      grabSlugs("articles.ts").forEach((s) => all.add(`/resources/${s}`));
      const body = [...all]
        .map(
          (p) =>
            `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`,
        )
        .join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
      const outDir = path.resolve(import.meta.dirname, "dist/public");
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf8");
    },
  };
}

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    sitemapPlugin(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) return "framer";
          if (id.includes("@tanstack")) return "query";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("lenis")) return "lenis";
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler") || id.includes("wouter") || id.includes("use-sync-external-store")) return "react-vendor";
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
