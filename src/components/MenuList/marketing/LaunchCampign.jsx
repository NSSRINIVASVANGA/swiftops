import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Card, CardContent, Grid, Chip, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, IconButton, InputBase, Paper, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { Email, Send, Info, Edit, Add, Delete, Search } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const MarketingCampaign = () => {
  const LOCAL_STORAGE_KEY = "campaigns";

  const [campaigns, setCampaigns] = useState(() => {
    const savedCampaigns = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCampaigns ? JSON.parse(savedCampaigns) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(campaigns));
  }, [campaigns]);

  const handleOpen = (campaign = null) => {
    if (campaign) {
      setEditingCampaign({ ...campaign });
      setIsEditing(true);
    } else {
      setEditingCampaign({
        id: Date.now(),
        title: "",
        sent: "",
        opened: "",
        clicked: "",
        schedule: "",
        status: "Scheduled",
      });
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCampaign(null);
  };

  const handleSave = () => {
    if (isEditing) {
      setCampaigns(campaigns.map(c => (c.id === editingCampaign.id ? editingCampaign : c)));
    } else {
      setCampaigns([...campaigns, editingCampaign]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCampaign(prev => ({ ...prev, [name]: value }));
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Marketing Campaigns</Typography>
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button variant="contained" color="primary" onClick={() => handleOpen()} startIcon={<Add />}>
            New Campaign
          </Button>
        </motion.div>
      </Box>
      <Paper sx={{ p: 1, mb: 2, display: "flex", alignItems: "center" }}>
        <Search sx={{ ml: 1 }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Campaigns"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Paper>
      <Grid container spacing={2}>
        <AnimatePresence>
          {filteredCampaigns.map((campaign) => (
            <Grid item xs={12} key={campaign.id}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
                <Card sx={{ p: 1, borderRadius: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center" }}>{campaign.title}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      <Box>
                        <Typography variant="body2"><Send /> Sent: {campaign.sent}</Typography>
                        <Typography variant="body2"><Email /> Opened: {campaign.opened}</Typography>
                        <Typography variant="body2"><Info /> Clicked: {campaign.clicked}</Typography>
                      </Box>
                      <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Chip label={campaign.status} color={campaign.status === "Active" ? "success" : "warning"} sx={{ fontSize: "12px", height: 22, mb: 1 }} />
                        <Box>
                          <IconButton color="secondary" onClick={() => handleOpen(campaign)}><Edit /></IconButton>
                          <IconButton color="error" onClick={() => handleDelete(campaign.id)}><Delete /></IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? "Edit Campaign" : "New Campaign"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" name="title" value={editingCampaign?.title} onChange={handleInputChange} margin="dense" />
          <TextField fullWidth label="Sent" name="sent" value={editingCampaign?.sent} onChange={handleInputChange} margin="dense" type="number" />
          <TextField fullWidth label="Opened" name="opened" value={editingCampaign?.opened} onChange={handleInputChange} margin="dense" type="number" />
          <TextField fullWidth label="Clicked" name="clicked" value={editingCampaign?.clicked} onChange={handleInputChange} margin="dense" type="number" />
          <TextField fullWidth label="Schedule" name="schedule" value={editingCampaign?.schedule} onChange={handleInputChange} margin="dense" type="date" InputLabelProps={{ shrink: true }} />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={editingCampaign?.status} onChange={handleInputChange}>
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MarketingCampaign;