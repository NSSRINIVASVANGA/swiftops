import React, { useState } from "react";
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
  TextField,
  Modal,
  Fade,
  Backdrop,
  MenuItem,
} from "@mui/material";
import { RefreshCcw, Plus } from "lucide-react";

const initialRefunds = [
  { id: "REF-001", reason: "Product Defect", amount: 150, status: "Approved", date: "2024-03-15" },
  { id: "REF-002", reason: "Wrong Size", amount: 230, status: "Pending", date: "2024-03-14" },
  { id: "REF-003", reason: "Duplicate Charge", amount: 95, status: "Rejected", date: "2024-03-10" },
];

const Refunds = () => {
  const [refunds, setRefunds] = useState(initialRefunds);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newRefund, setNewRefund] = useState({
    id: "",
    reason: "",
    amount: "",
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  });

  // Handle search filtering
  const filteredRefunds = refunds.filter(
    (refund) =>
      refund.id.toLowerCase().includes(search.toLowerCase()) ||
      refund.reason.toLowerCase().includes(search.toLowerCase()) ||
      refund.status.toLowerCase().includes(search.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewRefund({ ...newRefund, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleAddRefund = () => {
    if (newRefund.id && newRefund.reason && newRefund.amount) {
      setRefunds([...refunds, { ...newRefund, amount: parseFloat(newRefund.amount) }]);
      setOpenModal(false);
      setNewRefund({ id: "", reason: "", amount: "", status: "Pending", date: new Date().toISOString().split("T")[0] });
    }
  };

  return (
    
      <Container maxWidth="xl" sx={{ maxWidth: "1400px", width: "100%", p: 4, display: "flex", flexDirection: "column", height: "auto" }}>
        
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">Refunds</Typography>
          <Button variant="contained" color="primary" startIcon={<Plus />} onClick={() => setOpenModal(true)}>
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
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography color="textSecondary">{item.label}</Typography>
                    <Typography variant="h6" fontWeight="bold">{item.amount}</Typography>
                  </Box>
                  <IconButton color={item.color}><RefreshCcw /></IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by ID, Reason, or Status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Scrollable Refunds Table */}
        <Box sx={{ flex: 1, overflowY: "auto" }}> {/* This makes only the table scrollable */}
          <TableContainer component={Paper} sx={{ maxHeight: "300px", overflowY: "auto", borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  {["Refund ID", "Reason", "Amount", "Status", "Date"].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold", fontSize: "14px" }}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRefunds.map((refund) => (
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
        </Box>

        {/* New Refund Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
          <Fade in={openModal}>
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", p: 3, borderRadius: 2 }}>
              <Typography variant="h6" mb={2}>Add New Refund</Typography>
              <TextField fullWidth label="Refund ID" name="id" value={newRefund.id} onChange={handleInputChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Reason" name="reason" value={newRefund.reason} onChange={handleInputChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Amount" name="amount" type="number" value={newRefund.amount} onChange={handleInputChange} sx={{ mb: 2 }} />
              <TextField select fullWidth label="Status" name="status" value={newRefund.status} onChange={handleInputChange} sx={{ mb: 2 }}>
                {["Pending", "Approved", "Rejected"].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <Button variant="contained" color="primary" fullWidth onClick={handleAddRefund}>Add Refund</Button>
            </Box>
          </Fade>
        </Modal>

      </Container>
    
  );
};

export default Refunds;