import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Trip } from "@/lib/types";
import { deleteTrip } from "./actions";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .order("title", { ascending: true });

  const list: Trip[] = trips ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-slate-500">
            Kelola paket trip Travel Kuy.
          </p>
        </div>
        <Link
          href="/admin/dashboard/create"
          className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          + Tambah Trip Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Judul</th>
              <th className="px-4 py-3 font-semibold">Harga</th>
              <th className="px-4 py-3 font-semibold">Max Slots</th>
              <th className="px-4 py-3 font-semibold">Available Slots</th>
              <th className="px-4 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  Belum ada data trip.
                </td>
              </tr>
            )}
            {list.map((trip) => (
              <tr key={trip.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {trip.title}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatPrice(trip.price)}
                </td>
                <td className="px-4 py-3 text-slate-600">{trip.max_slots}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      trip.available_slots <= 0
                        ? "font-semibold text-red-600"
                        : "font-semibold text-emerald-700"
                    }
                  >
                    {trip.available_slots}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/dashboard/edit/${trip.id}`}
                      className="inline-flex h-9 items-center rounded-lg border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      Edit
                    </Link>
                    <form action={deleteTrip.bind(null, trip.id)}>
                      <button
                        type="submit"
                        className="inline-flex h-9 items-center rounded-lg bg-red-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
      </div>
    </div>
  );
}
