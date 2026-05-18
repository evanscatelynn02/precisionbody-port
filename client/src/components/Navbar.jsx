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
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/booking">Booking</Link>
              <Link to="/estimate">Estimate</Link>

              {user?.role === "admin" && (
                <Link to="/admin">Admin</Link>
              )}

              <button onClick={handleLogout} className="text-red-400">
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