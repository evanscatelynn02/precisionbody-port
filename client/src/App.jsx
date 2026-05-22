import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import BookingPage from "./pages/BookingPage";
import EstimatePage from "./pages/EstimatePage";
import VehiclesPage from "./pages/VehiclesPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import RepairStatusPage from "./pages/RepairStatusPage";

import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

import AdminRoute from "./components/AdminRoute";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminAppointmentsPage from "./pages/AdminAppointmentsPage";
import AdminEstimatesPage from "./pages/AdminEstimatesPage";
import AdminCustomersPage from "./pages/AdminCustomersPage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={
          user?.role === "admin"
          ? <Navigate to="/admin" replace />
          : <DashboardPage />
        } />

        <Route path="/booking" element={<BookingPage />} />

        <Route path="/estimate" element={<EstimatePage />} />

        <Route path="/vehicles" element={<VehiclesPage />} />

        <Route path="/appointments" element={<AppointmentsPage />} />

        <Route path="/repair-status" element={<RepairStatusPage />} />

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

        {/* Admin Estimates Page */}
        <Route
          path="/admin/estimates"
          element={
            <AdminRoute user={user}>
              <AdminEstimatesPage />
            </AdminRoute>
          }
        />

        {/* Admin Customers Page */}
        <Route
          path="/admin/customers"
          element={
            <AdminRoute user={user}>
              <AdminCustomersPage />
            </AdminRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;
