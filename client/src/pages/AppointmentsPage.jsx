import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/BackButton";

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
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-4xl mx-auto w-full">

        <BackButton to="/dashboard" label="Back to Dashboard" />

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-4">
          My Appointments
        </h1>

        <div className="bg-grey-300 p-6 rounded-lg shadow border border-steel">
          <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b-4 border-electric pb-2 mb-4">
            Upcoming & Past Appointments
          </h2>

          {appointments.length === 0 ? (
            <p className="font-body text-gray-600">No appointments found.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-steel p-4 rounded-lg bg-gray-50"
                >
                  <p className="font-body text-gray-700 mb-1">
                    <span className="font-semibold">Vehicle:</span>{" "}
                    {appointment.vehicleId
                      ? `${appointment.vehicleId.year} ${appointment.vehicleId.make} ${appointment.vehicleId.model}`
                      : "No vehicle"}
                  </p>

                  <p className="font-body text-gray-700 mb-1">
                    <span className="font-semibold">Appointment Date:</span>{" "}
                    {appointment.appointmentDate
                      ? new Date(appointment.appointmentDate).toLocaleDateString()
                      : "No date available"}
                  </p>

                  <p className="font-body text-gray-700 mb-1">
                    <span className="font-semibold">Estimate:</span>{" "}
                    {appointment.estimateId?.damageDescription ||
                      "No estimate attached"}
                  </p>

                  <p className="font-body text-gray-700 mb-1">
                    <span className="font-semibold">Notes:</span>{" "}
                    {appointment.notes || "No notes provided"}
                  </p>

                  <p className="font-body text-gray-700 mb-1">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-electric font-semibold">
                      {appointment.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p>PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default AppointmentsPage;
