import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import BookingPage from "./pages/BookingPage";
import EstimatePage from "./pages/EstimatePage";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import AdminRoute from "./components/AdminRoute";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminAppointmentsPage from "./pages/AdminAppointmentsPage";

function App() {
  const { user } = useContext(AuthContext);

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

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        {/* Admin Appointments Page */}
        <Route
          path="/admin/appointments"
          element={
            <AdminRoute user={user}>
              <AdminAppointmentsPage />
            </AdminRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;
