import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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

      const role = response.data.user?.role || response.data.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-asphalt p-4 flex flex-col justify-between">
      <div className="max-w-md mx-auto bg-gray-300 p-6 md:p-8 rounded-lg shadow w-full">

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-gunmetal mb-6 border-b-4 border-electric pb-2">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="font-body">

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

          <button
            disabled={loading}
            className={`w-full p-3 rounded text-white font-heading tracking-wide uppercase ${
              loading ? "bg-gray-400" : "bg-gray-500 hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Processing..." : "Login"}
          </button>

          <p className="font-body text-gray-700 text-center mt-4">
            New user?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:underline"
            >
              Register Here
            </Link>
          </p>

        </form>
      </div>

      <footer className="bg-black text-white text-center py-6 mt-10">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>
    </div>
  );
}

export default LoginPage;
