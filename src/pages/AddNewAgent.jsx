import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../lib/helpers/api.service";
import frontImage from "../assets/images/front.png";
import backImage from "../assets/images/back.png";
import Swal from "sweetalert2";
import { AppColors } from "../lib/helpers/colors";
import { HiTrash } from "react-icons/hi";
import Loader from "../lib/helpers/Loader";
import {
  DocumentImage,
  FileInput,
  InputField,
  PhoneInput,
  SelectField,
} from "../components/shared/CustomInput";

const AddAgent = () => {
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const agentId = new URLSearchParams(location.search).get("agentId");

  useEffect(() => {
    setIsAgent(Boolean(agentId));
    setAgentData(location.state?.agentData ?? {});
  }, [agentId, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAgentData((prevData) => ({
      ...prevData,
      documentImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const response = isAgent
      //   ? await ApiService.updateAgent(agentId, agentData)
      //   : await ApiService.addAgent(agentData);
      const response = await ApiService.addAgent(agentData);

      if (response?.data?.success) {
        Swal.fire(
          "Success",
          `Agent ${isAgent ? "updated" : "added"} successfully`,
          "success"
        );
        navigate("/agent");
      } else {
        throw new Error(response?.data?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Save Agent error:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAgent = async (e) => {
    // try {
    //   setLoading(true);
    //   const response = await ApiService.deleteAgent(agentId);
    //   if (response && response.data && response.data.success) {
    //     Swal.fire("Success", "Agent deleted successfully", "success");
    //     navigate("/agent");
    //   } else {
    //     Swal.fire("Error", "Failed to delete agent", "error");
    //   }
    // } catch (error) {
    //   console.error("Delete Agent error:", error);
    //   Swal.fire("Error", "An error occurred. Please try again later.", "error");
    // } finally {
    //   setLoading(false);
    // }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="p-8 m-5 rounded-lg shadow-lg w-full max-w-5xl overflow-y-auto"
        style={{ backgroundColor: AppColors.appLightGrey }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-6">Basic Info</h2>
          {isAgent && (
            <button
              type="button"
              className="ml-2 px-2 py-2"
              onClick={handleDeleteAgent}
            >
              <HiTrash style={{ fontSize: 26, color: AppColors.appRed }} />
            </button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <ProfileImage />
          {isAgent && <AgentId agentId={agentId} />}
        </div>
        <form onSubmit={handleSubmit}>
          <AgentForm
            agentData={agentData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
          <FormActions
            isAgent={isAgent}
            loading={loading}
            navigate={navigate}
          />
        </form>
      </div>
    </div>
  );
};

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <svg
          className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const ProfileImage = () => (
  <div className="flex items-center mb-4">
    <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
      <img
        src={"https://via.placeholder.com/150"}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
    <button
      type="button"
      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
      style={{ backgroundColor: AppColors.appBlue }}
    >
      <label htmlFor="profile">
        <input
          type="file"
          id="profile"
          name="profile"
          style={{ display: "none" }}
        />
        Upload Photo
      </label>
    </button>
  </div>
);

const AgentId = ({ agentId }) => (
  <div>
    <label className="block text-gray-700">Agent ID: {agentId}</label>
  </div>
);

const AgentForm = ({ agentData, handleInputChange, handleFileChange }) => {
  const indianStates = [
    { label: "Andhra Pradesh", value: "Andhra Pradesh" },
    { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { label: "Assam", value: "Assam", abb: "AS" },
    { label: "Bihar", value: "Bihar", abb: "BR" },
    { label: "Chhattisgarh", value: "Chhattisgarh", abb: "CG" },
    { label: "Goa", value: "Goa", abb: "GA" },
    { label: "Gujarat", value: "Gujarat", abb: "GJ" },
    { label: "Haryana", value: "Haryana", abb: "HR" },
    { label: "Himachal Pradesh", value: "Himachal Pradesh", abb: "HP" },
    { label: "Jharkhand", value: "Jharkhand", abb: "JH" },
    { label: "Karnataka", value: "Karnataka", abb: "KA" },
    { label: "Kerala", value: "Kerala", abb: "KL" },
    { label: "Madhya Pradesh", value: "Madhya Pradesh", abb: "MP" },
    { label: "Maharashtra", value: "Maharashtra", abb: "MH" },
    { label: "Manipur", value: "Manipur", abb: "MN" },
    { label: "Meghalaya", value: "Meghalaya", abb: "ML" },
    { label: "Mizoram", value: "Mizoram", abb: "MZ" },
    { label: "Nagaland", value: "Nagaland", abb: "NL" },
    { label: "Odisha", value: "Odisha", abb: "OR" },
    { label: "Punjab", value: "Punjab", abb: "PB" },
    { label: "Rajasthan", value: "Rajasthan", abb: "RJ" },
    { label: "Sikkim", value: "Sikkim", abb: "SK" },
    { label: "Tamil Nadu", value: "Tamil Nadu", abb: "TN" },
    { label: "Telangana", value: "Telangana", abb: "TG" },
    { label: "Tripura", value: "Tripura", abb: "TR" },
    { label: "Uttar Pradesh", value: "Uttar Pradesh", abb: "UP" },
    { label: "Uttarakhand", value: "Uttarakhand", abb: "UK" },
    { label: "West Bengal", value: "West Bengal", abb: "WB" },
    {
      label: "Andaman and Nicobar Islands",
      value: "Andaman and Nicobar Islands",
      abb: "AN",
    },
    { label: "Chandigarh", value: "Chandigarh", abb: "CH" },
    {
      label: "Dadra and Nagar Haveli and Daman and Diu",
      value: "Dadra and Nagar Haveli and Daman and Diu",
      abb: "DN",
    },
    { label: "Delhi", value: "Delhi", abb: "DL" },
    { label: "Lakshadweep", value: "Lakshadweep", abb: "LD" },
    { label: "Puducherry", value: "Puducherry", abb: "PY" },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputField
          label="First Name"
          name="firstName"
          value={agentData?.firstName}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Middle Name"
          name="middleName"
          value={agentData?.middleName}
          onChange={handleInputChange}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={agentData?.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <PhoneInput value={agentData?.mobile} onChange={handleInputChange} />
        <InputField
          label="Email ID"
          name="email"
          type="email"
          value={agentData?.email}
          onChange={handleInputChange}
          required
        />
        <SelectField
          label="Gender"
          name="gender"
          value={agentData?.gender}
          onChange={handleInputChange}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputField
          label="Country"
          name="country"
          value={agentData?.country}
          onChange={handleInputChange}
          required
        />
        <SelectField
          label="State"
          name="state"
          value={agentData?.state}
          onChange={handleInputChange}
          options={indianStates}
          required
        />
        <InputField
          label="Town/City"
          name="city"
          value={agentData?.city}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField
          label="Pincode"
          name="pincode"
          value={agentData?.pincode}
          onChange={handleInputChange}
          pattern="[0-9]{6}"
          maxLength={6}
          required
        />
        <InputField
          label="Address Line"
          name="address"
          value={agentData?.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <h2 className="text-2xl font-bold mb-6">Verification Document Upload</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <SelectField
          label="Document Type"
          name="documentType"
          value={agentData?.documentType}
          onChange={handleInputChange}
          options={[
            { value: "Passport", label: "Passport" },
            { value: "Adhaar", label: "Adhaar" },
            { value: "DL", label: "DL" },
          ]}
          required
        />
        <InputField
          label="Document ID"
          name="documentId"
          value={agentData?.documentId}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <DocumentImage src={frontImage} alt="Front" />
        <DocumentImage src={backImage} alt="Back" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <FileInput
          label="Document Upload"
          name="document"
          onChange={handleFileChange}
          required
        />
      </div>
    </div>
  );
};

const FormActions = ({ isAgent, loading, navigate }) => (
  <div className="grid grid-cols-8 gap-4 mb-2">
    <div className="col-span-7 flex justify-end mt-8">
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        style={{ backgroundColor: AppColors.appBlue }}
        disabled={loading || isAgent}
      >
        {loading ? <Loader /> : "Save"}
      </button>
    </div>
    <div className="flex justify-end mt-8">
      <button
        type="button"
        className="px-4 py-2 bg-gray-400 text-white rounded"
        onClick={() => navigate("/agent")}
      >
        Go Back
      </button>
    </div>
  </div>
);

export default AddAgent;
