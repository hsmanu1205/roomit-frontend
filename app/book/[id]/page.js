"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import api from "../../../services/api";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function BookRoom() {
  const params = useParams();
  const searchParams = useSearchParams();

  const roomId = params.id;

  const date = searchParams.get("date");
  const startTime = searchParams.get("startTime");

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleBooking = async () => {
    if (!title.trim()) {
      alert("Please enter meeting title");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!email.trim()) {
      alert("Please enter email");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Enter valid email");
      return;
    }

    try {
      const [hour, minute] =
        startTime.split(":");

      const endTime = `${String(
        Number(hour) + 1
      ).padStart(2, "0")}:${minute}`;

      await api.post("/bookings", {
        roomId,
        date,
        startTime,
        endTime,
        title,
        bookedBy: {
          name,
          email,
        },
      });

      alert(
        "Booking Created Successfully"
      );

      window.location.href = `/rooms/${roomId}`;
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-10">

      <div className="flex gap-4 mb-6">
        <Navbar />
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">

        <h1 className="text-5xl font-bold text-slate-900 mb-3">
          Create Booking
        </h1>

        <p className="text-slate-600">
          Reserve your meeting room slot.
        </p>

      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl border">

        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <div>
            <p className="text-slate-500 text-sm">
              Booking Date
            </p>

            <p className="font-semibold text-lg">
              {date}
            </p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Start Time
            </p>

            <p className="font-semibold text-lg">
              {startTime}
            </p>
          </div>

        </div>

        <input
          type="text"
          placeholder="Meeting Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 bg-white text-black"
        />

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border border-slate-300 p-3 rounded-lg w-full mb-4 bg-white text-black"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border border-slate-300 p-3 rounded-lg w-full mb-6 bg-white text-black"
        />

        <button
          onClick={handleBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
        >
          Confirm Booking
        </button>

      </div>

      <Footer />

    </div>
  );
}