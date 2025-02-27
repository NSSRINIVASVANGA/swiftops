import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const roles = ["User", "Admin", "Manager"];
const departments = ["IT", "Sales", "Marketing", "Support", "Operations"];
const statuses = ["Active", "Inactive"];

const mockData = [
  {
    name: "Sreekanth",
    email: "sreekanth@example.com",
    phone: "1234567890",
    role: "Admin",
    department: "IT",
    status: "Active",
  },
  {
    name: "Anjali",
    email: "anjali@example.com",
    phone: "0987654321",
    role: "User",
    department: "Sales",
    status: "Inactive",
  },
  {
    name: "Tarun",
    email: "tarun@example.com",
    phone: "1122334455",
    role: "Manager",
    department: "Marketing",
    status: "Active",
  },
];

const App = () => {
  const [users, setUsers] = useState(mockData);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    phonenumber: "",
    userRole: "",
    password: "",
    confirmPassword: "",
    business: "",
    checked: true,
  };

  // User role options
  const userRoles = [
    "Business User",
    "Business Admin",
    "Finance Manager",
    "Marketing Specialist"
  ];
  // State for form inputs
  const [formData, setFormData] = useState(initialFormState);

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // State to store submitted data
  const [submittedData, setSubmittedData] = useState([]);

  // State to track which entry is being edited
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State to manage the form popup visibility
  const [open, setOpen] = useState(false);

  // State for password confirmation dialog
  const [passwordDialog, setPasswordDialog] = useState({
    open: false,
    type: '', // 'update' or 'delete'
    password: '',
    error: '',
    rowIndex: null,
    rowData: null
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newFormData);
    validateField(name, value);
  };

  // Validate individual field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    const validations = {
      email: {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      },
      phonenumber: {
        required: true,
        pattern: /^\+?[1-9]\d{9,11}$/,
        message: 'Invalid phone number'
      },
      name: { required: true },
      userRole: { required: true },
      business: { required: true },
      password: {
        required: true,
        minLength: 8,
        message: 'Password must be at least 8 characters'
      },
      confirmPassword: {
        required: true,
        match: 'password',
        message: 'Passwords do not match'
      }
    };

    const validation = validations[name];
    if (validation) {
      if (validation.required && !value?.trim()) {
        newErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      } else if (validation.pattern && !validation.pattern.test(value)) {
        newErrors[name] = validation.message;
      } else if (validation.minLength && value.length < validation.minLength) {
        newErrors[name] = validation.message;
      } else if (validation.match && value !== formData[validation.match]) {
        newErrors[name] = validation.message;
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phonenumber?.trim()) {
      newErrors.phonenumber = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{9,11}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = 'Invalid phone number';
    }

    if (!formData.userRole) {
      newErrors.userRole = 'User Role is required';
    }

    if (!formData.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword?.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.business?.trim()) {
      newErrors.business = 'Business is required';
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

  // Handle password confirmation
  const handlePasswordConfirm = () => {
    const userData = submittedData[passwordDialog.rowIndex];
    if (passwordDialog.password === userData.password) {
      if (passwordDialog.type === 'delete') {
        handleDeleteConfirmed(passwordDialog.rowIndex);
      } else if (passwordDialog.type === 'update') {
        handleEdit(passwordDialog.rowIndex);
      }
      setPasswordDialog(prev => ({ ...prev, open: false, password: '', error: '' }));
    } else {
      setPasswordDialog(prev => ({ ...prev, error: 'Incorrect password' }));
    }
  };

  // Handle password dialog close
  const handlePasswordDialogClose = () => {
    setPasswordDialog({
      open: false,
      type: '',
      password: '',
      error: '',
      rowIndex: null,
      rowData: null
    });
  };

  // Handle delete after password confirmation
  const handleDeleteConfirmed = (index) => {
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    console.log('Form data being submitted:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    
    try {
      let newData = submittedData ? [...submittedData] : [];
      console.log('Current data:', newData);
      
      // Check for duplicates
      const duplicateErrors = checkDuplicates(newData, formData, editIndex);
      if (Object.keys(duplicateErrors).length > 0) {
        console.log('Duplicate entries found:', duplicateErrors);
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
      
      console.log('Saving entry:', formEntry);
      
      if (editIndex !== null && editIndex >= 0 && editIndex < newData.length) {
        // Update existing entry
        newData[editIndex] = formEntry;
        showNotification(`Successfully updated ${formEntry.name}`, 'success');
      } else {
        // Add new entry
        newData = [...newData, formEntry];
        showNotification(`Successfully added ${formEntry.name}`, 'success');
      }
      
      setSubmittedData(newData);
      setOpen(false);
      setFormData(initialFormState);
      setEditIndex(null);
      setErrors({});
      
      // Show alert message with password for new users
      if (editIndex === null) {
        alert(`New user ${formEntry.name} has been successfully added!\n\nIMPORTANT: Please remember your password for future updates and deletions.`);
      } else {
        alert(`User ${formEntry.name} has been successfully updated!`);
      }
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

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedUsers = users.map((user, index) =>
        index === editIndex ? currentUser : user
      );
      setUsers(updatedUsers);
    } else {
      setUsers([...users, currentUser]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    try {
      if (index >= 0 && index < submittedData.length) {
        const rowToEdit = submittedData[index];
        setEditIndex(index);
        setFormData({
          name: rowToEdit.name || '',
          email: rowToEdit.email || '',
          phonenumber: rowToEdit.phonenumber || '',
          userRole: rowToEdit.userRole || '',
          password: rowToEdit.password || '',
          confirmPassword: rowToEdit.password || '',
          business: rowToEdit.business || '',
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
    console.log('Form reset, new state:', initialFormState);
  };

  // Handle delete action
  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const columns = [
    { label: "Name", field: "name", width: 150 },
    { label: "Email", field: "email", width: 200 },
    { label: "Phone Number", field: "phonenumber", width: 150 },
    { label: "User Role", field: "userRole", width: 150 },
    { label: "Business", field: "business", width: 150 },
    { label: "Status", field: "checked", width: 100, render: (row) => row.checked ? 'Active' : 'Inactive' }
  ];

  return (
    <Container sx={{ boxShadow: 3, borderRadius: 2, p: 2, maxWidth: "lg", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>User Management</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <TextField
          fullWidth
          label="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1, mr: { sm: 2 }, mb: { xs: 2, sm: 0 }, boxShadow: 1 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
          sx={{ fontWeight: "bold", borderRadius: 2, boxShadow: 1 }}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ overflowX: "auto", boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                  focused
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  focused
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Phone Number"
                  focused
                  name="phonenumber"
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
                  select
                  label="User Role"
                  name="userRole"
                  focused
                  value={formData.userRole}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!errors.userRole}
                  helperText={errors.userRole}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select a role</option>
                  {userRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  focused
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Confirm Password"
                  focused
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Business"
                  focused
                  name="business"
                  value={formData.business}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={!!errors.business}
                  helperText={errors.business}
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
          </DialogContent>
          {errors.submit && (
            <Typography color="error" sx={{ mt: 2, px: 3 }}>
              {errors.submit}
            </Typography>
          )}
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              {editIndex !== null ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Password Confirmation Dialog */}
      <Dialog open={passwordDialog.open} onClose={handlePasswordDialogClose}>
        <DialogTitle>
          {passwordDialog.type === 'delete' ? 'Confirm Delete' : 'Confirm Update'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please enter the user's password to {passwordDialog.type} this user.
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="Admin Password"
            value={passwordDialog.password}
            onChange={(e) => setPasswordDialog(prev => ({ ...prev, password: e.target.value, error: '' }))}
            error={!!passwordDialog.error}
            helperText={passwordDialog.error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose}>Cancel</Button>
          <Button onClick={handlePasswordConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Data Table */}
      <MaterialTable
        initialData={submittedData}
        columns={columns}
        onUpdate={(index) => {
          console.log('Editing row:', index, submittedData[index]);
          setPasswordDialog({
            open: true,
            type: 'update',
            password: '',
            error: '',
            rowIndex: index,
            rowData: submittedData[index]
          });
        }}
        onDelete={(index) => {
          console.log('Deleting row:', index, submittedData[index]);
          setPasswordDialog({
            open: true,
            type: 'delete',
            password: '',
            error: '',
            rowIndex: index,
            rowData: submittedData[index]
          });
        }}
      />
    </Container>
  );
};

export default App;
