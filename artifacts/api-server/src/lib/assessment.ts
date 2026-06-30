export type CategoryId =
  | "team"
  | "workload"
  | "visibility"
  | "mistakes"
  | "sops"
  | "tools"
  | "delegation";

interface Category {
  id: CategoryId;
  title: string;
  recommendation: string;
}

const CATEGORIES: Category[] = [
  { id: "team", title: "Team & Org", recommendation: "Map every role and contractor to a single org chart so handoffs and coverage gaps stop slipping through the cracks." },
  { id: "workload", title: "Workload & Stress", recommendation: "Audit recurring work and protect at least one focus block per person each day — overload is where systems quietly break down." },
  { id: "visibility", title: "Visibility", recommendation: "Pull status, ownership, and due dates into one shared view so you stop relying on standups and Slack pings to know what's going on." },
  { id: "mistakes", title: "Mistakes & Recovery", recommendation: "Start a lightweight mistake log and review it weekly — the same fix made once is worth ten heroic recoveries." },
  { id: "sops", title: "SOPs & Documented Process", recommendation: "Pick your top 5 most-repeated workflows and document them in one searchable home before writing anything else." },
  { id: "tools", title: "Tools & Automation", recommendation: "Replace your two most painful manual handoffs with automations that fire off your existing tools — small wins compound." },
  { id: "delegation", title: "Delegation & Growth", recommendation: "Identify one task you alone do today and write the SOP for it this week — that's the unlock for hiring and scaling." },
];

type QuestionType = "single" | "scale" | "numeric" | "yesno";

interface OptionDef {
  value: string;
  weight: number;
}

interface BaseQuestion {
  id: string;
  category: CategoryId;
  type: QuestionType;
  revealsWhen?: { questionId: string; equals: string };
}

interface SingleQuestion extends BaseQuestion {
  type: "single";
  options: OptionDef[];
}
interface ScaleQuestion extends BaseQuestion {
  type: "scale";
  highIsGood: boolean;
}
interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  min: number;
  max: number;
  idealAt: number;
  worstAt: number;
}
interface YesNoQuestion extends BaseQuestion {
  type: "yesno";
  goodAnswer: "yes" | "no";
}

type Question = SingleQuestion | ScaleQuestion | NumericQuestion | YesNoQuestion;

const QUESTIONS: Question[] = [
  // team
  { id: "team_prior", category: "team", type: "single", options: [
    { value: "no", weight: 0.5 }, { value: "informal", weight: 0.6 }, { value: "yes_recent", weight: 1 },
  ]},
  { id: "team_size", category: "team", type: "numeric", min: 0, max: 100000, idealAt: 25, worstAt: 0 },
  { id: "team_role", category: "team", type: "single", options: [
    { value: "founder", weight: 0.5 }, { value: "ops", weight: 1 }, { value: "manager", weight: 0.8 }, { value: "ic", weight: 0.4 },
  ]},
  // workload
  { id: "workload_hours", category: "workload", type: "numeric", min: 0, max: 100, idealAt: 40, worstAt: 80 },
  { id: "workload_meetings", category: "workload", type: "numeric", min: 0, max: 100, idealAt: 8, worstAt: 30 },
  { id: "workload_weekends", category: "workload", type: "scale", highIsGood: false },
  { id: "workload_satisfaction", category: "workload", type: "scale", highIsGood: true },
  // visibility
  { id: "vis_one_place", category: "visibility", type: "single", options: [
    { value: "fully", weight: 1 }, { value: "partly", weight: 0.6 }, { value: "asking", weight: 0.3 }, { value: "no", weight: 0 },
  ]},
  { id: "vis_confidence", category: "visibility", type: "scale", highIsGood: true },
  { id: "vis_derail", category: "visibility", type: "single", options: [
    { value: "constant", weight: 0 }, { value: "weekly", weight: 0.4 }, { value: "monthly", weight: 0.7 }, { value: "rarely", weight: 1 },
  ]},
  // mistakes
  { id: "mistake_response", category: "mistakes", type: "single", options: [
    { value: "fix_move", weight: 0.2 }, { value: "discuss", weight: 0.5 }, { value: "log", weight: 0.8 }, { value: "system", weight: 1 },
  ]},
  { id: "mistake_track", category: "mistakes", type: "yesno", goodAnswer: "yes" },
  { id: "mistake_freq", category: "mistakes", type: "scale", highIsGood: true },
  // sops
  { id: "sop_use", category: "sops", type: "yesno", goodAnswer: "yes" },
  { id: "sop_central", category: "sops", type: "yesno", goodAnswer: "yes", revealsWhen: { questionId: "sop_use", equals: "yes" } },
  { id: "sop_count", category: "sops", type: "numeric", min: 0, max: 10000, idealAt: 50, worstAt: 0, revealsWhen: { questionId: "sop_use", equals: "yes" } },
  { id: "sop_know_how", category: "sops", type: "single", options: [
    { value: "memory", weight: 0 }, { value: "ask", weight: 0.3 }, { value: "scattered", weight: 0.5 }, { value: "central", weight: 1 },
  ]},
  { id: "sop_mention", category: "sops", type: "single", options: [
    { value: "today", weight: 1 }, { value: "week", weight: 0.8 }, { value: "month", weight: 0.5 }, { value: "rarely", weight: 0 },
  ]},
  // tools
  { id: "tools_count", category: "tools", type: "numeric", min: 0, max: 200, idealAt: 6, worstAt: 25 },
  { id: "tools_automation", category: "tools", type: "scale", highIsGood: true },
  { id: "tools_handoffs", category: "tools", type: "single", options: [
    { value: "manual", weight: 0 }, { value: "csv", weight: 0.3 }, { value: "some_auto", weight: 0.7 }, { value: "fully", weight: 1 },
  ]},
  // delegation
  { id: "deleg_confidence", category: "delegation", type: "scale", highIsGood: true },
  { id: "deleg_onboard", category: "delegation", type: "single", options: [
    { value: "weeks1", weight: 1 }, { value: "weeks4", weight: 0.7 }, { value: "months3", weight: 0.4 }, { value: "longer", weight: 0 },
  ]},
  { id: "deleg_owner", category: "delegation", type: "single", options: [
    { value: "stop", weight: 0 }, { value: "limp", weight: 0.4 }, { value: "fine", weight: 0.8 }, { value: "better", weight: 1 },
  ]},
];

const TIERS = [
  { min: 0, max: 39, label: "Ad-hoc", blurb: "Most work lives in people's heads. There's room to win quickly by writing the most-repeated work down." },
  { min: 40, max: 59, label: "Emerging", blurb: "You've got the bones of a system. Tighten visibility and a few key automations and the lift will be real." },
  { min: 60, max: 79, label: "Systemized", blurb: "You operate from documented process. The next unlock is automating handoffs and giving managers true visibility." },
  { min: 80, max: 100, label: "Automated", blurb: "Your team runs on systems. The frontier from here is using data and AI to make the system smarter, not just faster." },
];

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
function clamp01(n: number) {
  return clamp(n, 0, 1);
}

type AnswerValue = string | number;
export type AnswerMap = Record<string, AnswerValue | undefined>;

function isVisible(q: Question, answers: AnswerMap): boolean {
  if (!q.revealsWhen) return true;
  return answers[q.revealsWhen.questionId] === q.revealsWhen.equals;
}

function isAnswered(q: Question, value: AnswerValue | undefined): boolean {
  if (value === undefined || value === null || value === "") return false;
  if (q.type === "numeric") {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) && n >= q.min && n <= q.max;
  }
  if (q.type === "scale") {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) && n >= 1 && n <= 5;
  }
  if (q.type === "yesno") return value === "yes" || value === "no";
  if (q.type === "single") return q.options.some((o) => o.value === value);
  return false;
}

function weightFor(q: Question, value: AnswerValue): number {
  if (q.type === "single") {
    const opt = q.options.find((o) => o.value === value);
    return opt ? clamp01(opt.weight) : 0;
  }
  if (q.type === "yesno") return value === q.goodAnswer ? 1 : 0;
  if (q.type === "scale") {
    const n = clamp(typeof value === "number" ? value : Number(value), 1, 5);
    const norm = (n - 1) / 4;
    return clamp01(q.highIsGood ? norm : 1 - norm);
  }
  const n = clamp(typeof value === "number" ? value : Number(value), q.min, q.max);
  if (q.idealAt === q.worstAt) return 1;
  const span = Math.abs(q.idealAt - q.worstAt);
  const dist = Math.abs(n - q.idealAt);
  return clamp01(1 - dist / span);
}

export interface CategoryScore {
  id: CategoryId;
  title: string;
  score: number;
  recommendation: string;
}

export interface ScoredAssessment {
  overall: number;
  tier: { label: string; blurb: string };
  categories: CategoryScore[];
  weakest: CategoryScore[];
}

export function scoreAssessment(answers: AnswerMap): ScoredAssessment {
  const cats: CategoryScore[] = CATEGORIES.map((c) => {
    const qs = QUESTIONS.filter((q) => q.category === c.id && isVisible(q, answers));
    let total = 0;
    let count = 0;
    for (const q of qs) {
      const v = answers[q.id];
      if (!isAnswered(q, v)) continue;
      total += weightFor(q, v as AnswerValue);
      count += 1;
    }
    const norm = count === 0 ? 0 : total / count;
    return { id: c.id, title: c.title, score: Math.round(norm * 100), recommendation: c.recommendation };
  });
  const overall = Math.round(cats.reduce((s, c) => s + c.score, 0) / cats.length);
  const tier = TIERS.find((t) => overall >= t.min && overall <= t.max) ?? TIERS[0];
  const weakest = [...cats].sort((a, b) => a.score - b.score).slice(0, 3);
  return { overall, tier: { label: tier.label, blurb: tier.blurb }, categories: cats, weakest };
}

/** Sanitize a raw answers blob from a request body. */
export function sanitizeAnswers(raw: unknown): AnswerMap {
  if (!raw || typeof raw !== "object") return {};
  const out: AnswerMap = {};
  const known = new Map(QUESTIONS.map((q) => [q.id, q]));
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    const q = known.get(k);
    if (!q) continue;
    if (q.type === "numeric" || q.type === "scale") {
      const n = typeof v === "number" ? v : Number(v);
      if (Number.isFinite(n)) out[k] = n;
    } else if (typeof v === "string") {
      out[k] = v;
    }
  }
  return out;
}
