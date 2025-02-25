import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, Card, CardContent, Grid, Chip, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, IconButton
} from "@mui/material";
import { Email, Send, Info, Edit, Add, Delete } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const MarketingCampaign = () => {
  const LOCAL_STORAGE_KEY = "campaigns";

  const [campaigns, setCampaigns] = useState(() => {
    const savedCampaigns = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedCampaigns ? JSON.parse(savedCampaigns) : [
      {
        id: 1,
        title: "Summer Sale",
        sent: 1000,
        opened: 450,
        clicked: 200,
        schedule: "2025-06-01",
        status: "Active",
      },
      {
        id: 2,
        title: "Winter Sale",
        sent: 1200,
        opened: 500,
        clicked: 250,
        schedule: "2025-12-01",
        status: "Scheduled",
      }
    ];
  });

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

  return (
    <Box sx={{ p: 0 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">Marketing Campaigns</Typography>
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button variant="contained" color="primary" size="medium" onClick={() => handleOpen()} startIcon={<Add />}>
            New Campaign
          </Button>
        </motion.div>
      </Box>

      <Grid container spacing={2}>
  <AnimatePresence>
    {campaigns.map((campaign) => (
      <Grid item xs={12} key={campaign.id}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            sx={{
              p: 1,
              borderRadius: 2,
              boxShadow: 2,
              width: "100%", // Make sure it fills the container
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight="bold">{campaign.title}</Typography>
                <Typography variant="body2"><Send sx={{ fontSize: 16 }} /> Sent: {campaign.sent}</Typography>
                <Typography variant="body2"><Email sx={{ fontSize: 16 }} /> Opened: {campaign.opened}</Typography>
                <Typography variant="body2"><Info sx={{ fontSize: 16 }} /> Clicked: {campaign.clicked}</Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Chip label={campaign.status} color={campaign.status === "Active" ? "success" : "warning"} sx={{ fontSize: "12px", height: 22 }} />
                <Box mt={1} display="flex">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <IconButton color="secondary" size="small" onClick={() => handleOpen(campaign)}>
                      <Edit fontSize="small" />
                    </IconButton>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <IconButton color="error" size="small" onClick={() => handleDelete(campaign.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </motion.div>
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
    <TextField
      label="Campaign Title"
      fullWidth
      margin="dense"
      value={editingCampaign?.title || ""}
      onChange={(e) => setEditingCampaign({ ...editingCampaign, title: e.target.value })}
    />
    <TextField
      label="Emails Sent"
      fullWidth
      margin="dense"
      type="number"
      value={editingCampaign?.sent || ""}
      onChange={(e) => setEditingCampaign({ ...editingCampaign, sent: e.target.value })}
    />
    <TextField
      label="Emails Opened"
      fullWidth
      margin="dense"
      type="number"
      value={editingCampaign?.opened || ""}
      onChange={(e) => setEditingCampaign({ ...editingCampaign, opened: e.target.value })}
    />
    <TextField
      label="Clicks"
      fullWidth
      margin="dense"
      type="number"
      value={editingCampaign?.clicked || ""}
      onChange={(e) => setEditingCampaign({ ...editingCampaign, clicked: e.target.value })}
    />
    <TextField
      label="Schedule Date"
      fullWidth
      margin="dense"
      type="date"
      value={editingCampaign?.schedule || ""}
      onChange={(e) => setEditingCampaign({ ...editingCampaign, schedule: e.target.value })}
      InputLabelProps={{ shrink: true }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="secondary">Cancel</Button>
    <Button onClick={handleSave} color="primary">Save</Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default MarketingCampaign;
