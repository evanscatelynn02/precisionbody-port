import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/BackButton";

function EstimatesListPage() {
  const { user } = useContext(AuthContext);
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const res = await API.get("/estimates", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEstimates(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstimates();
  }, [user?.token]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-4xl mx-auto w-full">

        <BackButton to="/dashboard" label="Back to Dashboard" />

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-4">
          My Estimates
        </h1>

        {estimates.length === 0 ? (
          <p className="font-body text-gray-500">No estimates found.</p>
        ) : (
          <div className="space-y-4">
            {estimates.map((estimate) => (
              <Link
                key={estimate._id}
                to={`/estimates/${estimate._id}`}
                className="block border border-steel p-4 rounded-md bg-white shadow hover:shadow-lg transition"
              >
                <p className="font-body font-semibold text-gunmetal">
                  {estimate.damageDescription}
                </p>
                <p className="font-body text-sm">
                  Estimated Cost: ${estimate.aiEstimateAmount}
                </p>
                <p className="font-body text-sm">
                  Status: {estimate.status}
                </p>
              </Link>
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

export default EstimatesListPage;
