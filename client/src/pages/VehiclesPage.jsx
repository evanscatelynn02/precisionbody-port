import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/BackButton";

function VehiclesPage() {
  const { user } = useContext(AuthContext);

  const [vehicles, setVehicles] = useState([]);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    vin: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchVehicles = async () => {
      try {
        const response = await API.get("/vehicles", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setVehicles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicles();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/vehicles", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setVehicles([...vehicles, response.data]);

      setFormData({
        make: "",
        model: "",
        year: "",
        color: "",
        vin: "",
      });

      alert("Vehicle added");
    } catch (error) {
      console.error(error);
      alert("Failed to add vehicle");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-4xl mx-auto w-full">

        <BackButton to="/dashboard" label="Back to Dashboard" />

        <div className="bg-white p-6 rounded-lg shadow border border-steel">
          <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-gunmetal mb-4 border-b-4 border-electric pb-2">
            My Garage
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body"
          >
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={formData.make}
              onChange={handleChange}
              className="border border-steel p-3 rounded w-full"
            />

            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              className="border border-steel p-3 rounded w-full"
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="border border-steel p-3 rounded w-full"
            />

            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              className="border border-steel p-3 rounded w-full"
            />

            <input
              type="text"
              name="vin"
              placeholder="VIN"
              value={formData.vin}
              onChange={handleChange}
              className="border border-steel p-3 rounded w-full md:col-span-2"
            />

            <button className="bg-electric text-white p-3 rounded w-full md:col-span-2 font-heading tracking-wide uppercase bg-black hover:bg-blue-600 transition">
              Save Vehicle
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-steel mt-8">
          <h2 className="font-heading text-2xl md:text-3xl tracking-wide uppercase text-gunmetal border-b border-steel pb-2 mb-4">
            Saved Vehicles
          </h2>

          {vehicles.length === 0 ? (
            <p className="font-body text-gray-600">No vehicles added yet.</p>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="border border-steel p-4 rounded-lg bg-gray-50"
                >
                  <p className="font-body font-semibold text-lg">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>

                  <p className="font-body text-gray-700">
                    <span className="font-semibold">Color:</span> {vehicle.color}
                  </p>

                  <p className="font-body text-gray-700">
                    <span className="font-semibold">VIN:</span> {vehicle.vin}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default VehiclesPage;
