import type { Request, Response, NextFunction, RequestHandler } from "express";

const RATE_WINDOW_MS = 60_000;
const DAY_MS = 24 * 60 * 60 * 1000;

interface RateBucket {
  windowStart: number;
  windowCount: number;
  dayStart: number;
  dayCount: number;
}

const buckets = new Map<string, RateBucket>();
let inFlight = 0;

function getClientKey(req: Request): string {
  return req.socket.remoteAddress ?? "unknown";
}

export interface RateLimitOptions {
  maxPerWindow: number;
  maxPerDay: number;
  maxConcurrent?: number;
  busyMessage?: string;
  windowMessage?: string;
  dayMessage?: string;
}

export function createRateLimit(opts: RateLimitOptions): RequestHandler {
  const {
    maxPerWindow,
    maxPerDay,
    maxConcurrent = 8,
    busyMessage = "Server is busy right now. Please try again in a moment.",
    windowMessage = "You're sending requests a little too quickly. Please wait a moment and try again.",
    dayMessage = "Daily limit reached. Please try again tomorrow.",
  } = opts;

  return function rateLimit(req: Request, res: Response, next: NextFunction): void {
    if (inFlight >= maxConcurrent) {
      res.status(503).json({ error: busyMessage });
      return;
    }

    const now = Date.now();
    const key = getClientKey(req);
    let bucket = buckets.get(key);

    if (!bucket) {
      bucket = { windowStart: now, windowCount: 0, dayStart: now, dayCount: 0 };
      buckets.set(key, bucket);
    }

    if (now - bucket.windowStart > RATE_WINDOW_MS) {
      bucket.windowStart = now;
      bucket.windowCount = 0;
    }
    if (now - bucket.dayStart > DAY_MS) {
      bucket.dayStart = now;
      bucket.dayCount = 0;
    }

    if (bucket.windowCount >= maxPerWindow) {
      res.status(429).json({ error: windowMessage });
      return;
    }

    if (bucket.dayCount >= maxPerDay) {
      res.status(429).json({ error: dayMessage });
      return;
    }

    bucket.windowCount += 1;
    bucket.dayCount += 1;

    if (buckets.size > 5000) {
      for (const [k, b] of buckets) {
        if (now - b.dayStart > DAY_MS) buckets.delete(k);
      }
    }

    next();
  };
}

export function trackInFlight<T>(fn: () => Promise<T>): Promise<T> {
  inFlight += 1;
  return fn().finally(() => {
    inFlight = Math.max(0, inFlight - 1);
  });
}
