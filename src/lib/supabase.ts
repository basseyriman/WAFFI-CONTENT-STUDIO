import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  if (!client) {
    client = createClient(url, key);
  }

  return client;
}

export type BookingPayload = {
  full_name: string;
  email: string;
  phone: string;
  shoot_date: string | null;
  space_slug: string | null;
  rental_ids: string[];
  message: string;
  inquiry_type: "space" | "rental" | "both" | "general";
};
