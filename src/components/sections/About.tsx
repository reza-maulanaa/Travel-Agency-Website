import { ShieldCheck, RefreshCw, MapPin } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";

const principles = [
  {
    icon: ShieldCheck,
    title: "Tanpa pembayaran online",
    text: "Kamu hanya membayar setelah deal langsung dengan admin kami via WhatsApp.",
  },
  {
    icon: RefreshCw,
    title: "Slot selalu update",
    text: "Ketersediaan diatur manual oleh admin pasca-deal, jadi yang kamu lihat itu yang tersisa.",
  },
  {
    icon: MapPin,
    title: "Guide lokal tersertifikasi",
    text: "Setiap trip didampingi guide yang benar-benar paham medan dan budaya setempat.",
  },
];

export default function About() {
  return (
    <Section className="bg-white" containerClassName="grid items-center gap-12 lg:grid-cols-2">
      {/* Narrative */}
      <div>
        <Eyebrow>Tentang Kami</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Kami membuat wisata Indonesia jadi sederhana
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          Travel Kuy lahir dari satu masalah sederhana: booking trip sering
          ribet, mahal, dan nggak transparan. Kami bangun sistem di mana kamu
          cukup lihat trip, cek sisa slot, dan lanjut ngobrol dengan admin di
          WhatsApp.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600">
          Tanpa payment gateway, tanpa biaya tersembunyi — hanya perjalanan
          yang jujur, aman, dan menyenangkan.
        </p>

        <dl className="mt-10 space-y-6">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <dt className="font-semibold text-slate-900">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>

      {/* Photo with caption */}
      <div className="relative">
        <div className="overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&q=80"
            alt="Kelompok traveler menikmati pemandangan pegunungan"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-5 left-5 rounded-2xl border border-emerald-100 bg-white px-5 py-3 shadow-lg">
          <p className="text-sm font-bold text-emerald-700">Bromo · Java</p>
          <p className="text-xs text-slate-500">Salah satu rute favorit kami</p>
        </div>
      </div>
    </Section>
  );
}
