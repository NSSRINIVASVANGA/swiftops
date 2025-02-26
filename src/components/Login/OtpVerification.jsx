import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };
  const navigate=useNavigate();
   const dashboardHandler=()=>{
      navigate('./superAdmin')
   }
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          height: 400,
          width: 400,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 1px 1px rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#fff", textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)" }}
        >
          Verify Your E-Mail Address
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, color: "#fff" }}>
          Hello John Deo,
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "#fff" }}>
          Please use the following One Time Password (OTP)
        </Typography>

        <Grid container spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          {otp.map((digit, index) => (
            <Grid item key={index}>
              <TextField
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.5rem", color: "#fff" },
                }}
                sx={{
  width: 50,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    borderColor: "white", // Set border color to black
    color: "#fff",
    "& fieldset": {
      borderColor: "black", // Ensure the border remains black
    },
    "&:hover fieldset": {
      borderColor: "black", // Keep black border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "black", // Keep black border when focused
    },
  },
  "& .MuiInputLabel-root": { color: "#fff" },
}}

              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="body2" sx={{ mt: 2, color: "#fff" }}>
          This passcode will only be valid for the next <strong>2 minutes</strong>. If the passcode does not work, you
          can use this login verification link:
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            width: "60%",
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            boxShadow: "0px 5px 10px rgba(255, 255, 255, 0.1)",
            "&:hover": { backgroundColor: "#ddd" },
          }}
          onClick={()=>{dashboardHandler()}}
        >
          Verify Email
        </Button>
      </Paper>
    </Box>
  );
};

export default OTPVerification;
