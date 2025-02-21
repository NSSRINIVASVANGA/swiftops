// import React from "react";
 import MaterialTable from "../../MaterialTable";

import React, {  useState } from 'react';
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


function Clientform() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    address: '',
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
  console.log(submittedData);

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
      setSubmittedData([...submittedData, {...formData}]);
    }
    // Reset form and close the popup
    setFormData({
      name : '',
      email: '',
      phonenumber: '',
      address: '',
      checked: true,
    });
    setOpen(false);
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
      name: '',
      email: '',
      phonenumber: '',
      address: '',
      checked: true,
    });
  };

  const handleUpdate = (user) => {
    alert(`Update user: ${user.name}`);
  };

  const columns = [
    { label: "ID", field: "id" },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "phonenumber", field: "phonenumber" },
    { label: "Address", field: "address" }
  ];


  return (
    <div style={{ paddingTop : "24px", widtth: '100%' }}>
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

            <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: '16px' }}
                />
              </Grid>
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

      <MaterialTable columns={columns} key = {submittedData.length} initialData={submittedData} onUpdate={handleUpdate} />
    </div>
  );
}

export default Clientform;
