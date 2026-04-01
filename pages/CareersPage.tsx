import React, { useState } from "react";

const CareersPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application Data:", formData);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE CONTENT */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Build Your Career with Vehga 🚀
          </h1>

          <p className="text-gray-600 mt-4">
            At Vehga Inspections, we are transforming the vehicle valuation
            industry with technology and expertise. Join a team that values
            innovation, integrity, and growth.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>✔ Work with industry experts</li>
            <li>✔ Learn cutting-edge valuation tools</li>
            <li>✔ Grow your professional career</li>
            <li>✔ Be part of a fast-growing company</li>
          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Apply Now
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Submit Application
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;