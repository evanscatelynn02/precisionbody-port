import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function BookingPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentDate) {
      alert("Please select an appointment date and time");
      return;
    }

    setLoading(true);

    try {
      await API.post(
        "/appointments",
        { appointmentDate, notes },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      alert("Appointment booked");

    } catch (error) {
      console.error(error);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Book Appointment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 md:p-6 rounded-lg shadow"
        >

          <input
            type="datetime-local"
            className="w-full border p-3 rounded mb-4"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />

          <textarea
            rows="4"
            placeholder="Additional notes..."
            className="w-full border p-3 rounded mb-4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading ? "bg-gray-500" : "bg-black"
            }`}
          >
            {loading ? "Processing..." : "Book Appointment"}
          </button>

        </form>

      </div>

      <footer className="bg-black text-white text-center py-6 mt-20">
        <p>
            PrecisionBody Port © 2026
        </p>
      </footer>
          
    </div>
  );
}

export default BookingPage;
