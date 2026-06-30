import { useState, createContext, useContext } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";
import { announcement } from "@/config/announcement";

const BANNER_KEY = `banner_${announcement.versionKey}`;
export const BANNER_HEIGHT = 40;

interface BannerContextValue {
  bannerVisible: boolean;
}

const BannerContext = createContext<BannerContextValue>({ bannerVisible: false });

export function useBanner() {
  return useContext(BannerContext);
}

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [bannerVisible, setBannerVisible] = useState(
    () => !localStorage.getItem(BANNER_KEY)
  );

  return (
    <BannerContext.Provider value={{ bannerVisible }}>
      <InnerBanner visible={bannerVisible} onDismiss={() => setBannerVisible(false)} />
      {children}
    </BannerContext.Provider>
  );
}

function InnerBanner({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  const dismiss = () => {
    localStorage.setItem(BANNER_KEY, "1");
    onDismiss();
  };

  if (!visible) return null;

  return (
    <div
      className="w-full bg-white relative"
      style={{ minHeight: BANNER_HEIGHT }}
      role="banner"
      aria-label="Announcement"
    >
      <div className="flex items-center justify-center min-h-[40px] py-2 pl-4 pr-12 sm:px-12">
        <p className="text-sm text-center text-foreground/90 font-medium leading-snug">
          <span className="font-semibold">{announcement.message}</span>{" "}
          <Link
            href={announcement.href}
            className="underline underline-offset-2 text-primary hover:text-primary/80 transition-colors font-medium whitespace-nowrap"
          >
            Learn more
          </Link>
        </p>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-foreground/50 hover:text-foreground hover:bg-black/5 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500" />
    </div>
  );
}
