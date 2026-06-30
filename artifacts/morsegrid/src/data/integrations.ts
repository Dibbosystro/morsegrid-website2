export type IntegrationCategory =
  | "Operations"
  | "CRM"
  | "Commerce"
  | "Comms"
  | "Data";

export type IntegrationStatus = "Live" | "Beta" | "Coming soon";

export interface Integration {
  slug: string;
  name: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  summary: string;
  description: string;
  wordmark: string;
  color: string;
  logoSlug?: string;
}

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  "Operations",
  "CRM",
  "Commerce",
  "Comms",
  "Data",
];

export const integrations: Integration[] = [
  {
    slug: "shopify",
    name: "Shopify",
    category: "Commerce",
    status: "Live",
    summary: "Sync orders, customers, and inventory in real time.",
    description:
      "Two-way sync with Shopify orders, customers, and inventory so workflows can read stock, update orders, and trigger fulfilment without manual steps.",
    wordmark: "shopify",
    color: "#3a6f3a",
    logoSlug: "shopify",
  },
  {
    slug: "hubspot",
    name: "HubSpot",
    category: "CRM",
    status: "Live",
    summary: "Read and write contacts, deals, and lifecycle stages.",
    description:
      "Push enriched contact, company, and deal records into HubSpot from any workflow, and pull lifecycle context back into automations.",
    wordmark: "HubSpot",
    color: "#c46b1a",
    logoSlug: "hubspot",
  },
  {
    slug: "stripe",
    name: "Stripe",
    category: "Commerce",
    status: "Live",
    summary: "Charges, refunds, subscriptions, and billing context.",
    description:
      "Look up invoices, check subscription status, or trigger billing actions from inside a workflow. All write operations gated by your approval policies.",
    wordmark: "stripe",
    color: "#5a4ad1",
    logoSlug: "stripe",
  },
  {
    slug: "n8n",
    name: "n8n",
    category: "Operations",
    status: "Live",
    summary: "Trigger and chain workflows with your n8n instance.",
    description:
      "Connect Morsegrid automations to your self-hosted or cloud n8n instance. Trigger workflows, pass data, and chain complex multi-step processes.",
    wordmark: "n8n",
    color: "#e85d2a",
    logoSlug: "n8n",
  },
  {
    slug: "make",
    name: "Make",
    category: "Operations",
    status: "Live",
    summary: "Trigger Make scenarios from any automation step.",
    description:
      "Fire Make scenarios from Morsegrid workflows and receive data back. Useful for connecting to the long tail of apps already in your Make account.",
    wordmark: "Make",
    color: "#6d2ae8",
    logoSlug: "make",
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "Operations",
    status: "Live",
    summary: "Connect to thousands of apps via Zapier triggers.",
    description:
      "Trigger Zaps from Morsegrid or use Zapier webhooks to kick off Morsegrid workflows. Ideal for teams with existing Zaps they want to keep.",
    wordmark: "Zapier",
    color: "#ff4a00",
    logoSlug: "zapier",
  },
  {
    slug: "airtable",
    name: "Airtable",
    category: "Data",
    status: "Live",
    summary: "Read and write structured records from any base.",
    description:
      "Treat any Airtable base as a typed data source — look up records, update fields, or create rows as part of any automation.",
    wordmark: "Airtable",
    color: "#f0a830",
    logoSlug: "airtable",
  },
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "Commerce",
    status: "Live",
    summary: "Profiles, lists, and event-driven email/SMS flows.",
    description:
      "Add a profile to a flow, update subscriber properties, or trigger a campaign segment from inside a Morsegrid workflow.",
    wordmark: "klaviyo",
    color: "#1f1f1f",
  },
  {
    slug: "typeform",
    name: "Typeform",
    category: "Data",
    status: "Live",
    summary: "Trigger workflows from form submissions.",
    description:
      "Use Typeform responses as a workflow trigger. Map answer fields to any downstream system — CRM, project management, or a custom database.",
    wordmark: "Typeform",
    color: "#262627",
    logoSlug: "typeform",
  },
  {
    slug: "cal-com",
    name: "cal.com",
    category: "Comms",
    status: "Live",
    summary: "Booking events as workflow triggers.",
    description:
      "Trigger onboarding workflows, send prep materials, or update CRM records the moment a meeting is booked on cal.com.",
    wordmark: "cal.com",
    color: "#1a1a1a",
    logoSlug: "caldotcom",
  },
  {
    slug: "retell-ai",
    name: "Retell AI",
    category: "Comms",
    status: "Live",
    summary: "Voice agent calls and transcripts.",
    description:
      "Trigger Retell AI voice calls from workflows and receive call transcripts and outcomes back — useful for outbound follow-up and qualification.",
    wordmark: "Retell AI",
    color: "#3a5a8a",
  },
];

export function getIntegration(slug: string): Integration | undefined {
  return integrations.find((i) => i.slug === slug);
}
