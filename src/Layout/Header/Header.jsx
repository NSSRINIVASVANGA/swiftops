import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  useMediaQuery,
  Box,
  Drawer,
} from "@mui/material";
import { FaBars } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:960px)");
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  
  const notifications = [
    { id: 1, text: "New task assigned: Dashboard Revamp" },
    { id: 2, text: "Meeting scheduled at 3:00 PM" },
    { id: 3, text: "You are attend the interview for Technical" },
    { id: 4, text: "You are selected in Technical round" },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "white" : "black";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: sidebarOpen ? (isTablet ? "100%" : "calc(100% - 200px)") : "95%",
          transition: "width 0.8s",
          backgroundColor: darkMode ? "#333" : "white",
          color: darkMode ? "white" : "black",
        }}
      >
        <Toolbar>
          {/* Sidebar Toggle */}
          <IconButton
            onClick={() => (isMobile ? setMobileDrawerOpen(true) : setSidebarOpen((prev) => !prev))}
            sx={{ color: darkMode ? "white" : "black", mr:2 }}
          >
            <FaBars />
          </IconButton>

          {/* Logo */}
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ flexGrow: 1 }}>
            BUSITRON
          </Typography>

          {/* Search Bar */}
          {searchOpen ? (
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
              autoFocus
              placeholder="Search..."
              sx={{
                width: isMobile ? "70%" : isTablet ? "180px" : "250px",
                backgroundColor: darkMode ? "#555" : "#f0f0f0",
                borderRadius: "5px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchOpen(false)} size="small">
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <IconButton
              sx={{ color: darkMode ? "white" : "black", mr: 2 }}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </IconButton>
          )}

          {/* Fullscreen Toggle */}
          {!isMobile && (
            <IconButton onClick={toggleFullscreen} sx={{ color: darkMode ? "white" : "black", mr: 2 }}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          )}

          {/* Dark Mode Toggle */}
          <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? "white" : "black", mr: 2 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Notification Icon */}
          <IconButton onClick={(e) => setNotifAnchorEl(e.currentTarget)} sx={{ color: darkMode ? "white" : "black", mr: 2 }}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Icon */}
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: darkMode ? "white" : "black", mr: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{ sx: { width: "200px", backgroundColor: darkMode ? "#333" : "white" } }}
      >
        <Box p={2}>
          <Typography variant="h6">Menu</Typography>
          <MenuItem onClick={() => setMobileDrawerOpen(false)}>Home</MenuItem>
          <MenuItem onClick={() => setMobileDrawerOpen(false)}>Dashboard</MenuItem>
          <MenuItem onClick={() => setMobileDrawerOpen(false)}>Settings</MenuItem>
        </Box>
      </Drawer>

      {/* Notifications Dropdown */}
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={() => setNotifAnchorEl(null)}
        PaperProps={{ sx: { width: "250px", backgroundColor: darkMode ? "#424242" : "white" } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <List>
          {notifications.map((notif) => (
            <React.Fragment key={notif.id}>
              <ListItem button>
                <ListItemText primary={notif.text} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Menu>

      {/* Profile Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Tarun Ponnada</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Sai Ponnada</MenuItem>
        <Divider />
        <MenuItem onClick={onLogout} sx={{ color: "red" }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;