import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/BackButton";

function EstimateDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        const res = await API.get(`/estimates/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEstimate(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstimate();
  }, [id, user?.token]);

  if (!estimate)
    return (
      <p className="p-6 font-body text-white">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-3xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow border border-steel w-full">

        <BackButton to="/estimates" label="Back to Estimates" />

        <h1 className="font-heading text-2xl md:text-3xl tracking-wide uppercase text-gunmetal mb-4 border-b-4 border-electric pb-2">
          Estimate Details
        </h1>

        <p className="font-body text-lg font-semibold mb-2">
          {estimate.damageDescription}
        </p>

        <p className="font-body mb-2">
          <span className="font-semibold">Estimated Cost:</span>{" "}
          ${estimate.aiEstimateAmount}
        </p>

        <p className="font-body mb-2">
          <span className="font-semibold">Status:</span>{" "}
          {estimate.status}
        </p>

        {estimate.vehicleId && (
          <p className="font-body mb-2">
            <span className="font-semibold">Vehicle:</span>{" "}
            {estimate.vehicleId.year} {estimate.vehicleId.make}{" "}
            {estimate.vehicleId.model}
          </p>
        )}

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default EstimateDetailsPage;
