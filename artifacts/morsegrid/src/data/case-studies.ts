const collage1 = "/images/collage-1-720.jpg";
const collage2 = "/images/collage-2-720.jpg";
const collage3 = "/images/collage-3-720.jpg";
const resourceNetwork = "/images/resource-network-720.jpg";
const omnichannel = "/images/omnichannel-960.jpg";

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CaseStudyQuote {
  text: string;
  attribution: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  customer: string;
  industry: string;
  headline: string;
  summary: string;
  thumbnail?: string;
  accent: string;
  link: string;
  linkLabel: string;
  location: string;
  companySize: string;
  engagement: string;
  stack: string[];
  intro: string;
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
  quote: CaseStudyQuote;
  closing: string;
  videoUrl: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "lumina-goods",
    customer: "Lumina Goods",
    industry: "D2C Apparel",
    headline: "Three full-time roles, returned to the team in a quarter.",
    summary:
      "Lumina's order ops used to live in a chain of spreadsheets and Slack pings. We rebuilt the Shopify-to-warehouse pipeline so inventory, orders, and returns move on their own — quietly, in the background.",
    thumbnail: collage1,
    accent: "from-primary/30 via-primary/10 to-transparent",
    link: "/case-studies/lumina-goods",
    linkLabel: "Read the story",
    location: "Brooklyn, NY",
    companySize: "85 employees",
    engagement: "12-week rebuild",
    stack: ["Shopify Plus", "NetSuite", "ShipHero", "Klaviyo"],
    intro:
      "Lumina Goods was growing the way every founder hopes for and dreads in equal measure. Orders had tripled in eighteen months, and the ops team was holding the back end together by sheer willpower — a chain of spreadsheets, Slack messages, and one very tired ops manager who knew where every order really lived.",
    metrics: [
      { value: "3", label: "Full-time roles returned to higher-value work" },
      { value: "62%", label: "Reduction in order-to-ship cycle time" },
      { value: "$0.41", label: "Cost per order processed, down from $2.18" },
      { value: "99.4%", label: "Inventory accuracy across two warehouses" },
    ],
    sections: [
      {
        heading: "Where it started",
        paragraphs: [
          "Lumina's leadership was clear from the first call: they did not want a new tool to learn. They wanted the tools they had to start talking to each other. Shopify, NetSuite, and ShipHero were all in place. They just were not connected in any way that survived a busy Friday.",
          "We spent the first two weeks watching the ops team work. Not interviewing them — watching. Every workaround was a clue, every copy-paste a place where a system had given up.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "We built an event-driven middle layer that sits between Shopify, NetSuite, and the warehouse. When an order lands, inventory is reserved, the warehouse is notified, the customer record is updated, and the finance entry is queued — all in one transaction, all reversible if anything fails.",
        ],
        bullets: [
          "A reconciliation service that catches drift between Shopify and NetSuite before anyone notices it",
          "A returns workflow that quietly closes the loop on inventory, refund, and customer comms",
          "A single ops dashboard built on top of the data Lumina already had, no new source of truth required",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Three roles that used to spend their days inside spreadsheets are now working on merchandising, customer experience, and wholesale expansion. The ops manager who knew where every order really lived is now leading a team of two, instead of being a team of one.",
          "Most importantly, nobody at Lumina talks about the back office anymore. It is just there, doing its job.",
        ],
      },
    ],
    quote: {
      text: "We stopped being scared of Black Friday. The system just runs, and our team gets to think about the business instead of babysitting tabs.",
      attribution: "Priya Anand",
      role: "VP of Operations, Lumina Goods",
    },
    closing:
      "Quiet operations are not glamorous, but they compound. A year in, Lumina is opening a second warehouse on the same stack, with the same headcount.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    slug: "vertex-solutions",
    customer: "Vertex Solutions",
    industry: "B2B SaaS",
    headline: "Speed-to-lead up 400% without adding a single rep.",
    summary:
      "A leaky funnel was costing Vertex its best opportunities. We audited every stage, rewrote the routing logic, and gave the sales team a CRM that finally tells the truth about where deals stand.",
    thumbnail: resourceNetwork,
    accent: "from-emerald-500/25 via-primary/10 to-transparent",
    link: "/case-studies/vertex-solutions",
    linkLabel: "Read the story",
    location: "Austin, TX",
    companySize: "210 employees",
    engagement: "8-week sprint",
    stack: ["Salesforce", "HubSpot", "Outreach", "Gong"],
    intro:
      "Vertex had a marketing engine that was producing real demand, and a sales team that was missing it. Inbound leads were sitting for hours, sometimes days, before anyone touched them. The pipeline looked healthy on paper and nobody believed the paper.",
    metrics: [
      { value: "400%", label: "Faster speed-to-lead, end-to-end" },
      { value: "2.1x", label: "Conversion rate from MQL to opportunity" },
      { value: "0", label: "New reps required to absorb the lift" },
      { value: "11min", label: "Median first-touch time, down from 19 hours" },
    ],
    sections: [
      {
        heading: "Where it started",
        paragraphs: [
          "Vertex's CRO had a hunch and no proof. The hunch was that the team was losing winnable deals at the very top of the funnel. We pulled six months of inbound data and the hunch turned into a number: 38% of qualified inbound leads were never contacted at all.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "The fix was not a new CRM. It was honest plumbing inside the one Vertex already had.",
        ],
        bullets: [
          "Rewrote the lead-routing rules from a 400-line flow to a documented, tested service",
          "Replaced manual handoffs between SDRs and AEs with an event-driven assignment model",
          "Built a single pipeline view that reconciles Salesforce, HubSpot, and Outreach in near real time",
          "Gave reps an inbox of work, not a dashboard of tasks",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Within the first month, median first-touch time fell from nineteen hours to eleven minutes. Within the quarter, the same team — same headcount, same comp plan — was closing more than twice as many opportunities from the same inbound volume.",
        ],
      },
    ],
    quote: {
      text: "We thought we needed more reps. We needed our existing reps to stop fighting the system. The pipeline finally tells the truth.",
      attribution: "Marcus Vidal",
      role: "Chief Revenue Officer, Vertex Solutions",
    },
    closing:
      "Vertex did not buy more software. They made the software they had stop lying to them. The growth followed.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    slug: "scaling-ecommerce-fulfillment",
    customer: "Northwind Apparel",
    industry: "E-commerce Operations",
    headline: "40 hours a week, recovered from a routing spreadsheet.",
    summary:
      "Four thousand orders a week were being routed by hand across three warehouses. We replaced the spreadsheet with a service that follows the same rules, only faster — and split shipments fell by sixty percent.",
    thumbnail: omnichannel,
    accent: "from-amber-400/30 via-primary/10 to-transparent",
    link: "/case-studies/scaling-ecommerce-fulfillment",
    linkLabel: "Read the story",
    location: "Portland, OR",
    companySize: "140 employees",
    engagement: "10-week build",
    stack: ["Shopify", "ShipStation", "Snowflake", "Looker"],
    intro:
      "Northwind's ops lead had built a spreadsheet so good it was holding the company together. Every morning she would pull orders, check stock at three warehouses, and route each one by hand. It worked. It also took forty hours a week of her best person.",
    metrics: [
      { value: "40hrs", label: "Weekly hours returned to the ops lead" },
      { value: "60%", label: "Reduction in split shipments" },
      { value: "18%", label: "Lower outbound shipping spend" },
      { value: "4,200", label: "Orders per week, fully automated routing" },
    ],
    sections: [
      {
        heading: "Where it started",
        paragraphs: [
          "We did not start by replacing the spreadsheet. We started by reading it. Every rule it encoded — proximity, stock level, carrier cutoff, SKU velocity — was already there. It just lived in one person's head and one tab.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "A small routing service that consumes the same inputs the spreadsheet did, applies the same rules, and writes the result straight into ShipStation. We kept the spreadsheet running in shadow mode for three weeks until the ops team trusted the output more than they trusted themselves.",
        ],
        bullets: [
          "A versioned rules engine so changes to routing logic are reviewable and reversible",
          "A daily reconciliation that flags any order whose route would have been different last week",
          "A simple override UI for the edge cases that will always need a human",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Split shipments fell by sixty percent in the first month. Outbound shipping spend followed. The ops lead now spends her week on supplier negotiations and a wholesale launch — work she had been putting off for two years.",
        ],
      },
    ],
    quote: {
      text: "It does exactly what I did, but it does it in a second and it never gets tired. I finally got my Tuesdays back.",
      attribution: "Hannah Reyes",
      role: "Director of Fulfillment, Northwind Apparel",
    },
    closing:
      "The best automations replace nothing important. They replace the parts of the day that were quietly stealing the team's attention.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    slug: "aura-health",
    customer: "Aura Health",
    industry: "Wellness & Health",
    headline: "From four disconnected tools to one quiet workflow.",
    summary:
      "Aura's care coordinators were juggling intake forms, scheduling, and billing across four systems. We stitched them together with an event-driven core so a single update propagates everywhere it needs to.",
    thumbnail: collage2,
    accent: "from-sky-400/25 via-primary/10 to-transparent",
    link: "/case-studies/aura-health",
    linkLabel: "Read the story",
    location: "Denver, CO",
    companySize: "60 clinicians",
    engagement: "14-week phased rollout",
    stack: ["Athenahealth", "Calendly", "Stripe", "Twilio"],
    intro:
      "At Aura, every new patient meant the same dance: an intake form in one tool, a scheduling link in another, an insurance check in a third, and a billing entry in a fourth. The care coordinators were brilliant, and they were also the integration layer.",
    metrics: [
      { value: "4 → 1", label: "Tools the coordinators actually open per intake" },
      { value: "73%", label: "Faster patient onboarding" },
      { value: "0", label: "Manual data re-entry between systems" },
      { value: "9.2/10", label: "Patient onboarding satisfaction score" },
    ],
    sections: [
      {
        heading: "Where it started",
        paragraphs: [
          "Aura did not need a new EHR. They needed the tools they had to behave like one product. We mapped every step of the patient journey and counted the handoffs. There were eleven. Most of them were a person retyping something a system already knew.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "An event-driven core that listens to every system Aura already runs and quietly keeps them in sync. When a patient books, intake, scheduling, insurance verification, and billing all update in one motion.",
        ],
        bullets: [
          "HIPAA-compliant audit trail across every cross-system update",
          "A single coordinator workspace that surfaces the patient, not the tool",
          "Failure-safe retries so a flaky third-party API never strands a patient mid-intake",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Coordinators stopped switching tools and started talking to patients again. Onboarding time fell by nearly three quarters. The clinical team got back hours each week that used to be spent chasing missing fields.",
        ],
      },
    ],
    quote: {
      text: "Our coordinators went from being a human integration to being a human, again. That is the whole story.",
      attribution: "Dr. Elena Park",
      role: "Chief of Care Operations, Aura Health",
    },
    closing:
      "In healthcare, the back office is the front office. Quieting it down gave Aura's team room to do the work that drew them to the field in the first place.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    slug: "horizon-logistics",
    customer: "Horizon Logistics",
    industry: "Freight & Fulfillment",
    headline: "An ops team that finally trusts its own dashboard.",
    summary:
      "Horizon's leadership had three sources of truth and no real one. We consolidated reporting onto a single live view powered by their existing TMS, and turned Monday-morning reconciliation into a thing of the past.",
    thumbnail: collage3,
    accent: "from-rose-400/25 via-primary/10 to-transparent",
    link: "/case-studies/horizon-logistics",
    linkLabel: "Read the story",
    location: "Chicago, IL",
    companySize: "320 employees",
    engagement: "16-week program",
    stack: ["MercuryGate TMS", "Snowflake", "dbt", "Tableau"],
    intro:
      "Every Monday at Horizon began the same way: three reports, three numbers, three different versions of last week. The leadership team would spend the first two hours of the week trying to agree on what had actually happened.",
    metrics: [
      { value: "1", label: "Source of truth, finally" },
      { value: "12hrs", label: "Weekly hours saved on reconciliation" },
      { value: "94%", label: "Faster month-end close" },
      { value: "100%", label: "Of leadership reviewing the same numbers" },
    ],
    sections: [
      {
        heading: "Where it started",
        paragraphs: [
          "Horizon had invested in a TMS, a warehouse, and a data team. They had not invested in agreeing on definitions. The same metric — on-time delivery — had three formulas, depending on who was asking.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "We started with definitions, not dashboards. Every metric got a single owner, a single formula, and a single test. Then we built the pipeline that produced them, end to end, in dbt on top of Snowflake.",
        ],
        bullets: [
          "A semantic layer that makes inconsistent definitions impossible going forward",
          "Automated freshness and quality checks on every dashboard tile",
          "A single weekly ops review built off one dataset, surfaced in Tableau",
        ],
      },
      {
        heading: "What changed",
        paragraphs: [
          "Monday mornings became Monday meetings about the business, not about the numbers. The finance team closed the month in days instead of weeks. The leadership team stopped arguing about what was true and started arguing about what to do.",
        ],
      },
    ],
    quote: {
      text: "We didn't need more dashboards. We needed one we believed in. Now the conversation is about decisions, not definitions.",
      attribution: "Daniel Okafor",
      role: "COO, Horizon Logistics",
    },
    closing:
      "A trustworthy dashboard is not a feature. It is an organizational agreement that finally has somewhere to live.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

export const caseStudyLogos = [
  { name: "Lumina", className: "font-bold text-2xl tracking-tight" },
  { name: "VERTEX", className: "font-bold text-2xl tracking-tighter" },
  { name: "Aura Health", className: "font-bold text-2xl italic" },
  { name: "NEXUS", className: "font-bold text-2xl tracking-widest" },
  { name: "Horizon", className: "font-bold text-2xl" },
  { name: "Northwind", className: "font-bold text-2xl tracking-tight" },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getRelatedCaseStudies(slug: string, count = 2): CaseStudy[] {
  return caseStudies.filter((c) => c.slug !== slug).slice(0, count);
}
