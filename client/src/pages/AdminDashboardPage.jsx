import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminDashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Appointments</h2>
            <p>Manage incoming bookings</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Estimates</h2>
            <p>Review AI repair estimates</p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Customers</h2>
            <p>Manage registered users</p>
          </div>

        </div>

        <div className="mt-10 bg-white shadow rounded-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Logged In Admin</h2>

          <p>{user?.firstName}</p>
          <p className="text-gray-500">
            Role: {user?.role}
          </p>
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

export default AdminDashboardPage;
