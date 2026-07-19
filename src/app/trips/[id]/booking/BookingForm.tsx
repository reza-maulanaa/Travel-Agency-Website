"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Trip } from "@/lib/types";

interface BookingInputs {
  name: string;
  whatsapp: string;
  participants: number;
}

export default function BookingForm({ trip }: { trip: Trip }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInputs>({
    defaultValues: { name: "", whatsapp: "", participants: 1 },
  });

  const onSubmit = (data: BookingInputs) => {
    const message = `Halo Admin Travel Kuy, saya ${data.name} ingin booking trip ${trip.title} untuk ${data.participants} orang. Apakah slot masih tersedia?`;
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${trip.whatsapp_number}?text=${encoded}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-8 rounded-xl bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-800">
          Anda akan diarahkan ke WhatsApp. Silakan lanjutkan transaksi di sana.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Nama Lengkap
        </label>
        <input
          type="text"
          {...register("name", { required: "Nama wajib diisi" })}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Masukkan nama lengkap"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Nomor WhatsApp
        </label>
        <input
          type="text"
          {...register("whatsapp", {
            required: "Nomor WhatsApp wajib diisi",
            pattern: {
              value: /^[0-9+]+$/,
              message: "Nomor hanya boleh berisi angka",
            },
          })}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          placeholder="Contoh: 081234567890"
        />
        {errors.whatsapp && (
          <p className="mt-1 text-sm text-red-600">
            {errors.whatsapp.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Jumlah Peserta
        </label>
        <input
          type="number"
          min={1}
          max={trip.available_slots}
          {...register("participants", {
            required: "Jumlah peserta wajib diisi",
            min: { value: 1, message: "Minimal 1 orang" },
            max: {
              value: trip.available_slots,
              message: `Maksimal ${trip.available_slots} orang`,
            },
            valueAsNumber: true,
          })}
          className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        {errors.participants && (
          <p className="mt-1 text-sm text-red-600">
            {errors.participants.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 text-base font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Kirim ke WhatsApp Admin
      </button>
    </form>
  );
}
