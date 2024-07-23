import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Profile from "../../assets/images/profile.png";

const UserModal = ({ open, handleClose, user }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white  rounded-lg p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold mb-10">User Details</h2>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-800"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className="space-y-2 mb-2 flex justify-between items-center grid grid-cols-2 gap-4">
        <div className="my-4 h-40 w-40 ">
          <img
            src={Profile}
            alt="User"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <p className="text-sm">
          <strong>User Name:</strong> {user?.address[0]?.recipientName}
        </p>
        <p className="text-sm">
          <strong>User ID:</strong> {user.customerId}
        </p>
        <p className="text-sm">
          <strong>Phone Number:</strong> +91 {user.number}
        </p>
        <p className="text-sm">
          <strong>Primary Address:</strong>{" "}
          {user?.address[0]?.addressLine1 +
            ", " +
            user?.address[0]?.addressLine2 +
            ", " +
            user?.address[0]?.city +
            ", " +
            user?.address[0]?.state +
            ", " +
            user?.address[0]?.pincode}
        </p>
      </div>
    </Box>
  </Modal>
);

export default UserModal;
