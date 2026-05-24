import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

function ServicesPage() {
  const services = [
    {
      title: "Collision Repair",
      desc: "Full structural and cosmetic repair after accidents.",
    },
    {
      title: "Dent Removal",
      desc: "Paintless dent repair and traditional dent correction.",
    },
    {
      title: "Auto Painting",
      desc: "Color matching, refinishing, and full-body repainting.",
    },
    {
      title: "Frame Straightening",
      desc: "Precision frame alignment using industry-grade equipment.",
    },
    {
      title: "Glass Replacement",
      desc: "Windshield, window, and mirror replacement.",
    },
    {
      title: "Bumper Repair",
      desc: "Plastic, fiberglass, and metal bumper restoration.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-6xl mx-auto w-full">

        <h1 className="font-heading text-4xl tracking-wide uppercase text-black mb-2">
          Our Services
        </h1>

        <p className="font-body text-gray-700 mb-6 text-lg">
          Use our AI estimator to get a fast, accurate estimate for any of these services.
        </p>

        <Link
          to="/estimate"
          className="inline-block bg-gray-500 text-white px-6 py-3 rounded font-heading tracking-wide uppercase hover:bg-blue-600 transition mb-10"
        >
          Get an Estimate
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow border border-steel hover:shadow-lg transition"
            >
              <h2 className="font-heading text-2xl text-gunmetal border-b-4 border-electric pb-2 mb-3">
                {service.title}
              </h2>
              <p className="font-body text-gray-700 mb-4">{service.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default ServicesPage;
