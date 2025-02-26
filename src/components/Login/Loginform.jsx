import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  keyframes,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    navigate("/dashboard");
  };
  const loginHandler=()=>{
    navigate("/otp-password");
  }
  const forgetHandler = () => {
    navigate("/forget-password");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column",md
        :'row' },
        padding:{xs: "1.5rem", sm: "1.5rem"},
        gap:{xs: "1.5rem", sm: "1.5rem"},
        overflow:"auto",
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
          display:{xs:"none",sm:"none",md:"flex"},
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "100px",
          marginLeft:"50px",
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
            width:"20vw",
            marginLeft: "40px",
            animation: `${fadeIn} 1.5s ease-in-out`,
          }}
        >
          Your Workforce,
          Your Way, 
          Start Building Today
        </Typography>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: { xs: "8.5rem", sm: "8.5rem" },
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            height: 500,
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
            Login
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {/* Email Input */}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <PersonIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Input */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
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
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#fff" }} />
                      ) : (
                        <Visibility sx={{ color: "#fff" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember Me & Forgot Password */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <FormControlLabel
                control={<Checkbox sx={{ color: "#fff" }} />}
                label={
                  <Typography sx={{ color: "#fff" }}>Remember Me</Typography>
                }
              />
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  fontSize: "17px",
                  textDecoration: "underline",
                  color: "#fff",
                  "&:hover": { color: "#ddd" },
                }}
                onClick={forgetHandler}
              >
                Forgot Password?
              </Typography>
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              onClick={()=>{loginHandler()}}
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
              Login
            </Button>
          </form>
          <br />
          {/* Don't have an account? Sign Up */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mt: 2, 
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                fontSize: "14px",
              }}
            >
              Don't have an account?
            </Typography>
            <Typography
              variant="body2"
              sx={{
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
                color: "#fff",
                "&:hover": { color: "#ddd" },
              }}
              onClick={() => navigate("/signup")} 
            >
              Sign Up
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;


