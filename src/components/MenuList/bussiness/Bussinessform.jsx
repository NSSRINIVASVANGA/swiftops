import React, { useState } from "react";
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

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
  }
];

const BusinessForm = () => {
  const [businessData, setBusinessData] = useState(dummyData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(dummyData);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    business_id: uuidv4(),
    business_name: "",
    business_email: "",
    business_phone: "",
    business_address: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, updated_at: new Date().toISOString() });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = businessData.filter((business) =>
      business.business_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBusiness = { ...formData, business_id: uuidv4() };
    setBusinessData([...businessData, newBusiness]);
    setFilteredData([...businessData, newBusiness]);
    alert("Business data has been updated successfully!");
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Business Forms</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
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
              <TableCell>Business Phone</TableCell>
              <TableCell>Business Address</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((business) => (
              <TableRow key={business.business_id}>
                <TableCell>{business.business_name}</TableCell>
                <TableCell>{business.business_email}</TableCell>
                <TableCell>{business.business_phone}</TableCell>
                <TableCell>{business.business_address}</TableCell>
                <TableCell>{business.created_at}</TableCell>
                <TableCell>{business.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle >Business Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Business Name" name="business_name" value={formData.business_name} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Business Email" name="business_email" type="email" value={formData.business_email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Business Phone" name="business_phone" value={formData.business_phone} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Business Address" name="business_address" value={formData.business_address} onChange={handleChange} required />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default BusinessForm;