import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "./Login/Loginform";
import ForgetPassword from './Login/ForgetPassword';
import ConfirmPassword from "./Login/ConfirmPassword";
import Dashboard from "./dashboards/Dashboard";
import ActivityLogs from "./MenuList/activityLogs/ActivityLogs";
import Security from "./MenuList/activityLogs/Security";
import SecuritySetting from "./MenuList/Integration/SecuritySetting";
import Module from "./MenuList/settings/Module";
import Campaignform from './MenuList/marketingCampaign/Campaignform'

// super admin routes
import BusinessForm from "./MenuList/bussiness/Bussinessform";
import Client from "./MenuList/client/Clientform";
import Calendar from "./MenuList/calender/Calender";
import Appointment from "./MenuList/appointment/Appointments";
import Marketing from "./MenuList/marketingCampaign/Campaignform";

// multi roles have access for this routes
import Workflow from "./MenuList/workflow/Invioce";
import User from "./MenuList/users/Userform";
import Report from "./MenuList/reports/Report";
import InvoiceTable from "./MenuList/workflow/Invioce";
import Subscription from "./MenuList/subscription/Subscribe";

// bussiness admin routes
import Settings from './MenuList/BussinessSettings/Settings';
import Integration from "./MenuList/Integration/SecuritySetting"

// bussiness user routes
import Schedule from "./MenuList/scheduling/Scheduling";
import Crm from "./MenuList/crm/Crm";
import LaunchMarketing from "./MenuList/marketing/LaunchCampign"

// FinanceAdmin routes
import Payments from "./MenuList/Payments/Payments";
import Refunds from "./MenuList/refunds/Refunds";

// market admin routes
import SocialMedia from "./MenuList/marketingCampaign/SocialMedia"
import Email from "./MenuList/marketingCampaign/Email";
import Sms from "./MenuList/marketingCampaign/Sms"
import Analytics from "./MenuList/marketingCampaign/Analytics"
import { Campaign } from "@mui/icons-material";
import SMSMarketingDashboard from "./MenuList/marketingCampaign/Sms"



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route (Login) */}
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/conform-password" element={<ConfirmPassword />} />

        {/* Protected Layout with Nested Routes */}
        <Route path="/superAdmin" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="users" element={<User />} />
          <Route path="activeLogs" element={<ActivityLogs />} />

          <Route path="Settings" element={<Module/>} />


          <Route path="integration" element={<SecuritySetting/>} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="report" element={<Report />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="/bussinessAdmin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="business" element={<Settings />} />
          <Route path="workflow" element={<Workflow />} />
          <Route path="users" element={<User />} />
          <Route path="integrations" element={<Integration />} />
          <Route path="reports" element={<Report />} />

        </Route>

        <Route path="/bussuinessUser" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="invoicing" element={<InvoiceTable />} />
          <Route path="scheduling" element={<Schedule />} />
          <Route path="crm" element={<Crm />} />
          <Route path="marketing" element={<LaunchMarketing />} />

        </Route>

        <Route path="/FinanceAdmin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="invoicing" element={<InvoiceTable />} />
          <Route path="payments" element={<Payments />} />
          <Route path="refunds" element={<Refunds />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="reports" element={<Report />} />
        </Route>

        <Route path="/MarketAdmin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="campaign" element={<Campaignform />} />
          <Route path="socialMedia" element={<SocialMedia />} />
          <Route path="email" element={<Email />} />
          <Route path="sms" element={<SMSMarketingDashboard  />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;
