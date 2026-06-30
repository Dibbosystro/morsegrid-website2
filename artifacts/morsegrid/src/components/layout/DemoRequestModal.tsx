import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DemoRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COMPANY_SIZES = [
  "1–10",
  "11–50",
  "51–200",
  "201–1,000",
  "1,000+",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type State = "idle" | "submitting" | "done" | "error";

export function DemoRequestModal({ open, onOpenChange }: DemoRequestModalProps) {
  const [state, setState] = useState<State>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    companySize: "",
    useCase: "",
    source: "",
  });
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setState("idle");
        setErrorMessage("");
        setEmailError("");
        setForm({
          name: "",
          email: "",
          company: "",
          companySize: "",
          useCase: "",
          source: "",
        });
      }, 200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setEmailError("");

    if (!EMAIL_RE.test(form.email.trim())) {
      setEmailError("Please enter a valid work email.");
      return;
    }

    setState("submitting");
    try {
      const apiBase = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
      const response = await fetch(`${apiBase}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

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

      setState("done");
    } catch (err) {
      setErrorMessage("We couldn't reach our servers. Check your connection and try again.");
      setState("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-border bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Request a demo</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Tell us a little about your team and we'll be in touch within one business day.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {state === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-10 flex flex-col items-center text-center gap-4"
              data-testid="demo-modal-success"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">Thanks — we'll be in touch within 1 business day.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  In the meantime, feel free to explore our case studies.
                </p>
              </div>
              <Button
                onClick={() => onOpenChange(false)}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={onSubmit}
              className="space-y-4 mt-2"
            >
              <Field label="Name" id="lead-name">
                <input
                  id="lead-name"
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls}
                  data-testid="input-demo-name"
                />
              </Field>

              <Field label="Work email" id="lead-email" error={emailError}>
                <input
                  id="lead-email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    update("email", e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className={inputCls}
                  data-testid="input-demo-email"
                />
              </Field>

              <Field label="Company" id="lead-company">
                <input
                  id="lead-company"
                  required
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className={inputCls}
                  data-testid="input-demo-company"
                />
              </Field>

              <Field label="Company size" id="lead-size">
                <select
                  id="lead-size"
                  required
                  value={form.companySize}
                  onChange={(e) => update("companySize", e.target.value)}
                  className={inputCls}
                  data-testid="select-demo-size"
                >
                  <option value="">Select…</option>
                  {COMPANY_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Use case" id="lead-usecase">
                <textarea
                  id="lead-usecase"
                  required
                  rows={3}
                  value={form.useCase}
                  onChange={(e) => update("useCase", e.target.value)}
                  placeholder="What would you like to automate or improve?"
                  className={`${inputCls} resize-none`}
                  data-testid="input-demo-usecase"
                />
              </Field>

              <Field label="How did you hear about us? (optional)" id="lead-source">
                <input
                  id="lead-source"
                  type="text"
                  value={form.source}
                  onChange={(e) => update("source", e.target.value)}
                  className={inputCls}
                  data-testid="input-demo-source"
                />
              </Field>

              {errorMessage && (
                <p className="text-sm text-destructive" data-testid="demo-modal-error">
                  {errorMessage}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={state === "submitting"}
                  className="rounded-full bg-foreground text-background hover:bg-foreground/90"
                  data-testid="button-demo-submit"
                >
                  {state === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Request demo"
                  )}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

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
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
