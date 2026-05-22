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
    <nav className="bg-black text-white px-8 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
       
        <h1 className="text-2xl font-bold">
          PrecisionBody Port
        </h1>

        <div className="flex gap-6">
          <Link to="/">Home</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              {/* Show Dashboard for users, Admin Dashboard for admins */}
              {user?.role === "admin" ? (
                <Link to="/admin">Admin Dashboard</Link>
              ) : (
                <Link to="/dashboard">Dashboard</Link>
              )}

              {/* User‑only links */}
              {user?.role !== "admin" && (
                <>
                  <Link to="/booking">Booking</Link>
                  <Link to="/estimate">Estimate</Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="text-red-400"
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
