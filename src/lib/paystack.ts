const PAYSTACK_API = "https://api.paystack.co";

type PaystackResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};

export type PaystackInitData = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

export type PaystackVerifyData = {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  paid_at?: string;
  customer?: { email?: string };
  metadata?: Record<string, unknown>;
};

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("Missing PAYSTACK_SECRET_KEY");
  return key;
}

export async function paystackFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${PAYSTACK_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const body = (await res.json()) as PaystackResponse<T>;
  if (!res.ok || !body.status) {
    throw new Error(body.message || `Paystack request failed (${res.status})`);
  }
  return body.data;
}

export function initializePaystackTransaction(payload: {
  email: string;
  amountKobo: number;
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}) {
  return paystackFetch<PaystackInitData>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      amount: String(payload.amountKobo),
      currency: "NGN",
      reference: payload.reference,
      callback_url: payload.callbackUrl,
      metadata: payload.metadata,
    }),
  });
}

export function verifyPaystackTransaction(reference: string) {
  return paystackFetch<PaystackVerifyData>(`/transaction/verify/${encodeURIComponent(reference)}`);
}
