import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function AppointmentsPage() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchAppointments = async () => {
      try {
        const res = await API.get("/appointments", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setAppointments(res.data);
      } catch (err) {
        console.error("Appointments error:", err);
      }
    };

    fetchAppointments();
  }, [user?.token]);

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          My Appointments
        </h1>

        <div className="bg-white p-6 rounded-lg shadow">
          {appointments.length === 0 ? (
            <p className="text-gray-600">No appointments found.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border p-4 rounded-lg bg-gray-50"
                >
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Vehicle:</span>{" "}
                    {appointment.vehicleId
                      ? `${appointment.vehicleId.year} ${appointment.vehicleId.make} ${appointment.vehicleId.model}`
                      : "No vehicle"}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Appointment Date:</span>{" "}
                    {appointment.appointmentDate
                      ? new Date(appointment.appointmentDate).toLocaleDateString()
                      : "No date available"}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Estimate:</span>{" "}
                    {appointment.estimateId?.damageDescription ||
                      "No estimate attached"}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Notes:</span>{" "}
                    {appointment.notes || "No notes provided"}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Status:</span>{" "}
                    {appointment.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AppointmentsPage;
