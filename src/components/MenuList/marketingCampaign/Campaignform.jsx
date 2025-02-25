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
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl
  } from "@mui/material";
  
  function Campaignform() {
    // Campaign options
    const campaignTypes = [
      "Email Campaign",
      "Social Media Campaign",


      "SMS Campaign",


    ];

    const Status= [
      "Active",
      "Completed",
      "Draft",
      
    ];
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
      campaignType: "",
      status: "",
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
     
      
      
      
  
   
  
      setErrors(newErrors);
    };
  
    // Validate form data
    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Campaign name is required';
      }
      
      if (!formData.campaignType) {
        newErrors.campaignType = 'Campaign type is required';
      }

      if (!formData.status) {
        newErrors.status = 'Status is required';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // Check for duplicates
 
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      
      if (!validateForm()) {
        return;
      }
      
      try {
        const newData = [...submittedData];
        
        // Find the highest ID and increment by 1 for new entries
        const highestId = newData.reduce((max, item) => Math.max(max, item.id || 0), 0);
        
        const formEntry = { 
          id: editIndex !== null ? newData[editIndex]?.id : highestId + 1,
          name: formData.name,
          campaignType: formData.campaignType,
          status: formData.status,
          active: formData.checked,
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
        showNotification('Failed to save campaign. Please try again.', 'error');
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
            campaignType: rowToEdit.campaignType || '',
            status: rowToEdit.status || '',
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
          showNotification(`Successfully deleted campaign ${userToDelete.name}`, 'success');
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        showNotification('Failed to delete campaign. Please try again.', 'error');
      }
    };
  
    const columns = [
      { label: "ID", field: "id" },
      { label: "Campaign Name", field: "name" },
      { label: "Campaign Type", field: "campaignType" },
      { label: "Status", field: "status" }
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
                    label="Campaign Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={!!errors.campaignType}>
                    <InputLabel>Campaign Type</InputLabel>
                    <Select
                      name="campaignType"
                      value={formData.campaignType}
                      onChange={handleInputChange}
                      label="Campaign Type"
                    >
                      <MenuItem value="Email Campaign">Email Campaign</MenuItem>
                      <MenuItem value="SMS Campaign">SMS Campaign</MenuItem>
                      <MenuItem value="Social Media Campaign">Social Media Campaign</MenuItem>
                    </Select>
                    {errors.campaignType && (
                      <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                        {errors.campaignType}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={!!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      label="Status"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Draft">Draft</MenuItem>
                    </Select>
                    {errors.status && (
                      <Typography color="error" variant="caption" sx={{ mt: 1, ml: 2 }}>
                        {errors.status}
                      </Typography>
                    )}
                  </FormControl>
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
  
  export default Campaignform;