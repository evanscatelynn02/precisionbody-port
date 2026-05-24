import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white shadow-md border-b border-steel">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">

        {/* BRAND */}
        <Link to="/" className="font-heading text-3xl tracking-wide uppercase hover:text-gray-500 transition">
          PrecisionBody Port
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 font-body text-lg">

          {/* Always show */}
          <Link
            to="/"
            className="hover:text-gray-500 transition"
          >
            Home
          </Link>

          <Link to="/services" className="hover:text-gray-500 transition">
            Services
          </Link>


          {/* Public Links */}
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-500 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-gray-500 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* Authenticated Links */}
          {user && (
            <>
              {/* Dashboard (User or Admin) */}
              {user.role === "admin" ? (
                <Link
                  to="/admin"
                  className="hover:text-gray-500 transition"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="hover:text-gray-500 transition"
                >
                  Dashboard
                </Link>
              )}

              {/* User‑only links */}
              {user.role !== "admin" && (
                <>
                  <Link
                    to="/booking"
                    className="hover:text-gray-500 transition"
                  >
                    Booking
                  </Link>

                  <Link
                    to="/estimate"
                    className="hover:text-gray-500 transition"
                  >
                    Estimate
                  </Link>
                </>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold hover:text-red-900 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
