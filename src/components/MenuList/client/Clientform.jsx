import React, { useState } from "react";
  import MaterialTable from "../../MaterialTable";
  import {
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Snackbar,
    Alert
  } from "@mui/material";
  
  function Clientform() {
    // Notification state
    const [notification, setNotification] = useState({
      open: false,
      message: '',
      severity: 'success' // 'success' | 'error' | 'info' | 'warning'
    });
  
    // Handle notification close
    const handleNotificationClose = () => {
      setNotification(prev => ({ ...prev, open: false }));
    };
  
    // Show notification
    const showNotification = (message, severity = 'success') => {
      setNotification({
        open: true,
        message,
        severity
      });
    };
  
    // Initial form state
    const initialFormState = {
      name: "",
      email: "",
      phonenumber: "",
      address: "",
      checked: true,
    };
    // State for form inputs
    const [formData, setFormData] = useState(initialFormState);
  
    // State for form validation errors
    const [errors, setErrors] = useState({});
  
    // State to store submitted data
    const [submittedData, setSubmittedData] = useState([]);
  
    // State to track which entry is being edited
    const [editIndex, setEditIndex] = useState(null);
  
    // State to manage the form popup visibility
    const [open, setOpen] = useState(false);
  
    // Handle form input changes
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newFormData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      };
      setFormData(newFormData);
  
      // Clear specific error when field becomes valid
      const newErrors = { ...errors };
      
      if (name === 'email') {
        if (value.trim() === '') {
          newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          newErrors.email = 'Invalid email address';
        } else {
          delete newErrors.email;
        }
      }
      
      if (name === 'phonenumber') {
        if (value.trim() === '') {
          newErrors.phonenumber = 'Phone number is required';
        } else if (!/^\+?[1-9]\d{9,11}$/.test(value)) {
          newErrors.phonenumber = 'Invalid phone number';
        } else {
          delete newErrors.phonenumber;
        }
      }
  
      if (name === 'name') {
        if (value.trim() === '') {
          newErrors.name = 'Name is required';
        } else {
          delete newErrors.name;
        }
      }
  
      setErrors(newErrors);
    };
  
    // Validate form data
    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      
      if (!formData.phonenumber.trim()) {
        newErrors.phonenumber = 'Phone number is required';
      } else if (!/^\+?[1-9]\d{9,11}$/.test(formData.phonenumber)) {
        newErrors.phonenumber = 'Invalid phone number';
      }
      
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // Check for duplicates
    const checkDuplicates = (data, currentEntry, currentIndex = null) => {
      const duplicateErrors = {};
      
      const isDuplicate = (field, value) => {
        return data.some((entry, index) => 
          index !== currentIndex && entry[field]?.trim().toLowerCase() === value?.trim().toLowerCase()
        );
      };
  
      if (isDuplicate('email', currentEntry.email)) {
        duplicateErrors.email = 'Email already exists';
      }
      if (isDuplicate('phonenumber', currentEntry.phonenumber)) {
        duplicateErrors.phonenumber = 'Phone number already exists';
      }
  
      return duplicateErrors;
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      
      if (!validateForm()) {
        return;
      }
      
      try {
        const newData = [...submittedData];
        
        // Check for duplicates
        const duplicateErrors = checkDuplicates(newData, formData, editIndex);
        if (Object.keys(duplicateErrors).length > 0) {
          setErrors(duplicateErrors);
          return;
        }
  
        // Find the highest ID and increment by 1 for new entries
        const highestId = newData.reduce((max, item) => Math.max(max, item.id || 0), 0);
        
        const formEntry = { 
          ...formData, 
          id: editIndex !== null ? newData[editIndex]?.id : highestId + 1,
          updatedAt: new Date().toISOString()
        };
        
        if (editIndex !== null && editIndex >= 0 && editIndex < newData.length) {
          // Update existing entry
          newData[editIndex] = formEntry;
          showNotification(`Successfully updated ${formEntry.name}`, 'success');
        } else {
          // Add new entry
          newData.push(formEntry);
          showNotification(`Successfully added ${formEntry.name}`, 'success');
        }
        
        setSubmittedData(newData);
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ 
          submit: 'An error occurred while saving. Please try again.' 
        });
        showNotification('Failed to save user. Please try again.', 'error');
      }
    };
  
    // Open the form popup for new entry
    const handleClickOpen = () => {
      resetForm();
      setOpen(true);
    };
  
    // Open the form popup for editing existing entry
    const handleEdit = (index) => {
      try {
        if (index >= 0 && index < submittedData.length) {
          const rowToEdit = submittedData[index];
          setEditIndex(index);
          setFormData({
            name: rowToEdit.name || '',
            email: rowToEdit.email || '',
            phonenumber: rowToEdit.phonenumber || '',
            address: rowToEdit.address || '',
            checked: Boolean(rowToEdit.checked),
          });
          setOpen(true);
          setErrors({});
        }
      } catch (error) {
        console.error('Error opening edit form:', error);
      }
    };
  
    // Close the form popup
    const handleClose = () => {
      setOpen(false);
      resetForm();
    };
  
    // Reset form fields
    const resetForm = () => {
      setFormData(initialFormState);
      setErrors({});
      setEditIndex(null);
      setOpen(false);
    };
  
    // Handle delete action
    const handleDelete = (index) => {
      try {
        if (index >= 0 && index < submittedData.length) {
          const userToDelete = submittedData[index];
          const updatedData = submittedData.filter((_, i) => i !== index);
          setSubmittedData(updatedData);
          showNotification(`Successfully deleted ${userToDelete.name}`, 'success');
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        showNotification('Failed to delete user. Please try again.', 'error');
      }
    };
  
    const columns = [
      { label: "Name", field: "name" },
      { label: "Email", field: "email" },
      { label: "Phone Number", field: "phonenumber" },
      { label: "Address", field: "address" }
    ];
  
    return (
      <div style={{ paddingTop: "24px", width: "100%" }}>
        {/* Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleNotificationClose} 
            severity={notification.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
        {/* Add New Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px", marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add New
          </Button>
        </div>
  
        {/* Form Popup */}
        <Dialog 
          open={open} 
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
        >
          <form onSubmit={handleSubmit}>
            <DialogTitle>{editIndex !== null ? "Edit Entry" : "Add New Entry"}</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    name="phonenumber"
                    type="tel"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                    variant="outlined"
                    error={!!errors.phonenumber}
                    helperText={errors.phonenumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    variant="outlined"
                    error={!!errors.address}
                    helperText={errors.address}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="checked"
                        checked={formData.checked}
                        onChange={handleInputChange}
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                </Grid>
              </Grid>
              {errors.submit && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {errors.submit}
                </Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
              <Button 
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }} 
                color="inherit"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={Object.keys(errors).length > 0}
              >
                {editIndex !== null ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
  
        {/* Table displaying data */}
        <MaterialTable 
          columns={columns} 
          initialData={submittedData}
          onUpdate={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    );
  }
  


export default Clientform
