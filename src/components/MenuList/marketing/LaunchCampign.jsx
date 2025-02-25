import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Card, CardContent, Grid, Chip, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, IconButton, InputBase, Paper
} from "@mui/material";
import { Email, Send, Info, Edit, Add, Delete, Search } from "@mui/icons-material";
import { motion } from "framer-motion";

const MarketingCampaign = () => {
  const LOCAL_STORAGE_KEY = "campaigns";

  const [campaigns, setCampaigns] = useState(() => {
    const savedCampaigns = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCampaigns ? JSON.parse(savedCampaigns) : [
      { id: 1, title: "🔥 Summer Sale", sent: 1000, opened: 450, clicked: 200, status: "Active" },
      { id: 2, title: "❄️ Winter Sale", sent: 1200, opened: 500, clicked: 250, status: "Scheduled" }
    ];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [newCampaign, setNewCampaign] = useState({ title: "", sent: "", opened: "", clicked: "", status: "Active" });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(campaigns));
  }, [campaigns]);

  const addCampaign = () => {
    if (newCampaign.title.trim()) {
      setCampaigns([...campaigns, { id: Date.now(), ...newCampaign }]);
      setNewCampaign({ title: "", sent: "", opened: "", clicked: "", status: "Active" });
      setOpenDialog(false);
    }
  };

  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: "#333", textTransform: "uppercase" }}>
        📢 Marketing Campaigns
      </Typography>

      {/* Search Bar */}
      <Paper sx={{ display: "flex", alignItems: "center", p: "4px 10px", mb: 3, width: "100%", maxWidth: 500, mx: "auto", borderRadius: 2 }}>
        <Search color="action" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Campaigns"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {/* Add Campaign Button */}
      <Button variant="contained" startIcon={<Add />} sx={{ mb: 2 }} onClick={() => setOpenDialog(true)}>
        Add Campaign
      </Button>

      {/* Campaigns List */}
      <Grid container spacing={2} justifyContent="center">
        {campaigns.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())).map((campaign) => (
          <Grid item xs={12} sm={10} md={8} key={campaign.id}>
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3, display: "flex", flexDirection: "column" }}>
                {/* Campaign Title with Gradient Styling */}
                <Typography variant="h5" fontWeight="bold" sx={{
                  mb: 1, color: "white", background: "linear-gradient(to right, #ff8c00, #ff2d55)", 
                  p: 1, borderRadius: 1, display: "inline-block", textAlign: "center"
                }}>
                  {campaign.title}
                </Typography>

                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {/* Campaign Details */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2"><Send /> Sent: {campaign.sent}</Typography>
                    <Typography variant="body2"><Email /> Opened: {campaign.opened}</Typography>
                    <Typography variant="body2"><Info /> Clicked: {campaign.clicked}</Typography>
                  </Box>

                  {/* Status */}
                  <Chip label={campaign.status} color={campaign.status === "Active" ? "success" : "warning"} sx={{ fontSize: "12px", height: 22, mr: 2 }} />

                  {/* Actions (Edit & Delete) */}
                  <Box>
                    <IconButton color="secondary" size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => deleteCampaign(campaign.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Add Campaign Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Campaign</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth margin="dense" label="Campaign Title"
            value={newCampaign.title} onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Sent" type="number"
            value={newCampaign.sent} onChange={(e) => setNewCampaign({ ...newCampaign, sent: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Opened" type="number"
            value={newCampaign.opened} onChange={(e) => setNewCampaign({ ...newCampaign, opened: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Clicked" type="number"
            value={newCampaign.clicked} onChange={(e) => setNewCampaign({ ...newCampaign, clicked: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="error">Cancel</Button>
          <Button onClick={addCampaign} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MarketingCampaign;
