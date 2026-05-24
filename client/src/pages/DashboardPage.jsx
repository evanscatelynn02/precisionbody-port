import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

function DashboardPage() {
  const { user } = useContext(AuthContext);

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  const [appointments, setAppointments] = useState([]);
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    if (!user || !user.token) return;

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

    const fetchEstimates = async () => {
      try {
        const response = await API.get("/estimates", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setEstimates(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
    fetchEstimates();
  }, [user?.token]);

  return (
    <div className="min-h-screen bg-asphalt flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full p-4 md:p-6">

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-4">
          Dashboard
        </h1>

        <div className="bg-gray-300 p-4 md:p-6 rounded-lg shadow border border-steel">
          <p className="font-body text-lg text-gunmetal">
            Welcome, <span className="font-semibold">{user?.firstName}</span>
          </p>

          <p className="font-body text-gray-700 mt-2">
            Manage estimates, bookings, vehicles, and repair updates here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">

            {/* Estimates Card */}
            <Link to="/estimates">
              <div className="bg-gray-100 shadow rounded-md p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-steel">
                <h2 className="font-heading text-lg md:text-xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-3">
                  Estimates
                </h2>
                <p className="font-body text-gray-600">
                  View AI repair estimates
                </p>

                <div className="mt-4">
                  {estimates.length === 0 ? (
                    <p className="font-body text-gray-500">No estimates found.</p>
                  ) : (
                    estimates.slice(0, 3).map((estimate) => (
                      <div
                        key={estimate._id}
                        className="border border-steel rounded p-3 mb-3 bg-white"
                      >
                        <p className="font-body font-semibold">
                          {estimate.damageDescription}
                        </p>
                        <p className="font-body text-sm">
                          Estimated Cost: ${estimate.aiEstimateAmount}
                        </p>
                        <p className="font-body text-sm">
                          Status: {estimate.status}
                        </p>
                      </div>
                    ))
                  )}

                  {estimates.length > 3 && (
                    <p className="font-body text-electric mt-2">
                      View All →
                    </p>
                  )}
                </div>
              </div>
            </Link>

            {/* Appointments Card */}
            <Link to="/appointments">
              <div className="bg-gray-100 shadow rounded-md p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-steel">
                <h2 className="font-heading text-lg md:text-xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-3">
                  Appointments
                </h2>
                <p className="font-body text-gray-600">
                  Manage your scheduled repair appointments
                </p>
              </div>
            </Link>

            {/* Repair Status Card */}
            <Link to="/repair-status">
              <div className="bg-gray-50 shadow rounded-md p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-steel">
                <h2 className="font-heading text-lg md:text-xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-3">
                  Repair Status
                </h2>
                <p className="font-body text-gray-600">
                  Track your vehicle’s repair progress
                </p>

                <div className="mt-4">
                  {appointments.length === 0 ? (
                    <p className="font-body text-gray-500">No appointments found.</p>
                  ) : (
                    appointments.map((appointment) => (
                      <div
                        key={appointment._id}
                        className="border border-steel rounded p-4 mb-4 bg-white"
                      >
                        <p className="font-body font-semibold">
                          {appointment.vehicleId?.make}{" "}
                          {appointment.vehicleId?.model}
                        </p>

                        <p className="font-body text-sm">
                          Status:{" "}
                          <span className="text-electric font-semibold">
                            {appointment.status}
                          </span>
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Link>

            {/* My Garage Card */}
            <Link to="/vehicles">
              <div className="bg-gray-100 shadow rounded-md p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-steel">
                <h2 className="font-heading text-lg md:text-xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-3">
                  My Garage
                </h2>
                <p className="font-body text-gray-600">
                  Manage your saved vehicles
                </p>
              </div>
            </Link>

          </div>
        </div>

      </div>

      <footer className="bg-black text-white text-center py-6 mt-10">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>
    </div>
  );
}

export default DashboardPage;
