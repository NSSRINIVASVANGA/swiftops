
import React, { useState } from "react";
import { 
  Container, Typography, TextField, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, 
  DialogContent, DialogActions, Box, IconButton 
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const dummyData = [
  {
    business_id: uuidv4(),
    business_name: "Tech Solutions Inc.",
    business_email: "contact@techsolutions.com",
    business_phone: "+1 555-1234",
    business_address: "123 Tech Street, Silicon Valley, CA",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    business_id: uuidv4(),
    business_name: "Green Earth Services",
    business_email: "info@greenearth.com",
    business_phone: "+1 555-5678",
    business_address: "456 Eco Lane, Portland, OR",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const BusinessForm = () => {
  // State for dialog open/close
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    business_id: "",
    business_name: "",
    business_email: "",
    business_phone: "",
    business_address: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setBusinessData(businessData.map(b => (b.business_id === formData.business_id ? formData : b)));
      setFilteredData(filteredData.map(b => (b.business_id === formData.business_id ? formData : b)));
    } else {
      const newBusiness = { ...formData, business_id: uuidv4() };
      setBusinessData([...businessData, newBusiness]);
      setFilteredData([...businessData, newBusiness]);
    }
    setOpen(false);
    setEditMode(false);
  };

  const handleEdit = (business) => {
    setFormData(business);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updatedData = businessData.filter(b => b.business_id !== id);
    setBusinessData(updatedData);
    setFilteredData(updatedData);

  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Business Forms</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>

        <Button variant="contained" color="primary" onClick={() => { setOpen(true); setEditMode(false); }}>

          Add New Business
        </Button>
      </Box>
      
      <TextField fullWidth margin="normal" label="Search Business" value={searchQuery} onChange={handleSearch} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Business Email</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>Business Phone</TableCell>
              <TableCell>Business Address</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((business) => (
              <TableRow key={business.business_id}>
                <TableCell>{business.business_name}</TableCell>
                <TableCell>{business.business_email}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>{business.business_phone}</TableCell>
                <TableCell>{business.business_address}</TableCell>
                <TableCell>{business.created_at}</TableCell>
                <TableCell>{business.updated_at}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(business)}>

                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(business.business_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>

        <DialogTitle>{editMode ? "Edit Business" : "Add Business"}</DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Business Name" name="business_name" value={formData.business_name} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Business Email" name="business_email" type="email" value={formData.business_email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Business Phone" name="business_phone" value={formData.business_phone} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Business Address" name="business_address" value={formData.business_address} onChange={handleChange} required />
            <DialogActions>

              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">{editMode ? "Update" : "Submit"}</Button>

            </DialogActions>
          </form>
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
