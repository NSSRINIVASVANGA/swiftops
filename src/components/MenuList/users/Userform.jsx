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
} from "@mui/material";

function Clientform() {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
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
      [name]: type === "checkbox" ? checked : value,
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
      setSubmittedData([...submittedData, { ...formData }]);
    }

    // Reset form and close the popup
    resetForm();
  };

  // Open the form popup for new entry
  const handleClickOpen = () => {
    resetForm();
    setOpen(true);
  };

  // Open the form popup for editing existing entry
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(submittedData[index]); // Pre-fill form with selected entry
    setOpen(true);
  };

  // Close the form popup
  const handleClose = () => {
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phonenumber: "",
      address: "",
      checked: true,
    });
    setEditIndex(null);
    setOpen(false);
  };

  const columns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Phone Number", field: "phonenumber" },
    { label: "Address", field: "address" },
    {
      label: "Actions",
      field: "actions",
      render: (rowData, index) => (
        <Button variant="contained" color="primary" onClick={() => handleEdit(index)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div style={{ paddingTop: "24px", width: "100%" }}>
      {/* Add New Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px", marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New
        </Button>
      </div>

      {/* Form Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? "Edit Entry" : "Add New Entry"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: "8px" }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: "16px" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: "16px" }}
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
                  sx={{ marginBottom: "16px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ marginBottom: "16px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checked"
                      checked={formData.checked}
                      onChange={handleInputChange}
                      sx={{ color: "#1976d2" }}
                    />
                  }
                  label="Check me out"
                  sx={{ color: "#333" }}
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
            {editIndex !== null ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table displaying data */}
      <MaterialTable columns={columns} key={submittedData.length} initialData={submittedData} />
    </div>
  );
}

export default Clientform;
