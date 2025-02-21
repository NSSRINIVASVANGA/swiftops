import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "./Login/Loginform";
import Dashboard from "./dashboards/Dashboard";
import BusinessForm from "./MenuList/bussiness/Bussinessform";
import User from "./MenuList/users/Userform";
import Workflow from "./MenuList/workflow/Invioce";
import Client from "./MenuList/client/Clientform";
import Calendar from "./MenuList/calender/Calender";
import Appointment from "./MenuList/appointment/Appointments";
import Marketing from "./MenuList/marketingCampaighn/Campaighnform";
import Subscription from "./MenuList/subscription/Subscribe";
import Report from "./MenuList/reports/Report";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route (Login) */}
        <Route path="/" element={<Login />} />

        {/* Protected Layout with Nested Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="business" element={<BusinessForm />} />
          <Route path="users" element={<User />} />
          <Route path="workflow" element={<Workflow />} />
          <Route path="client" element={<Client />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="report" element={<Report />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
