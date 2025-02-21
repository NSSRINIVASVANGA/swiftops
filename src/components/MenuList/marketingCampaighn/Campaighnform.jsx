import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  MenuItem,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Edit, Delete } from "@mui/icons-material";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    campaign_name: "",
    campaign_type: "Email",
    status: "Draft",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [configError, setConfigError] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setConfigError("");
      if (isEditing) {
        setSubmittedData((prevData) =>
          prevData.map((item) => (item.campaign_id === formData.campaign_id ? formData : item))
        );
      } else {
        setSubmittedData([...submittedData, { ...formData, campaign_id: uuidv4() }]);
      }
      setOpen(false);
      setIsEditing(false);
      setFormData({
        campaign_name: "",
        campaign_type: "Email",
        status: "Draft",
      });
    } catch (error) {
      setConfigError("Invalid format");
    }
  };

  const handleDelete = (id) => {
    setSubmittedData(submittedData.filter((item) => item.campaign_id !== id));
  };

  const handleEdit = (id) => {
    const selectedCampaign = submittedData.find((item) => item.campaign_id === id);
    if (selectedCampaign) {
      setFormData({
        campaign_name: selectedCampaign.campaign_name,
        campaign_type: selectedCampaign.campaign_type,
        status: selectedCampaign.status,
      });
      setIsEditing(true);
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { setOpen(true); setIsEditing(false); }}
        sx={{ mb: 2 }}
      >
        Create Campaign
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Campaign" : "Create Campaign"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 , mt: 2}}>
            <TextField
              label="Campaign Name"
              name="campaign_name"
              fullWidth
              value={formData.campaign_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Campaign Type"
              name="campaign_type"
              fullWidth
              value={formData.campaign_type}
              onChange={handleChange}
              required
            />
            <TextField select label="Status" name="status" fullWidth value={formData.status} onChange={handleChange}>
              {["Draft", "Active", "Completed"].map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </TextField>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update" : "Submit"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {submittedData.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>Campaigns</Typography>
          {submittedData.map((data) => (
            <Paper key={data.campaign_id} elevation={2} sx={{ p: 2, mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="body1"><strong>{data.campaign_name}</strong> ({data.status})</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEdit(data.campaign_id)} color="primary"><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(data.campaign_id)} color="error"><Delete /></IconButton>
              </Box>
            </Paper>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default CampaignForm;