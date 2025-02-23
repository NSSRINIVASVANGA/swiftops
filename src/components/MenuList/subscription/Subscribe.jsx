import React, { useState } from "react";
import MaterialTable from "../../MaterialTable";
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const SubscribersTable = () => {
  const [subscriptions, setSubscriptions] = useState([
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
  ]);

  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    monthlyPlanPrice: "",
    annualPlanPrice: "",
    businessProvider: "",
    limitations: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubscriptions([...subscriptions, { id: subscriptions.length + 1, ...formData }]);
    setOpenForm(false);
    setFormData({ name: "", monthlyPlanPrice: "", annualPlanPrice: "", businessProvider: "", limitations: "" });
  };

  const columns = [
    { field: "name", label: "Name"},
    { field: "monthlyPlanPrice", label: "Monthly Plan Price ($)"},
    { field: "annualPlanPrice", label: "Annual Plan Price ($)"},
    { field: "loginDevice", label: "Login Device"},
    { field: "businessProvider", label: "Business Provider"},
    { field: "limitations", label: "Limitations"},
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
          New Subscription
        </Button>
      </Box>
      <MaterialTable columns={columns} initialData={subscriptions} options={{ search: false }} />

      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>New Subscription</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" name="name" value={formData.name} onChange={handleInputChange} />
          <TextField fullWidth margin="dense" label="Monthly Plan Price" name="monthlyPlanPrice" value={formData.monthlyPlanPrice} onChange={handleInputChange} />
          <TextField fullWidth margin="dense" label="Annual Plan Price" name="annualPlanPrice" value={formData.annualPlanPrice} onChange={handleInputChange} />
          <TextField fullWidth margin="dense" label="Business Provider" name="businessProvider" value={formData.businessProvider} onChange={handleInputChange} />
          <TextField fullWidth margin="dense" label="Limitations" name="limitations" value={formData.limitations} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscribersTable; 