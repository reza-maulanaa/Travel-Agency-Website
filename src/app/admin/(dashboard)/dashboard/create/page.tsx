import Link from "next/link";
import { createTrip } from "./actions";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

export const dynamic = "force-dynamic";

export default function CreateTripPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/dashboard"
        className="text-sm text-slate-500 transition-colors hover:text-emerald-700"
      >
        &larr; Kembali ke dashboard
      </Link>

      <h1 className="mt-2 text-2xl font-bold text-slate-900">Tambah Trip Baru</h1>
      <p className="mt-1 text-sm text-slate-500">
        Isi detail paket trip yang akan ditawarkan.
      </p>

      <form
        action={createTrip}
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
      >
        <Input label="Judul Trip" name="title" required placeholder="Open Trip Bromo" />
        <TextArea
          label="Deskripsi"
          name="description"
          rows={3}
          placeholder="Deskripsi singkat paket trip"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Harga (IDR)"
            name="price"
            type="number"
            min={0}
            required
            placeholder="350000"
          />
          <Input label="Durasi" name="duration" required placeholder="2 Hari 1 Malam" />
        </div>
        <Input label="Image URL" name="image_url" placeholder="https://..." />
        <Input
          label="Nomor WhatsApp Admin"
          name="whatsapp_number"
          placeholder="6287811165612"
        />
        <p className="text-xs text-slate-400">
          Kosongkan nomor WA untuk menggunakan nilai default.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Max Slots"
            name="max_slots"
            type="number"
            min={0}
            required
            placeholder="20"
          />
          <Input
            label="Available Slots"
            name="available_slots"
            type="number"
            min={0}
            required
            placeholder="20"
          />
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Simpan Trip
        </button>
      </form>
    </div>
  );
}
