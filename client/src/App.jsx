import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import BookingPage from "./pages/BookingPage";
import EstimatePage from "./pages/EstimatePage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/booking" element={<BookingPage />} />

        <Route path="/estimate" element={<EstimatePage />} />
      </Routes>

    </div>
  );
}

export default App;
