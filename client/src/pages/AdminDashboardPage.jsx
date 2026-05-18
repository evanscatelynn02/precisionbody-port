import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function AdminDashboardPage() {

  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">
            Appointments
          </h2>

          <p>
            Manage incoming bookings
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">
            Estimates
          </h2>

          <p>
            Review AI repair estimates
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-2">
            Customers
          </h2>

          <p>
            Manage registered users
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white shadow rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-4">
          Logged In Admin
        </h2>

        <p>
          {user?.firstName}
        </p>

        <p className="text-gray-500">
          Role:
          {" "}
          {user?.role}
        </p>

      </div>

    </div>
  );
}

export default AdminDashboardPage;