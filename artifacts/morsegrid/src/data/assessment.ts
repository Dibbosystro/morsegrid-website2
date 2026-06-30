export type CategoryId =
  | "team"
  | "workload"
  | "visibility"
  | "mistakes"
  | "sops"
  | "tools"
  | "delegation";

export interface Category {
  id: CategoryId;
  title: string;
  blurb: string;
  recommendation: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "team",
    title: "Team & Org",
    blurb: "How your team is structured and where it stands today.",
    recommendation:
      "Map every role and contractor to a single org chart so handoffs and coverage gaps stop slipping through the cracks.",
  },
  {
    id: "workload",
    title: "Workload & Stress",
    blurb: "How much your team is carrying and how sustainable it feels.",
    recommendation:
      "Audit recurring work and protect at least one focus block per person each day — overload is where systems quietly break down.",
  },
  {
    id: "visibility",
    title: "Visibility",
    blurb: "Whether you can actually see what's happening inside the business.",
    recommendation:
      "Pull status, ownership, and due dates into one shared view so you stop relying on standups and Slack pings to know what's going on.",
  },
  {
    id: "mistakes",
    title: "Mistakes & Recovery",
    blurb: "How your team responds when something goes wrong.",
    recommendation:
      "Start a lightweight mistake log and review it weekly — the same fix made once is worth ten heroic recoveries.",
  },
  {
    id: "sops",
    title: "SOPs & Documented Process",
    blurb: "Whether the work is written down where the team can find it.",
    recommendation:
      "Pick your top 5 most-repeated workflows and document them in one searchable home before writing anything else.",
  },
  {
    id: "tools",
    title: "Tools & Automation",
    blurb: "How much your stack actually does the work for you.",
    recommendation:
      "Replace your two most painful manual handoffs with automations that fire off your existing tools — small wins compound.",
  },
  {
    id: "delegation",
    title: "Delegation & Growth",
    blurb: "How confidently you can hand work off and grow the team.",
    recommendation:
      "Identify one task you alone do today and write the SOP for it this week — that's the unlock for hiring and scaling.",
  },
];

export type QuestionType = "single" | "scale" | "numeric" | "yesno";

export interface OptionDef {
  value: string;
  label: string;
  /** 0..1 contribution toward the category sub-score. */
  weight: number;
}

export interface BaseQuestion {
  id: string;
  category: CategoryId;
  /** Optional helper / definition shown above the question. */
  helper?: string;
  prompt: string;
  /** Show only when this rule is satisfied. */
  revealsWhen?: { questionId: string; equals: string };
}

export interface SingleQuestion extends BaseQuestion {
  type: "single";
  options: OptionDef[];
}

export interface ScaleQuestion extends BaseQuestion {
  type: "scale";
  /** Inclusive 1..5 labels. Index 0 = "1", index 4 = "5". */
  endLabels: { low: string; high: string };
  /** Higher value = better systemization. If false, weight = (6 - v) / 5. */
  highIsGood: boolean;
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  min: number;
  max: number;
  /** Numeric value at which the score peaks at 1.0. */
  idealAt: number;
  /** Numeric value at which the score floors at 0. */
  worstAt: number;
  unitHint?: string;
}

export interface YesNoQuestion extends BaseQuestion {
  type: "yesno";
  /** Which answer counts as "more systemized". */
  goodAnswer: "yes" | "no";
}

export type Question =
  | SingleQuestion
  | ScaleQuestion
  | NumericQuestion
  | YesNoQuestion;

export interface Section {
  id: string;
  category: CategoryId;
  title: string;
  questions: Question[];
}

const yesNo: OptionDef[] = [
  { value: "yes", label: "Yes", weight: 1 },
  { value: "no", label: "No", weight: 0 },
];

export const SECTIONS: Section[] = [
  {
    id: "team",
    category: "team",
    title: "Team & Org",
    questions: [
      {
        id: "team_prior",
        category: "team",
        type: "single",
        prompt: "Have you taken a systemization assessment like this before?",
        options: [
          { value: "no", label: "No, this is my first time", weight: 0.5 },
          { value: "informal", label: "Informally — I've thought about it", weight: 0.6 },
          { value: "yes_recent", label: "Yes, in the last 12 months", weight: 1 },
        ],
      },
      {
        id: "team_size",
        category: "team",
        type: "numeric",
        prompt: "How many people are in your organization?",
        helper: "Please include all collaborators, including in-house staff and contractors.",
        min: 0,
        max: 100000,
        idealAt: 25,
        worstAt: 0,
        unitHint: "people",
      },
      {
        id: "team_role",
        category: "team",
        type: "single",
        prompt: "Which best describes your role?",
        options: [
          { value: "founder", label: "Founder / Owner", weight: 0.5 },
          { value: "ops", label: "Head of Ops / COO", weight: 1 },
          { value: "manager", label: "Team / Department manager", weight: 0.8 },
          { value: "ic", label: "Individual contributor", weight: 0.4 },
        ],
      },
    ],
  },
  {
    id: "workload",
    category: "workload",
    title: "Workload & Stress",
    questions: [
      {
        id: "workload_hours",
        category: "workload",
        type: "numeric",
        prompt: "How many hours per week does your average team member work?",
        min: 0,
        max: 100,
        idealAt: 40,
        worstAt: 80,
        unitHint: "hours / week",
      },
      {
        id: "workload_meetings",
        category: "workload",
        type: "numeric",
        prompt: "How many meetings does your average team member have in one week?",
        min: 0,
        max: 100,
        idealAt: 8,
        worstAt: 30,
        unitHint: "meetings / week",
      },
      {
        id: "workload_weekends",
        category: "workload",
        type: "scale",
        prompt: "How often does your team work on weekends?",
        endLabels: { low: "No Weekends", high: "All Weekends" },
        highIsGood: false,
      },
      {
        id: "workload_satisfaction",
        category: "workload",
        type: "scale",
        prompt: "How satisfied is your team with their day-to-day workload?",
        endLabels: { low: "Not at all", high: "Very satisfied" },
        highIsGood: true,
      },
    ],
  },
  {
    id: "visibility",
    category: "visibility",
    title: "Visibility",
    questions: [
      {
        id: "vis_one_place",
        category: "visibility",
        type: "single",
        prompt: "Can you see what your team is working on in one place?",
        options: [
          { value: "fully", label: "Yes — one place, always current", weight: 1 },
          { value: "partly", label: "Sort of — across a couple of tools", weight: 0.6 },
          { value: "asking", label: "Only by asking people directly", weight: 0.3 },
          { value: "no", label: "No, not really", weight: 0 },
        ],
      },
      {
        id: "vis_confidence",
        category: "visibility",
        type: "scale",
        prompt: "How confident are you that you'd notice something important slipping today?",
        endLabels: { low: "Not at all", high: "Very Confident" },
        highIsGood: true,
      },
      {
        id: "vis_derail",
        category: "visibility",
        type: "single",
        prompt: "How often does a mistake, issue, or unusual customer demand significantly derail your daily plans?",
        options: [
          { value: "constant", label: "Constantly — most days", weight: 0 },
          { value: "weekly", label: "A few times a week", weight: 0.4 },
          { value: "monthly", label: "A few times a month", weight: 0.7 },
          { value: "rarely", label: "Rarely", weight: 1 },
        ],
      },
    ],
  },
  {
    id: "mistakes",
    category: "mistakes",
    title: "Mistakes & Recovery",
    questions: [
      {
        id: "mistake_response",
        category: "mistakes",
        type: "single",
        prompt: "When my team makes a mistake, we…",
        options: [
          { value: "fix_move", label: "Fix it and move on", weight: 0.2 },
          { value: "discuss", label: "Discuss it in the next standup", weight: 0.5 },
          { value: "log", label: "Log it for review later", weight: 0.8 },
          { value: "system", label: "Update the system / SOP so it can't happen again", weight: 1 },
        ],
      },
      {
        id: "mistake_track",
        category: "mistakes",
        type: "yesno",
        prompt: "Do you track mistakes, errors, or emergencies that happen within your team?",
        goodAnswer: "yes",
      },
      {
        id: "mistake_freq",
        category: "mistakes",
        type: "scale",
        prompt: "How often do recurring mistakes pop up that you've 'solved' before?",
        endLabels: { low: "Constant", high: "Almost Never" },
        highIsGood: true,
      },
    ],
  },
  {
    id: "sops",
    category: "sops",
    title: "SOPs & Documented Process",
    questions: [
      {
        id: "sop_use",
        category: "sops",
        type: "yesno",
        helper: "SOPs stands for standard operating procedures.",
        prompt: "Do you regularly use SOPs at work?",
        goodAnswer: "yes",
      },
      {
        id: "sop_central",
        category: "sops",
        type: "yesno",
        helper: "You answered 'Yes' about using SOPs, so let's dig deeper.",
        prompt: "Does your team have one centralized spot for SOPs?",
        goodAnswer: "yes",
        revealsWhen: { questionId: "sop_use", equals: "yes" },
      },
      {
        id: "sop_count",
        category: "sops",
        type: "numeric",
        prompt: "How many SOPs does your team have?",
        min: 0,
        max: 10000,
        idealAt: 50,
        worstAt: 0,
        unitHint: "SOPs",
        revealsWhen: { questionId: "sop_use", equals: "yes" },
      },
      {
        id: "sop_know_how",
        category: "sops",
        type: "single",
        prompt: "Which best describes how your team knows WHEN and HOW to do typical day-to-day tasks?",
        options: [
          { value: "memory", label: "From memory and tribal knowledge", weight: 0 },
          { value: "ask", label: "By asking a manager or coworker", weight: 0.3 },
          { value: "scattered", label: "From scattered docs in different tools", weight: 0.5 },
          { value: "central", label: "From a central, up-to-date SOP library", weight: 1 },
        ],
      },
      {
        id: "sop_mention",
        category: "sops",
        type: "single",
        prompt: "When was the last time you heard a policy, guideline, or procedure mentioned in conversation at work?",
        options: [
          { value: "today", label: "Today", weight: 1 },
          { value: "week", label: "This week", weight: 0.8 },
          { value: "month", label: "This month", weight: 0.5 },
          { value: "rarely", label: "Honestly, I can't remember", weight: 0 },
        ],
      },
    ],
  },
  {
    id: "tools",
    category: "tools",
    title: "Tools & Automation",
    questions: [
      {
        id: "tools_count",
        category: "tools",
        type: "numeric",
        prompt: "How many core tools does your team use day-to-day?",
        min: 0,
        max: 200,
        idealAt: 6,
        worstAt: 25,
        unitHint: "tools",
      },
      {
        id: "tools_automation",
        category: "tools",
        type: "scale",
        prompt: "How much of your team's repetitive work is currently automated?",
        endLabels: { low: "Not at all", high: "Almost everything" },
        highIsGood: true,
      },
      {
        id: "tools_handoffs",
        category: "tools",
        type: "single",
        prompt: "How do handoffs between tools usually happen?",
        options: [
          { value: "manual", label: "Someone copies/pastes between them", weight: 0 },
          { value: "csv", label: "Periodic CSV or spreadsheet imports", weight: 0.3 },
          { value: "some_auto", label: "A few key flows are automated", weight: 0.7 },
          { value: "fully", label: "Fully wired together — data just flows", weight: 1 },
        ],
      },
    ],
  },
  {
    id: "delegation",
    category: "delegation",
    title: "Delegation & Growth",
    questions: [
      {
        id: "deleg_confidence",
        category: "delegation",
        type: "scale",
        prompt: "How confident are you handing critical work off to your team without checking in?",
        endLabels: { low: "Not at all", high: "Very Confident" },
        highIsGood: true,
      },
      {
        id: "deleg_onboard",
        category: "delegation",
        type: "single",
        prompt: "How long does it typically take a new hire to be productive?",
        options: [
          { value: "weeks1", label: "Within the first week", weight: 1 },
          { value: "weeks4", label: "About a month", weight: 0.7 },
          { value: "months3", label: "Two to three months", weight: 0.4 },
          { value: "longer", label: "Longer than three months", weight: 0 },
        ],
      },
      {
        id: "deleg_owner",
        category: "delegation",
        type: "single",
        prompt: "If you stepped away for two weeks, how would the business run?",
        options: [
          { value: "stop", label: "It would mostly stop", weight: 0 },
          { value: "limp", label: "It would limp along", weight: 0.4 },
          { value: "fine", label: "It would run fine", weight: 0.8 },
          { value: "better", label: "It might actually run better", weight: 1 },
        ],
      },
    ],
  },
];

export const TIERS = [
  { min: 0, max: 39, label: "Ad-hoc", blurb: "Most work lives in people's heads. There's room to win quickly by writing the most-repeated work down." },
  { min: 40, max: 59, label: "Emerging", blurb: "You've got the bones of a system. Tighten visibility and a few key automations and the lift will be real." },
  { min: 60, max: 79, label: "Systemized", blurb: "You operate from documented process. The next unlock is automating handoffs and giving managers true visibility." },
  { min: 80, max: 100, label: "Automated", blurb: "Your team runs on systems. The frontier from here is using data and AI to make the system smarter, not just faster." },
] as const;

export type TierLabel = typeof TIERS[number]["label"];

export function tierFor(score: number): typeof TIERS[number] {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[0];
}

export function getCategory(id: CategoryId): Category {
  const found = CATEGORIES.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown category: ${id}`);
  return found;
}

export function getQuestion(id: string): Question | undefined {
  for (const s of SECTIONS) {
    const q = s.questions.find((q) => q.id === id);
    if (q) return q;
  }
  return undefined;
}

export const ALL_QUESTIONS: Question[] = SECTIONS.flatMap((s) => s.questions);
