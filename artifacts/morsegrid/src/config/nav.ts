import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Mic,
  MessageSquare,
  Mail,
  Workflow,
  Plug,
  FlaskConical,
  ShieldCheck,
  BarChart3,
  Eye,
  Lightbulb,
  ShoppingBag,
  Cpu,
  HeartPulse,
  Briefcase,
  BookOpen,
  GraduationCap,
  Library,
  Building2,
  Users,
  Lock,
  Quote,
  FileText,
  Sparkles,
  ClipboardCheck,
  SquareKanban,
} from "lucide-react";

export type NavSubItem = {
  label: string;
  subtitle?: string;
  href: string;
  icon: LucideIcon;
};

export type NavGroup = {
  heading?: string;
  items: NavSubItem[];
};

export type NavFeatured = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  variant?: "green" | "dark";
};

export type NavDropdown = {
  overview?: NavSubItem;
  /** Renders as a full-width horizontal band above the column groups */
  topGroup?: NavGroup;
  groups: NavGroup[];
  featured?: NavFeatured;
  width?: "md" | "lg" | "xl";
};

export type NavLink = {
  label: string;
  href: string;
  dropdown?: NavDropdown;
};

export const navLinks: NavLink[] = [
  {
    label: "Product",
    href: "/products",
    dropdown: {
      width: "xl",
      overview: {
        label: "Product overview",
        subtitle: "See how the full Morsegrid platform fits together",
        href: "/products",
        icon: LayoutGrid,
      },
      topGroup: {
        heading: "Channels",
        items: [
          { label: "Voice", subtitle: "Human-like conversation", href: "/products/voice", icon: Mic },
          { label: "Chat", subtitle: "Safe, on-brand replies", href: "/products/chat", icon: MessageSquare },
          { label: "Email", subtitle: "Contextual resolutions", href: "/products/email", icon: Mail },
        ],
      },
      groups: [
        {
          heading: "Build",
          items: [
            { label: "AOPs", subtitle: "Workflows for AI agents", href: "/products/aops", icon: Workflow },
            { label: "Integrations", subtitle: "Connect your stack", href: "/integrations", icon: Plug },
          ],
        },
        {
          heading: "Optimize",
          items: [
            { label: "Experiments", subtitle: "Live A/B testing", href: "/products/experiments", icon: FlaskConical },
            { label: "Testing & QA", subtitle: "Simulations at scale", href: "/products/testing", icon: ShieldCheck },
          ],
        },
        {
          heading: "Scale",
          items: [
            { label: "Insights & Reporting", subtitle: "Voice of the Customer", href: "/products/insights", icon: BarChart3 },
            { label: "Watchtower", subtitle: "Always-on monitoring", href: "/products/watchtower", icon: Eye },
            { label: "Suggestions", subtitle: "AI-powered knowledge", href: "/products/suggestions", icon: Lightbulb },
          ],
        },
      ],
      featured: {
        eyebrow: "Flagship service",
        title: "ClickUp Implementation",
        description: "The Morsegrid Blueprint — end-to-end ClickUp setup for agencies that want to scale.",
        href: "/products/clickup",
        variant: "dark",
      },
    },
  },
  {
    label: "Industries",
    href: "/industries",
    dropdown: {
      width: "md",
      groups: [
        {
          items: [
            { label: "E-commerce", subtitle: "Connected ops that scale", href: "/industries/ecommerce", icon: ShoppingBag },
            { label: "Health & wellness", subtitle: "People-first operations", href: "/industries/health-wellness", icon: HeartPulse },
            { label: "Professional services", subtitle: "Delivery without the chaos", href: "/industries/professional-services", icon: Briefcase },
            { label: "Technology", subtitle: "Systems that grow with you", href: "/industries/technology", icon: Cpu },
          ],
        },
      ],
    },
  },
  {
    label: "Customers",
    href: "/customers",
    dropdown: {
      width: "md",
      groups: [
        {
          items: [
            { label: "Customer stories", subtitle: "Who runs on Morsegrid", href: "/customers", icon: Quote },
            { label: "Case studies", subtitle: "In-depth results", href: "/case-studies", icon: FileText },
          ],
        },
      ],
    },
  },
  {
    label: "Resources",
    href: "/resources",
    dropdown: {
      width: "lg",
      groups: [
        {
          heading: "Learn",
          items: [
            { label: "Resources Hub", subtitle: "Playbooks and guides", href: "/resources", icon: BookOpen },
            { label: "Free assessment", subtitle: "Score your operations", href: "/assessment", icon: ClipboardCheck },
            { label: "University", subtitle: "Hands-on courses", href: "/resources#university", icon: GraduationCap },
            { label: "Glossary", subtitle: "Terms, defined", href: "/resources#glossary", icon: Library },
          ],
        },
        {
          heading: "Stay current",
          items: [
            { label: "Changelog", subtitle: "What we shipped", href: "/changelog", icon: Sparkles },
            { label: "Trust Center", subtitle: "Security & compliance", href: "/security", icon: ShieldCheck },
          ],
        },
      ],
      featured: {
        eyebrow: "Fall '26 Release",
        title: "Proactive Agents",
        description: "Agents that reach out before customers do — right context, right channel.",
        href: "/proactive-agents",
        variant: "green",
      },
    },
  },
  {
    label: "Company",
    href: "/company",
    dropdown: {
      width: "md",
      groups: [
        {
          items: [
            { label: "About", subtitle: "Our philosophy & team", href: "/company#about", icon: Building2 },
            { label: "Careers", subtitle: "Come build with us", href: "/careers", icon: Users },
            { label: "Security", subtitle: "How we handle your data", href: "/security", icon: Lock },
          ],
        },
      ],
    },
  },
];
