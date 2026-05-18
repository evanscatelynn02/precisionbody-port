import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function DashboardPage() {

  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <p className="text-lg">
          Welcome,
          {" "}
          {user?.name}
        </p>

        <p className="text-gray-600 mt-2">
          Manage estimates, bookings,
          and repair updates here.
        </p>

      </div>

    </div>
  );
}

export default DashboardPage;