import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const initialSubscriptions = [
  {
    id: 1,
    name: "Ford",
    monthlyPlanPrice: "9.99",
    annualPlanPrice: "99.99",
    loginDevice: "Mobile & Desktop",
    businessProvider: "Amazon",
    limitations: "Limited to 1 device",
  },
  {
    id: 2,
    name: "Henry",
    monthlyPlanPrice: "19.99",
    annualPlanPrice: "199.99",
    loginDevice: "Desktop Only",
    businessProvider: "Netflix",
    limitations: "2 screens at a time",
  },
];

const columns = [
  { field: "name", headerName: "Name", width: 100 },
  { field: "monthlyPlanPrice", headerName: "Monthly Plan Price ($)", width: 190 },
  { field: "annualPlanPrice", headerName: "Annual Plan Price ($)", width: 170 },
  { field: "loginDevice", headerName: "Login Device", width: 170 },
  { field: "businessProvider", headerName: "Business Provider", width: 170 },
  { field: "limitations", headerName: "Limitations", width: 170 },
];

const SubscribersTable = () => {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    monthlyPlanPrice: "",
    annualPlanPrice: "",
    loginDevice: "",
    businessProvider: "",
    limitations: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if ((name === "monthlyPlanPrice" || name === "annualPlanPrice") && !/^\d*\.?\d*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only numbers allowed",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Please Fill The Form";
      }
    });

    if (!/^\d*\.?\d*$/.test(formData.monthlyPlanPrice)) {
      newErrors.monthlyPlanPrice = "Only numbers allowed";
    }
    if (!/^\d*\.?\d*$/.test(formData.annualPlanPrice)) {
      newErrors.annualPlanPrice = "Only numbers allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setSubscriptions([...subscriptions, { id: subscriptions.length + 1, ...formData }]);
    setOpenForm(false);
    setFormData({ name: "", monthlyPlanPrice: "", annualPlanPrice: "", loginDevice: "", businessProvider: "", limitations: "" });
    setErrors({});
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Paper elevation={3} sx={{ width: "100%", p: 3, position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5">Subscription Plans</Typography>
          <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
            New Plan
          </Button>
        </Box>

        <DataGrid rows={subscriptions} columns={columns} pageSizeOptions={[5, 10]} autoHeight disableSelectionOnClick />
      </Paper>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>New Subscription</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" name="name" value={formData.name} onChange={handleInputChange} error={!!errors.name} helperText={errors.name} />
          <TextField fullWidth margin="dense" label="Monthly Plan Price" name="monthlyPlanPrice" value={formData.monthlyPlanPrice} onChange={handleInputChange} error={!!errors.monthlyPlanPrice} helperText={errors.monthlyPlanPrice} />
          <TextField fullWidth margin="dense" label="Annual Plan Price" name="annualPlanPrice" value={formData.annualPlanPrice} onChange={handleInputChange} error={!!errors.annualPlanPrice} helperText={errors.annualPlanPrice} />
          <TextField fullWidth margin="dense" label="Login Device" name="loginDevice" value={formData.loginDevice} onChange={handleInputChange} error={!!errors.loginDevice} helperText={errors.loginDevice} />
          <TextField fullWidth margin="dense" label="Business Provider" name="businessProvider" value={formData.businessProvider} onChange={handleInputChange} error={!!errors.businessProvider} helperText={errors.businessProvider} />
          <TextField fullWidth margin="dense" label="Limitations" name="limitations" value={formData.limitations} onChange={handleInputChange} error={!!errors.limitations} helperText={errors.limitations} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscribersTable;
