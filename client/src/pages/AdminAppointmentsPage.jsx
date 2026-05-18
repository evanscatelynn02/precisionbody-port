function AdminAppointmentsPage() {

  return (
    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Manage Appointments
      </h1>

      <div className="bg-white shadow rounded-lg p-6">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Customer
              </th>

              <th className="text-left py-3">
                Date
              </th>

              <th className="text-left py-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td className="py-4">
                Demo Customer
              </td>

              <td>
                May 20
              </td>

              <td>
                Scheduled
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminAppointmentsPage;