"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function RoomAvailability() {
  const params = useParams();
  const roomId = params.id;

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(
          `/rooms/${roomId}/availability?date=${date}`
        );

        setAvailability(data.availability);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      loadAvailability();
    }
  }, [roomId, date]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">

      <Navbar />

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
        <h1 className="text-5xl font-bold text-slate-900 mb-3">
          Room Availability
        </h1>

        <p className="text-slate-600 text-lg">
          Select a date and choose an available slot.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-slate-300 bg-white text-black px-4 py-3 rounded-xl shadow"
        />
      </div>

      {loading ? (
        <div className="text-xl font-semibold">
          Loading Availability...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {availability.map((slot) => (
            <Link
              key={slot.slot}
              href={
                slot.available
                  ? `/book/${roomId}?date=${date}&startTime=${slot.slot}`
                  : "#"
              }
              className={`p-4 rounded-2xl text-center font-bold text-lg transition duration-300 ${
                slot.available
                  ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                  : "bg-red-500 text-white cursor-not-allowed"
              }`}
            >
              {slot.slot}
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}