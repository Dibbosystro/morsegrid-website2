export interface ChangelogEntry {
  id: string;
  date: string;
  isoDate: string;
  version: string;
  title: string;
  summary: string;
  bullets?: string[];
  tag?: "Release" | "Improvement" | "Fix" | "Security";
}

export const changelog: ChangelogEntry[] = [
  {
    id: "2026-04-builds",
    date: "April 22, 2026",
    isoDate: "2026-04-22",
    version: "v2.6",
    title: "Builds: typed deploys for AOPs",
    tag: "Release",
    summary:
      "Every change to an Agent Operating Procedure is now a typed Build with diffs, reviewers, and a one-click rollback. The old free-form save flow has been retired.",
    bullets: [
      "Side-by-side diff view across prompts, tools, and policies.",
      "Required reviewers per environment with role-based approvals.",
      "Rollback any Build to any prior Build in a single click — even across model upgrades.",
    ],
  },
  {
    id: "2026-03-watchtower-rules",
    date: "March 30, 2026",
    isoDate: "2026-03-30",
    version: "v2.5",
    title: "Watchtower: custom rules and SLO alerts",
    tag: "Improvement",
    summary:
      "Watchtower now supports custom evaluation rules written in plain language, plus per-AOP SLOs that page the on-call when breached.",
    bullets: [
      "Plain-language rule authoring with auto-generated test cases.",
      "Per-AOP SLOs for resolution rate, escalation rate, and CSAT.",
      "PagerDuty and Opsgenie destinations alongside Slack.",
    ],
  },
  {
    id: "2026-03-voice-barge-in",
    date: "March 11, 2026",
    isoDate: "2026-03-11",
    version: "v2.4",
    title: "Voice: barge-in tuning and accent packs",
    tag: "Improvement",
    summary:
      "We rebuilt the voice activity detector and shipped tuned acoustic models for ten additional regional accents. Median time-to-first-token on voice is down 18%.",
    bullets: [
      "Configurable barge-in sensitivity per AOP.",
      "Ten new accent packs, including IE, IN-South, ZA, AU-regional.",
      "Latency dashboards now show TTFT per accent pack.",
    ],
  },
  {
    id: "2026-02-integrations-snowflake",
    date: "February 24, 2026",
    isoDate: "2026-02-24",
    version: "v2.3",
    title: "Snowflake and Postgres connectors are GA",
    tag: "Release",
    summary:
      "Both warehouse connectors graduated from beta. Connections are read-only by default, support row-level scopes, and ship with a query budget per agent.",
  },
  {
    id: "2026-02-soc2",
    date: "February 6, 2026",
    isoDate: "2026-02-06",
    version: "v2.2",
    title: "SOC 2 Type II report available on request",
    tag: "Security",
    summary:
      "Our SOC 2 Type II report covering the period of August 2025 through January 2026 is available to customers and prospects under NDA. Reach out via the Trust Center to request a copy.",
  },
  {
    id: "2026-01-experiments",
    date: "January 19, 2026",
    isoDate: "2026-01-19",
    version: "v2.1",
    title: "Experiments: outcome-based promotion",
    tag: "Improvement",
    summary:
      "Experiments now promote winning variants automatically against an outcome metric you choose, with statistical guardrails and a kill switch on regressions.",
    bullets: [
      "Per-cohort traffic splits with stratification by channel.",
      "Pre-registered metrics with multiple-comparisons correction.",
      "Auto-rollback if any guardrail metric regresses by more than the configured threshold.",
    ],
  },
  {
    id: "2025-12-suggestions",
    date: "December 12, 2025",
    isoDate: "2025-12-12",
    version: "v2.0",
    title: "Suggestions: AI-drafted knowledge proposals",
    tag: "Release",
    summary:
      "Suggestions reads from your real conversations, identifies knowledge gaps, and drafts new help-center articles or AOP edits for your team to approve.",
    bullets: [
      "Gap detection grouped by topic, channel, and persona.",
      "Drafted articles in your house style with citation backing.",
      "One-click promotion into Notion, Zendesk, or Intercom.",
    ],
  },
  {
    id: "2025-11-eu-residency",
    date: "November 4, 2025",
    isoDate: "2025-11-04",
    version: "v1.9",
    title: "EU data residency is generally available",
    tag: "Release",
    summary:
      "EU customers can now pin all conversation processing and storage to our Frankfurt region. The choice is per-workspace and applies retroactively to new conversations.",
  },
];
