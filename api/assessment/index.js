/**
 * Vercel Serverless Function — POST /api/assessment
 *
 * Receives a completed Systemization Assessment (contact + client-computed
 * result), creates a lead task in ClickUp, and returns a self-encoding token
 * that the report page decodes via GET /api/assessment/[token].
 *
 * Env: CLICKUP_API_KEY, CLICKUP_ASSESSMENT_LIST_ID
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function b64urlEncode(obj) {
  return Buffer.from(JSON.stringify(obj), "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const c = body.contact || {};
  const name = (typeof c.name === "string" ? c.name : "").trim().slice(0, 200);
  const email = (typeof c.email === "string" ? c.email : "").trim().slice(0, 200);
  const company = (typeof c.company === "string" ? c.company : "").trim().slice(0, 200);
  const teamSize = (typeof c.teamSize === "string" ? c.teamSize : "").trim().slice(0, 50);
  const result = body.result || {};

  if (!name || !email || !company || !teamSize) {
    return res
      .status(400)
      .json({ error: "Please provide your name, work email, company, and team size." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid work email." });
  }

  const overall = Number(result.overall);
  if (!Number.isFinite(overall)) {
    return res.status(400).json({ error: "Please complete the assessment before submitting." });
  }

  const contact = { name, email, company, teamSize };
  const payload = {
    overall,
    tier: result.tier && typeof result.tier === "object" ? result.tier : { label: "", blurb: "" },
    categories: Array.isArray(result.categories) ? result.categories : [],
    weakest: Array.isArray(result.weakest) ? result.weakest : [],
    contact,
    createdAt: Date.now(),
  };

  // Best-effort: never block the user's report on ClickUp.
  try {
    const apiKey = process.env.CLICKUP_API_KEY;
    const listId = process.env.CLICKUP_ASSESSMENT_LIST_ID;
    if (apiKey && listId) {
      const tierLabel = payload.tier && payload.tier.label ? payload.tier.label : "";
      const cats = payload.categories.map((x) => `- ${x.title}: ${x.score}/100`).join("\n");
      const weak = payload.weakest.map((x) => `- ${x.title} (${x.score}/100)`).join("\n");
      const description =
        `New Systemization Assessment lead from morsegrid.com\n\n` +
        `Contact\n` +
        `- Name: ${name}\n` +
        `- Email: ${email}\n` +
        `- Company: ${company}\n` +
        `- Team size: ${teamSize}\n\n` +
        `Overall score: ${overall}/100${tierLabel ? ` (${tierLabel})` : ""}\n\n` +
        `Category scores\n${cats || "- n/a"}\n\n` +
        `Weakest areas\n${weak || "- n/a"}\n`;

      const cuRes = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
        method: "POST",
        headers: { Authorization: apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Assessment — ${company} (${overall}/100${tierLabel ? `, ${tierLabel}` : ""})`,
          description,
        }),
      });
      if (!cuRes.ok) {
        const txt = await cuRes.text().catch(() => "");
        console.error("[assessment] ClickUp task create failed:", cuRes.status, txt);
      }
    } else {
      console.error("[assessment] CLICKUP_API_KEY or CLICKUP_ASSESSMENT_LIST_ID not set");
    }
  } catch (err) {
    console.error("[assessment] ClickUp error:", err);
  }

  return res.status(200).json({ token: b64urlEncode(payload) });
};
