import { FaHome, FaUser, FaCog, FaBell, FaChartBar, FaClipboardList, FaUsers, FaEnvelope } from "react-icons/fa";

const superAdmin = [
    { icon: <FaHome />, label: "Dashboard", path: "/superAdmin" },

    { icon: <FaCog />, label: "Users", path: "/superAdmin/users" },



    { icon: <FaUsers />, label: "ActiveLogs", path: "/superAdmin/activeLogs" },
    { icon: <FaClipboardList />, label: "Integration", path: "/superAdmin/integration" },

    { icon: <FaEnvelope />, label: "Report", path: "/superAdmin/report" },
    { icon: <FaEnvelope />, label: "Settings", path: "/superAdmin/settings" },

  ];

  
const  bussinessAdmin = [
    { icon: <FaHome />, label: "Dashboard", path: "/bussinessAdmin" },
    { icon: <FaUser />, label: "Business", path: "/bussinessAdmin/business" },
    { icon: <FaCog />, label: "Users", path: "/bussinessAdmin/users" },
    { icon: <FaBell />, label: "Workflow", path: "/bussinessAdmin/workflow" },
    { icon: <FaBell />, label: "integrations", path: "/bussinessAdmin/integrations" },
    { icon: <FaBell />, label: "reports", path: "/bussinessAdmin/reports" },
  ]

  const  bussuinessUser = [
    { icon: <FaHome />, label: "Dashboard", path: "/bussuinessUser" },
    { icon: <FaUser />, label: "invoicing", path: "/bussuinessUser/invoicing" },
    { icon: <FaCog />, label: "scheduling", path: "/bussuinessUser/scheduling" },
    { icon: <FaBell />, label: "crm", path: "/bussuinessUser/crm" },
    { icon: <FaBell />, label: "marketing", path: "/bussuinessUser/marketing" },
  ]

  const  financeAdmin = [
    { icon: <FaHome />, label: "Dashboard", path: "/financeAdmin" },
    { icon: <FaUser />, label: "invoicing", path: "/financeAdmin/invoicing" },
    { icon: <FaCog />, label: "payments", path: "/financeAdmin/payments" },
    { icon: <FaBell />, label: "refunds", path: "/financeAdmin/refunds" },
    { icon: <FaBell />, label: "subscription", path: "/financeAdmin/subscription" },
    { icon: <FaBell />, label: "reports", path: "/financeAdmin/reports" },
  ]

  const  marketAdmin = [
    { icon: <FaHome />, label: "Dashboard", path: "/marketAdmin" },
    { icon: <FaUser />, label: "campign", path: "/marketAdmin/campign" },
    { icon: <FaCog />, label: "socialMedia", path: "/marketAdmin/socialMedia" },
    { icon: <FaBell />, label: "email", path: "/marketAdmin/email" },
    { icon: <FaBell />, label: "sms", path: "/marketAdmin/sms" },
    { icon: <FaBell />, label: "analytics", path: "/marketAdmin/analytics" },
  ]

  export default {superAdmin,bussinessAdmin,bussuinessUser,financeAdmin,marketAdmin}