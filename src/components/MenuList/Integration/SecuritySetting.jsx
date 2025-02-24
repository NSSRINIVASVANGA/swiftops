import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Pagination,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const IntegrationModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    apiKey: "",
    status: "Active",
  });
  const [integrations, setIntegrations] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // Change this value to set how many items per page

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddIntegration = () => {
    setIntegrations([...integrations, { ...formData, id: Date.now() }]);
    setFormData({ name: "", type: "", apiKey: "", status: "Active" });
    handleClose();
  };

  const toggleStatus = (id) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, status: integration.status === "Active" ? "Inactive" : "Active" }
          : integration
      )
    );
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedIntegrations = integrations.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box display="flex" justifyContent="center" alignItems="top" width="100vw" minHeight="100vh" sx={{ backgroundColor: "#f5f5f5" }}>
      <Box p={3} sx={{ backgroundColor: "#fff", maxWidth: "900px", width: "100%", borderRadius: 3, boxShadow: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} gap={2}>
          <Typography variant="h4" fontWeight="bold">
            Integrations
          </Typography>
          <Button variant="contained" sx={{ bgcolor: "#1c1c1c", color: "#fff", borderRadius: 2 }} onClick={handleOpen}>
            Add Integration
          </Button>
        </Box>

        {displayedIntegrations.map((integration) => (
          <Card key={integration.id} sx={{ mb: 2, p: 2, borderRadius: 3, boxShadow: 3, backgroundColor: "#fff" }}>
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h5" fontWeight="bold">{integration.name}</Typography>
                <IconButton onClick={() => toggleStatus(integration.id)}>
                  <SettingsIcon />
                </IconButton>
              </Box>
              <Box display="flex" justifyContent="left" my={1}>
                <Chip
                  label={integration.status}
                  color={integration.status === "Active" ? "success" : "error"}
                  sx={{ fontSize: "0.9rem", px: 2, py: 1, borderRadius: 2 }}
                />
              </Box>
              <Typography variant="body2" textAlign="left">Type: {integration.type}</Typography>
            </CardContent>
          </Card>
        ))}

        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(integrations.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Add New Integration</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Integration Name"
            name="name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Integration Type"
            name="type"
            fullWidth
            variant="outlined"
            value={formData.type}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="API Key"
            name="apiKey"
            fullWidth
            variant="outlined"
            value={formData.apiKey}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Button onClick={handleClose} sx={{ bgcolor: "#e0e0e0", color: "#000", borderRadius: 2 }}>Cancel</Button>
          <Button variant="contained" sx={{ bgcolor: "#1c1c1c", color: "#fff", borderRadius: 2 }} onClick={handleAddIntegration}>
            Add Integration
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IntegrationModal;