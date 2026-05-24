import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/BackButton";

function AdminCustomersPage() {
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  useEffect(() => {
    if (user?.token) fetchCustomers();
  }, [user?.token]);

  // Delete customer (admins cannot be deleted)
  const deleteCustomer = async (customerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-asphalt p-4 md:p-6">

      <div className="max-w-5xl mx-auto w-full">

        <BackButton to="/admin" label="Back to Admin Dashboard" />

        <h1 className="font-heading text-3xl md:text-4xl tracking-wide uppercase text-black mb-6">
          Customers
        </h1>

        {/* Customer List */}
        <div className="bg-white p-6 rounded-lg shadow border border-steel">
          <h2 className="font-heading text-2xl tracking-wide uppercase text-gunmetal border-b-4 border-electric pb-2 mb-4">
            Registered Users
          </h2>

          {customers.length === 0 ? (
            <p className="font-body text-gray-600">No customers found.</p>
          ) : (
            <div className="space-y-4">
              {customers.map((customer) => (
                <div
                  key={customer._id}
                  className="border border-steel p-4 rounded-lg bg-gray-50"
                >
                  <p className="font-body font-semibold text-lg text-gunmetal">
                    {customer.firstName} {customer.lastName}
                  </p>

                  <p className="font-body text-gray-700">
                    <span className="font-semibold">Email:</span> {customer.email}
                  </p>

                  <p className="font-body text-gray-700">
                    <span className="font-semibold">Role:</span> {customer.role}
                  </p>

                  {/* Delete button (admins cannot be deleted) */}
                  {customer.role !== "admin" && (
                    <button
                      onClick={() => deleteCustomer(customer._id)}
                      className="mt-3 bg-fire text-white px-4 py-2 rounded font-heading tracking-wide uppercase bg-red-600 hover:bg-red-800 transition"
                    >
                      Delete Customer
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <footer className="bg-black text-white text-center py-6">
        <p className="font-body">PrecisionBody Port © 2026</p>
      </footer>

    </div>
  );
}

export default AdminCustomersPage;
