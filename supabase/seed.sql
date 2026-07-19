-- Travel Kuy: Seed Data
-- 3 dummy trip dengan available_slots yang berbeda-beda

insert into public.trips (
  title,
  description,
  price,
  duration,
  image_url,
  max_slots,
  available_slots,
  whatsapp_number
) values
(
  'Open Trip Bromo',
  'Menikmati matahari terbit dari penanjakan dan eksplorasi padang pasir Bromo bersama rombongan seru.',
  350000,
  '2 Hari 1 Malam',
  'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800',
  20,
  12,
  '6287811165612'
),
(
  'Open Trip Komodo',
  'Berlayar ke Labuan Bajo, melihat komodo langsung di habitatnya dan snorkeling di Pink Beach.',
  2500000,
  '3 Hari 2 Malam',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
  15,
  0,
  '6287811165612'
),
(
  'Private Tour Bali',
  'Liburan privat fleksibel keliling Bali: Ubud, Tegalalang, hingga pantai seminyak.',
  1800000,
  '4 Hari 3 Malam',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  10,
  5,
  '6287811165612'
);
