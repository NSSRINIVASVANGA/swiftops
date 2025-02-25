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
    phone: "",
    role: "User",
    department: "IT",
    status: "Active",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => {
    setCurrentUser({
      name: "",
      email: "",
      phone: "",
      role: "User",
      department: "IT",
      status: "Active",
    });
    setEditIndex(null);
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
    setCurrentUser(users[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default App;
