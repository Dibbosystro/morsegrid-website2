import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";
import { createRateLimit } from "../lib/rate-limit";

const router: IRouter = Router();

const leadRateLimit = createRateLimit({
  maxPerWindow: 6,
  maxPerDay: 60,
  windowMessage: "You're submitting forms a little quickly — please wait a moment and try again.",
  dayMessage: "Daily submission limit reached. Please email hello@morsegrid.com directly.",
});

interface LeadBody {
  name?: string;
  email?: string;
  company?: string;
  companySize?: string;
  useCase?: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/leads", leadRateLimit, (req, res) => {
  const body = (req.body ?? {}) as LeadBody;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const companySize = typeof body.companySize === "string" ? body.companySize.trim() : "";
  const useCase = typeof body.useCase === "string" ? body.useCase.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";

  if (!name || !email || !company || !companySize || !useCase) {
    res.status(400).json({ error: "Please fill in name, work email, company, company size, and use case." });
    return;
  }

  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Please enter a valid work email." });
    return;
  }

  logger.info(
    {
      lead: {
        name,
        email,
        company,
        companySize,
        useCase: useCase.slice(0, 500),
        source: source.slice(0, 200) || undefined,
      },
    },
    "Demo request submitted",
  );

  res.json({ ok: true });
});

export default router;
