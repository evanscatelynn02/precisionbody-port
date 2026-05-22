import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

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
    if (!user?.token) return;
    fetchAppointments();
  }, [user?.token]);

  const updateStatus = async (appointmentId, status) => {
    try {
      await API.put(
        `/admin/appointments/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
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
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-6 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Manage Appointments
        </h1>

        {appointments.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">No appointments found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  {appointment.userId?.firstName}{" "}
                  {appointment.userId?.lastName}
                </h2>

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Vehicle:</span>{" "}
                  {appointment.vehicleId
                    ? `${appointment.vehicleId.year} ${appointment.vehicleId.make} ${appointment.vehicleId.model}`
                    : "No vehicle attached"}
                </p>

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Estimate:</span>{" "}
                  {appointment.estimateId?.damageDescription ||
                    "No estimate attached"}
                </p>

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-blue-600">
                    {appointment.status}
                  </span>
                </p>

                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Notes:</span>{" "}
                  {appointment.notes || "No notes provided"}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  <button
                    onClick={() => updateStatus(appointment._id, "Approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(appointment._id, "In Progress")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => updateStatus(appointment._id, "Completed")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminAppointmentsPage;
