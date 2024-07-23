import React from "react";
import DashboardStatsGrid from "../components/shared/DashboardStatsGrid";
import TransactionChart from "../components/shared/TransactionChart";
// import RecentOrders from '../components/RecentOrders'
import BuyerProfilePieChart from "../components/shared/BuyerProfilePieChart";
// import PopularProducts from '../components/PopularProducts'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
      {/* <div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div> */}
    </div>
  );
}
