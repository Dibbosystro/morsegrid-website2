import {
  ALL_QUESTIONS,
  CATEGORIES,
  type CategoryId,
  type Question,
  getCategory,
  tierFor,
} from "@/data/assessment";

export type AnswerValue = string | number;
export type AnswerMap = Record<string, AnswerValue | undefined>;

export interface CategoryScore {
  id: CategoryId;
  title: string;
  score: number;
  recommendation: string;
}

export interface AssessmentResult {
  overall: number;
  tier: ReturnType<typeof tierFor>;
  categories: CategoryScore[];
  weakest: CategoryScore[];
}

export function isQuestionVisible(q: Question, answers: AnswerMap): boolean {
  if (!q.revealsWhen) return true;
  const v = answers[q.revealsWhen.questionId];
  return v === q.revealsWhen.equals;
}

export function visibleQuestions(answers: AnswerMap): Question[] {
  return ALL_QUESTIONS.filter((q) => isQuestionVisible(q, answers));
}

export function isAnswered(q: Question, value: AnswerValue | undefined): boolean {
  if (value === undefined || value === null || value === "") return false;
  if (q.type === "numeric") {
    const n = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(n)) return false;
    return n >= q.min && n <= q.max;
  }
  if (q.type === "scale") {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) && n >= 1 && n <= 5;
  }
  if (q.type === "yesno") {
    return value === "yes" || value === "no";
  }
  if (q.type === "single") {
    return q.options.some((o) => o.value === value);
  }
  return false;
}

function questionWeight(q: Question, value: AnswerValue): number {
  if (q.type === "single") {
    const opt = q.options.find((o) => o.value === value);
    return opt ? clamp01(opt.weight) : 0;
  }
  if (q.type === "yesno") {
    const isGood = value === q.goodAnswer;
    return isGood ? 1 : 0;
  }
  if (q.type === "scale") {
    const n = clamp(typeof value === "number" ? value : Number(value), 1, 5);
    const norm = (n - 1) / 4;
    return clamp01(q.highIsGood ? norm : 1 - norm);
  }
  // numeric — triangular score around idealAt, floored at worstAt
  const n = clamp(typeof value === "number" ? value : Number(value), q.min, q.max);
  if (q.idealAt === q.worstAt) return 1;
  const span = Math.abs(q.idealAt - q.worstAt);
  const dist = Math.abs(n - q.idealAt);
  return clamp01(1 - dist / span);
}

export function score(answers: AnswerMap): AssessmentResult {
  const cats: CategoryScore[] = CATEGORIES.map((c) => {
    const qs = ALL_QUESTIONS.filter(
      (q) => q.category === c.id && isQuestionVisible(q, answers),
    );
    let total = 0;
    let count = 0;
    for (const q of qs) {
      const v = answers[q.id];
      if (!isAnswered(q, v)) continue;
      total += questionWeight(q, v as AnswerValue);
      count += 1;
    }
    const norm = count === 0 ? 0 : total / count;
    return {
      id: c.id,
      title: c.title,
      score: Math.round(norm * 100),
      recommendation: c.recommendation,
    };
  });

  const overall = Math.round(
    cats.reduce((sum, c) => sum + c.score, 0) / cats.length,
  );

  const weakest = [...cats].sort((a, b) => a.score - b.score).slice(0, 3);

  return {
    overall,
    tier: tierFor(overall),
    categories: cats,
    weakest,
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
function clamp01(n: number) {
  return clamp(n, 0, 1);
}

export function categoryById(id: CategoryId): CategoryScore {
  const c = getCategory(id);
  return { id, title: c.title, score: 0, recommendation: c.recommendation };
}
