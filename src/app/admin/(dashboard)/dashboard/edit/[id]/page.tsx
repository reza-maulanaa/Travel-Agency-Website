import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateTrip } from "./actions";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

export const dynamic = "force-dynamic";

export default async function EditTripPage({
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

  if (!trip) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/dashboard"
        className="text-sm text-slate-500 transition-colors hover:text-emerald-700"
      >
        &larr; Kembali ke dashboard
      </Link>

      <h1 className="mt-2 text-2xl font-bold text-slate-900">Edit Trip</h1>
      <p className="mt-1 text-sm text-slate-500">
        Perbarui detail dan sisa slot trip ini.
      </p>

      <form
        action={updateTrip.bind(null, id)}
        className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
      >
        <Input label="Judul Trip" name="title" required defaultValue={trip.title} />
        <TextArea
          label="Deskripsi"
          name="description"
          rows={3}
          defaultValue={trip.description}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Harga (IDR)"
            name="price"
            type="number"
            min={0}
            required
            defaultValue={trip.price}
          />
          <Input
            label="Durasi"
            name="duration"
            required
            defaultValue={trip.duration}
          />
        </div>
        <Input label="Image URL" name="image_url" defaultValue={trip.image_url} />
        <Input
          label="Nomor WhatsApp Admin"
          name="whatsapp_number"
          defaultValue={trip.whatsapp_number}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Max Slots"
            name="max_slots"
            type="number"
            min={0}
            required
            defaultValue={trip.max_slots}
          />
          <Input
            label="Available Slots"
            name="available_slots"
            type="number"
            min={0}
            required
            defaultValue={trip.available_slots}
          />
        </div>
        <p className="text-xs text-slate-400">
          Ubah nilai Available Slots (mis. 10 &rarr; 7) setelah deal via WhatsApp.
        </p>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
