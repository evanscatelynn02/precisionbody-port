import { useState } from "react";
import API from "../services/api";

function RegisterPage() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/register",
        formData
      );

      alert("Registration successful");

      console.log(response.data);

    } catch (error) {

      console.error(error);

      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="firstName"
         placeholder="First Name"
          className="w-full border p-3 mb-4 rounded"
         onChange={handleChange}
        />

        <input
         type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
         type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Register
        </button>

      </form>
    </div>
  );
}

export default RegisterPage;