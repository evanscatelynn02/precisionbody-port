import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Smart Auto Body Repair Booking
        </h1>

        <p className="text-lg md:text-xl text-gray-700 mb-8">
          AI-powered repair estimates and appointment scheduling for modern auto body shops.
        </p>

        <Link
          to="/estimate"
          className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-lg font-semibold"
        >
          Get Estimate
        </Link>

      </div>

      <footer className="bg-black text-white text-center py-6 mt-20">
        <p>
            PrecisionBody Port © 2026
        </p>
      </footer>
      
    </div>
  );
}

export default HomePage;
