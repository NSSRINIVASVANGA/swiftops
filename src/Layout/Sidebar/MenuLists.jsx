import {
  FaHome,
  FaUser,
  FaCog,
  FaBell,
  FaChartBar,
  FaClipboardList,
  FaUsers,
  FaEnvelope,
  FaFileInvoice,
  FaMoneyBillAlt,
  FaSyncAlt,
  FaCalendarAlt,
  FaBullhorn,
  FaHashtag,
  FaMailBulk,
  FaSms,
  FaChartLine,
} from "react-icons/fa";

const superAdmin = [
  { icon: <FaHome />, label: "Dashboard", path: "/superAdmin" },
  { icon: <FaUser />, label: "Users", path: "/superAdmin/users" },
  { icon: <FaChartBar />, label: "ActiveLogs", path: "/superAdmin/activeLogs" },
  { icon: <FaClipboardList />, label: "Integration", path: "/superAdmin/integration" },
  { icon: <FaEnvelope />, label: "Report", path: "/superAdmin/report" },
  { icon: <FaCog />, label: "Settings", path: "/superAdmin/settings" },
];

const bussinessAdmin = [
  { icon: <FaHome />, label: "Dashboard", path: "/bussinessAdmin" },
  { icon: <FaUsers />, label: "Business", path: "/bussinessAdmin/business" },
  { icon: <FaUser />, label: "Users", path: "/bussinessAdmin/users" },
  { icon: <FaBell />, label: "Workflow", path: "/bussinessAdmin/workflow" },
  { icon: <FaSyncAlt />, label: "Integrations", path: "/bussinessAdmin/integrations" },
  { icon: <FaEnvelope />, label: "Reports", path: "/bussinessAdmin/reports" },
];

const bussuinessUser = [
  { icon: <FaHome />, label: "Dashboard", path: "/bussuinessUser" },
  { icon: <FaFileInvoice />, label: "Invoicing", path: "/bussuinessUser/invoicing" },
  { icon: <FaCalendarAlt />, label: "Scheduling", path: "/bussuinessUser/scheduling" },
  { icon: <FaUsers />, label: "CRM", path: "/bussuinessUser/crm" },
  { icon: <FaBullhorn />, label: "Marketing", path: "/bussuinessUser/marketing" },
];

const financeAdmin = [
  { icon: <FaHome />, label: "Dashboard", path: "/financeAdmin" },
  { icon: <FaFileInvoice />, label: "Invoicing", path: "/financeAdmin/invoicing" },
  { icon: <FaMoneyBillAlt />, label: "Payments", path: "/financeAdmin/payments" },
  { icon: <FaSyncAlt />, label: "Refunds", path: "/financeAdmin/refunds" },
  { icon: <FaClipboardList />, label: "Subscription", path: "/financeAdmin/subscription" },
  { icon: <FaEnvelope />, label: "Reports", path: "/financeAdmin/reports" },
];

const marketAdmin = [
  { icon: <FaHome />, label: "Dashboard", path: "/marketAdmin" },
  { icon: <FaBullhorn />, label: "Campaign", path: "/marketAdmin/campaign" },
  { icon: <FaHashtag />, label: "SocialMedia", path: "/marketAdmin/socialMedia" },
  { icon: <FaMailBulk />, label: "Email", path: "/marketAdmin/email" },
  { icon: <FaSms />, label: "SMS", path: "/marketAdmin/sms" },
  { icon: <FaChartLine />, label: "Analytics", path: "/marketAdmin/analytics" },
];

export default { superAdmin, bussinessAdmin, bussuinessUser, financeAdmin, marketAdmin };