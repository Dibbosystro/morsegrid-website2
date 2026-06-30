import {
  Mic,
  MessageSquare,
  Mail,
  Workflow,
  FlaskConical,
  ShieldCheck,
  BarChart3,
  Eye,
  Lightbulb,
  SquareKanban,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  slug: string;
  group: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  features: { title: string; description: string }[];
  worksWith: string[];
  caseStudySlugs: string[];
  metaTitle: string;
  metaDescription: string;
  /** Featured flagship product. Renders with badge and links to a custom page. */
  flagship?: boolean;
  /** Override the default `/products/:slug` link. */
  href?: string;
};

export const products: Product[] = [
  {
    slug: "clickup",
    group: "Flagship",
    icon: SquareKanban,
    title: "ClickUp Implementation",
    tagline: "The Morsegrid ClickUp Blueprint — a productized rollout that turns ClickUp into the operating system your agency actually runs on.",
    shortDescription:
      "A 90-day, methodology-led ClickUp implementation built specifically for agencies and growing service teams. We replace the spreadsheets, the half-built workspaces, and the consultant-special templates with one Blueprint your team can actually run.",
    longDescription:
      "Most ClickUp rollouts die the same way: a long template, a kickoff deck, and a workspace nobody opens by Q3. The Morsegrid ClickUp Blueprint is the opposite — a guided, phased implementation where we sit inside your team for 90 days, design the workspace around how you really deliver work, and stay in the trenches until adoption is real.",
    features: [
      { title: "Workspace architecture", description: "Spaces, folders, lists, and statuses designed around your actual delivery model — not a generic template." },
      { title: "Capacity & resourcing", description: "A live capacity view by person, role, and week so PMs stop staffing in spreadsheets." },
      { title: "Time tracking that sticks", description: "Native ClickUp time tracking wired to projects, retainers, and clients with the friction taken out." },
      { title: "Client & profitability dashboards", description: "Per-client and per-project profitability rollups your leadership team will actually open." },
      { title: "Automations & integrations", description: "Slack, HubSpot, Harvest, QuickBooks, Google Drive — wired so updates flow without anyone copying anything." },
      { title: "Adoption coaching", description: "Weekly working sessions with your PMs and team leads. Adoption is a deliverable, not a hope." },
    ],
    worksWith: ["aops", "insights", "watchtower"],
    caseStudySlugs: ["vertex-solutions", "scaling-ecommerce-fulfillment"],
    metaTitle: "ClickUp Implementation — the Morsegrid Blueprint",
    metaDescription:
      "A 90-day, methodology-led ClickUp implementation for agencies. Workspace design, dashboards, automations, and adoption coaching — all in one Blueprint.",
    flagship: true,
    href: "/products/clickup",
  },
  {
    slug: "voice",
    group: "Channels",
    icon: Mic,
    title: "Voice",
    tagline: "Human-like conversation, on every call.",
    shortDescription:
      "Voice agents that hold real conversations—handling interruptions, accents, and the messy middle of a call without sounding like a script.",
    longDescription:
      "Morsegrid Voice runs on a low-latency speech stack tuned for the realities of customer calls: people interrupt, change their minds, talk over each other, and rarely follow a script. Agents listen continuously, respond in well under a second, and hand off to a human with the full transcript and context already in place.",
    features: [
      { title: "Sub-second response latency", description: "End-to-end turn times that feel like a real conversation, not a phone tree." },
      { title: "Barge-in and turn-taking", description: "Callers can interrupt at any time; the agent stops, listens, and adapts." },
      { title: "Warm transfers with full context", description: "When a human takes over, they get the transcript, intent, and customer record up front." },
      { title: "Accent and noise robustness", description: "Trained on real call audio across regions, devices, and background noise." },
      { title: "Telephony you already use", description: "Connects to your existing SIP, Twilio, or contact-center stack without re-platforming." },
    ],
    worksWith: ["aops", "watchtower", "insights"],
    caseStudySlugs: ["lumina-goods", "aura-health"],
    metaTitle: "Voice agents",
    metaDescription:
      "Low-latency voice agents that hold real conversations, handle interruptions, and hand off to humans with full context.",
  },
  {
    slug: "chat",
    group: "Channels",
    icon: MessageSquare,
    title: "Chat",
    tagline: "Safe, on-brand replies in any web or messaging surface.",
    shortDescription:
      "Drop a chat agent into your site, app, or messaging channels. Guardrails keep responses on-brand and grounded in your knowledge base.",
    longDescription:
      "Morsegrid Chat lets you put one consistent agent in front of customers wherever they message you—web widget, in-app, SMS, WhatsApp—with a single set of guardrails, tone, and knowledge sources. Replies are grounded in approved content, and unsafe or off-policy outputs are blocked before they ship.",
    features: [
      { title: "Web, SMS, WhatsApp, in-app", description: "One agent, many surfaces, with channel-aware formatting and length." },
      { title: "Grounded in your knowledge", description: "Answers cite your help center, docs, and internal sources—not the open internet." },
      { title: "Tone and policy guardrails", description: "Brand voice, refusal rules, and PII handling enforced on every response." },
      { title: "Live human handoff", description: "Escalations land in your existing helpdesk with the full conversation attached." },
    ],
    worksWith: ["aops", "suggestions", "watchtower"],
    caseStudySlugs: ["vertex-solutions", "aura-health"],
    metaTitle: "Chat agents",
    metaDescription:
      "On-brand, grounded chat agents for web, in-app, SMS, and WhatsApp—with guardrails and live human handoff.",
  },
  {
    slug: "email",
    group: "Channels",
    icon: Mail,
    title: "Email",
    tagline: "Contextual resolutions, not auto-replies.",
    shortDescription:
      "Triage, draft, and resolve email tickets with full thread context, attachment understanding, and human review where it matters.",
    longDescription:
      "Morsegrid Email reads the whole thread—prior replies, forwarded context, and attachments—before drafting. It can resolve simple tickets end-to-end, draft for human review on harder ones, and route the rest with a clear summary so agents skip the read-through.",
    features: [
      { title: "Thread-aware drafting", description: "Replies that reflect everything said earlier in the conversation, including forwards." },
      { title: "Attachment parsing", description: "Reads PDFs, screenshots, and order exports to ground its answer in the actual document." },
      { title: "One-click human review", description: "Send drafts to your team for approval with a queue tuned for speed." },
      { title: "Helpdesk-native", description: "Works inside Zendesk, Front, Help Scout, and Intercom without changing your workflow." },
    ],
    worksWith: ["aops", "insights", "watchtower"],
    caseStudySlugs: ["lumina-goods", "aura-health"],
    metaTitle: "Email agents",
    metaDescription:
      "Email agents that read the full thread and attachments, draft contextual resolutions, and route what humans should handle.",
  },
  {
    slug: "aops",
    group: "Build",
    icon: Workflow,
    title: "AOPs",
    tagline: "Workflows for AI agents.",
    shortDescription:
      "Agent Operating Procedures let you compose multi-step flows—decisions, tools, escalations—without writing brittle prompt chains.",
    longDescription:
      "AOPs are the runtime your agents follow at every turn. Compose decisions, tool calls, approvals, and escalations visually; version them like code; and roll back instantly if a change misbehaves. The same AOP runs across Voice, Chat, and Email, so policy stays consistent everywhere.",
    features: [
      { title: "Visual flow builder", description: "Build and edit agent procedures without writing brittle prompt chains." },
      { title: "Versioning and rollback", description: "Every change is versioned; revert to a known-good AOP in one click." },
      { title: "Tool calls and approvals", description: "Call internal APIs, require human approval on sensitive actions, and log every step." },
      { title: "Shared across channels", description: "One AOP can power Voice, Chat, and Email so behavior stays consistent." },
    ],
    worksWith: ["voice", "chat", "experiments"],
    caseStudySlugs: ["vertex-solutions", "scaling-ecommerce-fulfillment"],
    metaTitle: "AOPs — workflows for AI agents",
    metaDescription:
      "Agent Operating Procedures: visual, versioned workflows that govern how your AI agents make decisions and call tools.",
  },
  {
    slug: "experiments",
    group: "Optimize",
    icon: FlaskConical,
    title: "Experiments",
    tagline: "Live A/B testing for agent behavior.",
    shortDescription:
      "Run controlled experiments on prompts, models, and AOP variants in production with statistically sound rollups.",
    longDescription:
      "Stop guessing whether a prompt change actually helps. Experiments lets you split live traffic across AOP, prompt, or model variants, measure outcomes that matter (resolution, CSAT, handle time), and auto-promote the winner once results clear your significance threshold.",
    features: [
      { title: "Traffic splits by cohort", description: "Slice by channel, intent, customer tier, or geography." },
      { title: "Outcome-based metrics", description: "Compare on resolution, CSAT, and handle time—not just token counts." },
      { title: "Auto-promote winners", description: "Promote the winning variant automatically once significance is reached." },
      { title: "Safe rollouts", description: "Cap exposure, hold out a control, and roll back instantly if a metric regresses." },
    ],
    worksWith: ["aops", "testing", "insights"],
    caseStudySlugs: ["vertex-solutions"],
    metaTitle: "Experiments — A/B test agents in production",
    metaDescription:
      "Live A/B testing for prompts, models, and AOPs with outcome-based metrics and automatic winner promotion.",
  },
  {
    slug: "testing",
    group: "Optimize",
    icon: ShieldCheck,
    title: "Testing & QA",
    tagline: "Simulations at scale before you ship.",
    shortDescription:
      "Replay real conversations and synthetic edge cases against new versions to catch regressions before they reach customers.",
    longDescription:
      "Before any change goes live, run it against thousands of real and synthetic conversations. Testing & QA scores each run on resolution, policy compliance, and tone—then surfaces the regressions and net-new failures so you ship with eyes open.",
    features: [
      { title: "Replay from production", description: "Re-run real conversations against any new AOP, prompt, or model." },
      { title: "Synthetic edge-case suites", description: "Generated scenarios for the rare cases your real traffic rarely covers." },
      { title: "Regression dashboards", description: "See which scenarios got better, worse, or newly broken at a glance." },
      { title: "Gate releases", description: "Block promotion when key checks fail; require sign-off for risky changes." },
    ],
    worksWith: ["aops", "experiments", "watchtower"],
    caseStudySlugs: ["scaling-ecommerce-fulfillment"],
    metaTitle: "Testing & QA for AI agents",
    metaDescription:
      "Simulate thousands of real and synthetic conversations against new agent versions to catch regressions before launch.",
  },
  {
    slug: "insights",
    group: "Scale",
    icon: BarChart3,
    title: "Insights & Reporting",
    tagline: "Voice of the Customer, automatically structured.",
    shortDescription:
      "Every conversation is mined for themes, sentiment, and product signals—then rolled up into dashboards and exports your team can act on.",
    longDescription:
      "Insights turns your conversation stream into a structured record: top topics, sentiment trends, effort scores, and the product signals that keep showing up. Dashboards for support and product, exports and webhooks for the warehouse and BI tools you already use.",
    features: [
      { title: "Automatic topic clustering", description: "Themes are discovered and named from real conversations—no taxonomy maintenance." },
      { title: "Sentiment and effort scores", description: "Per-conversation scores rolled up by channel, segment, and time." },
      { title: "BI exports and webhooks", description: "Pipe structured insights into Snowflake, BigQuery, or your warehouse of choice." },
      { title: "Product and support views", description: "Dashboards tailored to what each team actually needs to act on." },
    ],
    worksWith: ["watchtower", "suggestions", "experiments"],
    caseStudySlugs: ["horizon-logistics", "vertex-solutions"],
    metaTitle: "Insights & Reporting",
    metaDescription:
      "Automatically structure every conversation into themes, sentiment, and product signals—with dashboards and BI exports.",
  },
  {
    slug: "watchtower",
    group: "Scale",
    icon: Eye,
    title: "Watchtower",
    tagline: "Always-on QA across every conversation.",
    shortDescription:
      "Continuous quality monitoring that flags policy breaches, unhappy customers, and missed resolutions in real time.",
    longDescription:
      "Sampling 1% of calls is not QA. Watchtower scores every conversation against your policies, brand, and resolution criteria, alerts on the ones that need a human now, and feeds the rest back into trend reporting so quality moves up over time.",
    features: [
      { title: "Real-time alerting", description: "Page the right team the moment a conversation goes off the rails." },
      { title: "Policy and tone checks", description: "Custom rule packs for compliance, brand voice, and refusal handling." },
      { title: "Auto-routed escalations", description: "Send flagged conversations to the queue, channel, or owner that should take it." },
      { title: "Coverage on 100% of conversations", description: "Every interaction scored, not a sampled subset." },
    ],
    worksWith: ["voice", "chat", "insights"],
    caseStudySlugs: ["horizon-logistics", "scaling-ecommerce-fulfillment"],
    metaTitle: "Watchtower — always-on QA",
    metaDescription:
      "Continuous quality monitoring across every conversation, with real-time alerting on policy breaches and missed resolutions.",
  },
  {
    slug: "suggestions",
    group: "Scale",
    icon: Lightbulb,
    title: "Suggestions",
    tagline: "AI-powered knowledge that improves itself.",
    shortDescription:
      "Surface knowledge gaps from real conversations and propose new articles, redirects, and AOP edits for your team to approve.",
    longDescription:
      "Your knowledge base goes stale the moment you ship it. Suggestions watches what agents and customers actually ask, identifies the gaps and contradictions, and drafts the article, redirect, or AOP edit that would close them—ready for a human to approve in one click.",
    features: [
      { title: "Gap detection", description: "Find the questions your knowledge base does not answer well today." },
      { title: "Drafted article proposals", description: "First-draft articles, in your tone, ready for review." },
      { title: "One-click promotion", description: "Approve a suggestion and it ships to the help center and the agent at once." },
      { title: "AOP edit suggestions", description: "Recommends procedure tweaks when behavior would be better changed than re-explained." },
    ],
    worksWith: ["chat", "insights", "watchtower"],
    caseStudySlugs: ["aura-health"],
    metaTitle: "Suggestions — self-improving knowledge",
    metaDescription:
      "Detect knowledge gaps from real conversations and ship approved article and AOP edits in one click.",
  },
];

export const productsBySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

export function getProductBySlug(slug: string): Product | undefined {
  return productsBySlug[slug];
}
