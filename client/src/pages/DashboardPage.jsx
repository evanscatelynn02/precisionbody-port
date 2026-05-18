import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function DashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">Dashboard</h1>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <p className="text-lg">Welcome, {user?.name}</p>

          <p className="text-gray-600 mt-2">
            Manage estimates, bookings, and repair updates here.
          </p>

          {/* ⭐ Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">

            {/* Estimates Card */}
            <div className="bg-white shadow rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold">Estimates</h2>
              <p className="text-gray-500 mt-2">
                View AI repair estimates
              </p>
            </div>

            {/* Appointments Card */}
            <div className="bg-white shadow rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold">Appointments</h2>
              <p className="text-gray-500 mt-2">
                Manage your scheduled repair appointments
              </p>
            </div>

            {/* Repair Status Card */}
            <div className="bg-white shadow rounded-lg p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold">Repair Status</h2>
              <p className="text-gray-500 mt-2">
                Track your vehicle’s repair progress
              </p>

              {/* Example Status Box */}
              <div className="border rounded p-4 mt-4">
                <p className="font-semibold">Vehicle: Honda Civic</p>
                <p>
                  Status:{" "}
                  <span className="text-blue-600">In Progress</span>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <footer className="bg-black text-white text-center py-6 mt-20">
        <p>
            PrecisionBody Port © 2026
        </p>
      </footer>
      
    </div>
  );
}

export default DashboardPage;
