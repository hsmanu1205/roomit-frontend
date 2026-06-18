"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../services/api";

export default function RoomAvailability() {
  const params = useParams();
  const roomId = params.id;

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [availability, setAvailability] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const fetchAvailability = async () => {
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
    <div className="min-h-screen bg-slate-100 p-10">
        <h1
  style={{
    color: "black",
    fontSize: "40px",
    fontWeight: "bold",
  }}
>
  Room Availability
</h1>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        className="border-2 border-slate-300 bg-white text-black p-3 rounded-lg mb-8"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availability.map((slot) => (
            <div
              key={slot.slot}
              className={`p-4 rounded text-center font-semibold ${
                slot.available
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {slot.slot}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}