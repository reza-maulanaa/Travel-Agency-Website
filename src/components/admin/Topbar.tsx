"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const titles: { match: (p: string) => boolean; title: string; sub: string }[] = [
  {
    match: (p) => p === "/admin/dashboard",
    title: "Dashboard",
    sub: "Kelola paket trip Travel Kuy",
  },
  {
    match: (p) => p.startsWith("/admin/dashboard/create"),
    title: "Tambah Trip",
    sub: "Buat paket trip baru",
  },
  {
    match: (p) => p.startsWith("/admin/dashboard/edit"),
    title: "Edit Trip",
    sub: "Perbarui detail & sisa slot",
  },
];

function getTitle(pathname: string) {
  return titles.find((t) => t.match(pathname)) ?? titles[0];
}

export default function Topbar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { title, sub } = getTitle(pathname);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const initial = email ? email.charAt(0).toUpperCase() : "A";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md lg:px-8">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500">{sub}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-800">{email}</p>
          <p className="text-xs text-slate-400">Administrator</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
          {initial}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
}
