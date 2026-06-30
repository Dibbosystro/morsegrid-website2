import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Loader2, Check } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import {
  SECTIONS,
  type Question,
  type SingleQuestion,
  type ScaleQuestion,
  type NumericQuestion,
  type YesNoQuestion,
} from "@/data/assessment";
import {
  visibleQuestions,
  isAnswered,
  type AnswerMap,
  type AnswerValue,
} from "@/lib/assessment-scoring";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "morsegrid:assessment:v1";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COMPANY_SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

interface PersistedState {
  sessionId: string;
  index: number;
  answers: AnswerMap;
  contact: ContactForm;
  startedAt: number;
}

interface ContactForm {
  name: string;
  email: string;
  company: string;
  teamSize: string;
}

const EMPTY_CONTACT: ContactForm = { name: "", email: "", company: "", teamSize: "" };

function makeSessionId() {
  return `as_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function loadState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed.sessionId || typeof parsed.index !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export default function AssessmentPage() {
  usePageMeta({
    title: "Free Systemization Assessment",
    description:
      "How systemized is your team? Take Morsegrid's free 10-minute assessment to get a personalized report.",
    path: "/assessment",
  });

  const [, navigate] = useLocation();
  const reduce = useReducedMotion();

  const [hydrated, setHydrated] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [contact, setContact] = useState<ContactForm>(EMPTY_CONTACT);
  const [index, setIndex] = useState(0); // visible-question index; equals visible.length => contact step
  const [startedAt, setStartedAt] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

  // Hydrate from localStorage on mount
  useEffect(() => {
    const existing = loadState();
    if (existing) {
      setSessionId(existing.sessionId);
      setAnswers(existing.answers);
      setContact(existing.contact ?? EMPTY_CONTACT);
      setIndex(existing.index);
      setStartedAt(existing.startedAt);
    } else {
      const id = makeSessionId();
      const now = Date.now();
      setSessionId(id);
      setStartedAt(now);
      track("assessment_started", { session_id: id });
    }
    setHydrated(true);
  }, []);

  const visible = useMemo(() => visibleQuestions(answers), [answers]);
  const totalSteps = visible.length + 1; // +1 for contact step
  const safeIndex = Math.min(index, visible.length);
  const isContactStep = safeIndex >= visible.length;
  const currentQuestion: Question | undefined = visible[safeIndex];

  // Persist state
  useEffect(() => {
    if (!hydrated || !sessionId) return;
    saveState({ sessionId, index: safeIndex, answers, contact, startedAt });
  }, [hydrated, sessionId, safeIndex, answers, contact, startedAt]);

  // Fire step view
  useEffect(() => {
    if (!hydrated) return;
    if (currentQuestion) {
      track("assessment_step_viewed", {
        question_id: currentQuestion.id,
        step_index: safeIndex,
        total: totalSteps,
        session_id: sessionId,
      });
    } else if (isContactStep) {
      track("assessment_step_viewed", {
        question_id: "contact",
        step_index: safeIndex,
        total: totalSteps,
        session_id: sessionId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeIndex, currentQuestion?.id, hydrated, isContactStep]);

  const setAnswer = useCallback(
    (qid: string, value: AnswerValue) => {
      setAnswers((prev) => ({ ...prev, [qid]: value }));
      track("assessment_step_answered", {
        question_id: qid,
        step_index: safeIndex,
        session_id: sessionId,
      });
    },
    [safeIndex, sessionId],
  );

  const goNext = useCallback(() => {
    if (isContactStep) return;
    if (currentQuestion && !isAnswered(currentQuestion, answers[currentQuestion.id])) return;
    setIndex((i) => i + 1);
  }, [isContactStep, currentQuestion, answers]);

  const goBack = useCallback(() => {
    if (safeIndex === 0) return;
    track("assessment_back_clicked", { step_index: safeIndex, session_id: sessionId });
    setIndex((i) => Math.max(0, i - 1));
  }, [safeIndex, sessionId]);

  const startOver = useCallback(() => {
    if (!window.confirm("Start the assessment over? Your in-progress answers will be cleared.")) return;
    clearState();
    const id = makeSessionId();
    const now = Date.now();
    setSessionId(id);
    setAnswers({});
    setContact(EMPTY_CONTACT);
    setIndex(0);
    setStartedAt(now);
    track("assessment_started", { session_id: id, restart: true });
  }, []);

  const submit = useCallback(async () => {
    const errs: Partial<Record<keyof ContactForm, string>> = {};
    if (!contact.name.trim()) errs.name = "Please enter your name.";
    if (!EMAIL_RE.test(contact.email.trim())) errs.email = "Please enter a valid work email.";
    if (!contact.company.trim()) errs.company = "Please enter your company.";
    if (!contact.teamSize) errs.teamSize = "Please pick a team size.";
    setContactErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitError("");
    setSubmitting(true);
    try {
      const apiBase = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/assessment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          answers,
          contact: {
            name: contact.name.trim(),
            email: contact.email.trim(),
            company: contact.company.trim(),
            teamSize: contact.teamSize,
          },
        }),
      });
      if (!res.ok) {
        let message = "Something went wrong submitting your assessment. Please try again.";
        try {
          const data = await res.json();
          if (data && typeof data.error === "string") message = data.error;
        } catch {
          // ignore
        }
        setSubmitError(message);
        setSubmitting(false);
        return;
      }
      const data = (await res.json()) as { token: string };
      track("assessment_submitted", { session_id: sessionId, token: data.token });
      clearState();
      navigate(`/assessment/report/${data.token}`);
    } catch {
      setSubmitError("We couldn't reach our servers. Check your connection and try again.");
      setSubmitting(false);
    }
  }, [contact, sessionId, answers, navigate]);

  // Keyboard: Enter advances when valid
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "TEXTAREA") return;
      if (tag === "INPUT" && (target as HTMLInputElement).type === "email") {
        // allow form submission instead
      }
      if (isContactStep) return;
      if (currentQuestion && isAnswered(currentQuestion, answers[currentQuestion.id])) {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentQuestion, answers, isContactStep, goNext]);

  const progressPct = Math.round(((safeIndex) / totalSteps) * 100);
  const sectionLabel = useMemo(() => {
    if (!currentQuestion) return "Almost done";
    const sec = SECTIONS.find((s) => s.questions.some((q) => q.id === currentQuestion.id));
    return sec?.title ?? "";
  }, [currentQuestion]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-foreground/50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal top bar */}
      <header className="px-6 md:px-10 py-5 flex items-center justify-between border-b border-black/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5 opacity-90">
            <div className="bg-foreground rounded-sm" />
            <div className="bg-foreground rounded-sm" />
            <div className="bg-foreground rounded-sm" />
            <div className="bg-primary rounded-sm" />
          </div>
          <span className="font-bold text-base tracking-tight">Morsegrid</span>
        </Link>
        <button
          type="button"
          onClick={startOver}
          className="text-xs text-foreground/60 hover:text-foreground inline-flex items-center gap-1.5"
          data-testid="button-assessment-restart"
        >
          <RotateCcw className="w-3 h-3" /> Start over
        </button>
      </header>

      {/* Question area */}
      <main className="flex-1 flex flex-col px-6 md:px-10 pb-32">
        <div className="max-w-2xl w-full mx-auto pt-10 md:pt-16 flex-1 flex flex-col">
          <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-wider text-foreground/50">
            <button
              type="button"
              onClick={goBack}
              disabled={safeIndex === 0}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
              data-testid="button-assessment-back"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <span data-testid="text-section-label">{sectionLabel}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isContactStep ? "contact" : currentQuestion?.id ?? "loading"}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col"
            >
              {isContactStep ? (
                <ContactStep
                  contact={contact}
                  setContact={setContact}
                  errors={contactErrors}
                  onSubmit={submit}
                  submitting={submitting}
                  submitError={submitError}
                />
              ) : currentQuestion ? (
                <QuestionStep
                  question={currentQuestion}
                  value={answers[currentQuestion.id]}
                  onChange={(v) => setAnswer(currentQuestion.id, v)}
                  onNext={goNext}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Progress bar pinned at bottom */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-background/90 backdrop-blur border-t border-black/5">
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-3 flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              data-testid="assessment-progress-bar"
            />
          </div>
          <span className="text-xs font-medium tabular-nums text-foreground/60 w-20 text-right">
            {progressPct}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Question step ---------- */

function QuestionStep({
  question,
  value,
  onChange,
  onNext,
}: {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
  onNext: () => void;
}) {
  const valid = isAnswered(question, value);
  return (
    <div className="flex flex-col">
      {question.helper && (
        <p className="text-sm text-foreground/55 mb-3" data-testid="text-question-helper">
          {question.helper}
        </p>
      )}
      <fieldset className="border-0 p-0 m-0">
        <legend className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
          {question.prompt}
        </legend>
        <div className="mt-8" data-testid={`question-${question.id}`}>
          {question.type === "single" && (
            <SingleInput question={question} value={value as string | undefined} onChange={onChange} onAdvance={onNext} />
          )}
          {question.type === "yesno" && (
            <YesNoInput question={question} value={value as string | undefined} onChange={onChange} onAdvance={onNext} />
          )}
          {question.type === "scale" && (
            <ScaleInput question={question} value={value as number | undefined} onChange={onChange} />
          )}
          {question.type === "numeric" && (
            <NumericInput question={question} value={value as number | undefined} onChange={onChange} />
          )}
        </div>
      </fieldset>
      <div className="mt-10">
        <button
          type="button"
          onClick={onNext}
          disabled={!valid}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-30 disabled:pointer-events-none"
          data-testid="button-assessment-next"
        >
          Next <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function SingleInput({
  question,
  value,
  onChange,
  onAdvance,
}: {
  question: SingleQuestion;
  value: string | undefined;
  onChange: (v: string) => void;
  onAdvance: () => void;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (i + 1) % question.options.length;
      refs.current[next]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (i - 1 + question.options.length) % question.options.length;
      refs.current[prev]?.focus();
    }
  };
  return (
    <div role="radiogroup" className="flex flex-col gap-2.5">
      {question.options.map((opt, i) => {
        const checked = value === opt.value;
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => {
              onChange(opt.value);
            }}
            onDoubleClick={() => {
              onChange(opt.value);
              onAdvance();
            }}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`text-left px-5 py-4 rounded-2xl border transition-all ${
              checked
                ? "border-primary bg-primary/5 text-foreground"
                : "border-black/10 text-foreground/85 hover:border-black/30 hover:bg-black/[0.02]"
            }`}
            data-testid={`option-${question.id}-${opt.value}`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  checked ? "border-primary" : "border-black/25"
                }`}
              >
                {checked && <span className="w-2 h-2 rounded-full bg-primary" />}
              </span>
              <span className="text-base">{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function YesNoInput({
  question,
  value,
  onChange,
  onAdvance,
}: {
  question: YesNoQuestion;
  value: string | undefined;
  onChange: (v: string) => void;
  onAdvance: () => void;
}) {
  return (
    <div role="radiogroup" className="grid grid-cols-2 gap-3 max-w-md">
      {(["yes", "no"] as const).map((v) => {
        const checked = value === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(v)}
            onDoubleClick={() => {
              onChange(v);
              onAdvance();
            }}
            className={`py-4 rounded-2xl border text-base font-medium capitalize transition-all ${
              checked
                ? "border-primary bg-primary/5 text-foreground"
                : "border-black/10 text-foreground/85 hover:border-black/30"
            }`}
            data-testid={`option-${question.id}-${v}`}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
}

function ScaleInput({
  question,
  value,
  onChange,
}: {
  question: ScaleQuestion;
  value: number | undefined;
  onChange: (v: number) => void;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(4, i + 1);
      refs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(0, i - 1);
      refs.current[prev]?.focus();
    }
  };
  return (
    <div>
      <div role="radiogroup" className="flex items-center gap-2 md:gap-3">
        {[1, 2, 3, 4, 5].map((n, i) => {
          const checked = value === n;
          return (
            <button
              key={n}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`${n} out of 5`}
              onClick={() => onChange(n)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex-1 h-14 rounded-xl border text-base font-semibold tabular-nums transition-all ${
                checked
                  ? "border-primary bg-primary text-white"
                  : "border-black/10 text-foreground/70 hover:border-black/30"
              }`}
              data-testid={`option-${question.id}-${n}`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-xs text-foreground/55">
        <span>{question.endLabels.low}</span>
        <span>{question.endLabels.high}</span>
      </div>
    </div>
  );
}

function NumericInput({
  question,
  value,
  onChange,
}: {
  question: NumericQuestion;
  value: number | undefined;
  onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState<string>(value === undefined ? "" : String(value));
  useEffect(() => {
    setDraft(value === undefined ? "" : String(value));
  }, [value]);

  return (
    <div className="flex items-center gap-3 max-w-md">
      <input
        type="number"
        inputMode="numeric"
        min={question.min}
        max={question.max}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value);
          if (e.target.value === "") return;
          const n = Number(e.target.value);
          if (Number.isFinite(n)) onChange(n);
        }}
        placeholder={`${question.min}–${question.max}`}
        className="flex-1 rounded-xl border border-black/15 px-4 py-3 text-lg font-medium tabular-nums focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        data-testid={`input-${question.id}`}
      />
      <span className="text-sm text-foreground/55 shrink-0">
        {question.unitHint ?? ""} <span className="ml-1 opacity-60">({question.min}–{question.max.toLocaleString()})</span>
      </span>
    </div>
  );
}

/* ---------- Contact step ---------- */

function ContactStep({
  contact,
  setContact,
  errors,
  onSubmit,
  submitting,
  submitError,
}: {
  contact: ContactForm;
  setContact: (c: ContactForm) => void;
  errors: Partial<Record<keyof ContactForm, string>>;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string;
}) {
  const update = (k: keyof ContactForm, v: string) => setContact({ ...contact, [k]: v });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col"
      data-testid="form-assessment-contact"
    >
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-snug">
        One last step — where should we send your report?
      </h2>
      <p className="mt-3 text-sm text-foreground/60 max-w-md">
        We'll generate your personalized Systemization Score and share it instantly. We never sell your details.
      </p>

      <div className="mt-8 space-y-4 max-w-md">
        <Field label="Your name" id="contact-name" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            value={contact.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputCls}
            data-testid="input-contact-name"
          />
        </Field>
        <Field label="Work email" id="contact-email" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            value={contact.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
            data-testid="input-contact-email"
          />
        </Field>
        <Field label="Company" id="contact-company" error={errors.company}>
          <input
            id="contact-company"
            type="text"
            value={contact.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputCls}
            data-testid="input-contact-company"
          />
        </Field>
        <Field label="Team size" id="contact-team" error={errors.teamSize}>
          <select
            id="contact-team"
            value={contact.teamSize}
            onChange={(e) => update("teamSize", e.target.value)}
            className={inputCls}
            data-testid="select-contact-team"
          >
            <option value="">Select…</option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {submitError && (
        <p className="mt-4 text-sm text-red-700" role="alert" data-testid="text-contact-error">
          {submitError}
        </p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
          data-testid="button-contact-submit"
        >
          {submitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating your report…
            </>
          ) : (
            <>
              See my results <Check className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/15 px-4 py-2.5 text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-medium text-foreground/80 mb-1.5">{label}</span>
      {children}
      {error && (
        <span className="block mt-1 text-xs text-red-700" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
