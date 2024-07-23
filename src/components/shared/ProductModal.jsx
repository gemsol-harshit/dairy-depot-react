import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import milkPrImage from "../../assets/images/milkPr.png";

const ProductModal = ({ open, handleClose, product }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white border border-gray-300 shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold mb-10">Inventory Details</h2>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-800"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className="space-y-2 mb-2 flex justify-between items-center grid grid-cols-2 gap-4">
        <p className="text-sm">
          <strong>Product Name:</strong> {product.productName}
        </p>
        <p className="text-sm">
          <strong>Product ID:</strong> {product.productId}
        </p>
        <p className="text-sm">
          <strong>Category ID:</strong> {product.categoryId}
        </p>
        <p className="text-sm">
          <strong>Hub ID:</strong> {product.hubId}
        </p>
        <p className="text-sm">
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <p className="text-sm">
          <strong>Price:</strong> ₹{product.price}
        </p>

        <div className="my-4 h-40 w-40 ">
          <img
            src={milkPrImage}
            alt="Product"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="my-4 h-40 w-40 ">
          <img
            src={milkPrImage}
            alt="Product"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Box>
  </Modal>
);

export default ProductModal;
