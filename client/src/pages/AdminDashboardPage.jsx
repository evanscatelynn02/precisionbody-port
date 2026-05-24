import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminDashboardPage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-asphalt flex flex-col justify-between">
      <div className="max-w-7xl mx-auto p-4 md:p-6 w-full">

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

          <Link to="/admin/appointments">
            <div className="bg-white shadow rounded-md p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-steel">
              <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-2">
                Appointments
              </h2>
              <p className="font-body text-gray-600">Manage incoming bookings</p>
            </div>
          </Link>

          <Link to="/admin/estimates">
            <div className="bg-white shadow rounded-md p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-steel">
              <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-2">
                Estimates
              </h2>
              <p className="font-body text-gray-600">Manage AI repair estimates</p>
            </div>
          </Link>

          <Link to="/admin/customers">
            <div className="bg-white shadow rounded-md p-4 md:p-6 hover:shadow-lg transition cursor-pointer border border-steel">
              <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-2">
                Customers
              </h2>
              <p className="font-body text-gray-600">Manage registered users</p>
            </div>
          </Link>

        </div>

        <div className="mt-10 bg-white shadow rounded-md p-4 md:p-6 border border-steel">
          <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-4">
            Logged In Admin
          </h2>

          <p className="font-body text-gunmetal">{user?.firstName}</p>
          <p className="font-body text-gray-500">
            Role: {user?.role}
          </p>
        </div>

      </div>

      <footer className="bg-black text-white text-center py-6 mt-10">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>
    </div>
  );
}

export default AdminDashboardPage;
