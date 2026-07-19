import Link from "next/link";
import { createTrip } from "./actions";

export const dynamic = "force-dynamic";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500";

const labelClass = "block text-sm font-medium text-slate-700";

export default function CreateTripPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link
        href="/admin/dashboard"
        className="text-sm text-slate-500 hover:text-emerald-700"
      >
        ← Kembali ke dashboard
      </Link>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Tambah Trip Baru
      </h1>

      <form
        action={createTrip}
        className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div>
          <label className={labelClass}>Judul Trip</label>
          <input name="title" required className={inputClass} placeholder="Open Trip Bromo" />
        </div>

        <div>
          <label className={labelClass}>Deskripsi</label>
          <textarea
            name="description"
            rows={3}
            className={inputClass}
            placeholder="Deskripsi singkat paket trip"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Harga (IDR)</label>
            <input
              name="price"
              type="number"
              min={0}
              required
              className={inputClass}
              placeholder="350000"
            />
          </div>
          <div>
            <label className={labelClass}>Durasi</label>
            <input
              name="duration"
              required
              className={inputClass}
              placeholder="2 Hari 1 Malam"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input
            name="image_url"
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelClass}>Nomor WhatsApp Admin</label>
          <input
            name="whatsapp_number"
            className={inputClass}
            placeholder="6287811165612"
          />
          <p className="mt-1 text-xs text-slate-400">
            Kosongkan untuk menggunakan nomor default (6287811165612).
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Max Slots</label>
            <input
              name="max_slots"
              type="number"
              min={0}
              required
              className={inputClass}
              placeholder="20"
            />
          </div>
          <div>
            <label className={labelClass}>Available Slots</label>
            <input
              name="available_slots"
              type="number"
              min={0}
              required
              className={inputClass}
              placeholder="20"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 text-base font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Simpan Trip
        </button>
      </form>
    </div>
  );
}
