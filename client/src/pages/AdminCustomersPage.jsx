import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function AdminCustomersPage() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Fetch all customers (Admin)
  const fetchCustomers = async () => {
    try {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCustomers();
    }
  }, [user?.token]);

  // Delete Customer (Admin)
  const deleteCustomer = async (customerId) => {
    try {
      await API.delete(`/admin/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      fetchCustomers(); // Refresh list
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 md:p-6 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">

        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Customers
        </h1>

        {/* Users List */}
        {users.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">No customers found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((customer) => (
              <div
                key={customer._id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <p className="font-semibold text-lg">
                  {customer.firstName} {customer.lastName}
                </p>

                <p className="text-gray-700">{customer.email}</p>

                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">Role:</span> {customer.role}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete Customer
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminCustomersPage;
