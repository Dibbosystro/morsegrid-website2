import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Loader2, PhoneOff, Sparkles, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import type { RetellWebClient } from "retell-client-js-sdk";

interface VoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Published Morsegrid Retell agent. The API key stays server-side in the
// /api/create-web-call function (RETELL_API_KEY).
const AGENT_ID = "agent_058504bce8784462547b533058";

type CallState = "idle" | "connecting" | "active" | "ended" | "error";
type Turn = { role: string; content: string };

export function VoiceModal({ open, onOpenChange }: VoiceModalProps) {
  const [state, setState] = useState<CallState>("idle");
  const [agentTalking, setAgentTalking] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const clientRef = useRef<RetellWebClient | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const endCall = useCallback(() => {
    const c = clientRef.current;
    clientRef.current = null;
    if (c) {
      try {
        c.stopCall();
      } catch {
        // ignore
      }
    }
    setAgentTalking(false);
  }, []);

  const resetAll = useCallback(() => {
    endCall();
    setState("idle");
    setTurns([]);
    setErrorMessage("");
  }, [endCall]);

  // Tear the call down when the modal closes or the component unmounts.
  useEffect(() => {
    if (!open) endCall();
  }, [open, endCall]);
  useEffect(() => () => endCall(), [endCall]);

  // Keep the live transcript scrolled to the latest turn.
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  const startCall = async () => {
    setErrorMessage("");
    setTurns([]);
    setState("connecting");

    try {
      const apiBase = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/create-web-call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent_id: AGENT_ID }),
      });
      if (!res.ok) throw new Error("create-web-call failed");
      const data = (await res.json()) as { access_token?: string };
      if (!data.access_token) throw new Error("no access_token");

      // Lazy-load the SDK (pulls in a WebRTC client) only when a call starts.
      const { RetellWebClient } = await import("retell-client-js-sdk");
      const client = new RetellWebClient();
      clientRef.current = client;

      client.on("call_started", () => setState("active"));
      client.on("call_ended", () => {
        clientRef.current = null;
        setAgentTalking(false);
        setState((s) => (s === "error" ? s : "ended"));
      });
      client.on("agent_start_talking", () => setAgentTalking(true));
      client.on("agent_stop_talking", () => setAgentTalking(false));
      client.on("update", (update: { transcript?: Turn[] }) => {
        if (update && Array.isArray(update.transcript)) setTurns(update.transcript);
      });
      client.on("error", (err: unknown) => {
        console.error("[retell] call error:", err);
        setErrorMessage("The call ran into a problem. Please try again.");
        setState("error");
        try {
          client.stopCall();
        } catch {
          // ignore
        }
        clientRef.current = null;
      });

      await client.startCall({ accessToken: data.access_token });
      track("cta_voice_modal_open", { location: "modal", provider: "retell" });
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "We couldn't start the call. Allow microphone access and try again.",
      );
      setState("error");
      clientRef.current = null;
    }
  };

  const handleEnd = () => {
    endCall();
    track("cta_voice_modal_complete", { turns: turns.length });
    setState("ended");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetAll();
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl flex items-center gap-2">
            Ask anything <Sparkles className="w-5 h-5 text-primary" />
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Have a real voice conversation with the Morsegrid assistant about how we'd
            approach your operations. Speak naturally, it listens and replies live.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 min-h-[220px]">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20" />
                  <Mic className="w-10 h-10 text-primary" />
                </div>
                <Button
                  onClick={startCall}
                  className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90"
                  data-testid="button-start-call"
                >
                  Start call
                </Button>
                <p className="text-xs text-muted-foreground">Uses your microphone.</p>
              </motion.div>
            )}

            {state === "connecting" && (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <p className="text-sm text-muted-foreground">Connecting you to the assistant...</p>
              </motion.div>
            )}

            {state === "active" && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-5 w-full"
              >
                <div className="flex items-center gap-1.5 h-14">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 rounded-full bg-primary"
                      animate={{ height: agentTalking ? ["25%", "100%", "25%"] : ["20%", "35%", "20%"] }}
                      transition={{ duration: agentTalking ? 0.7 : 1.6, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-foreground">
                  {agentTalking ? "Assistant is speaking..." : "Listening — go ahead"}
                </p>

                {turns.length > 0 && (
                  <div
                    ref={transcriptRef}
                    className="w-full max-h-40 overflow-y-auto rounded-lg border border-border bg-muted/40 p-3 space-y-2"
                  >
                    {turns.slice(-6).map((t, i) => (
                      <p key={i} className="text-xs leading-relaxed">
                        <span className={t.role === "agent" ? "font-semibold text-primary" : "font-semibold text-foreground"}>
                          {t.role === "agent" ? "Assistant" : "You"}:
                        </span>{" "}
                        <span className="text-foreground/80">{t.content}</span>
                      </p>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={handleEnd}
                  className="rounded-full"
                  data-testid="button-end-call"
                >
                  <PhoneOff className="w-4 h-4 mr-2" /> End call
                </Button>
              </motion.div>
            )}

            {state === "ended" && (
              <motion.div
                key="ended"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4 w-full text-center"
              >
                <p className="text-sm text-foreground">Thanks for the chat.</p>
                <div className="flex justify-center gap-2 pt-1">
                  <Button variant="outline" onClick={resetAll} data-testid="button-call-again">
                    Call again
                  </Button>
                  <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full">
                    <a href={siteConfig.links.bookCall} target="_blank" rel="noopener noreferrer">
                      Book a call
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4 w-full text-center"
              >
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-sm text-foreground" data-testid="text-error">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
                <Button
                  onClick={resetAll}
                  className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90"
                  data-testid="button-try-again"
                >
                  Try again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
