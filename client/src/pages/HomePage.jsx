import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-asphalt text-white flex flex-col">

      {/* HERO SECTION */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1581091870627-3f9c1c6f5f3b"
          alt="Car being repaired"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h1 className="font-heading text-5xl md:text-7xl tracking-wide uppercase mb-4">
              Precision Auto Body Repair
            </h1>

            <p className="font-body text-lg md:text-2xl text-gray-200 max-w-xl mb-6">
              AI-powered repair estimates and seamless appointment scheduling.
            </p>

            <Link
              to="/estimate"
              className="inline-block bg-electric text-white px-6 md:px-8 py-3 md:py-4 rounded-md font-heading tracking-wide uppercase bg-gray-500 hover:bg-blue-600 transition"
            >
              Get Estimate
            </Link>
          </div>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 py-10">
        <h2 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-gunmetal border-b-4 border-electric pb-2 mb-6 bg-black inline-block px-2">
          Why Choose PrecisionBody Port
        </h2>

        <p className="font-body text-black text-lg leading-relaxed">
          We combine cutting-edge AI technology with expert craftsmanship to deliver fast,
          accurate repair estimates and a smooth booking experience. Whether you’re dealing
          with collision damage, paint issues, or full restorations, we’ve got you covered.
        </p>
      </div>

      <footer className="bg-black text-white text-center py-6 mt-auto">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>
    </div>
  );
}

export default HomePage;
