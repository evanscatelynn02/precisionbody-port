import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function EstimatePage() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [damageDescription, setDamageDescription] = useState("");
  const [estimate, setEstimate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!damageDescription.trim()) {
      alert("Please describe the vehicle damage");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        "/estimates",
        { damageDescription },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setEstimate(response.data);
    } catch (error) {
      console.error(error);
      alert("Estimate failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-3xl mx-auto w-full">

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-4">
          AI Damage Estimate
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 md:p-6 rounded-lg shadow border border-steel"
        >
          <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b-4 border-electric pb-2 mb-4">
            Describe the Damage
          </h2>

          <textarea
            rows="6"
            placeholder="Describe vehicle damage..."
            className="w-full border border-steel p-3 rounded mb-4 font-body"
            value={damageDescription}
            onChange={(e) => setDamageDescription(e.target.value)}
          />

          <button
            disabled={loading}
            className={`w-full p-3 rounded text-white font-heading tracking-wide uppercase ${
              loading ? "bg-gray-500" : "bg-black hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Processing..." : "Generate Estimate"}
          </button>
        </form>

        {estimate && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-steel mt-8">
            <h2 className="font-heading text-xl md:text-2xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-4">
              AI Estimate Result
            </h2>

            <p className="font-body mb-4 whitespace-pre-wrap">
              {estimate.aiSummary}
            </p>

            <p className="font-heading text-2xl text-fire">
              Estimated Cost: ${estimate.aiEstimateAmount}
            </p>
          </div>
        )}

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default EstimatePage;
