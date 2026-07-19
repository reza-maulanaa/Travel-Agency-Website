import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const trustPoints = [
  "Tanpa pembayaran online",
  "Konfirmasi via WhatsApp",
  "Guide lokal berpengalaman",
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden " >
      {/* Background photography */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1559521783-1d1599583485?w=1600&q=80"
          alt="Bukit hijau menjulang di atas lautan kabut di Indonesia"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/60 to-slate-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-28 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-36">
        {/* Editorial copy */}
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
            Travel & Tour · Indonesia
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Jelajahi Indonesia,
            <br />
            bersama Travel Kuy
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-emerald-50/90">
            Dari puncak Bromo hingga pasir Komodo — pilih tripmu, cek sisa
            slot, dan lanjutkan ke WhatsApp admin dalam satu klik.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/trips" size="lg" className="w-full justify-center sm:w-auto">
              Lihat Paket Trip
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href="https://wa.me/6287811165612"
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi Admin
            </ButtonLink>
          </div>

          <ul className="mt-10 flex flex-col gap-2 text-sm text-emerald-50/90">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Specific floating card — real seed data */}
        <div className="relative hidden lg:block">
          <div className="ml-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
            <div className="relative h-44 w-full overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&q=80"
                alt="Open Trip Bromo"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700">
                Trip Populer
              </span>
            </div>
            <div className="p-4 text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">Open Trip Bromo</p>
                <p className="text-sm font-semibold text-emerald-200">
                  Rp350.000
                </p>
              </div>
              <p className="mt-1 text-xs text-emerald-50/80">
                2 Hari 1 Malam · Sisa slot: 12
              </p>
              <ButtonLink
                href="/trips"
                variant="outline"
                size="md"
                className="mt-4 w-full"
              >
                Lihat Detail
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
