import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { NavDropdown } from "@/config/nav";

interface MegaMenuProps {
  open: boolean;
  dropdown: NavDropdown;
  onItemClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const widthClass = {
  md: "w-[320px]",
  lg: "w-[640px]",
  xl: "w-[940px]",
} as const;

function NavItem({
  item,
  onItemClick,
  large,
}: {
  item: { label: string; subtitle?: string; href: string; icon: React.ComponentType<{ className?: string }> };
  onItemClick: () => void;
  large?: boolean;
}) {
  return (
    <Link
      href={item.href}
      onClick={onItemClick}
      role="menuitem"
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none transition-colors group"
    >
      <span
        className={`${large ? "w-9 h-9" : "w-8 h-8"} rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/16 transition-colors`}
      >
        <item.icon className={`${large ? "w-4 h-4" : "w-3.5 h-3.5"} text-primary`} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground leading-snug">{item.label}</span>
        {item.subtitle && (
          <span className="block text-xs text-muted-foreground leading-snug mt-0.5">{item.subtitle}</span>
        )}
      </span>
    </Link>
  );
}

export function MegaMenu({ open, dropdown, onItemClick, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const w = widthClass[dropdown.width ?? "lg"];
  const hasFeatured = !!dropdown.featured;
  const groupCount = dropdown.groups.length;
  const isDark = dropdown.featured?.variant === "dark";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.99 }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-full pt-2.5 -translate-x-1/2 z-40"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className={`${w} bg-white border border-black/[0.07] rounded-2xl shadow-xl shadow-black/[0.08] overflow-hidden`}
            role="menu"
          >
            {/* Overview banner */}
            {dropdown.overview && (
              <Link
                href={dropdown.overview.href}
                onClick={onItemClick}
                className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-black/[0.06] group"
              >
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/16 transition-colors">
                  <dropdown.overview.icon className="w-4 h-4 text-primary" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{dropdown.overview.label}</span>
                  {dropdown.overview.subtitle && (
                    <span className="block text-xs text-muted-foreground">{dropdown.overview.subtitle}</span>
                  )}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            )}

            <div className="flex">
              {/* Main content area */}
              <div className="flex-1 min-w-0 p-3">

                {/* Top group: full-width horizontal band (e.g. Channels) */}
                {dropdown.topGroup && (
                  <div className="mb-1">
                    {dropdown.topGroup.heading && (
                      <div className="px-3 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                        {dropdown.topGroup.heading}
                      </div>
                    )}
                    <div
                      className="grid gap-1"
                      style={{ gridTemplateColumns: `repeat(${dropdown.topGroup.items.length}, minmax(0, 1fr))` }}
                    >
                      {dropdown.topGroup.items.map((item) => (
                        <NavItem key={item.href} item={item} onItemClick={onItemClick} large />
                      ))}
                    </div>
                    {/* Divider between top band and column groups */}
                    {groupCount > 0 && (
                      <div className="mt-3 mb-1 border-t border-black/[0.05]" />
                    )}
                  </div>
                )}

                {/* Column groups */}
                {groupCount > 0 && (
                  <div
                    className="grid gap-x-1"
                    style={{ gridTemplateColumns: `repeat(${groupCount}, minmax(0, 1fr))` }}
                  >
                    {dropdown.groups.map((group, gi) => (
                      <div key={gi} className="min-w-0">
                        {group.heading && (
                          <div className="px-3 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                            {group.heading}
                          </div>
                        )}
                        <ul className="flex flex-col gap-0.5">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <NavItem item={item} onItemClick={onItemClick} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured card */}
              {hasFeatured && dropdown.featured && (
                <Link
                  href={dropdown.featured.href}
                  onClick={onItemClick}
                  className="w-[210px] shrink-0 flex flex-col justify-end overflow-hidden relative group border-l border-black/[0.06] min-h-[200px]"
                  style={
                    isDark
                      ? { background: "linear-gradient(160deg, #1b3410 0%, #2e5218 60%, #1f3f13 100%)" }
                      : { background: "linear-gradient(155deg, hsl(var(--primary) / 0.93) 0%, hsl(var(--primary) / 0.72) 100%)" }
                  }
                >
                  {/* Subtle grain/glow overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.22), transparent 50%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.1), transparent 55%)",
                    }}
                  />
                  <div className="relative p-5 flex flex-col">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/55 mb-2.5">
                      {dropdown.featured.eyebrow}
                    </div>
                    <div className="text-[15px] font-semibold text-white leading-snug mb-2">
                      {dropdown.featured.title}
                    </div>
                    <div className="text-[12px] text-white/70 leading-relaxed mb-5">
                      {dropdown.featured.description}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-white/85 group-hover:text-white transition-colors mt-auto">
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
