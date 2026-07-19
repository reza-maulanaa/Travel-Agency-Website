export default function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-emerald-100 bg-emerald-900 text-emerald-50"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-extrabold">Travel Kuy</p>
          <p className="mt-1 text-sm text-emerald-200">
            Jelajahi Indonesia bersama kami. Booking mudah, harga terjangkau.
          </p>
        </div>
        <div className="text-sm text-emerald-200">
          <p>WhatsApp: 0878-1116-5612</p>
          <p>Email: hello@travelkuy.id</p>
          <p className="mt-2 text-emerald-300">
            &copy; {new Date().getFullYear()} Travel Kuy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
