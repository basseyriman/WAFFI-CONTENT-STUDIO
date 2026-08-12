import { NextResponse } from "next/server";
import { getSupabase, type BookingPayload } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;

    if (!body.full_name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const supabase = getSupabase();

    if (!supabase) {
      console.info("Booking inquiry (Supabase not configured):", body);
      return NextResponse.json({
        ok: true,
        stored: false,
        message: "Inquiry received. Connect Supabase env vars to persist bookings.",
      });
    }

    const { error } = await supabase.from("booking_inquiries").insert({
      full_name: body.full_name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      shoot_date: body.shoot_date,
      space_slug: body.space_slug,
      rental_ids: body.rental_ids ?? [],
      message: body.message.trim(),
      inquiry_type: body.inquiry_type || "general",
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Could not save inquiry. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
