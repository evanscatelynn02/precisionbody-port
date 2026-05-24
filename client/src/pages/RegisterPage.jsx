import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

      login(response.data);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-asphalt p-4 flex flex-col justify-between">
      <div className="max-w-md mx-auto bg-gray-300 p-6 md:p-8 rounded-lg shadow w-full">

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-gunmetal mb-6 border-b-4 border-electric pb-2">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="font-body">

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full border border-steel p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full border border-steel p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-steel p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-steel p-3 rounded mb-4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full border border-steel p-3 rounded mb-4"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className={`w-full p-3 rounded text-white font-heading tracking-wide uppercase ${
              loading ? "bg-gray-700" : "bg-gray-500 hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Processing..." : "Register"}
          </button>

        </form>
      </div>

      <footer className="bg-black text-white text-center py-6 mt-10">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>
    </div>
  );
}

export default RegisterPage;
