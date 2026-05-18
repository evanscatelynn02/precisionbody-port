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

        <div className="bg-white p-6 rounded-1g shadow mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Repair Status
          </h2>

          <div className="border rounded p-4">

            <p className="font-semibold">
              Vehicle:
              {" "}
              Honda Civic
            </p>

            <p>
              Status:
              {" "}
              <span className="text-blue-600">
              </span>
            </p>

          </div>
          
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;