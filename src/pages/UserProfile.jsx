import React, { useState } from "react";
import profileImg from "../assets/images/profile.png";

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState("accountDetails");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="tabs mb-5 flex justify-center">
        <button
          className={`tab ${
            selectedTab === "accountDetails" ? "tab-active" : ""
          } py-2 px-4 mx-2 rounded-full text-white font-semibold`}
          onClick={() => handleTabClick("accountDetails")}
          style={{
            background:
              selectedTab === "accountDetails"
                ? "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 100%)"
                : "linear-gradient(90deg, rgba(96,165,250,1) 0%, rgba(59,130,246,1) 100%)",
          }}
        >
          Account Details
        </button>
        <button
          className={`tab ${
            selectedTab === "updatePassword" ? "tab-active" : ""
          } py-2 px-4 mx-2 rounded-full text-white font-semibold`}
          onClick={() => handleTabClick("updatePassword")}
          style={{
            background:
              selectedTab === "updatePassword"
                ? "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 100%)"
                : "linear-gradient(90deg, rgba(96,165,250,1) 0%, rgba(59,130,246,1) 100%)",
          }}
        >
          Update Password
        </button>
      </div>

      {selectedTab === "accountDetails" && <AccountDetails />}
      {selectedTab === "updatePassword" && <UpdatePassword />}
    </div>
  );
};

const AccountDetails = () => (
  <div className="account-details">
    <div className="profile flex items-center mb-5">
      <img
        src={profileImg}
        alt="profile"
        className="rounded-full w-20 h-20 mr-4"
      />
      <div>
        <h4 className="text-xl font-semibold">HubName</h4>
        <p className="text-gray-600">HubRole</p>
      </div>
    </div>

    <div className="contact-details mb-5">
      <h5 className="text-lg font-semibold mb-2">Contact Details</h5>
      <p>
        <strong>Mobile No:</strong> +1234567890
      </p>
      <p>
        <strong>Email:</strong> example@example.com
      </p>
    </div>

    <div className="hub-details">
      <h5 className="text-lg font-semibold mb-2">Hub Details</h5>
      <p>
        <strong>Hub Name:</strong> Example Hub
      </p>
      <p>
        <strong>Pincode:</strong> 123456
      </p>
      <p>
        <strong>Location:</strong> Example Location
      </p>
    </div>
  </div>
);

const UpdatePassword = () => {
  const [userId, setUserId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
    console.log("UserId:", userId);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="update-password">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter User ID"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Old Password
        </label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter Old Password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter New Password"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Update Password
      </button>
    </form>
  );
};

export default UserProfile;
