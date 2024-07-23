import React, { useState } from "react";
import Swal from "sweetalert2";
import ApiService from "../lib/helpers/api.service";
import { AppColors } from "../lib/helpers/colors";
import { CircularProgress } from "@mui/material";

const AddHubAdmin = () => {
  const [formData, setFormData] = useState({
    hubName: "",
    password: "",
    role: "hubadmin",
    mobile: "",
    email: "",
    gender: "",
    location: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    status: 0,
    longitude: 0,
    latitude: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await ApiService.addAdmin(formData);

      if (response && response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Hub Admin added successfully!",
          confirmButtonColor: AppColors.appBlue,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Something went wrong.",
          confirmButtonColor: AppColors.appBlue,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: AppColors.appBlue,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div
        className="bg-white p-6 rounded-lg shadow-md"
        style={{ color: AppColors.appLight }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: AppColors.appBlue }}
        >
          Add Hub Admin
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {Object.keys(formData).map((key) => {
              if (key === "role") {
                return (
                  <div key={key} className="col-span-2 mb-4">
                    <label className="block text-gray-700 mb-1">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded text-gray-900"
                      readOnly
                    />
                  </div>
                );
              }
              return (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded text-gray-900"
                    required
                  />
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            style={{ backgroundColor: AppColors.appBlue }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHubAdmin;
