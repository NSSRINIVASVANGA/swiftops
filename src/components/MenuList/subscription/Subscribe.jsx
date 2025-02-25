import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SubscriptionDashboard = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { name: "Basic Plan", status: "Active", amount: "$29.99", billingCycle: "Monthly", nextBilling: "2025-03-24", subscribers: 145 },
    { name: "Premium Plan", status: "Active", amount: "$99.99", billingCycle: "Monthly", nextBilling: "2025-03-24", subscribers: 89 },
    { name: "Enterprise Plan", status: "Draft", amount: "$299.99", billingCycle: "Yearly", nextBilling: "-", subscribers: 0 },
  ]);

  const subscriptionStats = {
    totalActivePlans: 2,
    totalSubscribers: 234,
    monthlyRevenue: 12486,
    activePlansGrowth: 12,
    subscribersGrowth: 8,
    revenueGrowth: -3,
  };

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "", status: "Active", amount: "", billingCycle: "Monthly" });
  const [error, setError] = useState("");

  const handleOpen = () => {
    setEditIndex(null);
    setForm({ name: "", status: "Active", amount: "", billingCycle: "Monthly" });
    setError("");
    setOpen(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(subscriptionPlans[index]);
    setError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ name: "", status: "Active", amount: "", billingCycle: "Monthly" });
    setError("");
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.amount) {
      setError("Please fill out all fields.");
      return;
    }

    const formattedPlan = {
      ...form,
      amount: `$${form.amount}`,
      nextBilling: form.nextBilling || "-",
      subscribers: form.subscribers || 0,
    };

    if (editIndex !== null) {
      const updatedPlans = [...subscriptionPlans];
      updatedPlans[editIndex] = formattedPlan;
      setSubscriptionPlans(updatedPlans);
    } else {
      setSubscriptionPlans([...subscriptionPlans, formattedPlan]);
    }

    handleClose();
  };

  const handleDelete = (index) => {
    setSubscriptionPlans(subscriptionPlans.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height:"auto",
        width:"auto"
      }}
    >
      {/* Fixed Header */}
      <Box sx={{ display: "flex", height:"auto", width:"auto", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Subscription Plans
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={handleOpen}>
          New Plan
        </Button>
      </Box>

      <Typography variant="body1" color="textSecondary">
        Manage your subscription billing plans
      </Typography>

      {/* Content Layout */}
      <Box sx={{ display: "grid", gridTemplateRows: "auto auto 1fr", gap: 2, height: "auto" }}>
        {/* Stats Cards - Responsive Grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 2 }}>
          <StatCard title="Total Active Plans" value={subscriptionStats.totalActivePlans} growth={subscriptionStats.activePlansGrowth} />
          <StatCard title="Total Subscribers" value={subscriptionStats.totalSubscribers} growth={subscriptionStats.subscribersGrowth} />
          <StatCard title="Monthly Revenue" value={`$${subscriptionStats.monthlyRevenue}`} growth={subscriptionStats.revenueGrowth} isRevenue />
        </Box>

        {/* Scrollable Table with Hidden Scrollbar */}
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            mt: 3,
            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Chrome/Safari
            "scrollbar-width": "none", // Hide scrollbar for Firefox
            "-ms-overflow-style": "none", // Hide scrollbar for IE/Edge
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Plan Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Billing Cycle</strong>
                </TableCell>
                <TableCell>
                  <strong>Next Billing</strong>
                </TableCell>
                <TableCell>
                  <strong>Subscribers</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptionPlans.map((plan, index) => (
                <TableRow key={index}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>
                    <Chip label={plan.status} color={plan.status === "Active" ? "success" : "default"} />
                  </TableCell>
                  <TableCell>{plan.amount}</TableCell>
                  <TableCell>{plan.billingCycle}</TableCell>
                  <TableCell>{plan.nextBilling}</TableCell>
                  <TableCell>{plan.subscribers}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(index)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add/Edit Plan Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? "Edit Plan" : "Add New Plan"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Plan Name" name="name" value={form.name} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Amount" name="amount" type="number" value={form.amount.replace("$", "")} onChange={handleChange} />
          <TextField select fullWidth margin="dense" label="Billing Cycle" name="billingCycle" value={form.billingCycle} onChange={handleChange}>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </TextField>
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editIndex !== null ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const StatCard = ({ title, value }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="body1" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default SubscriptionDashboard;