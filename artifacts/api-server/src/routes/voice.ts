import { Router, type IRouter, type Request, type Response } from "express";
import { Buffer } from "node:buffer";
import { openai } from "@workspace/integrations-openai-ai-server";
import { ensureCompatibleFormat, type AudioFormat } from "@workspace/integrations-openai-ai-server/audio";
import { toFile } from "openai";
import { logger } from "../lib/logger";
import { createRateLimit, trackInFlight } from "../lib/rate-limit";

const router: IRouter = Router();

const rateLimit = createRateLimit({
  maxPerWindow: 6,
  maxPerDay: 60,
  busyMessage: "Assistant is busy right now. Please try again in a moment.",
  windowMessage: "You're asking a lot of questions — give it a minute and try again.",
  dayMessage: "Daily question limit reached. Please book a call to keep the conversation going.",
});

const SYSTEM_PROMPT = `You are the Morsegrid voice assistant on Morsegrid's marketing website.

About Morsegrid:
- Morsegrid builds the internal systems and automations that growing businesses actually run on.
- We design and ship custom internal tools, CRM/ERP integrations, lead routing, workflow automation, and operational dashboards.
- Typical stack: bespoke code, Make / n8n / Zapier when appropriate, custom orchestration layers, and tight integrations with the customer's existing CRM, billing, and data tools.
- We work with growing businesses (post-product-market-fit, pre-IPO) where off-the-shelf SaaS has stopped scaling.
- Engagements are scoped projects, not staff augmentation.

How to answer:
- Be concrete and grounded — no hand-waving. Speak like a thoughtful senior operator/engineer, not a chatbot.
- Keep answers short: 2 to 4 sentences, plain prose, no markdown, no lists, no emojis.
- Where useful, name the kind of tools or approach we'd typically use, but don't oversell.
- If the question is outside Morsegrid's scope (e.g. legal advice, unrelated trivia), say so briefly and suggest booking a call to discuss.
- Never invent prices, timelines, customer names, or case studies.
- End with a soft nudge toward booking an intro call only when it's actually relevant.`;

const TRANSCRIPTION_MODEL = "gpt-4o-mini-transcribe";
const CHAT_MODEL = "gpt-5.4";
// Express body parser is configured for 30MB of base64 JSON. Base64 inflates
// payload size by ~4/3, so the decoded buffer ceiling is ~22MB. Keep this in
// sync with the json() limit in app.ts.
const MAX_AUDIO_BYTES = 22 * 1024 * 1024;

interface AskBody {
  audio?: string;
  mimeType?: string;
}

router.post(
  "/voice/ask",
  rateLimit,
  async (req, res) => {
    await trackInFlight(() => handleAsk(req, res));
  },
);

async function handleAsk(req: Request, res: Response): Promise<void> {
    const body = req.body as AskBody;

    if (!body || typeof body.audio !== "string" || body.audio.length === 0) {
      res.status(400).json({ error: "Missing 'audio' (base64-encoded) in request body." });
      return;
    }

    let audioBuffer: Buffer;
    try {
      audioBuffer = Buffer.from(body.audio, "base64");
    } catch (err) {
      res.status(400).json({ error: "Invalid base64 audio payload." });
      return;
    }

    if (audioBuffer.length === 0) {
      res.status(400).json({ error: "Empty audio payload." });
      return;
    }

    if (audioBuffer.length > MAX_AUDIO_BYTES) {
      res.status(413).json({ error: "Audio payload too large." });
      return;
    }

    let normalized: { buffer: Buffer; format: AudioFormat };
    try {
      normalized = await ensureCompatibleFormat(audioBuffer);
    } catch (err) {
      logger.error({ err }, "Failed to normalize audio payload");
      res.status(400).json({ error: "Could not decode audio. Please try again." });
      return;
    }

    let transcript: string;
    try {
      const file = await toFile(normalized.buffer, `audio.${normalized.format}`);
      const transcription = await openai.audio.transcriptions.create({
        file,
        model: TRANSCRIPTION_MODEL,
        response_format: "json",
      });
      transcript = (transcription.text ?? "").trim();
    } catch (err) {
      logger.error({ err }, "Transcription failed");
      res.status(502).json({ error: "We couldn't transcribe that. Please try again." });
      return;
    }

    if (!transcript) {
      res.status(200).json({
        transcript: "",
        answer:
          "I didn't quite catch that — could you try asking again? Speak clearly into your mic and I'll do my best to help.",
      });
      return;
    }

    let answer: string;
    try {
      const completion = await openai.chat.completions.create({
        model: CHAT_MODEL,
        max_completion_tokens: 8192,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: transcript },
        ],
      });
      answer = (completion.choices[0]?.message?.content ?? "").trim();
    } catch (err) {
      logger.error({ err }, "Chat completion failed");
      res.status(502).json({ error: "Our assistant is having a moment — please try again shortly." });
      return;
    }

    if (!answer) {
      answer =
        "I'm not able to give a confident answer to that one. Booking an intro call with the team is probably the fastest way to get a real response.";
    }

    res.json({ transcript, answer });
}

export default router;
