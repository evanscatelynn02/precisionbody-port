import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

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
    <div className="min-h-screen bg-gray-200 p-4 md:p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">

        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Repair Status
        </h1>

        {/* Content */}
        {appointments.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">No repair updates found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  {appointment.vehicleId?.make}{" "}
                  {appointment.vehicleId?.model}
                </h2>

                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Repair Status:</span>
                  <span className="text-blue-600 ml-2">
                    {appointment.repairStatus}
                  </span>
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Appointment Status:</span>
                  <span className="ml-2">
                    {appointment.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default RepairStatusPage;
