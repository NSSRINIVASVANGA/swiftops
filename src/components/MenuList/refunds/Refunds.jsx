import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  IconButton,
  Container,
} from "@mui/material";
import { RefreshCcw } from "lucide-react";

const refundsData = [
  { id: "REF-001", reason: "Product Defect", amount: 150, status: "Approved", date: "2024-03-15" },
  { id: "REF-002", reason: "Wrong Size", amount: 230, status: "Pending", date: "2024-03-14" },
  { id: "REF-003", reason: "Duplicate Charge", amount: 95, status: "Rejected", date: "2024-03-10" },
];

const Refunds = () => {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%",p: 3 , justifyContent:"center"}}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Refunds
          </Typography>
          <Button variant="contained" color="primary">
            New Refund
          </Button>
        </Box>

        {/* Refund Summary Cards */}
        <Grid container spacing={3} mb={3}>
          {[
            { label: "Total Refunded", amount: "$4,525", color: "primary" },
            { label: "Pending Refunds", amount: "$1,245", color: "warning" },
            { label: "Rejected Refunds", amount: "$215", color: "error" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography color="textSecondary">{item.label}</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {item.amount}
                    </Typography>
                  </Box>
                  <IconButton color={item.color}>
                    <RefreshCcw />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Refunds Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {["Refund ID", "Reason", "Amount", "Status", "Date"].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {refundsData.map((refund) => (
                <TableRow key={refund.id} hover>
                  <TableCell>{refund.id}</TableCell>
                  <TableCell>{refund.reason}</TableCell>
                  <TableCell>${refund.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={refund.status}
                      color={
                        refund.status === "Approved"
                          ? "success"
                          : refund.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    />
                  </TableCell>
                  <TableCell>{refund.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Refunds;