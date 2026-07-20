"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Plane, Loader2, UserPlus, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/Input";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Plane className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Buat Akun Admin</h1>
          <p className="mt-1 text-sm text-slate-500">
            Daftar untuk mengelola Travel Kuy
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          {success ? (
            <div className="py-4 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
              <h2 className="mt-4 text-lg font-bold text-slate-900">
                Pendaftaran Berhasil
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Silakan cek email Anda untuk verifikasi, lalu login.
              </p>
              <Link
                href="/admin/login"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-600 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Ke Halaman Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Nama Lengkap"
                type="text"
                name="name"
                autoComplete="name"
                leftIcon={<UserPlus className="h-4 w-4" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Admin Travel Kuy"
              />

              <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                leftIcon={<Mail className="h-4 w-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@travelkuy.com"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                leftIcon={<Lock className="h-4 w-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Minimal 6 karakter"
              />

              <Input
                label="Konfirmasi Password"
                type="password"
                name="confirm"
                autoComplete="new-password"
                leftIcon={<Lock className="h-4 w-4" />}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="Ulangi password"
              />

              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Daftar"
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link
              href="/admin/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-slate-400 transition-colors hover:text-slate-600"
        >
          &larr; Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
