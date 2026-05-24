import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import BackButton from "../components/BackButton";

function RepairStatusPage() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchAppointments = async () => {
      try {
        const response = await API.get("/appointments", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [user?.token]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-4xl mx-auto w-full">

        <BackButton to="/dashboard" label="Back to Dashboard" />

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-4">
          Repair Status
        </h1>

        {appointments.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow border border-steel">
            <p className="font-body text-gray-600">No repair updates found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white p-6 rounded-lg shadow border border-steel"
              >
                <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-3">
                  {appointment.vehicleId?.make} {appointment.vehicleId?.model}
                </h2>

                <p className="font-body text-gray-700 mb-2">
                  <span className="font-semibold">Repair Status:</span>
                  <span className="text-electric ml-2 font-semibold">
                    {appointment.repairStatus}
                  </span>
                </p>

                <p className="font-body text-gray-700">
                  <span className="font-semibold">Appointment Status:</span>
                  <span className="ml-2">
                    {appointment.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p>PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default RepairStatusPage;
