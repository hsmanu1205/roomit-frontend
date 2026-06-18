"use client";

import { useState } from "react";
import Link from "next/link";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BookingsPage() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/bookings?email=${email}`
      );

      setBookings(data.bookings);
    } catch (error) {
      alert("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await api.patch(
        `/bookings/${id}/cancel`
      );

      alert("Booking Cancelled");
      fetchBookings();
    } catch (error) {
      alert("Cancellation Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-10">

    <Navbar />

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">

        <h1 className="text-5xl font-bold text-slate-900 mb-3">
          My Bookings
        </h1>

        <p className="text-slate-600">
          Search, manage and cancel your room reservations.
        </p>

      </div>

      <div className="flex gap-4 mb-8">

        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-3 rounded-lg w-96 bg-white text-black shadow"
        />

        <button
          onClick={fetchBookings}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Search
        </button>

      </div>

      {loading ? (
        <p className="text-lg">
          Loading...
        </p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-xl p-6 mb-5 border"
          >
            <h2 className="text-2xl font-bold mb-3">
              {booking.title}
            </h2>

            <p className="mb-2">
              <strong>Date:</strong>{" "}
              {booking.date}
            </p>

            <p className="mb-2">
              <strong>Time:</strong>{" "}
              {booking.startTime} -{" "}
              {booking.endTime}
            </p>

            <p className="mb-4">
              <strong>Status:</strong>{" "}
              {booking.status}
            </p>

            {booking.status ===
              "confirmed" && (
              <button
                onClick={() =>
                  cancelBooking(
                    booking._id
                  )
                }
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
      <Footer />

    </div>
  );
}