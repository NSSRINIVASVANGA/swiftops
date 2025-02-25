 import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  keyframes,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ConfirmPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password has been reset successfully!");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        background: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
                     url('https://img.freepik.com/free-vector/paper-style-dynamic-lines-background_23-2149008629.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "100px",
                marginLeft: "50px",
              }}
            >
              <Box
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
                  backgroundImage: "url('./swiftops text.png')", 
                  backgroundSize: "contain", 
                  backgroundPosition: "center", 
                  backgroundRepeat: "no-repeat", 
                  padding: "20px", 
                  width: "100%", 
                  height: "350px", 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "-150px",
                  marginLeft:"50px",
                }}
              ></Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                  color: "white",
                  marginLeft: "40px",
                  animation: `${fadeIn} 1.5s ease-in-out`,
                }}
              >
                <br />
                Your Workforce,
                <br />
                Your Way, <br />
                Start Building Today
              </Typography>
            </Box>
      
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: 400,
            height:500,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0px 1px 1px rgba(255, 255, 255, 0.2)",
            animation: `${fadeIn} 1s ease-in-out`,
            "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ddd" },
                  "&:hover fieldset": { borderColor: "#bbb" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                  color: "white",
                },
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                input: { color: "#fff" },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}
          >
            Reset Password
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              sx={{
                input: { color: "white" },
                label: { color: "white" },
              }}
            />

            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
              }}
            />

            <TextField
              label="Conform Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
             
              sx={{ mt: 3, backgroundColor: "#fff", color: "#000" ,fontWeight:"bold",width:"200px"}}
            >
              Reset Password
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default ConfirmPassword;