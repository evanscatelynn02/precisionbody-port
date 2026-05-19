function AdminAppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Manage Appointments
        </h1>

        <div className="bg-white shadow rounded-lg p-4 md:p-6 overflow-x-auto">

          <table className="w-full min-w-125">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Customer</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-4">Demo Customer</td>
                <td>May 20</td>
                <td>Scheduled</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

      <footer className="bg-black text-white text-center py-6 mt-20">
        <p>
            PrecisionBody Port © 2026
        </p>
      </footer>

    </div>
  );
}

export default AdminAppointmentsPage;
