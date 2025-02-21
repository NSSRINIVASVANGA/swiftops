import React, { useState } from "react";
import MaterialTable from "../../MaterialTable";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem } from "@mui/material";

const CampaignForm = () => {
  const [data, setData] = useState([
    { campaign_id: 1, campaign_name: "Campaign A", campaign_type: "Email", status: "Active" },
    { campaign_id: 2, campaign_name: "Campaign B", campaign_type: "SMS", status: "Completed" },
    { campaign_id: 3, campaign_name: "Campaign C", campaign_type: "Push", status: "Draft" },
    { campaign_id: 4, campaign_name: "Campaign D", campaign_type: "Email", status: "Draft" },
    { campaign_id: 5, campaign_name: "Campaign E", campaign_type: "Push", status: "Draft" }
  ]);

  const [open, setOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    campaign_name: "",
    campaign_type: "",
    status: ""
  });

  const columns = [
    { label: "ID", field: "campaign_id" },
    { label: "Campaign Name", field: "campaign_name" },
    { label: "Campaign Type", field: "campaign_type" },
    { label: "Status", field: "status" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = data.length ? data[data.length - 1].campaign_id + 1 : 1;
    const updatedData = [...data, { campaign_id: newId, ...newCampaign }];
    setData(updatedData);
    setNewCampaign({ campaign_name: "", campaign_type: "", status: "" });
    setOpen(false); // Close modal after submission
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create Campaign</Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Campaign</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Campaign Name"
            name="campaign_name"
            value={newCampaign.campaign_name}
            onChange={handleInputChange}
            required
          />
          <Select
            fullWidth
            margin="dense"
            name="campaign_type"
            value={newCampaign.campaign_type}
            onChange={handleInputChange}
            displayEmpty
            required
          >
            <MenuItem value="">Select Type</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="SMS">SMS</MenuItem>
            <MenuItem value="Push">Push</MenuItem>
          </Select>
          <Select
            fullWidth
            margin="dense"
            name="status"
            value={newCampaign.status}
            onChange={handleInputChange}
            displayEmpty
            required
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
      
      <MaterialTable columns={columns} initialData={data} />
    </div>
  );
};

export default CampaignForm;
