import React, { useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box
} from '@mui/material';
import MaterialTable from "../../MaterialTable";

const BusinessForm = () => {
  // State for dialog open/close
  const [open, setOpen] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // State for client data (this will store the businesses)
  const [clientFormData, setClientFormData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "9897987983", address: "Hyd" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9897987983", address: "Hyd" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", phone: "9897987983", address: "Hyd" },
    { id: 4, name: "Bob White", email: "bob@example.com", phone: "9897987983", address: "Hyd" }
  ]);

  // Table columns definition
  const columns = [
    { label: "ID", field: "id" },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Address", field: "address" }
  ];

  // Handle update action
  const handleUpdate = (user) => {
    alert(`Update user: ${user.name}`);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Add new business to clientFormData
    const newBusiness = {
      id: clientFormData.length + 1, // auto-increment id
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    };
    
    // Update the clientFormData with new business
    setClientFormData((prevData) => [...prevData, newBusiness]);

    // Reset the form data
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: ""
    });

    // Close the dialog
    setOpen(false);
  };

  return (
    <div>
      {/* Heading */}
      <Typography variant='h4'>Business Form</Typography>

      {/* Add Business Button */}
      <Button 
        variant="contained" 
        color="primary" 
        style={{ margin: '10px 0' }} 
        onClick={() => setOpen(true)}
      >
        Add Business
      </Button>

      {/* Material Table */}
      <MaterialTable columns={columns} initialData={clientFormData} onUpdate={handleUpdate} />

      {/* Add Business Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Business</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="Business Name" name="name" value={formData.name} onChange={handleChange} required />
            <TextField label="Business Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <TextField label="Business Phone" name="phone" value={formData.phone} onChange={handleChange} required />
            <TextField label="Business Address" name="address" value={formData.address} onChange={handleChange} required />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BusinessForm;
