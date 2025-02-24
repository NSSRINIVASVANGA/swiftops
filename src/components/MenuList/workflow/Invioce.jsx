import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Chip, Typography, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Button
} from "@mui/material";
import { Edit, Delete, Visibility, Search, Add } from "@mui/icons-material";


const initialInvoices = [
  { client: "Acme Corp", amount: "$1200", status: "Paid", date: "2025-02-20", color: "success" },
  { client: "Global Tech", amount: "$3500", status: "Pending", date: "2025-02-22", color: "warning" },
  { client: "Star Industries", amount: "$850", status: "Overdue", date: "2025-02-15", color: "error" },
];

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState({ client: "", amount: "", status: "", date: "", color: "default" });

  const handleEdit = (index) => {
    setCurrentInvoice({ ...invoices[index], index });
    setOpenEdit(true);
  };

  const handleView = (index) => {
    setCurrentInvoice(invoices[index]);
    setOpenView(true);
  };

  const handleDelete = (index) => {
    setInvoices(invoices.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedInvoices = [...invoices];
    updatedInvoices[currentInvoice.index] = { ...currentInvoice, color: getStatusColor(currentInvoice.status) };
    setInvoices(updatedInvoices);
    setOpenEdit(false);
  };

  const handleCreate = () => {
    if (!currentInvoice.client || !currentInvoice.amount || !currentInvoice.status || !currentInvoice.date) return;
    setInvoices([...invoices, { ...currentInvoice, color: getStatusColor(currentInvoice.status) }]);
    setCurrentInvoice({ client: "", amount: "", status: "", date: "", color: "default" });
    setOpenCreate(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid": return "success";
      case "pending": return "warning";
      case "overdue": return "error";
      default: return "default";
    }
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>Invoicing</Typography>
      <Button variant="contained" startIcon={<Add />} onClick={() => setOpenCreate(true)} sx={{ marginBottom: 2 }}>Create New Invoice</Button>
      <TextField
        label="Search by Client"
        fullWidth
        margin="dense"
        InputProps={{ startAdornment: <Search sx={{ marginRight: 1 }} /> }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>CLIENT</b></TableCell>
              <TableCell><b>AMOUNT</b></TableCell>
              <TableCell><b>STATUS</b></TableCell>
              <TableCell><b>DATE</b></TableCell>
              <TableCell><b>ACTIONS</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell><Chip label={invoice.status} color={invoice.color} /></TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(index)} color="primary"><Visibility /></IconButton>
                  <IconButton onClick={() => handleEdit(index)} color="secondary"><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(index)} color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Invoice Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
        <DialogTitle>Create New Invoice</DialogTitle>
        <DialogContent>
          <TextField label="Client" fullWidth margin="dense" value={currentInvoice.client} onChange={(e) => setCurrentInvoice({ ...currentInvoice, client: e.target.value })} />
          <TextField label="Amount" fullWidth margin="dense" value={currentInvoice.amount} onChange={(e) => setCurrentInvoice({ ...currentInvoice, amount: e.target.value })} />
          <TextField label="Status" fullWidth margin="dense" value={currentInvoice.status} onChange={(e) => setCurrentInvoice({ ...currentInvoice, status: e.target.value })} />
          <TextField label="Date" type="date" fullWidth margin="dense" value={currentInvoice.date} InputLabelProps={{ shrink: true }} onChange={(e) => setCurrentInvoice({ ...currentInvoice, date: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Invoice Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Invoice</DialogTitle>
        <DialogContent>
          <TextField label="Client" fullWidth margin="dense" value={currentInvoice.client} onChange={(e) => setCurrentInvoice({ ...currentInvoice, client: e.target.value })} />
          <TextField label="Amount" fullWidth margin="dense" value={currentInvoice.amount} onChange={(e) => setCurrentInvoice({ ...currentInvoice, amount: e.target.value })} />
          <TextField label="Status" fullWidth margin="dense" value={currentInvoice.status} onChange={(e) => setCurrentInvoice({ ...currentInvoice, status: e.target.value })} />
          <TextField label="Date" type="date" fullWidth margin="dense" value={currentInvoice.date} InputLabelProps={{ shrink: true }} onChange={(e) => setCurrentInvoice({ ...currentInvoice, date: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default InvoiceTable;