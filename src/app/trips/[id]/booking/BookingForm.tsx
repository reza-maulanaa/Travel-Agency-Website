"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Check,
  User,
  Users,
  MapPin,
  Clock,
  Shield,
  Compass,
  MessageCircle,
  ArrowLeft,
  CreditCard,
  CircleCheckBig,
} from "lucide-react";
import type { Trip } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";

interface BookingInputs {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  participants: number;
}

interface AddonOption {
  id: string;
  label: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: "insurance",
    label: "Asuransi Perjalanan",
    description: "Perlindungan penuh selama perjalanan",
    price: 50000,
    icon: <Shield className="h-5 w-5" />,
  },
  {
    id: "tour-guide",
    label: "Pemandu Wisata Lokal",
    description: "Guide berpengalaman sepanjang trip",
    price: 150000,
    icon: <Compass className="h-5 w-5" />,
  },
];

const STEPS = [
  { label: "Isi Data", icon: <User className="h-4 w-4" /> },
  { label: "Konfirmasi", icon: <CreditCard className="h-4 w-4" /> },
  { label: "Selesai", icon: <CircleCheckBig className="h-4 w-4" /> },
];

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BookingForm({ trip }: { trip: Trip }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingInputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
      participants: 1,
    },
  });

  const participants = watch("participants") || 1;

  const basePrice = trip.price * participants;
  const adminFee = Math.round(basePrice * 0.05);
  const insuranceAddon = selectedAddons.includes("insurance")
    ? ADDON_OPTIONS.find((a) => a.id === "insurance")!.price * participants
    : 0;
  const tourGuideAddon = selectedAddons.includes("tour-guide")
    ? ADDON_OPTIONS.find((a) => a.id === "tour-guide")!.price * participants
    : 0;
  const total = basePrice + adminFee + insuranceAddon + tourGuideAddon;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const onFormSubmit = (data: BookingInputs) => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    const addonLabels = selectedAddons
      .map((id) => ADDON_OPTIONS.find((a) => a.id === id)?.label)
      .filter(Boolean);

    const message = [
      `Halo Admin Travel Kuy! 👋`,
      ``,
      `Saya ingin booking trip:`,
      `• *Trip:* ${trip.title}`,
      `• *Durasi:* ${trip.duration}`,
      `• *Jumlah Peserta:* ${data.participants} orang`,
      ``,
      `*Data Diri:*`,
      `• Nama: ${data.name}`,
      `• Email: ${data.email}`,
      `• WhatsApp: ${data.phone}`,
      data.specialRequests
        ? `• Catatan: ${data.specialRequests}`
        : "",
      addonLabels.length > 0
        ? `\n*Add-on:* ${addonLabels.join(", ")}`
        : "",
      ``,
      `Apakah slot masih tersedia? Terima kasih! 🙏`,
    ]
      .filter((line) => line !== undefined)
      .join("\n");

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${trip.whatsapp_number}?text=${encoded}`;

    setCurrentStep(2);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href={`/trips`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Daftar Trip
      </Link>

      {/* Progress Stepper */}
      <nav aria-label="Progress" className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <ol className="flex items-center">
          {STEPS.map((step, idx) => (
            <li key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    idx < currentStep
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : idx === currentStep
                        ? "border-emerald-600 bg-emerald-50 text-emerald-600"
                        : "border-slate-300 bg-slate-50 text-slate-400"
                  }`}
                >
                  {idx < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.icon
                  )}
                </span>
                <span
                  className={`hidden text-sm font-medium sm:block ${
                    idx <= currentStep ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="mx-3 hidden h-px flex-1 bg-slate-200 sm:block" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column — Forms */}
        <div className="space-y-6 lg:col-span-2">
          {/* Trip Summary Card (Mobile) */}
          <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={trip.image_url}
                alt={trip.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-slate-900">
                {trip.title}
              </h3>
              <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {trip.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Indonesia
                </span>
              </div>
              <p className="mt-1 text-sm font-bold text-emerald-600">
                {formatIDR(trip.price)}
                <span className="text-xs font-normal text-slate-500">/orang</span>
              </p>
            </div>
          </div>

          {/* Guest Info Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Informasi Peserta
                </h2>
                <p className="text-sm text-slate-500">
                  Isi data diri untuk booking trip ini
                </p>
              </div>
            </div>

            <form
              id="booking-form"
              onSubmit={handleSubmit(onFormSubmit)}
              className="space-y-5"
            >
              <Input
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                leftIcon={<User className="h-4 w-4" />}
                error={errors.name?.message}
                {...register("name", { required: "Nama wajib diisi" })}
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  label="Email"
                  type="email"
                  placeholder="email@contoh.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Format email tidak valid",
                    },
                  })}
                />
                <Input
                  label="Nomor WhatsApp"
                  type="tel"
                  placeholder="081234567890"
                  leftIcon={<MessageCircle className="h-4 w-4" />}
                  error={errors.phone?.message}
                  {...register("phone", {
                    required: "Nomor WhatsApp wajib diisi",
                    pattern: {
                      value: /^[0-9+]+$/,
                      message: "Nomor hanya boleh berisi angka",
                    },
                  })}
                />
              </div>

              <Input
                label="Jumlah Peserta"
                type="number"
                min={1}
                max={trip.available_slots}
                placeholder="1"
                error={errors.participants?.message}
                {...register("participants", {
                  required: "Jumlah peserta wajib diisi",
                  min: { value: 1, message: "Minimal 1 orang" },
                  max: {
                    value: trip.available_slots,
                    message: `Maksimal ${trip.available_slots} orang`,
                  },
                  valueAsNumber: true,
                })}
              />

              <TextArea
                label="Permintaan Khusus (Opsional)"
                placeholder="Misal: alergi makanan, kursi roda, dll."
                rows={3}
                {...register("specialRequests")}
              />
            </form>
          </div>

          {/* Add-on Options */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Add-on / Opsional
                </h2>
                <p className="text-sm text-slate-500">
                  Tingkatkan pengalaman perjalananmu
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {ADDON_OPTIONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isSelected
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {addon.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {addon.label}
                      </p>
                      <p className="text-xs text-slate-500">
                        {addon.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-slate-900">
                        +{formatIDR(addon.price)}
                      </p>
                      <p className="text-xs text-slate-400">/orang</p>
                    </div>
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column — Sticky Summary */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Trip Image + Title Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-video w-full">
                <Image
                  src={trip.image_url}
                  alt={trip.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white">{trip.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {trip.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Indonesia
                    </span>
                  </div>
                </div>
              </div>

              {/* Slot Status */}
              <div className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Slot Tersedia</span>
                  <span className="text-sm font-bold text-emerald-600">
                    {trip.available_slots} / {trip.max_slots}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{
                      width: `${(trip.available_slots / trip.max_slots) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h4 className="mb-4 text-sm font-semibold text-slate-900">
                Ringkasan Harga
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Harga Trip ({participants} × {formatIDR(trip.price)})
                  </span>
                  <span className="font-medium text-slate-900">
                    {formatIDR(basePrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Biaya Admin (5%)</span>
                  <span className="font-medium text-slate-900">
                    {formatIDR(adminFee)}
                  </span>
                </div>
                {insuranceAddon > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Asuransi ({participants} × {formatIDR(50000)})
                    </span>
                    <span className="font-medium text-slate-900">
                      {formatIDR(insuranceAddon)}
                    </span>
                  </div>
                )}
                {tourGuideAddon > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Pemandu Wisata ({participants} × {formatIDR(150000)})
                    </span>
                    <span className="font-medium text-slate-900">
                      {formatIDR(tourGuideAddon)}
                    </span>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-emerald-600">
                      {formatIDR(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              {submitted ? (
                <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-center">
                  <CircleCheckBig className="mx-auto mb-2 h-8 w-8 text-emerald-600" />
                  <p className="text-sm font-semibold text-emerald-800">
                    Anda akan diarahkan ke WhatsApp.
                  </p>
                  <p className="mt-1 text-xs text-emerald-600">
                    Silakan lanjutkan transaksi di sana.
                  </p>
                </div>
              ) : (
                <Button
                  type="submit"
                  form="booking-form"
                  size="lg"
                  className="mt-5 w-full"
                >
                  <MessageCircle className="h-5 w-5" />
                  {currentStep === 0 ? "Lanjut ke Konfirmasi" : "Kirim ke WhatsApp"}
                </Button>
              )}
            </div>

            {/* Trust Badge */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <p className="text-xs font-medium text-emerald-700">
                Pembayaran tidak diperlukan di sini.
              </p>
              <p className="mt-1 text-xs text-emerald-600">
                Transaksi akan dilanjutkan via WhatsApp.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
