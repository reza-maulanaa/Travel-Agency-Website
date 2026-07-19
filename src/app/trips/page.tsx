import { createClient } from "@/lib/supabase/server";
import type { Trip } from "@/lib/types";
import { Section, Eyebrow } from "@/components/ui/Section";
import TripCard from "@/components/TripCard";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  const supabase = await createClient();

  const { data: trips, error } = await supabase
    .from("trips")
    .select("*")
    .order("title", { ascending: true });

  const list: Trip[] = trips ?? [];

  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Katalog Trip</Eyebrow>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Paket Trip Kami
        </h1>
        <p className="mt-4 text-slate-600">
          Pilih petualanganmu dan cek ketersediaan slot. Booking langsung lewat
          WhatsApp admin kami.
        </p>
      </div>

      {error && (
        <p className="mx-auto mt-10 max-w-md rounded-lg bg-red-50 p-4 text-center text-red-600">
          Gagal memuat data trip. Pastikan koneksi Supabase sudah dikonfigurasi.
        </p>
      )}

      {!error && list.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          Belum ada paket trip yang tersedia saat ini.
        </p>
      )}

      {list.length > 0 && (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((trip) => (
            <TripCard key={trip.id} trip={trip as Trip} />
          ))}
        </div>
      )}
    </Section>
  );
}
