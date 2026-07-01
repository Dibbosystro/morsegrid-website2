/**
 * Vercel Serverless Function — GET /api/assessment/[token]
 *
 * Decodes the self-encoding report token produced by POST /api/assessment and
 * returns the report payload the report page renders.
 */

function b64urlDecode(token) {
  const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 ? "=".repeat(4 - (b64.length % 4)) : "";
  return JSON.parse(Buffer.from(b64 + pad, "base64").toString("utf8"));
}

module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const token = req.query && req.query.token;
  if (!token || typeof token !== "string") {
    return res.status(404).json({ error: "Report not found." });
  }
  try {
    const payload = b64urlDecode(token);
    if (!payload || typeof payload.overall !== "number") {
      return res.status(404).json({ error: "Report not found." });
    }
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(404).json({ error: "Report not found." });
  }
};
