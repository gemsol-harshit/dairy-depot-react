import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AppColors } from "../../lib/helpers/colors";
import { styled } from "@mui/system";
import { Input, Select } from "./styledInput";
// import frontImage from "../components/assets/images/front.png";
// import backImage from "../components/assets/images/back.png";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
  overflowY: "auto", // Make content scrollable
};

const Form = styled("form")`
  @apply flex flex-col gap-4;
`;

const SubmitButton = styled("button")`
  background-color: ${AppColors.appBlue};
  color: ${AppColors.appLight};
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AgentModal = ({ open, handleClose, onSubmit }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    agentId: "",
    mobile: "",
    email: "",
    gender: "",
    address: "",
    pincode: "",
    city: "",
    country: "",
    state: "",
    documentType: "",
    documentId: "",
    documentImage: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
    handleClose(); // Close modal after submission
  };

  const handleProfileImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
    // Add API call to upload the profile image here if necessary
  };

  const renderFormInputs = () => {
    const formFields = Object.keys(formValues).map((key) => {
      if (key === "documentImage") {
        return (
          <div key={key} className="flex-1">
            <label>{key}</label>
            <Input
              type="file"
              name={key}
              onChange={handleFormChange}
              className="block w-full"
              required
            />
          </div>
        );
      } else if (key === "gender" || key === "documentType") {
        return (
          <div key={key} className="flex-1">
            <label>{key}</label>
            <Select
              name={key}
              value={formValues[key]}
              onChange={handleFormChange}
              className="block w-full"
              required
            >
              <option value="" disabled>
                Select {key}
              </option>
              {key === "gender" ? (
                <>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </>
              ) : (
                <>
                  <option value="Passport">Passport</option>
                  <option value="Adhaar Card">Adhaar Card</option>
                  <option value="Pan Card">Pan Card</option>
                  <option value="Drivers License">Drivers License</option>
                </>
              )}
            </Select>
          </div>
        );
      } else {
        return (
          <div key={key} className="flex-1">
            <label>{key}</label>
            <Input
              type={
                key.includes("email")
                  ? "email"
                  : key.includes("mobile") || key.includes("pincode")
                  ? "tel"
                  : "text"
              }
              name={key}
              value={formValues[key]}
              onChange={handleFormChange}
              placeholder={key}
              className="block w-full"
              required
              pattern={
                key.includes("mobile") || key.includes("pincode")
                  ? "[0-9]*"
                  : undefined
              }
            />
          </div>
        );
      }
    });

    return formFields;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <div className="flex justify-center mb-4">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleProfileImageChange}
            />
            <PhotoCamera />
          </IconButton>
          <div>
            {
              <img
                src={profileImage}
                alt="Profile"
                className="h-16 w-16 rounded-full"
              />
            }
          </div>
        </div>
        <Form className="space-x-1" onSubmit={handleFormSubmit}>
          <h4>Basic Info</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1">{renderFormInputs().slice(0, 3)}</div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1">{renderFormInputs().slice(3, 6)}</div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1">{renderFormInputs().slice(6, 9)}</div>
          </div>
          <h4>Document Form</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1">{renderFormInputs().slice(9, 12)}</div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-1">{renderFormInputs().slice(12)}</div>
          </div>
          {/* <div className="flex justify-between items-center mt-4">
            <img src={frontImage} alt="Front Document" className="h-32 w-32" />
            <img src={backImage} alt="Back Document" className="h-32 w-32" />
          </div> */}
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </Box>
    </Modal>
  );
};

export default AgentModal;
