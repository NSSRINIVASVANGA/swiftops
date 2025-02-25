import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar/SideBar";
import Header from "./Header/Header";

const Layout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.8s ease-in-out, width 0.9s ease-in-out", // Smooth animation
          width: sidebarOpen ? "calc(100% - 200px)" : "calc(100% - 80px)", // Adjust width dynamically
        }}
      >
        {/* Header */}
        <Box>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Box>
        {/* Page Content */}
        <Box component="main" sx={{ flexGrow: 1, mt: "64px", overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
