import React, { useState } from "react";

const OrderBillingForm = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    status: "Pending",
    tracking: `TRACK-${Date.now()}`,
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    county: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "firstName" || name === "lastName") {
        const updatedFirstName = name === "firstName" ? value : prev.firstName;
        const updatedLastName = name === "lastName" ? value : prev.lastName;
        return {
          ...prev,
          [name]: value,
          fullName: `${updatedFirstName} ${updatedLastName}`.trim(),
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "A valid email is required.";
    }
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zip || formData.zip.length !== 6) {
      newErrors.zip = "Zip Code must be exactly 6 digits.";
    }
    if (!formData.county) newErrors.county = "County is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form
  className={`max-w-4xl mx-auto p-8 shadow-lg rounded-lg ${
    isDarkMode ? "bg-gray-900 text-teal-100" : "bg-purple-50 text-gray-900"
  }`}
  onSubmit={handleSubmit}
>
  <h2
    className={`text-2xl font-bold mb-6 text-center ${
      isDarkMode ? "text-teal-300" : "text-purple-600"
    }`}
  >
    Order Billing
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[
      { label: "Email", name: "email", type: "email", required: true },
      { label: "First Name", name: "firstName", type: "text", required: true },
      { label: "Last Name", name: "lastName", type: "text", required: true },
      { label: "Full Name", name: "fullName", type: "text", readOnly: true },
      { label: "Status", name: "status", type: "text", readOnly: true },
      { label: "Tracking ID", name: "tracking", type: "text", readOnly: true },
      { label: "Address", name: "address", required: true },
      { label: "Address 2", name: "address2" },
      { label: "City", name: "city", required: true },
      { label: "State", name: "state", required: true },
      { label: "Zip Code", name: "zip", required: true },
      { label: "County", name: "county", required: true },
    ].map((field, idx) => (
      <div key={idx}>
        <label
          className={`block text-sm font-medium mb-1 ${
            isDarkMode ? "text-teal-200" : "text-purple-800"
          }`}
        >
          {field.label} {field.required && "*"}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          readOnly={field.readOnly || false}
          className={`w-full p-3 rounded-md border ${
            errors[field.name]
              ? "border-red-500"
              : isDarkMode
              ? "border-teal-500"
              : "border-purple-300"
          }`}
          style={{
            backgroundColor: isDarkMode ? "#1a202c" : "#faf5ff",
            color: isDarkMode ? "#e2f5f1" : "#322659",
            cursor: field.readOnly ? "default" : "text",
          }}
        />
        {errors[field.name] && (
          <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
        )}
      </div>
    ))}
  </div>

  <button
    type="submit"
    className={`mt-6 w-full py-3 rounded-lg ${
      isDarkMode
        ? "bg-teal-600 text-gray-900 hover:bg-teal-500"
        : "bg-purple-500 text-white hover:bg-purple-600"
    } transition`}
  >
    Submit Order
  </button>
</form>

{showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
    <div
      className={`p-6 rounded-lg shadow-lg text-center ${
        isDarkMode ? "bg-gray-800 text-teal-100" : "bg-purple-50 text-gray-900"
      }`}
    >
      <h2
        className={`text-2xl font-bold ${
          isDarkMode ? "text-teal-400" : "text-purple-600"
        }`}
      >
        🎉 Congratulations!
      </h2>
      <p className="mt-2">
        Your order was successfully submitted, {formData.firstName}!
      </p>
      <button
        onClick={handleCloseModal}
        className={`mt-4 py-2 px-4 rounded-lg ${
          isDarkMode
            ? "bg-teal-600 text-gray-900 hover:bg-teal-500"
            : "bg-purple-500 text-white hover:bg-purple-600"
        } transition`}
      >
        Close
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default OrderBillingForm;
