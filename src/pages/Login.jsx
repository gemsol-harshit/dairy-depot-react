import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ApiService from "../lib/helpers/api.service";
import { AppColors } from "../lib/helpers/colors";
import dairyGoLogo from "../assets/images/dairy_go_logo.png";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await ApiService.login(userId, password);
      if (response && response.data && response.data.success) {
        sessionStorage.setItem("user", JSON.stringify(response.data?.data));
        let userData = JSON.parse(sessionStorage.getItem("user"));
        console.log(
          "userdata",
          userData,
          userData.role,
          userData.role === "superadmin"
        );
        if (userData.role === "superadmin") {
          await hubList();
        }
        // Navigate to dashboard on successful login
        navigate("/dashboard");
      } else {
        // Show error message
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state after API call completes
    }
  };

  const hubList = async () => {
    try {
      const res = await ApiService.getHubList();
      if (res && res.data && res.data.success) {
        sessionStorage.setItem("hubList", JSON.stringify(res.data.data));
      } else {
        alert("Login Failed. Please check HubList API");
      }
    } catch (e) {
      console.error("Login Error", e);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side container */}
      <div
        className="w-1/2 flex items-center justify-center"
        style={{ backgroundColor: AppColors.appBlue }}
      >
        <img src={dairyGoLogo} alt="Dairy Go Logo" className="h-40" />
        {/* <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Dairy Go</h2>
        </div> */}
      </div>

      {/* Right side container */}
      <div className="flex-1">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700">User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your user ID"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="w-full text-white py-2 rounded hover:bg-blue-600"
              style={{ backgroundColor: AppColors.appBlue }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} /> : "Proceed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
