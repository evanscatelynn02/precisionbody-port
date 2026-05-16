import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">
          PrecisionBody Port
        </h1>

        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/estimate">Estimate</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;