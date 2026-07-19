import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Trip } from "@/lib/types";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .single();

  if (!trip || trip.available_slots <= 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Booking Trip</h1>
        <p className="mt-2 text-slate-600">
          Kamu akan memesan:{" "}
          <span className="font-semibold text-emerald-700">{trip.title}</span>
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Sisa slot tersedia: {trip.available_slots} | Durasi: {trip.duration}
        </p>

        <BookingForm trip={trip as Trip} />
      </div>
    </div>
  );
}
