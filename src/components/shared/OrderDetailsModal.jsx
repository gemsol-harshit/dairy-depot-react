import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import milkPrImage from "../../assets/images/milkPr.png";

const OrderDetailsModal = ({ open, onClose, order }) => (
  console.log("printed", order),
  (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="order-details-modal-title"
      aria-describedby="order-details-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white border border-gray-300 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 id="order-details-modal-title" className="text-2xl font-bold">
            Order Details
          </h2>
          <IconButton
            aria-label="close"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={milkPrImage}
              alt="Order Item"
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <p className="text-sm">
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p className="text-sm">
                <strong>Quantity Ordered:</strong> {order.quantity}
              </p>
              <p className="text-sm">
                <strong>Time Ordered:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
              <p className="text-sm">
                <strong>Payment Mode:</strong> {order.paymentMode}
              </p>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Customer Details:</h3>
          <p className="text-sm">
            <strong>Name:</strong> {order.customerAddress.recipientName}
          </p>
          <p className="text-sm">
            <strong>Address:</strong>{" "}
            {`${order.customerAddress.addressLine1}, ${order.customerAddress.addressLine2}, ${order.customerAddress.city}, ${order.customerAddress.state}, ${order.customerAddress.pincode}`}
          </p>
          <p className="text-sm">
            <strong>Location:</strong> {order.customerAddress.location}
          </p>
          <p className="text-sm">
            <strong>Country:</strong> {order.customerAddress.country}
          </p>
          <h3 className="text-lg font-semibold">Agent Details:</h3>
          <p className="text-sm">
            <strong>Agent ID:</strong> {order.agentId || "N/A"}
          </p>
          <h3 className="text-lg font-semibold">Order Status:</h3>
          <div
            className={`px-4 py-2 rounded-full ${getStatusColor(order.status)}`}
          >
            <span className="text-white">{getStatusText(order.status)}</span>
          </div>
          <h3 className="text-lg font-semibold">Order History:</h3>
          <ul className="list-disc pl-5">
            {order.orderLog.map((log) => (
              <li key={log._id} className="text-sm">
                <p>
                  <strong>{new Date(log.timestamp).toLocaleString()}:</strong>{" "}
                  {log.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </Modal>
  )
);

const getStatusColor = (status) => {
  switch (status) {
    case "delivered":
      return "bg-green-500";
    case "out_for_delivery":
      return "bg-yellow-400";
    case "placed":
      return "bg-blue-500";
    case "picked":
      return "bg-purple-500";
    case "accepted":
      return "bg-teal-500";
    default:
      return "bg-gray-400";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "out_for_delivery":
      return "Out for Delivery";
    case "placed":
      return "Placed";
    case "picked":
      return "Picked";
    case "accepted":
      return "Accepted";
    default:
      return "Unknown";
  }
};

export default OrderDetailsModal;
