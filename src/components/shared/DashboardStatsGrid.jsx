import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoBagHandle, IoPeople, IoCart } from "react-icons/io5";

export default function DashboardStatsGrid() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalCustomers: 0,
    totalOrders: 0,
    orderedMost: 0,
    mostOrderedProductId: "",
  });

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      const orderedMostProduct = getMostOrderedProduct(
        userData.ordersMost || {}
      );

      setStats({
        totalSales: userData.totalRevenue || 0,
        totalCustomers: userData.totalCustomers || 200,
        totalOrders: userData.totalOrders || 0,
        orderedMost: orderedMostProduct.count,
        mostOrderedProductId: orderedMostProduct.productId,
      });
    }
  }, []);

  const getMostOrderedProduct = (orders) => {
    let maxCount = 0;
    let productId = "";

    for (const [key, value] of Object.entries(orders)) {
      if (value > maxCount) {
        maxCount = value;
        productId = key;
      }
    }

    return { count: maxCount, productId };
  };

  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              ₹{stats.totalSales}
            </strong>
            <span className="text-sm text-green-500 pl-2">+343</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Customers
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {stats.totalCustomers}
            </strong>
            <span className="text-sm text-red-500 pl-2">-30</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {stats.totalOrders}
            </strong>
            <span className="text-sm text-red-500 pl-2">-43</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-purple-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Most Ordered Product
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {stats.mostOrderedProductId} ({stats.orderedMost} orders)
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}

BoxWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
