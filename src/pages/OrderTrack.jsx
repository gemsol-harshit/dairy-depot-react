import React, { useState, useEffect } from "react";
import ApiService from "../lib/helpers/api.service";
import CustomTable from "../components/shared/CommonTable";
import Loader from "../lib/helpers/Loader";
import { AppColors } from "../lib/helpers/colors";
import OrderDetailModal from "../components/shared/OrderDetailsModal"; // Import the modal component

const TopBar = ({ searchText, handleSearchChange }) => (
  <div className="flex flex-row justify-between m-5">
    <div className="flex items-center rounded-lg w-2/3">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        className="text-sm w-full h-10 px-2 bg-gray-100 rounded-lg"
        placeholder="Search order..."
      />
    </div>
  </div>
);

const Order = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const hubId = "HUB_1fd5";
        const data = await ApiService.fetchOrder(hubId);
        const orders = data.data?.data || [];
        setOrder(orders);
        setFilteredList(orders.reverse());
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = order.filter((order) =>
      Object.values(order).some((val) =>
        val.toString().toLowerCase().includes(searchValue)
      )
    );

    setFilteredList(filtered);
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const getTableHeaders = () => [
    "Order ID",
    "Recipient",
    "Complete Address",
    "Total Amount",
    "Agent Id",
    "Status",
  ];

  const getTableRows = () =>
    filteredList.map((order) => ({
      "Order ID": order.orderId,
      Recipient: order.customerAddress?.recipientName,
      "Complete Address": `${order.customerAddress?.addressLine1}, ${order.customerAddress?.addressLine2}, ${order.customerAddress?.city}, ${order.customerAddress?.state}, ${order.customerAddress?.pincode}`,
      "Total Amount": `₹${order.totalAmount}`,
      "Agent Id": order.agentId || "Agent yet to accept order!",
      Status: <StatusBox status={order.status} />,
    }));

  return loading ? (
    <Loader />
  ) : (
    <div className="order-list">
      <TopBar searchText={searchText} handleSearchChange={handleSearchChange} />

      <CustomTable
        tableHeaders={getTableHeaders()}
        tableRows={getTableRows()}
        rowsPerPageOptions={[10, 15, 25]}
        onRowClick={handleRowClick} // Add onRowClick handler
      />

      {/* {selectedOrder && (
        <OrderDetailModal
          open={modalOpen}
          onClose={handleCloseModal}
          order={order}
        />
      )} */}
    </div>
  );
};

const StatusBox = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "delivered":
        return {
          backgroundColor: AppColors.appGreen,
          color: AppColors.appLight,
        };
      case "out_for_delivery":
        return {
          backgroundColor: AppColors.appYellow,
          color: AppColors.appLight,
        };
      case "placed":
        return {
          backgroundColor: AppColors.appBlueLight,
          color: AppColors.appLight,
        };
      case "picked":
        return {
          backgroundColor: AppColors.appPurple,
          color: AppColors.appLight,
        };
      case "accepted":
        return {
          backgroundColor: AppColors.appTeal,
          color: AppColors.appLight,
        };
      default:
        return {
          backgroundColor: AppColors.appGrey,
          color: AppColors.appLight,
        };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <div
      className="rounded-lg px-2 py-1 text-center whitespace-nowrap overflow-hidden overflow-ellipsis"
      style={{ ...statusStyles }}
    >
      {status}
    </div>
  );
};

export default Order;
