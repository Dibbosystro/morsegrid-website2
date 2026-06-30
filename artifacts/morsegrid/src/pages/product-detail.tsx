import { Link, useRoute } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getProductBySlug, products } from "@/data/products";
import NotFound from "@/pages/not-found";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const slug = params?.slug ?? "";
  const product = getProductBySlug(slug);

  if (!product) {
    return <NotFound />;
  }

  return <ProductDetailView product={product} />;
}

function ProductDetailView({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  usePageMeta(product.metaTitle, product.metaDescription);

  const siblings = product.worksWith
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  const Icon = product.icon;

  return (
    <div className="flex flex-col pb-24">
      <div className="bg-muted/30 pt-40 pb-20 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/products" className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-products">
                Product
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.title}</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {product.group}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6" data-testid="text-product-title">
              {product.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-4">{product.tagline}</p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{product.shortDescription}</p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20 space-y-20">
        <FadeIn>
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                What it does
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">How {product.title} works</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-foreground/85 leading-relaxed text-lg">{product.longDescription}</p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section>
            <div className="mb-10">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Highlights
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">What you get</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl border border-border bg-card shadow-sm"
                  data-testid={`feature-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {siblings.length > 0 && (
          <FadeIn delay={0.1}>
            <section>
              <div className="mb-10">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  Works with
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Better together</h2>
                <p className="text-muted-foreground mt-3 max-w-2xl">
                  {product.title} is part of the Morsegrid platform. Teams typically pair it with these.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {siblings.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <Link
                      key={s.slug}
                      href={`/products/${s.slug}`}
                      className="group p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
                      data-testid={`link-works-with-${s.slug}`}
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <SIcon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-snug flex-1">{s.tagline}</p>
                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Learn more
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </FadeIn>
        )}

        <FadeIn delay={0.15} className="text-center bg-muted/50 p-12 rounded-3xl border border-border/50">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">See {product.title} on your own data.</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We'll wire a working agent to a slice of your real traffic so you can judge it on your conversations, not a demo script.
          </p>
          <Button asChild className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
            <a href={siteConfig.links.bookCall} target="_blank" rel="noreferrer" data-testid="link-book-call-product">
              Book a working session
            </a>
          </Button>
        </FadeIn>
      </div>
    </div>
  );
}
