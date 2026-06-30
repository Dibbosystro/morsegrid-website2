import {
  Compass,
  LayoutGrid,
  Workflow,
  Gauge,
  Users,
  ShieldCheck,
  Plug,
  ListChecks,
  ClipboardCheck,
  BookOpen,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Phase = {
  number: string;
  name: string;
  duration: string;
  summary: string;
  whatHappens: string[];
  deliverables: string[];
  icon: LucideIcon;
};

export type Deliverable = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Tier = {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  bestFor: string;
  includes: string[];
  highlight?: boolean;
};

export type Faq = {
  q: string;
  a: string;
};

export type Outcome = {
  stat: string;
  label: string;
};

export const heroEyebrow = "The Morsegrid ClickUp Blueprint";
export const heroTitle = "ClickUp, finally implemented like the operating system it was supposed to be.";
export const heroSubtitle =
  "A 90-day, productized ClickUp implementation for agencies and growing service teams. We design the workspace around how you really deliver work, wire the dashboards your leadership will actually open, and stay in the room until adoption is real.";

export const problemTitle = "Why most agencies fail at ClickUp.";
export const problemIntro =
  "We've audited hundreds of ClickUp workspaces. They tend to fail in the same handful of ways — and none of them are about ClickUp.";

export const problems: { title: string; body: string }[] = [
  {
    title: "A template, not a system.",
    body: "A consultant dropped in a generic template six months ago. It's beautiful in the demo and unrecognizable in real work — so the team quietly went back to spreadsheets and Slack threads.",
  },
  {
    title: "Built for the founder, not the team.",
    body: "The workspace makes sense to the one person who set it up. Everyone else is guessing where to put things, so things end up everywhere.",
  },
  {
    title: "No capacity, no profitability, no truth.",
    body: "There's no honest view of who's overloaded, what's slipping, or which clients are actually profitable. Leadership flies on vibes.",
  },
  {
    title: "Adoption was never a deliverable.",
    body: "The rollout ended at training day. There was no coaching, no enforcement, no second pass — so usage drifted within a quarter.",
  },
];

export const outcomesTitle = "What changes when the Blueprint is in.";
export const outcomes: Outcome[] = [
  { stat: "1", label: "Workspace your team actually opens every morning" },
  { stat: "100%", label: "Of project work tracked in one place — no more parallel spreadsheets" },
  { stat: "<1 wk", label: "Time to a trustworthy capacity and profitability view" },
  { stat: "90 days", label: "From kickoff to a fully adopted, audited workspace" },
];

export const methodologyTitle = "The 4-phase Blueprint.";
export const methodologyIntro =
  "A linear, predictable engagement with named phases, named deliverables, and a fixed timeline. You always know what week you're in and what's shipping next.";

export const phases: Phase[] = [
  {
    number: "01",
    name: "Discover",
    duration: "Weeks 1–2",
    summary:
      "We sit inside your delivery to understand how work really moves — before we touch a single space.",
    whatHappens: [
      "Working sessions with leadership, PMs, and individual contributors",
      "Shadow live projects, retainers, and client handoffs end-to-end",
      "Inventory current tools, spreadsheets, and the Slack channels doing real work",
      "Surface the 5–10 frictions that are actually costing you margin",
    ],
    deliverables: [
      "Operating model map of your delivery, in your language",
      "Friction & opportunity register, prioritized by impact",
      "Approved scope & success metrics for the Blueprint",
    ],
    icon: Compass,
  },
  {
    number: "02",
    name: "Design",
    duration: "Weeks 3–5",
    summary:
      "We architect the workspace — spaces, hierarchy, statuses, custom fields, views — around how your team really delivers.",
    whatHappens: [
      "Design the space, folder, and list hierarchy aligned to your service lines",
      "Define statuses, custom fields, and templates per work type",
      "Map automations, integrations, and the data model behind dashboards",
      "Walk leadership through the design before any building begins",
    ],
    deliverables: [
      "Workspace architecture document with diagrams",
      "Custom field & status library, ready to build",
      "Automation & integration plan with named owners",
    ],
    icon: LayoutGrid,
  },
  {
    number: "03",
    name: "Build",
    duration: "Weeks 6–10",
    summary:
      "We build the workspace, wire the integrations, and stand up the dashboards — with your team in the room every step.",
    whatHappens: [
      "Stand up the full ClickUp workspace per the approved design",
      "Wire automations, native integrations, and any required custom hooks",
      "Build the capacity, profitability, and client-health dashboards",
      "Migrate active work from spreadsheets and other tools, in batches",
    ],
    deliverables: [
      "Production-ready ClickUp workspace",
      "Capacity, profitability, and client dashboards",
      "Working integrations with your stack (Slack, HubSpot, Harvest, etc.)",
      "Migrated active projects with a documented audit trail",
    ],
    icon: Workflow,
  },
  {
    number: "04",
    name: "Adopt",
    duration: "Weeks 11–13",
    summary:
      "We don't leave at training day. We coach your team through real weeks of work until the new way is the only way.",
    whatHappens: [
      "Role-based training for leadership, PMs, and team members",
      "Weekly working sessions on live projects, not toy examples",
      "Office hours and async support for individual contributors",
      "Final audit against the success metrics defined in Discover",
    ],
    deliverables: [
      "Recorded role-based training library",
      "Internal Blueprint playbook tailored to your team",
      "30-day adoption audit with a measured score",
      "Handoff to your internal Blueprint owner",
    ],
    icon: Users,
  },
];

export const deliverablesTitle = "Everything you walk away with.";
export const deliverablesIntro =
  "The Blueprint is a productized engagement. Every project ships the same set of artifacts, sized to your team.";

export const deliverables: Deliverable[] = [
  {
    title: "Workspace architecture",
    description: "Spaces, folders, lists, statuses, and custom fields designed around your delivery model.",
    icon: LayoutGrid,
  },
  {
    title: "Dashboards your leadership opens",
    description: "Capacity, profitability, and client-health views, refreshed live from the workspace.",
    icon: Gauge,
  },
  {
    title: "Automations & integrations",
    description: "Slack, HubSpot, Harvest, QuickBooks, Google Drive, and your custom hooks, wired and tested.",
    icon: Plug,
  },
  {
    title: "Standardized work templates",
    description: "Templated lists, tasks, and SOPs for every recurring work type your team delivers.",
    icon: ListChecks,
  },
  {
    title: "Internal Blueprint playbook",
    description: "A written playbook your team owns: how the workspace is structured, why, and how to extend it.",
    icon: BookOpen,
  },
  {
    title: "Role-based training library",
    description: "Recorded, role-specific training for leadership, PMs, and individual contributors.",
    icon: ClipboardCheck,
  },
  {
    title: "Adoption audit",
    description: "A measured 30-day audit against the success metrics defined in Discover, with a written score.",
    icon: ShieldCheck,
  },
  {
    title: "Continuous improvement plan",
    description: "A 90-day post-Blueprint roadmap so the workspace keeps compounding instead of drifting.",
    icon: Sparkles,
  },
];

export const proofTitle = "Teams that already run on the Blueprint.";
export const proofIntro =
  "We've shipped the Blueprint into agencies, professional-services teams, and ops-heavy SaaS companies. A couple of recent examples:";

export type Vignette = {
  customer: string;
  context: string;
  body: string;
  stat: string;
  statLabel: string;
};

export const vignettes: Vignette[] = [
  {
    customer: "A 60-person digital agency",
    context: "Composite example based on three recent engagements",
    body: "Five service lines, three regions, and a workspace that nobody trusted. We rebuilt it around their delivery model, wired Harvest and HubSpot, and stood up a profitability dashboard that finally agreed with finance. Adoption hit 92% by the 30-day audit.",
    stat: "92%",
    statLabel: "Workspace adoption at the 30-day audit",
  },
  {
    customer: "A 40-person professional-services firm",
    context: "Composite example based on two recent engagements",
    body: "Capacity was tracked in a single shared spreadsheet that was always two days out of date. The Blueprint replaced it with a live capacity view per role and per week. PMs stopped over-staffing, utilization climbed 14 points in the first quarter.",
    stat: "+14pts",
    statLabel: "Utilization lift in the first quarter post-Blueprint",
  },
];

export const tiersTitle = "Pick the tier that fits your team.";
export const tiersIntro =
  "Every tier ships the same Blueprint methodology. Tiers differ in scope, complexity, and the depth of integrations and dashboards.";

export const tiers: Tier[] = [
  {
    name: "Foundations",
    tagline: "For teams under 25 people, one or two service lines.",
    price: "From $24,000",
    priceNote: "Fixed fee, 60–90 days",
    bestFor: "Small agencies and services teams replacing spreadsheets and a half-built workspace.",
    includes: [
      "Discover, Design, Build, Adopt — full methodology",
      "Workspace architecture for up to 2 service lines",
      "Capacity & profitability dashboards",
      "Up to 4 native integrations",
      "30-day adoption audit",
    ],
  },
  {
    name: "Growth",
    tagline: "For teams of 25–75 people running multiple service lines.",
    price: "From $48,000",
    priceNote: "Fixed fee, 90 days",
    bestFor: "Growing agencies that need a workspace their leadership trusts and their PMs can scale.",
    includes: [
      "Everything in Foundations",
      "Workspace architecture for up to 5 service lines",
      "Custom dashboards, including client health and per-PM views",
      "Up to 8 native integrations + 2 custom hooks",
      "Role-based training library",
      "60-day adoption coaching",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    tagline: "For teams over 75 people, complex stack, multiple regions.",
    price: "Custom",
    priceNote: "Scoped per engagement",
    bestFor: "Multi-office agencies and ops-heavy SaaS teams running ClickUp as a true system of record.",
    includes: [
      "Everything in Growth",
      "Multi-region & multi-brand workspace design",
      "Custom integration build & data sync",
      "Embedded Morsegrid PM for the duration",
      "Quarterly post-Blueprint review for the first year",
    ],
  },
];

export const guaranteeTitle = "Adoption guarantee.";
export const guaranteeBody =
  "If your team isn't running its real work in ClickUp 30 days after the Blueprint ends, we keep coaching — at our cost — until it is. We define adoption with you in week one and audit it in week thirteen.";

export const guaranteePoints: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Adoption is a deliverable",
    body: "We define what 'adopted' means with you in Discover. It's a number, not a feeling.",
    icon: ShieldCheck,
  },
  {
    title: "We measure it in week 13",
    body: "A written audit against the success metrics, signed off by your leadership team.",
    icon: ClipboardCheck,
  },
  {
    title: "We don't leave until you pass",
    body: "If the audit comes back short, the coaching continues — on us — until it doesn't.",
    icon: Wrench,
  },
];

export const faqs: Faq[] = [
  {
    q: "Why a productized engagement instead of an open-ended consulting retainer?",
    a: "Because open-ended ClickUp consulting is how most workspaces die. A fixed scope, fixed methodology, and fixed timeline force the work to converge — and force us to take adoption seriously, not bill against drift.",
  },
  {
    q: "Do we have to be on ClickUp Enterprise?",
    a: "No. The Blueprint runs on ClickUp Business and above. We'll tell you in Discover if your plan would be a constraint, and what an upgrade would actually unlock.",
  },
  {
    q: "We already have a ClickUp workspace. Is this a rebuild or a rescue?",
    a: "Both happen. About half of Blueprint engagements are net-new builds; the other half are rescues of a workspace that drifted. Discover is the same either way — we map what exists before we change anything.",
  },
  {
    q: "What does our team need to commit?",
    a: "Plan on 4–6 hours per week from a leadership sponsor, plus 2–3 hours per week from each PM during Build and Adopt. Adoption is a contact sport; this is the floor, not the ceiling.",
  },
  {
    q: "Will you migrate our active work for us?",
    a: "Yes. Migration of active projects is part of Build, done in batches with your team so context isn't lost. Historical archives are scoped separately if you need them.",
  },
  {
    q: "What happens after the 90 days?",
    a: "You own the workspace and the playbook. Most teams choose to keep us on a light continuous-improvement retainer for the first 90 days post-Blueprint; it's optional, not bundled.",
  },
  {
    q: "Do you do this for non-agency teams?",
    a: "Yes. The Blueprint started with agencies and is sharpest there, but we've shipped it for professional-services firms, ops-heavy SaaS teams, and in-house creative groups. The methodology is the same.",
  },
];
