import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper ,FormControlLabel,Checkbox} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    navigate("/");
  };
const forgetHandler=()=>{
  navigate("/forget-password");
}
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f4f4f4",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: 350,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <PersonIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
          />
          
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <LockIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
          />
          <br/>
          <br/>
          <Box  display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <FormControlLabel  control={<Checkbox />} label="Remember Me" />
                    <Typography variant="body2" color="primary"  style={{ cursor: 'pointer' }} onClick ={()=>forgetHandler()}>Forgot Password?</Typography>
                </Box>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 ,width:"40%"}}>
           Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
 

