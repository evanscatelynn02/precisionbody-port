import { Link } from "react-router-dom";

function BackButton({ to, label }) {
  return (
    <Link
      to={to}
      className="inline-block mb-4 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-gray-900 rounded transition"
    >
      ← {label}
    </Link>
  );
}

export default BackButton;
