import { useState, useContext } from "react";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

function BookingPage() {

  const { user } = useContext(AuthContext);

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/appointments",
        {
          appointmentDate,
          notes,
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      alert("Appointment booked");

    } catch (error) {

      console.error(error);

      alert("Booking failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-6">
        Book Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow"
      >

        <input
          type="datetime-local"
          className="w-full border p-4 rounded mb-4"
          value={appointmentDate}
          onChange={(e) =>
            setAppointmentDate(e.target.value)
          }
        />

        <textarea
          rows="4"
          placeholder="Additional notes..."
          className="w-full border p-4 rounded mb-4"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
        />

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Schedule Appointment
        </button>

      </form>

    </div>
  );
}

export default BookingPage;