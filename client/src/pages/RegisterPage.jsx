import { useState } from "react";
import API from "../services/api";

function RegisterPage() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, phoneNumber } = formData;

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/register", formData);

      alert("Registration successful");
      console.log(response.data);

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-between">
      <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-lg shadow w-full">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">Register</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading ? "bg-gray-500" : "bg-black"
            }`}
          >
            {loading ? "Processing..." : "Register"}
          </button>

        </form>
      </div>

      <footer className="bg-black text-white text-center py-6 mt-20">
        <p>
            PrecisionBody Port © 2026
        </p>
      </footer>
      
    </div>
  );
}

export default RegisterPage;
