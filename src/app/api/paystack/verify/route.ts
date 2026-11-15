import { NextResponse } from "next/server";
import { verifyPaystackTransaction } from "@/lib/paystack";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { reference?: string; expectedAmountKobo?: number };
    const reference = String(body.reference || "").trim();
    if (!reference) {
      return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
    }

    const tx = await verifyPaystackTransaction(reference);
    const expected = typeof body.expectedAmountKobo === "number" ? body.expectedAmountKobo : null;
    const amountOk = expected === null || tx.amount === expected;
    const ok = tx.status === "success" && tx.currency === "NGN" && amountOk;

    if (!ok) {
      return NextResponse.json(
        {
          verified: false,
          error: "Payment could not be verified.",
          status: tx.status,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      verified: true,
      reference: tx.reference,
      amountNaira: tx.amount / 100,
      paidAt: tx.paid_at || null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to verify Paystack payment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
