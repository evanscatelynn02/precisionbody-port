import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function AdminEstimatesPage() {
  const { user } = useContext(AuthContext);
  const [estimates, setEstimates] = useState([]);

  // Fetch all estimates (Admin)
  const fetchEstimates = async () => {
    try {
      const res = await API.get("/admin/estimates", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setEstimates(res.data);
    } catch (err) {
      console.error("Error fetching estimates:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchEstimates();
    }
  }, [user?.token]);

  // Update Estimate Status (Admin)
  const updateEstimateStatus = async (estimateId, status) => {
    try {
      await API.put(
        `/admin/estimates/${estimateId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      fetchEstimates(); // Refresh list
    } catch (error) {
      console.error("Error updating estimate:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-6 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">

        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Admin Estimates
        </h1>

        {/* Estimates List */}
        {estimates.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">No estimates found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {estimates.map((est) => (
              <div
                key={est._id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <p className="font-semibold text-lg mb-1">
                  {est.damageDescription}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Estimated Cost:</span>{" "}
                  ${est.aiEstimateAmount}
                </p>

                <p className="text-gray-700 mb-3">
                  <span className="font-medium">Status:</span>{" "}
                  {est.status}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-2">

                  <button
                    onClick={() =>
                      updateEstimateStatus(est._id, "Approved")
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateEstimateStatus(est._id, "Rejected")
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    Reject
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminEstimatesPage;
