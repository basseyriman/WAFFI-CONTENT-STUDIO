import { NextResponse } from "next/server";
import { initializePaystackTransaction } from "@/lib/paystack";

function studioPasswordOk(password: string) {
  const expected = process.env.STUDIO_TOOLS_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      password?: string;
      fullName?: string;
      email?: string;
      phone?: string;
      amountNaira?: number;
      note?: string;
    };

    if (!studioPasswordOk(String(body.password || ""))) {
      return NextResponse.json({ error: "Invalid studio password." }, { status: 401 });
    }

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const note = String(body.note || "").trim();
    const amountNaira = Number(body.amountNaira);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid customer email is required." }, { status: 400 });
    }
    if (!Number.isFinite(amountNaira) || amountNaira < 100) {
      return NextResponse.json({ error: "Enter an agreed amount of at least ₦100." }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const reference = `WAFFI-LINK-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const amountKobo = Math.round(amountNaira * 100);

    const tx = await initializePaystackTransaction({
      email,
      amountKobo,
      reference,
      callbackUrl: `${origin}/pay/complete?reference=${encodeURIComponent(reference)}`,
      metadata: {
        type: "studio_payment_link",
        full_name: fullName || "Customer",
        phone: phone || "",
        note: note || "Agreed booking payment",
        amount_naira: amountNaira,
        custom_fields: [
          { display_name: "Customer", variable_name: "full_name", value: fullName || "Customer" },
          { display_name: "Phone", variable_name: "phone", value: phone || "Not provided" },
          { display_name: "Booking note", variable_name: "note", value: note || "Agreed booking payment" },
        ],
      },
    });

    const whatsappDraft = [
      `Hello ${fullName || "there"},`,
      "",
      "Thanks for confirming. Here is your WAFFI Content Studio payment link:",
      tx.authorization_url,
      "",
      `Amount: ₦${amountNaira.toLocaleString("en-NG")}`,
      note ? `Details: ${note}` : null,
      "",
      "After payment, reply here with your Paystack confirmation. Thank you.",
    ]
      .filter((line) => line !== null)
      .join("\n");

    return NextResponse.json({
      paymentUrl: tx.authorization_url,
      reference: tx.reference,
      amountNaira,
      whatsappDraft,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create payment link.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
