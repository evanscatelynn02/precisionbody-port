import { useState, useContext, useEffect } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function BookingPage() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [estimates, setEstimates] = useState([]);

  const [formData, setFormData] = useState({
    appointmentDate: "",
    notes: "",
    vehicleId: "",
    estimateId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicles", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setVehicles(res.data);
    } catch (err) {
      console.error("Vehicle fetch error:", err);
    }
  };

  const fetchEstimates = async () => {
    try {
      const res = await API.get("/estimates", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEstimates(res.data);
    } catch (err) {
      console.error("Estimate fetch error:", err);
    }
  };

  useEffect(() => {
    if (!user?.token) return;
    fetchVehicles();
    fetchEstimates();
  }, [user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.appointmentDate) {
      alert("Please select an appointment date and time");
      return;
    }

    if (!formData.vehicleId) {
      alert("Please select a vehicle");
      return;
    }

    setLoading(true);

    try {
      await API.post(
        "/appointments",
        {
          appointmentDate: formData.appointmentDate,
          notes: formData.notes,
          vehicleId: formData.vehicleId,
          estimateId: formData.estimateId || null,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Appointment Booked");

      setFormData({
        appointmentDate: "",
        notes: "",
        vehicleId: "",
        estimateId: "",
      });

    } catch (error) {
      console.error(error);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-300 p-4 md:p-6">

      <div className="max-w-2xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Book Appointment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 md:p-6 rounded-lg shadow space-y-4"
        >

          <select
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v._id} value={v._id}>
                {v.year} {v.make} {v.model}
              </option>
            ))}
          </select>

          <select
            name="estimateId"
            value={formData.estimateId}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Estimate (optional)</option>
            {estimates.map((e) => (
              <option key={e._id} value={e._id}>
                {e.damageDescription} - ${e.aiEstimateAmount}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="appointmentDate"
            className="w-full border p-3 rounded"
            value={formData.appointmentDate}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            rows="4"
            placeholder="Additional notes..."
            className="w-full border p-3 rounded"
            value={formData.notes}
            onChange={handleChange}
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

      <footer className="bg-black text-white text-center py-6">
        <p>PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default BookingPage;
