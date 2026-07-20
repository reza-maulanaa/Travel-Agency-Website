import Link from "next/link";
import { Plus, Pencil, Trash2, MapPin, Layers, CheckCircle2, XCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Trip } from "@/lib/types";
import { deleteTrip } from "./actions";
import { cn } from "@/lib/utils";

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

  const totalTrips = list.length;
  const totalSlots = list.reduce((acc, t) => acc + t.max_slots, 0);
  const availableSlots = list.reduce((acc, t) => acc + t.available_slots, 0);
  const soldOut = list.filter((t) => t.available_slots <= 0).length;

  const stats = [
    {
      label: "Total Trip",
      value: totalTrips,
      icon: MapPin,
      tone: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Total Slot",
      value: totalSlots,
      icon: Layers,
      tone: "text-blue-600 bg-blue-50",
    },
    {
      label: "Slot Tersedia",
      value: availableSlots,
      icon: CheckCircle2,
      tone: "text-teal-600 bg-teal-50",
    },
    {
      label: "Sold Out",
      value: soldOut,
      icon: XCircle,
      tone: "text-red-600 bg-red-50",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Daftar Trip</h2>
          <p className="mt-1 text-sm text-slate-500">
            Kelola, tambah, dan perbarui paket trip Anda.
          </p>
        </div>
        <Link
          href="/admin/dashboard/create"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Tambah Trip Baru
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  stat.tone
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Judul</th>
                <th className="px-6 py-4 font-semibold">Harga</th>
                <th className="px-6 py-4 font-semibold">Durasi</th>
                <th className="px-6 py-4 font-semibold">Max Slot</th>
                <th className="px-6 py-4 font-semibold">Sisa Slot</th>
                <th className="px-6 py-4 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Belum ada data trip. Klik &quot;Tambah Trip Baru&quot; untuk
                    memulai.
                  </td>
                </tr>
              )}
              {list.map((trip) => {
                const isSoldOut = trip.available_slots <= 0;
                return (
                  <tr key={trip.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {trip.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {formatPrice(trip.price)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {trip.duration}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{trip.max_slots}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          isSoldOut
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-700"
                        )}
                      >
                        {isSoldOut
                          ? "Sold Out"
                          : `${trip.available_slots} tersedia`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/dashboard/edit/${trip.id}`}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <form action={deleteTrip.bind(null, trip.id)}>
                          <button
                            type="submit"
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-red-50 px-3 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
