import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Select, MenuItem, Typography
} from "@mui/material";

const invoices = [
  {
    invoice_id: "1",
    business_id: "101",
    client_id: "201",
    invoice_number: "INV-001",
    invoice_date: "2024-02-15",
    due_date: "2024-03-15",
    total_amount: 1500.0,
    status: "Draft",
    created_at: "2024-02-10",
    updated_at: "2024-02-12"
  },
  {
    invoice_id: "2",
    business_id: "102",
    client_id: "202",
    invoice_number: "INV-002",
    invoice_date: "2024-02-10",
    due_date: "2024-03-10",
    total_amount: 2500.0,
    status: "Sent",
    created_at: "2024-02-08",
    updated_at: "2024-02-11"
  },
  {
    invoice_id: "3",
    business_id: "103",
    client_id: "203",
    invoice_number: "INV-003",
    invoice_date: "2024-02-10",
    due_date: "2024-03-10",
    total_amount: 2500.0,
    status: "Sent",
    created_at: "2024-02-08",
    updated_at: "2024-02-11"
  }
];

const InvoiceTable = () => {
  const [invoiceData, setInvoiceData] = useState(invoices);
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setInvoiceData(prev =>
      prev.map(invoice =>
        invoice.invoice_id === id ? { ...invoice, status: newStatus } : invoice
      )
    );
  };

  const handleViewInvoice = (id) => {
    navigate(`/invoice/${id}`);
  };

  return (
    <Paper sx={{ paddingTop:4,paddingleft:10, marginTop:10,marginLeft:'0%',width:'100'}}>
      <Typography variant="h6" gutterBottom>
        Invoice Management
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.map((invoice) => (
              <TableRow key={invoice.invoice_id}>
                <TableCell>{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.invoice_date}</TableCell>
                <TableCell>{invoice.due_date}</TableCell>
                <TableCell>${invoice.total_amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Select
                    value={invoice.status}
                    onChange={(e) => handleStatusChange(invoice.invoice_id, e.target.value)}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Sent">Sent</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Overdue">Overdue</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    onClick={() => handleViewInvoice(invoice.invoice_id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default InvoiceTable;