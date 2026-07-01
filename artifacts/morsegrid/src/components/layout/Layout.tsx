import { useLocation } from "wouter";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PreFooterAssessment } from "./PreFooterAssessment";
import { BannerProvider } from "./AnnouncementBanner";
import { LenisProvider } from "@/components/lenis-provider";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isFocused =
    location === "/assessment" || location.startsWith("/assessment/");

  return (
    <LenisProvider>
      <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-foreground focus:text-background focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        {isFocused ? (
          <>
            <main id="main" className="flex-1 flex flex-col">
              {children}
            </main>
          </>
        ) : (
          <BannerProvider>
            <Navbar
              overlay={location === "/" || location === "/proactive-agents" || location === "/products/clickup"}
              forceLight={location === "/proactive-agents" || location === "/products/clickup"}
            />
            <main id="main" className="flex-1 flex flex-col">
              {children}
            </main>
            <PreFooterAssessment />
            <Footer />
          </BannerProvider>
        )}
      </div>
    </LenisProvider>
  );
}
