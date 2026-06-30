export type IndustryUseCase = {
  title: string;
  description: string;
};

export type IndustryMetric = {
  value: string;
  label: string;
};

export type IndustryTestimonialPerson = {
  initials: string;
  color: string;
};

export type IndustryLogo = {
  name: string;
  style: string;
};

export type IndustryHeroIllustration = {
  kind:
    | "retail"
    | "technology"
    | "health-wellness";
  alt: string;
};

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  accent: string;
  accentSoft: string;
  gradientFrom: string;
  gradientTo: string;
  pillLabel: string;
  hero: {
    headline: string;
    accentPhrase: string;
    headlineSuffix: string;
    subhead: string;
    illustration: IndustryHeroIllustration;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    companyStyle: string;
    avatars: IndustryTestimonialPerson[];
    headlineStat: string;
    statCaption: string;
  };
  useCases: IndustryUseCase[];
  metrics: IndustryMetric[];
  logos: IndustryLogo[];
  closingCta: {
    title: string;
    body: string;
  };
  videoUrl: string;
  meta: {
    title: string;
    description: string;
  };
};

const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    name: "E-commerce",
    shortName: "e-commerce",
    accent: "#2d5016",
    accentSoft: "#e6eedd",
    gradientFrom: "#2d5016",
    gradientTo: "#6a9a40",
    pillLabel: "E-commerce",
    hero: {
      headline: "Replace manual ops with",
      accentPhrase: "connected",
      headlineSuffix: "systems that scale",
      subhead:
        "We build the automations that keep your Shopify store, warehouse, and customer comms in sync — so your team focuses on growth, not data entry.",
      illustration: {
        kind: "retail",
        alt: "Illustration showing connected e-commerce operations",
      },
    },
    testimonial: {
      quote: "Customer testimonial pending written approval.",
      author: "Pending",
      role: "Pending",
      company: "Client name pending approval",
      companyStyle: "font-medium",
      avatars: [
        { initials: "?", color: "#2d5016" },
      ],
      headlineStat: "—",
      statCaption: "Metric pending client approval",
    },
    useCases: [
      {
        title: "Order routing & inventory sync",
        description:
          "Keep Shopify, your 3PL, and your ledger speaking the same language so you stop overselling and stop reconciling spreadsheets at month-end.",
      },
      {
        title: "Returns & exchanges, on autopilot",
        description:
          "A single workflow handles RMAs, restocking decisions, and customer comms — your team only touches the edge cases that actually need a human.",
      },
      {
        title: "Post-purchase customer journeys",
        description:
          "Trigger the right follow-up at exactly the right time — order confirmation, shipping update, review request — without manual intervention.",
      },
      {
        title: "Reporting and reconciliation",
        description:
          "Connect your sales, fulfilment, and finance tools so month-end close is a review, not a rebuild.",
      },
    ],
    metrics: [
      { value: "—", label: "Hours saved per week" },
      { value: "—", label: "Reduction in manual tasks" },
      { value: "—", label: "Faster order fulfilment" },
    ],
    logos: [
      { name: "Cafe Racer Garage", style: "font-bold" },
      { name: "Only Crits", style: "font-medium" },
      { name: "Omar City", style: "font-serif" },
    ],
    closingCta: {
      title: "Stop losing hours to manual ops.",
      body: "See how we help e-commerce brands run on connected, automated systems.",
    },
    videoUrl: SAMPLE_VIDEO,
    meta: {
      title: "E-commerce",
      description:
        "Operations automations for e-commerce brands. Connect Shopify, your warehouse, and your customer comms without the manual work.",
    },
  },
  {
    slug: "health-wellness",
    name: "Health & Wellness",
    shortName: "health & wellness",
    accent: "#c46b1a",
    accentSoft: "#fbe8d2",
    gradientFrom: "#c46b1a",
    gradientTo: "#f0a85c",
    pillLabel: "Health & wellness",
    hero: {
      headline: "Run your practice with",
      accentPhrase: "connected",
      headlineSuffix: "systems, not spreadsheets",
      subhead:
        "We connect your booking, CRM, and marketing tools so your team can focus on clients — not copy-pasting data between platforms.",
      illustration: {
        kind: "health-wellness",
        alt: "Illustration showing connected health and wellness operations",
      },
    },
    testimonial: {
      quote: "Customer testimonial pending written approval.",
      author: "Pending",
      role: "Pending",
      company: "Client name pending approval",
      companyStyle: "font-medium",
      avatars: [
        { initials: "?", color: "#c46b1a" },
      ],
      headlineStat: "—",
      statCaption: "Metric pending client approval",
    },
    useCases: [
      {
        title: "Booking & scheduling automation",
        description:
          "Connect your booking system, CRM, and marketing tools so every appointment, reminder, and follow-up just works — without re-entering data.",
      },
      {
        title: "Client onboarding flows",
        description:
          "Walk new clients through intake forms, program selection, and welcome sequences automatically from the moment they book.",
      },
      {
        title: "Care coordination",
        description:
          "Hand-offs between your team members are traceable and timely, so nothing falls through the cracks between sessions.",
      },
      {
        title: "Outcome reporting",
        description:
          "Roll up program results and client progress automatically, with the data hygiene your stakeholders and partners expect.",
      },
    ],
    metrics: [
      { value: "—", label: "Hours saved per week" },
      { value: "—", label: "Reduction in manual tasks" },
      { value: "—", label: "Faster client onboarding" },
    ],
    logos: [
      { name: "Prana Thrive", style: "font-medium" },
    ],
    closingCta: {
      title: "Care that scales without losing its warmth.",
      body: "See how health and wellness teams use Morsegrid to keep every client supported.",
    },
    videoUrl: SAMPLE_VIDEO,
    meta: {
      title: "Health & Wellness",
      description:
        "Systems and automations for health and wellness businesses. Connect booking, CRM, and marketing without the manual work.",
    },
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    shortName: "professional services",
    accent: "#1f3a6e",
    accentSoft: "#dce4f5",
    gradientFrom: "#1f3a6e",
    gradientTo: "#5a7bbf",
    pillLabel: "Professional services",
    hero: {
      headline: "Run client delivery with",
      accentPhrase: "systems",
      headlineSuffix: "not manual follow-up",
      subhead:
        "We build the internal systems that keep your client work moving — from first contact to final invoice — without the back-and-forth that slows everything down.",
      illustration: {
        kind: "retail",
        alt: "Illustration showing connected professional services operations",
      },
    },
    testimonial: {
      quote: "Customer testimonial pending written approval.",
      author: "Pending",
      role: "Pending",
      company: "Client name pending approval",
      companyStyle: "font-medium",
      avatars: [
        { initials: "?", color: "#1f3a6e" },
      ],
      headlineStat: "—",
      statCaption: "Metric pending client approval",
    },
    useCases: [
      {
        title: "Client onboarding",
        description:
          "Move a new client from signed contract to fully set up without a single manual email or data entry step.",
      },
      {
        title: "Pipeline and deal tracking",
        description:
          "Keep your CRM and project management tools in sync so your team always knows where every client stands.",
      },
      {
        title: "Reporting and updates",
        description:
          "Generate client-ready reports and status updates automatically from the data that already exists in your tools.",
      },
      {
        title: "Invoicing and billing",
        description:
          "Connect delivery milestones to your accounting system so invoices go out on time, every time, without chasing anyone.",
      },
    ],
    metrics: [
      { value: "—", label: "Hours saved per week" },
      { value: "—", label: "Reduction in manual tasks" },
      { value: "—", label: "Faster invoice turnaround" },
    ],
    logos: [
      { name: "Corby Group", style: "font-medium" },
    ],
    closingCta: {
      title: "Deliver more without hiring more.",
      body: "See how professional services firms use Morsegrid to systemise delivery and reclaim time.",
    },
    videoUrl: SAMPLE_VIDEO,
    meta: {
      title: "Professional Services",
      description:
        "Internal systems and automations for professional services firms. Systemise client delivery without the manual overhead.",
    },
  },
  {
    slug: "technology",
    name: "Technology & AI",
    shortName: "technology",
    accent: "#0f6fff",
    accentSoft: "#dce8ff",
    gradientFrom: "#0f6fff",
    gradientTo: "#6aa6ff",
    pillLabel: "Technology & AI",
    hero: {
      headline: "Scale operations without",
      accentPhrase: "scaling",
      headlineSuffix: "manual overhead",
      subhead:
        "We build the internal systems that let technology and automation businesses serve more clients without burning out their team.",
      illustration: {
        kind: "technology",
        alt: "Illustration showing connected technology operations",
      },
    },
    testimonial: {
      quote: "Customer testimonial pending written approval.",
      author: "Pending",
      role: "Pending",
      company: "Client name pending approval",
      companyStyle: "font-medium",
      avatars: [
        { initials: "?", color: "#0f6fff" },
      ],
      headlineStat: "—",
      statCaption: "Metric pending client approval",
    },
    useCases: [
      {
        title: "Client delivery systems",
        description:
          "Standardise how you onboard, deliver, and report for clients — so every engagement runs the same high-quality playbook.",
      },
      {
        title: "Internal operations",
        description:
          "Connect your sales, project management, and billing tools so your team spends less time on admin and more time on work that matters.",
      },
      {
        title: "Reporting and analytics",
        description:
          "Surface the numbers your clients and stakeholders need, automatically, from the data that already lives in your stack.",
      },
      {
        title: "Lead and pipeline automation",
        description:
          "Qualify, route, and follow up with inbound leads without manual effort — so no opportunity goes cold while your team is heads-down.",
      },
    ],
    metrics: [
      { value: "—", label: "Hours saved per week" },
      { value: "—", label: "Reduction in manual tasks" },
      { value: "—", label: "More clients, same headcount" },
    ],
    logos: [
      { name: "22 Workflows", style: "font-medium" },
      { name: "Nexus Advisor", style: "font-medium" },
    ],
    closingCta: {
      title: "Build the system behind your service.",
      body: "See how technology and automation businesses use Morsegrid to run at scale.",
    },
    videoUrl: SAMPLE_VIDEO,
    meta: {
      title: "Technology & AI",
      description:
        "Operations systems for technology and AI businesses. Scale delivery without scaling overhead.",
    },
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
