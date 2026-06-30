import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import { createRateLimit } from "../lib/rate-limit";
import { sanitizeAnswers, scoreAssessment, type ScoredAssessment } from "../lib/assessment";

const router: IRouter = Router();

const submitRateLimit = createRateLimit({
  maxPerWindow: 6,
  maxPerDay: 60,
  windowMessage: "You're submitting a little too quickly — please wait a moment and try again.",
  dayMessage: "Daily submission limit reached. Please email hello@morsegrid.com directly.",
});

const fetchRateLimit = createRateLimit({
  maxPerWindow: 60,
  maxPerDay: 600,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN_LEN = 12;
const MAX_RECORDS = 5000;

interface StoredAssessment {
  token: string;
  sessionId: string;
  contact: { name: string; email: string; company: string; teamSize: string };
  answers: Record<string, string | number>;
  result: ScoredAssessment;
  createdAt: number;
}

const store = new Map<string, StoredAssessment>();
const emailIndex = new Map<string, string>(); // email -> token (most-recent)

function makeToken() {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < TOKEN_LEN; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

function pruneIfNeeded() {
  if (store.size <= MAX_RECORDS) return;
  // Remove oldest 10%
  const entries = [...store.entries()].sort((a, b) => a[1].createdAt - b[1].createdAt);
  const toRemove = Math.ceil(MAX_RECORDS * 0.1);
  for (let i = 0; i < toRemove; i++) {
    const [tok, rec] = entries[i];
    store.delete(tok);
    if (emailIndex.get(rec.contact.email.toLowerCase()) === tok) {
      emailIndex.delete(rec.contact.email.toLowerCase());
    }
  }
}

interface SubmitBody {
  sessionId?: string;
  answers?: unknown;
  contact?: {
    name?: string;
    email?: string;
    company?: string;
    teamSize?: string;
  };
}

router.post("/assessment", submitRateLimit, (req, res) => {
  const body = (req.body ?? {}) as SubmitBody;
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : "";
  const c = body.contact ?? {};
  const name = typeof c.name === "string" ? c.name.trim().slice(0, 200) : "";
  const email = typeof c.email === "string" ? c.email.trim().slice(0, 200) : "";
  const company = typeof c.company === "string" ? c.company.trim().slice(0, 200) : "";
  const teamSize = typeof c.teamSize === "string" ? c.teamSize.trim().slice(0, 50) : "";

  if (!name || !email || !company || !teamSize) {
    res.status(400).json({ error: "Please provide your name, work email, company, and team size." });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Please enter a valid work email." });
    return;
  }

  const answers = sanitizeAnswers(body.answers);
  if (Object.keys(answers).length < 5) {
    res.status(400).json({ error: "Please answer the assessment before submitting." });
    return;
  }

  // Duplicate-email handling: if a recent submission exists, return its token
  // (no need to make multiple records of the same person spamming submit).
  const emailKey = email.toLowerCase();
  const existingToken = emailIndex.get(emailKey);
  const existing = existingToken ? store.get(existingToken) : undefined;
  if (existing && Date.now() - existing.createdAt < 5 * 60 * 1000) {
    res.json({ token: existing.token });
    return;
  }

  const result = scoreAssessment(answers);
  let token = makeToken();
  while (store.has(token)) token = makeToken();

  const record: StoredAssessment = {
    token,
    sessionId,
    contact: { name, email, company, teamSize },
    answers: answers as Record<string, string | number>,
    result,
    createdAt: Date.now(),
  };
  store.set(token, record);
  emailIndex.set(emailKey, token);
  pruneIfNeeded();

  logger.info(
    {
      assessment: {
        token,
        sessionId,
        contact: { name, email, company, teamSize },
        score: result.overall,
        tier: result.tier.label,
      },
    },
    "Assessment submitted",
  );

  res.json({ token });
});

router.get("/assessment/:token", fetchRateLimit, (req, res) => {
  const token = String(req.params.token ?? "").slice(0, 64);
  const rec = store.get(token);
  if (!rec) {
    res.status(404).json({ error: "Report not found." });
    return;
  }
  res.json({
    token: rec.token,
    overall: rec.result.overall,
    tier: rec.result.tier,
    categories: rec.result.categories,
    weakest: rec.result.weakest,
    contact: { name: rec.contact.name, company: rec.contact.company },
    createdAt: rec.createdAt,
  });
});

export default router;
