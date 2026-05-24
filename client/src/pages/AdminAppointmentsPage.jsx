import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import BackButton from "../components/BackButton";

function AdminAppointmentsPage() {
  const { user } = useContext(AuthContext);

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/admin/appointments", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    if (user?.token) fetchAppointments();
  }, [user?.token]);

  const updateStatus = async (appointmentId, status) => {
    try {
      await API.put(
        `/admin/appointments/${appointmentId}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await API.put(
        `/admin/appointments/${appointmentId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-5xl mx-auto w-full">

        <BackButton to="/admin" label="Back to Admin Dashboard" />

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-6">
          Manage Appointments
        </h1>

        {appointments.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow border border-steel">
            <p className="font-body text-gray-600">No appointments found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white p-6 rounded-lg shadow border border-steel"
              >
                <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-3">
                  {appointment.userId?.firstName} {appointment.userId?.lastName}
                </h2>

                <p className="font-body text-gray-700 mb-1">
                  <span className="font-semibold">Vehicle:</span>{" "}
                  {appointment.vehicleId
                    ? `${appointment.vehicleId.year} ${appointment.vehicleId.make} ${appointment.vehicleId.model}`
                    : "No vehicle attached"}
                </p>

                <p className="font-body text-gray-700 mb-1">
                  <span className="font-semibold">Estimate:</span>{" "}
                  {appointment.estimateId?.damageDescription ||
                    "No estimate attached"}
                </p>

                <p className="font-body text-gray-700 mb-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="text-electric font-semibold">
                    {appointment.status}
                  </span>
                </p>

                <p className="font-body text-gray-700 mb-1">
                  <span className="font-semibold">Notes:</span>{" "}
                  {appointment.notes || "No notes provided"}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  <button
                    onClick={() => updateStatus(appointment._id, "Approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded font-heading tracking-wide uppercase hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(appointment._id, "In Progress")}
                    className="bg-yellow-300 text-black px-4 py-2 rounded font-heading tracking-wide uppercase hover:bg-yellow-500 transition"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => updateStatus(appointment._id, "Completed")}
                    className="bg-blue-500 text-white px-4 py-2 rounded font-heading tracking-wide uppercase hover:bg-blue-600 transition"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded font-heading tracking-wide uppercase hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default AdminAppointmentsPage;
