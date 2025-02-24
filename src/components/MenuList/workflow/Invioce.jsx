import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Modal,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Visibility, Edit, Delete, Search } from "@mui/icons-material";

const InvoiceTable = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [invoices, setInvoices] = useState([
    { id: "INV-001", dueDate: "2024-03-15", amount: 1500, status: "Draft" },
    { id: "INV-002", dueDate: "2024-03-10", amount: 2500, status: "Sent" },
    { id: "INV-003", dueDate: "2024-03-12", amount: 3500, status: "Paid" },
    { id: "INV-004", dueDate: "2024-03-18", amount: 1200, status: "Overdue" },
    { id: "INV-005", dueDate: "2024-03-20", amount: 4000, status: "Draft" },
  ]);

  const handleViewClick = (invoice) => {
    setSelectedInvoice({
      ...invoice,
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      description: "Web development services for client website.",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoice(null);
  };

  const handleDelete = (id) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      {/* Search Bar */}
      <TextField
        label="Search Invoice"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Invoice Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Invoice Number</strong></TableCell>
              <TableCell><strong>Due Date</strong></TableCell>
              <TableCell><strong>Total Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>${invoice.amount}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="success" onClick={() => handleViewClick(invoice)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(invoice.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ mx: 2 }}>
          Page {currentPage} of {totalPages || 1}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </Box>

      {/* Invoice Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          {selectedInvoice && (
            <>
              <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
                Invoice Details
              </Typography>
              <Typography><strong>Invoice Number:</strong> {selectedInvoice.id}</Typography>
              <Typography><strong>Customer Name:</strong> {selectedInvoice.customerName}</Typography>
              <Typography><strong>Customer Email:</strong> {selectedInvoice.customerEmail}</Typography>
              <Typography><strong>Due Date:</strong> {selectedInvoice.dueDate}</Typography>
              <Typography><strong>Total Amount:</strong> ${selectedInvoice.amount}</Typography>
              <Typography><strong>Status:</strong> {selectedInvoice.status}</Typography>
              <Typography><strong>Description:</strong> {selectedInvoice.description}</Typography>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={handleClose} variant="contained" color="primary">
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default InvoiceTable;
