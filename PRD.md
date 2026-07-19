
Percakapan dengan Gemini
buatin PRD.md dan AGENTS.md dari text tersebut



Product Requirements Document (PRD)

Nama Proyek: Travel Kuy Website System

1. Ringkasan Proyek

Membangun aplikasi web monolith menggunakan Next.js (App Router) dan Tailwind CSS. Aplikasi ini berfungsi sebagai Landing Page, Company Profile, dan Sistem Katalog Booking untuk bisnis travel "Travel Kuy".

Sistem booking dirancang agar aman dan sederhana: User melihat slot tersedia, mengisi form, dan sistem akan meng-redirect ke WhatsApp Admin dengan format pesan otomatis. Tidak ada pembayaran online. Admin memiliki dashboard CRUD untuk mengelola paket trip dan mengupdate sisa slot secara manual setelah deal di WhatsApp.

2. Tech Stack

Framework: Next.js (App Router) dengan TypeScript

Styling: Tailwind CSS

Database & Auth: Supabase (PostgreSQL)

State Management: React Hook Form (untuk form booking)

3. Aturan Komunikasi Agent (WAJIB DIIKUTI)

Kerjakan tugas di bawah ini satu per satu secara berurutan. SAAT SELESAI SATU TUGAS: Hentikan eksekusi. Jangan lanjut ke tugas berikutnya. Berikan ringkasan singkat mengenai file yang dibuat/diubah dan logika yang diterapkan. Tunggu instruksi "Lanjut" atau "Rest" dari user untuk memulai tugas selanjutnya.

DAFTAR TUGAS

TUGAS 1: Inisialisasi Proyek & Konfigurasi Supabase

Deskripsi: Siapkan fondasi proyek Next.js dan koneksi ke Supabase.Spesifikasi:

Pastikan proyek Next.js dengan App Router dan Tailwind CSS sudah terinisialisasi.

Install dependency: @supabase/supabase-js, @supabase/ssr, react-hook-form.

Buat file .env.local dan tambahkan placeholder NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.

Buat folder lib/supabase/ dan siapkan file client.ts (untuk Browser Client) dan server.ts (untuk Server Component Client) menggunakan @supabase/ssr.

Buat file lib/types/index.ts yang berisi TypeScript interface untuk tabel trips (id, title, description, price, duration, image_url, max_slots, available_slots, whatsapp_number).

Tugas 2: Skema Database Supabase & Seeder

Deskripsi: Siapkan skema tabel dan data dummy.Spesifikasi:

Buat file supabase/schema.sql. Buat tabel trips dengan kolom sesuai interface di Tugas 1. Set policy RLS (Row Level Security) agar tabel bisa di-read publik (anon), tapi hanya bisa di-write/update/delete oleh authenticated users.

Buat file supabase/seed.sql yang berisi 3 data dummy trip (misal: Open Trip Bromo, Open Trip Komodo, Private Tour Bali) dengan available_slots yang berbeda-beda.

Hentikan eksekusi, jelaskan skema yang dibuat, dan tunggu instruksi dari user.

Tugas 3: Layout Utama & Landing Page (Company Profile)

Deskripsi: Bangun tampilan publik utama.Spesifikasi:

Modifikasi app/layout.tsx untuk menambahkan Navbar (Logo "Travel Kuy", Menu: Home, Trips, Contact, Admin Login) dan Footer.

Buat halaman app/page.tsx (Landing Page) yang berisi:Hero Section: Judul besar "Jelajahi Indonesia Bersama Travel Kuy" dan tombol CTA "Lihat Paket Trip" yang menuju ke /trips.

About Section: Deskripsi singkat company profile Travel Kuy.

Services/Features Section: 3 icon/card (Paket Terlengkap, Guide Berpengalaman, Harga Terjangkau).

Pastikan desain responsive dan estetik menggunakan Tailwind CSS.

Tugas 4: Halaman Katalog Trip (Public View)

Deskripsi: Tampilkan list trip dari database.Spesifikasi:

Buat halaman app/trips/page.tsx (Server Component).

Fetch data dari tabel trips di Supabase.

Tampilkan data dalam bentuk Grid Card (Gambar, Judul, Harga, Durasi).

Tampilkan status "Sisa Slot: X" atau "Sold Out" (jika available_slots = 0).

Jika slot > 0, tampilkan tombol "Booking Sekarang" yang mengarah ke /trips/[id]/booking. Jika Sold Out, tombol dinonaktifkan.

Tugas 5: Halaman Form Booking & Logic Redirect WhatsApp

Deskripsi: Inti dari sistem booking via WA.Spesifikasi:

Buat halaman app/trips/[id]/booking/page.tsx (Server Component) untuk fetch detail trip berdasarkan id.

Buat Client Component app/trips/[id]/booking/BookingForm.tsx.

Form berisi field: Nama Lengkap, Nomor WhatsApp, Jumlah Peserta (max sesuai available_slots).

Saat form disubmit (menggunakan react-hook-form):JANGAN simpan ke database.

Rangkai pesan WhatsApp format: Halo Admin Travel Kuy, saya [Nama] ingin booking trip [Judul Trip] untuk [Jumlah Peserta] orang. Apakah slot masih tersedia?

Buat fungsi untuk encode teks tersebut ke format URL (encodeURIComponent).

Redirect tab browser baru ke https://wa.me/[nomor_wa_admin]?text=[pesan_terencode].

Setelah redirect, tampilkan pesan sukses di halaman web: "Anda akan diarahkan ke WhatsApp. Silakan lanjutkan transaksi di sana."

Tugas 6: Admin Authentication (Supabase Auth)

Deskripsi: Sistem login sederhana untuk admin.Spesifikasi:

Buat halaman app/admin/login/page.tsx dengan form Email & Password.

Gunakan Supabase Auth (Client-side) untuk melakukan sign in.

Jika login berhasil, redirect ke /admin/dashboard.

Buat middleware (atau pengecekan di Server Component) untuk memproteksi rute /admin/*. Jika user belum terautentikasi, redirect ke /admin/login.

Tugas 7: Admin Dashboard - Read & Delete Trips

Deskripsi: Halaman manajemen admin bagian 1.Spesifikasi:

Buat halaman app/admin/dashboard/page.tsx (Server Component terproteksi).

Fetch semua data trip dari Supabase (menggunakan Supabase Service Role atau koneksi authenticated).

Tampilkan data dalam bentuk Tabel HTML/Tailwind: Judul, Harga, Max Slots, Available Slots, Aksi.

Tambahkan tombol "Hapus" (Delete) di kolom Aksi. Tombol ini memicu Server Action untuk menghapus data trip berdasarkan ID dari database.

Tugas 8: Admin Dashboard - Create Trip (Tambah Trip Baru)

Deskripsi: Halaman manajemen admin bagian 2.Spesifikasi:

Pada halaman dashboard, tambahkan tombol "Tambah Trip Baru".

Buat halaman app/admin/dashboard/create/page.tsx (terproteksi).

Buat form (Server Action dengan useFormState atau standar HTML form) berisi input sesuai skema trips (Judul, Deskripsi, Harga, Durasi, Image URL, Max Slots, Available Slots).

Saat disubmit, masukkan data baru ke tabel trips di Supabase. Redirect kembali ke /admin/dashboard.

Tugas 9: Admin Dashboard - Update Slots (Update Trip)

Deskripsi: Fitur paling krusial untuk update slot pasca-deal WA.Spesifikasi:

Pada tabel di Dashboard (Tugas 7), tambahkan tombol "Edit" di kolom Aksi.

Buat halaman app/admin/dashboard/edit/[id]/page.tsx.

Tampilkan form yang pre-filled dengan data trip yang dipilih.

Fokus utama adalah bisa mengubah nilai available_slots (misal: mengurangi dari 10 menjadi 7 setelah 3 orang deal via WA). Bisa juga mengedit field lain.

Saat disubmit (Server Action), update data di Supabase dan redirect ke /admin/dashboard.

Tugas 10: Finalisasi, Komponen UI & Dokumentasi

Deskripsi: Finishing touch dan instruksi penggunaan.Spesifikasi:

Rapikan UI semua halaman (pastikan konsistensi warna, padding, dan font).

Tambahkan loading state (spinner/skeleton) di halaman Katalog Trip dan Form Booking saat fetch data dari Supabase.

Tambahkan halaman app/not-found.tsx custom untuk rute yang tidak ditemukan.

Buat file README.md yang berisi:Cara setup environment variable Supabase.

Cara run aplikasi secara lokal (npm run dev).

Penjelasan alur kerja sistem (User Booking -> WA -> Admin Update Slot).

Hentikan eksekusi dan berikan ringkasan akhir proyek.

Saya telah berhasil membuat file PRD.md dan AGENTS.md berdasarkan teks instruksi proyek Travel Kuy Website System yang Anda bagikan. File-file tersebut dikonfigurasi dengan struktur yang rapi dan terperinci agar mempermudah proses pengerjaan sistem.

Berikut adalah file yang telah dibuat:

PRD.md (Product Requirements Document)
Ikon MD
PRD
 MD 
Buka

AGENTS.md (Agent Communication Protocol)
Ikon MD
AGENTS
 MD 
Buka

Ringkasan File & Logika yang Diterapkan:
PRD.md: Berisi dokumentasi lengkap mengenai gambaran umum proyek, tech stack utama (Next.js App Router, Tailwind CSS, Supabase, React Hook Form), serta pembagian detail spesifikasi teknis dari Tugas 1 hingga Tugas 10 secara terstruktur untuk panduan pengembangan sistem.

AGENTS.md: Berisi aturan komunikasi dan protokol eksekusi ketat untuk AI Agent. File ini menegaskan Aturan Emas di mana Agent wajib berhenti setelah menyelesaikan setiap tugas satu per satu, memberikan ringkasan, dan menunggu instruksi selanjutnya (Lanjut atau Rest) sebelum beralih ke tugas berikutnya.

Silakan unduh file di atas untuk mulai digunakan pada repositori proyek Anda. Jika ada penyesuaian yang ingin dilakukan, beri tahu saya!

Gemini adalah AI dan dapat melakukan kesalahan.




# Product Requirements Document (PRD)

## Project Name: Travel Kuy Website System

### 1. Project Overview
Building a monolithic web application using **Next.js (App Router)** and **Tailwind CSS**. This application serves as a Landing Page, Company Profile, and Booking Catalog System for the travel business "Travel Kuy".

The booking system is designed to be safe and simple: Users view available slots, fill out a form, and the system redirects them to the Admin's WhatsApp with an automated message format. There is no online payment integration. Admins have a CRUD dashboard to manage trip packages and update remaining slots manually after deals are finalized via WhatsApp.

### 2. Tech Stack
*   **Framework:** Next.js (App Router) with TypeScript
*   **Styling:** Tailwind CSS
*   **Database & Auth:** Supabase (PostgreSQL)
*   **State Management:** React Hook Form (for booking forms)

---

## 3. Detailed Task Requirements (Step-by-Step implementation)

### TASK 1: Project Initialization & Supabase Configuration
*   **Description:** Setup project foundation and Supabase connection.
*   **Specifications:**
    *   Initialize Next.js project with App Router and Tailwind CSS.
    *   Install dependencies: `@supabase/supabase-js`, `@supabase/ssr`, `react-hook-form`.
    *   Create `.env.local` containing placeholders for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    *   Create folder `lib/supabase/` and prepare `client.ts` (Browser Client) and `server.ts` (Server Component Client) using `@supabase/ssr`.
    *   Create `lib/types/index.ts` detailing TypeScript interfaces for the `trips` table:
        *   `id` (string/uuid)
        *   `title` (string)
        *   `description` (string)
        *   `price` (number)
        *   `duration` (string)
        *   `image_url` (string)
        *   `max_slots` (number)
        *   `available_slots` (number)
        *   `whatsapp_number` (string)

### TASK 2: Supabase Database Schema & Seeder
*   **Description:** Set up database schema and seed data.
*   **Specifications:**
    *   Create `supabase/schema.sql` defining the `trips` table matching Task 1 fields.
    *   Configure Row Level Security (RLS) policies: Allow public read (anon), restrict write/update/delete operations to authenticated users only.
    *   Create `supabase/seed.sql` containing 3 dummy trip entries (e.g., Open Trip Bromo, Open Trip Komodo, Private Tour Bali) with varying `available_slots`.

### TASK 3: Main Layout & Landing Page (Company Profile)
*   **Description:** Build the core public-facing interface.
*   **Specifications:**
    *   Modify `app/layout.tsx` to include a persistent Header/Navbar (Logo "Travel Kuy", Menu: Home, Trips, Contact, Admin Login) and a Footer.
    *   Build `app/page.tsx` (Landing Page) featuring:
        *   **Hero Section:** Heading "Jelajahi Indonesia Bersama Travel Kuy" and a CTA button "Lihat Paket Trip" navigating to `/trips`.
        *   **About Section:** Concise company profile background.
        *   **Services/Features Section:** 3 visually clear feature cards (Paket Terlengkap, Guide Berpengalaman, Harga Terjangkau).
    *   Ensure absolute responsiveness and clean styling via Tailwind CSS.

### TASK 4: Trip Catalog Page (Public View)
*   **Description:** Display available trips fetched dynamically from the database.
*   **Specifications:**
    *   Create `app/trips/page.tsx` as a Server Component.
    *   Fetch data directly from the `trips` table in Supabase.
    *   Display data inside a responsive Grid Card structure (Image, Title, Price, Duration).
    *   Display remaining slot statuses clearly: `"Sisa Slot: X"` or `"Sold Out"` (if `available_slots === 0`).
    *   Provide a "Booking Sekarang" button targeting `/trips/[id]/booking` if slots are available. Disable the button and mark as "Sold Out" if slots are depleted.

### TASK 5: Booking Form Page & WhatsApp Redirect Logic
*   **Description:** Core workflow translating web interest into direct WhatsApp messaging.
*   **Specifications:**
    *   Create `app/trips/[id]/booking/page.tsx` (Server Component) to fetch specific trip details using the dynamic ID.
    *   Create a Client Component inside `app/trips/[id]/booking/BookingForm.tsx`.
    *   Include form fields: Full Name, WhatsApp Number, and Number of Participants (validated against remaining `available_slots`).
    *   Form Submission Flow via `react-hook-form`:
        *   **Do NOT** save records into a database table.
        *   Format message string: `Halo Admin Travel Kuy, saya [Nama] ingin booking trip [Judul Trip] untuk [Jumlah Peserta] orang. Apakah slot masih tersedia?`
        *   Encode the text block via `encodeURIComponent`.
        *   Open a new tab redirecting to `https://wa.me/[whatsapp_number_from_trip]?text=[encoded_text]`.
        *   Display a successful message prompt on screen: `"Anda akan diarahkan ke WhatsApp. Silakan lanjutkan transaksi di sana."`

### TASK 6: Admin Authentication (Supabase Auth)
*   **Description:** Gateway access for administrators.
*   **Specifications:**
    *   Create `app/admin/login/page.tsx` with Email & Password input fields.
    *   Leverage client-side Supabase Auth to execute the sign-in sequence.
    *   On success, route to `/admin/dashboard`.
    *   Configure a Next.js middleware (or comprehensive layout-level validation block) ensuring all `/admin/*` sub-routes require active authentication sessions; otherwise redirect instantly to `/admin/login`.

### TASK 7: Admin Dashboard - Read & Delete Trips
*   **Description:** Central operational grid for content management (Part 1).
*   **Specifications:**
    *   Create `app/admin/dashboard/page.tsx` (Protected Server Component).
    *   Fetch comprehensive trip lists from Supabase.
    *   Present contents within an ordered Tailwind data table containing: Title, Price, Max Slots, Available Slots, and Action Items.
    *   Add a "Hapus" (Delete) action triggering a Server Action to securely remove the specified trip record by ID.

### TASK 8: Admin Dashboard - Create Trip
*   **Description:** Capability to expand catalog offerings (Part 2).
*   **Specifications:**
    *   In the dashboard view, insert a prominent "Tambah Trip Baru" button targeting `/admin/dashboard/create`.
    *   Develop `app/admin/dashboard/create/page.tsx`.
    *   Compose a comprehensive form (using standard HTML actions or `useActionState`) mapping fully to the database schema (Title, Description, Price, Duration, Image URL, Max Slots, Available Slots).
    *   Upon execution, submit fields, append row to Supabase, and revalidate/redirect to `/admin/dashboard`.

### TASK 9: Admin Dashboard - Update Slots & Details
*   **Description:** Crucial capability to modify available slots manually following confirmation via WhatsApp.
*   **Specifications:**
    *   On the dashboard grid table, add an "Edit" button matching each row.
    *   Build out `app/admin/dashboard/edit/[id]/page.tsx`.
    *   Render the form pre-filled with the corresponding row record.
    *   Provide explicit inputs allowing granular edits to `available_slots` (e.g., deducting totals down manually when a WhatsApp customer converts) alongside general fields.
    *   Process edits through a Server Action, update Supabase, and redirect back to `/admin/dashboard`.

### TASK 10: UI Polish, State Handlers & Documentation
*   **Description:** Quality assurance, visual refinements, and comprehensive user guidelines.
*   **Specifications:**
    *   Refine structural aesthetics across views guaranteeing uniform padding, color tokens, and text hierarchy.
    *   Provide clear loading placeholders (spinners or skeletons) for asynchronous calls across public catalogs and forms.
    *   Deliver a custom `app/not-found.tsx` catch-all template.
    *   Draft a local operational guide (`README.md`) outlining environment setup, dev command executions (`npm run dev`), and systemic architectural design mappings.