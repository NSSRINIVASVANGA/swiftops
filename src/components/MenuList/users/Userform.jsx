import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function FormGrid() {
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    phonenumber: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    checked: true,
  });

  // State to store submitted data
  const [submittedData, setSubmittedData] = useState([]);

  // State to track which entry is being edited
  const [editIndex, setEditIndex] = useState(null);

  // State to manage the form popup visibility
  const [open, setOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing entry
      const updatedData = [...submittedData];
      updatedData[editIndex] = formData;
      setSubmittedData(updatedData);
      setEditIndex(null);
    } else {
      // Add new entry
      setSubmittedData([...submittedData, formData]);
    }
    // Reset form and close the popup
    setFormData({
      email: '',
      phonenumber: '',
      address: '',
      state: '',
      city: '',
      zip: '',
      checked: true,
    });
    setOpen(false);
  };

  // Handle edit action
  const handleEdit = (index) => {
    setFormData(submittedData[index]);
    setEditIndex(index);
    setOpen(true); // Open the popup for editing
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  };

  // Open the form popup
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the form popup
  const handleClose = () => {
    setOpen(false);
    setEditIndex(null); // Reset edit mode
    setFormData({
      email: '',
      phonenumber: '',
      address: '',
      state: '',
      city: '',
      zip: '',
      checked: true,
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Add New Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New
        </Button>
      </div>

      {/* Form Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Entry' : 'Add New Entry'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: '8px' }}>
              {/* Email and Phone Number Row */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
              </Grid>

              {/* Address Row */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
              </Grid>

              {/* State, City, Zip Row */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
              </Grid>

              {/* Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checked"
                      checked={formData.checked}
                      onChange={handleInputChange}
                      sx={{ color: '#1976d2' }}
                    />
                  }
                  label="Check me out"
                  sx={{ color: '#333' }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editIndex !== null ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Submitted Data in Table */}
      <TableContainer component={Paper} sx={{ marginTop: '24px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone Number</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>State</strong></TableCell>
              <TableCell><strong>City</strong></TableCell>
              <TableCell><strong>Zip</strong></TableCell>
              <TableCell><strong>Checked</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phonenumber}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.state}</TableCell>
                <TableCell>{data.city}</TableCell>
                <TableCell>{data.zip}</TableCell>
                <TableCell>{data.checked ? 'Yes' : 'No'}</TableCell>
                <TableCell>
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
    </div>
  );
}

export default FormGrid;