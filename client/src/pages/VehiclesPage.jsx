import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

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
    <div className="min-h-screen bg-gray-200 p-4 md:p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">

        {/* Page Header */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">My Garage</h1>

          {/* Vehicle Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="make"
              placeholder="Make"
              value={formData.make}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />

            <input
              type="text"
              name="model"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />

            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />

            <input
              type="text"
              name="vin"
              placeholder="VIN"
              value={formData.vin}
              onChange={handleChange}
              className="border p-3 rounded w-full md:col-span-2"
            />

            <button className="bg-black text-white p-3 rounded w-full md:col-span-2 hover:bg-gray-800 transition">
              Save Vehicle
            </button>
          </form>
        </div>

        {/* Saved Vehicles */}
        <div className="bg-white p-6 rounded-lg shadow mt-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Saved Vehicles</h2>

          {vehicles.length === 0 ? (
            <p className="text-gray-600">No vehicles added yet.</p>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle._id}
                  className="border p-4 rounded-lg bg-gray-50"
                >
                  <p className="font-semibold text-lg">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-medium">Color:</span> {vehicle.color}
                  </p>

                  <p className="text-gray-700">
                    <span className="font-medium">VIN:</span> {vehicle.vin}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default VehiclesPage;
