import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState({
    invoice_id: "1",
    business_id: "101",
    client_id: "201",
    invoice_number: "INV-001",
    invoice_date: "2024-02-15",
    due_date: "2024-03-15",
    total_amount: 1500.0,
    status: "Draft",
    created_at: "2024-02-10",
    updated_at: "2024-02-12",
  });

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setInvoice({ ...invoice, updated_at: new Date().toISOString().split("T")[0] });
    alert("Invoice Updated!");
  };

  return (
    <Card sx={{ml:-20}} >
      <CardHeader title="Invoice Details" sx={{mt:7}} />
      <CardContent>
        <TextField
          label="Invoice Number"
          name="invoice_number"
          value={invoice.invoice_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Invoice Date"
          name="invoice_date"
          type="date"
          value={invoice.invoice_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Due Date"
          name="due_date"
          type="date"
          value={invoice.due_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Total Amount"
          name="total_amount"
          type="number"
          value={invoice.total_amount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="status"
          value={invoice.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="body2" color="textSecondary">
          Created At: {invoice.created_at}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last Updated: {invoice.updated_at}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
          Update Invoice
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;