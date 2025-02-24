import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const payments = [
  { id: "PAY-001", customer: "Jeevan", amount: 299.99, status: "Completed", date: "2025-02-24", method: "Stripe" },
  { id: "PAY-002", customer: "Rohit", amount: 699.98, status: "Pending", date: "2025-02-23", method: "PayPal" },
];

const PaymentSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small

  const filteredPayments = payments.filter((payment) =>
    Object.values(payment).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "auto", minHeight: "auto", padding: 3, boxSizing: "border-box" }}>
      {/* Header & Search Bar */}
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          <AttachMoneyIcon style={{ verticalAlign: "middle" }} /> Payments
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search payments..."
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: isMobile ? "100%" : 300, mt: isMobile ? 2 : 0 }}
        />
      </Box>

      {/* Stats Cards */}
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} width="100%">
        <Card sx={{ flex: 1, minWidth: isMobile ? "100%" : "auto" }}>
          <CardContent>
            <Typography variant="h6">Total Payments</Typography>
            <Typography variant="h5" fontWeight="bold">$999.97</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: isMobile ? "100%" : "auto" }}>
          <CardContent>
            <Typography variant="h6">Completed</Typography>
            <Typography variant="h5" fontWeight="bold">
              1 <CheckCircleIcon style={{ color: "green" }} />
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: isMobile ? "100%" : "auto" }}>
          <CardContent>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h5" fontWeight="bold">
              1 <AccessTimeIcon style={{ color: "goldenrod" }} />
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Payments Table */}
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
        Recent Payments
      </Typography>
      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Customer</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Method</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>
                  {payment.status === "Completed" ? (
                    <><CheckCircleIcon style={{ color: "green" }} /> Completed</>
                  ) : (
                    <><AccessTimeIcon style={{ color: "goldenrod" }} /> Pending</>
                  )}
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.method}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentSection;