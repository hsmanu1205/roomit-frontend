"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get("/rooms");
        setRooms(data.rooms);
      } catch (error) {
        console.log("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Rooms...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-8">

      <Navbar />

      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">
          RoomIt Booking System
        </h1>

        <p className="text-xl text-slate-600">
          Smart Meeting Room Management Platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition duration-300"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {room.name}
            </h2>

            <div className="space-y-2 mb-6">
              <p className="text-slate-700">
                <strong>Location:</strong> {room.location}
              </p>

              <p className="text-slate-700">
                <strong>Capacity:</strong> {room.capacity} People
              </p>

              <p className="text-slate-700">
                <strong>Buffer Time:</strong>{" "}
                {room.bufferMinutes} mins
              </p>
            </div>

            <a
              href={`/rooms/${room._id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              View Availability
            </a>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}