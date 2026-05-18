import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function EstimatePage() {

  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const [damageDescription, setDamageDescription] =
    useState("");

  const [estimate, setEstimate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await API.post(
        "/estimates",
        {
          damageDescription,
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
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
    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-6">
        AI Damage Estimate
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow"
      >

        <textarea
          rows="6"
          placeholder="Describe vehicle damage..."
          className="w-full border p-4 rounded mb-4"
          value={damageDescription}
          onChange={(e) =>
            setDamageDescription(e.target.value)
          }
        />

        <button
         disabled={loading}
          className={`w-full p-3 rounded text-white ${
           loading ? "bg-gray-500" : "bg-black"
        }`}
      >
        {loading ? "Loading..." : "Generate Estimate"}
      </button>

      </form>

      {estimate && (

        <div className="bg-white p-6 rounded-lg shadow mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Estimate Result
          </h2>

          <p className="mb-4 whitespace-pre-wrap">
            {estimate.aiSummary}
          </p>

          <p className="font-bold text-xl">
            Estimated Cost:
            {" "}
            ${estimate.aiEstimateAmount}
          </p>

        </div>
      )}

    </div>
  );
}

export default EstimatePage;