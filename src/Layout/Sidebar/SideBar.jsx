import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaBell, FaChartBar, FaClipboardList, FaUsers, FaEnvelope, FaBuilding, FaBars } from "react-icons/fa";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const menuItems = [
        { icon: <FaHome />, label: "Dashboard", path: "/dashboard" }, // Main dashboard
        { icon: <FaUser />, label: "Business", path: "/dashboard/business" },
        { icon: <FaCog />, label: "Users", path: "/dashboard/users" },
        { icon: <FaBell />, label: "Workflow", path: "/dashboard/workflow" },
        { icon: <FaChartBar />, label: "Client", path: "/dashboard/client" },
        { icon: <FaChartBar />, label: "Calendar", path: "/dashboard/calendar" },
        { icon: <FaClipboardList />, label: "Appointment", path: "/dashboard/appointment" },
        { icon: <FaUsers />, label: "Advertising", path: "/dashboard/marketing" },
        { icon: <FaEnvelope />, label: "Subscription", path: "/dashboard/subscription" },
        { icon: <FaEnvelope />, label: "Report", path: "/dashboard/report" },
      ];      

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 200 : 80,
        flexShrink: 0,
        display: { xs: "none", sm: "block" }, 
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? 200 : 80,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          background: "linear-gradient(135deg, #1e1e2f, #27293d)",
          color: "white",
          paddingTop: "10px",
          textAlign: "left",
          borderRight: "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "4px 0px 10px rgba(0,0,0,0.3)",
        },
      }}
    >
      {/* Sidebar Header */}
<div
  style={{
    height: "80px", // Increase height for better spacing
    padding: "0px 20px", // Adjust padding (top & bottom = 15px, left & right = 20px)
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  {/* Logo Image */}
 {/* Logo Image */}
<img
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaBhoOHFVhQ_yvck5R64m6rAQEcVa67yzgAA&s"
  alt="Logo"
  style={{
    width: "40px",  // Reduce size when minimized
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    transition: "width 0.3s ease, height 0.3s ease",  // Smooth transition
  }}
/>


  {/* Sidebar Title (Visible Only When Open) */}
  {sidebarOpen && (
    <p
      style={{
        marginLeft: "10px",
        fontWeight: "bold",
        fontSize: "22px",
        color: "#ffffff",
        flex: 1, // Allows text to expand
        textAlign: "center",
        transition: "width 0.3s ease, height 0.3s ease"
      }}
    >
      Busitron
    </p>
  )}

  {/* Toggle Button */}
  <IconButton
    onClick={() => setSidebarOpen(!sidebarOpen)}
    sx={{
      color: "white",
      marginLeft: "auto",
      display: { xs: "block", sm: "none" },
    }}
  >
    <FaBars />
  </IconButton>
</div>


      {/* Sidebar Navigation */}
      <List>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#4CAF50" : "white",
            })}
          >
            <ListItemButton
              sx={{
                pl: "20px",
                mb: 1,
                borderRadius: "8px",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#fffff",
                  color : "linear-gradient(135deg, #1e1e2f, #27293d)",
                  transform: "scale(1.05)",
                },
                "&.Mui-selected": {
                  backgroundColor: "#4CAF50",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: "white" }}>
                {React.cloneElement(item.icon, { size: 24 })}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.label} />}
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;