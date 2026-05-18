import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);

      login(response.data);
      alert("Login successful");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 p-4 flex flex-col justify-between">
      <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-lg shadow w-full">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">Login</h1>

        <form onSubmit={handleSubmit}>

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

          <button
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading ? "bg-gray-500" : "bg-black"
            }`}
          >
            {loading ? "Processing..." : "Login"}
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

export default LoginPage;
