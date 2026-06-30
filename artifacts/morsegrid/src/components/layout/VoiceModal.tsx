import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, Loader2, StopCircle, Sparkles, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

interface VoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type VoiceState = "idle" | "listening" | "processing" | "done" | "error";

const MIN_RECORDING_MS = 400;

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4;codecs=mp4a.40.2",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/ogg",
  ];
  for (const type of candidates) {
    try {
      if (MediaRecorder.isTypeSupported(type)) return type;
    } catch {
      // ignore
    }
  }
  return undefined;
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(
      null,
      Array.from(bytes.subarray(i, i + chunk)),
    );
  }
  return btoa(binary);
}

export function VoiceModal({ open, onOpenChange }: VoiceModalProps) {
  const [state, setState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef<number>(0);
  const cancelledRef = useRef<boolean>(false);

  const cleanupStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  };

  const resetAll = () => {
    cancelledRef.current = true;
    cleanupStream();
    setState("idle");
    setTranscript("");
    setAnswer("");
    setErrorMessage("");
  };

  useEffect(() => {
    if (open) {
      cancelledRef.current = false;
      setState("idle");
      setTranscript("");
      setAnswer("");
      setErrorMessage("");
    } else {
      cancelledRef.current = true;
      cleanupStream();
    }
  }, [open]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      cleanupStream();
    };
  }, []);

  const sendAudio = async (blob: Blob, mimeType: string) => {
    try {
      const base64 = await blobToBase64(blob);
      const apiBase = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
      const response = await fetch(`${apiBase}/api/voice/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audio: base64, mimeType }),
      });

      if (cancelledRef.current) return;

      if (!response.ok) {
        let message = "Something went wrong. Please try again.";
        try {
          const data = await response.json();
          if (data && typeof data.error === "string") message = data.error;
        } catch {
          // ignore
        }
        setErrorMessage(message);
        setState("error");
        return;
      }

      const data = (await response.json()) as { transcript?: string; answer?: string };
      if (cancelledRef.current) return;

      const transcriptValue = data.transcript ?? "";
      setTranscript(transcriptValue);
      setAnswer(data.answer ?? "");
      setState("done");
      track("cta_voice_modal_complete", { had_transcript: transcriptValue.trim().length > 0 });
    } catch (err) {
      if (cancelledRef.current) return;
      setErrorMessage(
        "We couldn't reach the assistant. Check your connection and try again.",
      );
      setState("error");
    }
  };

  const handleStartListening = async () => {
    setErrorMessage("");
    setTranscript("");
    setAnswer("");
    cancelledRef.current = false;

    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErrorMessage("Microphone access isn't supported in this browser.");
      setState("error");
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      setErrorMessage("Audio recording isn't supported in this browser.");
      setState("error");
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const name = (err as DOMException | undefined)?.name ?? "";
      if (name === "NotAllowedError" || name === "SecurityError") {
        setErrorMessage(
          "Microphone access was blocked. Allow it in your browser settings and try again.",
        );
      } else if (name === "NotFoundError") {
        setErrorMessage("We couldn't find a microphone on this device.");
      } else {
        setErrorMessage("We couldn't access your microphone. Please try again.");
      }
      setState("error");
      return;
    }

    streamRef.current = stream;
    const mimeType = pickMimeType();
    let recorder: MediaRecorder;
    try {
      recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    } catch (err) {
      cleanupStream();
      setErrorMessage("Audio recording isn't supported in this browser.");
      setState("error");
      return;
    }

    mediaRecorderRef.current = recorder;
    chunksRef.current = [];
    startedAtRef.current = Date.now();

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const recordedMime = recorder.mimeType || mimeType || "audio/webm";
      const blob = new Blob(chunksRef.current, { type: recordedMime });
      cleanupStream();

      if (cancelledRef.current) return;

      if (Date.now() - startedAtRef.current < MIN_RECORDING_MS || blob.size === 0) {
        setErrorMessage("That was a bit too short — try holding the mic on while you ask.");
        setState("error");
        return;
      }

      setState("processing");
      await sendAudio(blob, recordedMime);
    };

    recorder.onerror = () => {
      cleanupStream();
      if (cancelledRef.current) return;
      setErrorMessage("The recording stopped unexpectedly. Please try again.");
      setState("error");
    };

    try {
      recorder.start();
      setState("listening");
    } catch (err) {
      cleanupStream();
      setErrorMessage("We couldn't start recording. Please try again.");
      setState("error");
    }
  };

  const handleStopListening = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      try {
        recorder.stop();
      } catch {
        // ignore
      }
    }
  };

  const handleAskAnother = () => {
    setState("idle");
    setTranscript("");
    setAnswer("");
    setErrorMessage("");
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
            Tap the mic and ask Morsegrid a question. We'll transcribe it and reply with how we'd actually approach it.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 min-h-[200px]">
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
                  onClick={handleStartListening}
                  className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90"
                  data-testid="button-start-speaking"
                >
                  Start speaking
                </Button>
              </motion.div>
            )}

            {state === "listening" && (
              <motion.div
                key="listening"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-6 w-full"
              >
                <div className="flex items-center gap-2 h-16">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-primary rounded-full"
                      animate={{
                        height: ["20%", "100%", "20%"],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground animate-pulse">Listening...</p>
                <Button
                  variant="outline"
                  onClick={handleStopListening}
                  className="rounded-full"
                  data-testid="button-stop-listening"
                >
                  <StopCircle className="w-4 h-4 mr-2" /> Stop
                </Button>
              </motion.div>
            )}

            {state === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4 w-full text-center"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Transcribing and thinking...</p>
                </div>
              </motion.div>
            )}

            {state === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-6 w-full"
              >
                {transcript && (
                  <div
                    className="bg-muted/50 p-4 rounded-lg border border-border"
                    data-testid="text-transcript"
                  >
                    <p className="text-sm font-medium italic text-foreground mb-2">You asked:</p>
                    <p className="text-sm text-foreground">"{transcript}"</p>
                  </div>
                )}

                <div className="space-y-3" data-testid="text-answer">
                  {answer
                    .split(/\n\n+/)
                    .filter((p) => p.trim().length > 0)
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleAskAnother}
                    data-testid="button-ask-another"
                  >
                    Ask another
                  </Button>
                  <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full">
                    <a href={siteConfig.links.bookCall} target="_blank" rel="noopener noreferrer">
                      Discuss this
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
                  onClick={handleAskAnother}
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
