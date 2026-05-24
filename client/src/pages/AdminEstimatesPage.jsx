import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/BackButton";

function AdminEstimatesPage() {
  const { user } = useContext(AuthContext);
  const [estimates, setEstimates] = useState([]);

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

      fetchEstimates();
    } catch (error) {
      console.error("Error updating estimate:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-5xl mx-auto w-full">

        <BackButton to="/admin" label="Back to Admin Dashboard" />

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-6">
          Admin Estimates
        </h1>

        {estimates.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow border border-steel">
            <p className="font-body text-gray-600">No estimates found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {estimates.map((est) => (
              <div
                key={est._id}
                className="bg-white p-6 rounded-lg shadow border border-steel"
              >
                <p className="font-body font-semibold text-lg mb-1 text-gunmetal">
                  {est.damageDescription}
                </p>

                <p className="font-body text-gray-700">
                  <span className="font-semibold">Estimated Cost:</span>{" "}
                  ${est.aiEstimateAmount}
                </p>

                <p className="font-body text-gray-700 mb-3">
                  <span className="font-semibold">Status:</span>{" "}
                  {est.status}
                </p>

                <div className="flex flex-wrap gap-3 mt-2">

                  <button
                    onClick={() =>
                      updateEstimateStatus(est._id, "Approved")
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded font-heading tracking-wide uppercase hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateEstimateStatus(est._id, "Rejected")
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded font-heading tracking-wide uppercase hover:bg-red-700 transition"
                  >
                    Reject
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default AdminEstimatesPage;
