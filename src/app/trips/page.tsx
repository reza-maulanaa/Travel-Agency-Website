import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Trip } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function TripsPage() {
  const supabase = await createClient();

  const { data: trips, error } = await supabase
    .from("trips")
    .select("*")
    .order("title", { ascending: true });

  const list: Trip[] = trips ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Paket Trip Kami
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Pilih petualanganmu dan cek ketersediaan slot. Booking langsung lewat
          WhatsApp admin kami.
        </p>
      </div>

      {error && (
        <p className="mt-10 rounded-lg bg-red-50 p-4 text-center text-red-600">
          Gagal memuat data trip. Pastikan koneksi Supabase sudah dikonfigurasi.
        </p>
      )}

      {!error && list.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          Belum ada paket trip yang tersedia saat ini.
        </p>
      )}

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((trip) => {
          const soldOut = trip.available_slots <= 0;
          return (
            <div
              key={trip.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 w-full bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={trip.image_url}
                  alt={trip.title}
                  className="h-full w-full object-cover"
                />
                {soldOut && (
                  <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    SOLD OUT
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {trip.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{trip.duration}</p>

                <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                  {trip.description}
                </p>

                <p className="mt-4 text-lg font-extrabold text-emerald-700">
                  {formatPrice(trip.price)}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-600">
                  {soldOut ? (
                    <span className="text-red-600">Sold Out</span>
                  ) : (
                    <span>Sisa Slot: {trip.available_slots}</span>
                  )}
                </p>

                <div className="mt-auto pt-6">
                  {soldOut ? (
                    <button
                      type="button"
                      disabled
                      className="flex h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-400"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <Link
                      href={`/trips/${trip.id}/booking`}
                      className="flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 text-base font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      Booking Sekarang
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
