"use client";

import { useEffect, useState } from "react";
import api from "../services/api";

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
      <div className="p-10 text-xl">
        Loading Rooms...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-5xl font-bold text-slate-900 mb-10">
        RoomIt Booking System
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-xl shadow-lg p-6 border"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {room.name}
            </h2>

            <p className="text-slate-700 mb-2">
              <strong>Location:</strong> {room.location}
            </p>

            <p className="text-slate-700 mb-2">
              <strong>Capacity:</strong> {room.capacity}
            </p>

            <p className="text-slate-700 mb-4">
              <strong>Buffer:</strong> {room.bufferMinutes} mins
            </p>

            <a
              href={`/rooms/${room._id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              View Availability
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}