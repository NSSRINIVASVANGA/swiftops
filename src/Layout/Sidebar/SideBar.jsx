import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import menuList from "./MenuLists"


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = menuList.bussuinessUser; 
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
          textAlign: "left",
          borderRight: "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "4px 0px 10px rgba(0,0,0,0.3)",
        },
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          height: "65px", // Increased height for header
          padding: "0px 20px 0px 20px", // Adjust padding
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid white",
        }}
      >
        {/* Logo Image */}
        <img
          src="/swiftops.jpeg"
          alt="Logo"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            transition: "width 0.3s ease, height 0.3s ease",
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
              flex: 1,
              textAlign: "center",
              transition: "width 0.3s ease, height 0.3s ease",
            }}
          >
            Swiftops
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
                mb: sidebarOpen ? 1.7 : 2.75,
                borderRadius: "8px",              
                display: "flex",
                alignItems: "center", 
                "&:hover": {
                  color: "red",
                },
                "&.Mui-selected": {
                  backgroundColor: "#4CAF50",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: "white", "&:hover": { color: "black" } }}>
                {React.cloneElement(item.icon, { size: 24 })} 
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    fontWeight: item.label === "Dashboard" ? "bold" : "normal", 
                  }}
                />
              )}

            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
