import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white rounded-3xl shadow-xl px-8 py-5 mb-8 border border-slate-200">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-extrabold text-blue-600">
            RoomIt
          </h1>

          <p className="text-slate-500 text-sm">
            Smart Meeting Room Management
          </p>
        </div>

        <div className="flex gap-4">

          <Link
            href="/"
            className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            Home
          </Link>

          <Link
            href="/bookings"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            My Bookings
          </Link>

        </div>

      </div>

    </nav>
  );
}