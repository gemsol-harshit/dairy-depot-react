// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/page/Layout";
import User from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Login from "./pages/Login";
import OrderTrack from "./pages/OrderTrack";
import Agents from "./pages/Agent";
import UserProfile from "./pages/UserProfile";
import AddAgent from "./pages/AddNewAgent";
import Settings from "./pages/Settings";
import AddHubAdmin from "./pages/AddHubAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/agent" element={<Agents />} />
          <Route path="/addAgent" element={<AddAgent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user" element={<User />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/addAdmin" element={<AddHubAdmin />} />
          <Route path="/orders" element={<OrderTrack />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
