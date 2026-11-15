"use client";

import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

type LinkResult = {
  paymentUrl: string;
  reference: string;
  amountNaira: number;
  whatsappDraft: string;
};

export function PaymentLinkTool() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amountNaira, setAmountNaira] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<LinkResult | null>(null);
  const [copied, setCopied] = useState<"url" | "whatsapp" | "">("");

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    // Soft unlock locally; API still checks password on generate.
    if (!password.trim()) {
      setError("Enter the studio tools password.");
      return;
    }
    setUnlocked(true);
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setResult(null);
    setCopied("");

    try {
      const res = await fetch("/api/paystack/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          amountNaira: Number(amountNaira),
          note: note.trim(),
        }),
      });
      const data = (await res.json()) as LinkResult & { error?: string };
      if (!res.ok || !data.paymentUrl) {
        throw new Error(data.error || "Could not create payment link.");
      }
      setResult({
        paymentUrl: data.paymentUrl,
        reference: data.reference,
        amountNaira: data.amountNaira,
        whatsappDraft: data.whatsappDraft,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create payment link.");
      if (err instanceof Error && err.message.toLowerCase().includes("password")) {
        setUnlocked(false);
      }
    } finally {
      setBusy(false);
    }
  }

  async function copyText(value: string, kind: "url" | "whatsapp") {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
  }

  if (!unlocked) {
    return (
      <form onSubmit={unlock} className="space-y-4 rounded-2xl border border-border bg-surface p-6 md:p-8">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Studio password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            placeholder="Enter studio tools password"
            required
          />
        </label>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button type="submit" className="btn-primary w-full">
          Unlock
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-5">
      <form onSubmit={generate} className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Customer name
            </span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="As on WhatsApp"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Customer email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="needed for Paystack"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Customer phone
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="Optional"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Agreed amount (₦)
            </span>
            <input
              type="number"
              min={100}
              step={100}
              required
              value={amountNaira}
              onChange={(e) => setAmountNaira(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder="e.g. 180000"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Booking note
          </span>
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            placeholder="e.g. Waffi Suite + Waffi Lounge, after 6pm, 15 Nov — agreed ₦180,000"
          />
        </label>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? "Creating Paystack link..." : "Generate payment link"}
        </button>
      </form>

      {result ? (
        <div className="space-y-4 rounded-2xl border border-accent/30 bg-accent/5 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium text-foreground">Payment link ready</p>
              <p className="mt-1 text-sm text-muted">
                ₦{result.amountNaira.toLocaleString("en-NG")} · Ref {result.reference}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Paystack link</p>
            <p className="mt-2 break-all text-sm text-foreground">{result.paymentUrl}</p>
            <button
              type="button"
              className="btn-ghost mt-3 inline-flex items-center gap-2 text-sm"
              onClick={() => copyText(result.paymentUrl, "url")}
            >
              <Copy className="h-4 w-4" />
              {copied === "url" ? "Copied link" : "Copy link"}
            </button>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">WhatsApp message</p>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-foreground">{result.whatsappDraft}</pre>
            <button
              type="button"
              className="btn-ghost mt-3 inline-flex items-center gap-2 text-sm"
              onClick={() => copyText(result.whatsappDraft, "whatsapp")}
            >
              <Copy className="h-4 w-4" />
              {copied === "whatsapp" ? "Copied message" : "Copy WhatsApp message"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
