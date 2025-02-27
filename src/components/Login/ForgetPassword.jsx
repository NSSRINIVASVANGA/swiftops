import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, keyframes } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

// Animation for fade-in effect
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

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent to " + email);
    navigate("/conform-password");
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
      {/* Left Side - Image */}
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
            marginLeft: "50px",
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

      {/* Right Side - Forgot Password Form */}
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
            height: 400,
            width: 400,
            marginRight: "120px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0px 1px 1px rgba(255, 255, 255, 0.2)",
            animation: `${fadeIn} 1s ease-in-out`,
          }}
        >
          {/* Mail Icon */}
          <MailOutlineIcon sx={{ fontSize: 50, color: "#fff", mb: 2 }} />

          {/* Confirm Password Heading */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              color: "#fff",
              textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            Forgot Your Password?
          </Typography>

          {/* Instruction Text */}
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontSize: "16px",
              mb: 3,
              textAlign: "center",
            }}
          >
            Enter your email address to receive a password reset link.
          </Typography>

          {/* Email Input Field */}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              sx={{
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                width: "60%",
                backgroundColor: "#fff",
                color: "#000",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0px 5px 10px rgba(255, 255, 255, 0.1)",
                "&:hover": { backgroundColor: "#ddd" },
              }}
            >
              Send Reset Link
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
