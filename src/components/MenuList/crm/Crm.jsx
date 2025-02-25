import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography } from "@mui/material";
import { Button, IconButton, TextField, Chip } from "@mui/material";
import { Search, Star, Edit, Delete, Email, Phone, Event, MonetizationOn } from "@mui/icons-material";

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([
    { id: 1, name: "Sarah Johnson", company: "Tech Solutions Inc.", email: "sarah.j@techsolutions.com", phone: "+1 (555) 123-4567", lastContact: "2025-02-20", dealValue: "$25,000", status: "Lead" },
    { id: 2, name: "Michael Chen", company: "Global Innovations", email: "m.chen@globalinv.com", phone: "+1 (555) 987-6543", lastContact: "2025-02-22", dealValue: "$50,000", status: "Client" }
  ]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [newLead, setNewLead] = useState({ name: "", company: "", email: "", phone: "", lastContact: "", dealValue: "", status: "Lead" });

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenForm = (lead = null) => {
    setEditingLead(lead);
    setNewLead(lead ? lead : { name: "", company: "", email: "", phone: "", lastContact: "", dealValue: "", status: "Lead" });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleSaveLead = () => {
    if (editingLead) {
      setLeads(leads.map((lead) => (lead.id === editingLead.id ? newLead : lead)));
    } else {
      setLeads([...leads, { ...newLead, id: leads.length + 1 }]);
    }
    setOpenForm(false);
  };

  const handleDeleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" gutterBottom className="text-gray-800 font-bold">Customer Relationship Management</Typography>
      <div className="flex items-center gap-4 mb-6 bg-white p-4 shadow-md rounded-lg">
        <TextField
          variant="outlined"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "80%" }}
          />
        <IconButton className="text-blue-500 text-md">
          <Search fontSize="medium" />
        </IconButton>
        <Button variant="contained" color="primary" onClick={() => handleOpenForm()} className="bg-blue-600 hover:bg-blue-700 text-white">Add Contact</Button>
      </div>
      <Grid container spacing={3}>
        {filteredLeads.map((lead) => (
          <Grid item xs={12} key={lead.id}>
            <Card className="p-0.1 shadow-lg border border-gray-200 rounded-lg flex flex-col">
              <CardHeader
                title={<Typography className="text-lg font-semibold text-gray-900">{lead.name}</Typography>}
                subheader={<Typography className="text-gray-600">{lead.company}</Typography>}
              />
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Typography variant="body2" className="text-gray-700"><Email className="mr-2" /> <strong>Email:</strong> {lead.email}</Typography>
                  <Typography variant="body2" className="text-gray-700"><Phone className="mr-2" /> <strong>Phone:</strong> {lead.phone}</Typography>
                  <Typography variant="body2" className="text-gray-700"><Event className="mr-2" /> <strong>Last Contact:</strong> {lead.lastContact}</Typography>
                  <Typography variant="body2" className="text-gray-700"><MonetizationOn className="mr-2" /> <strong>Deal Value:</strong> {lead.dealValue}</Typography>
                </div>
                <Chip label={lead.status} color={lead.status === "Lead" ? "warning" : "success"} />
                </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenForm(lead)} className="text-blue-500">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteLead(lead.id)} className="text-red-500">
                  <Delete />
                </IconButton>
                <IconButton className="text-yellow-500"><Star /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth>
        <DialogTitle className="text-gray-800 font-bold">{editingLead ? "Edit Contact" : "Add New Contact"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={newLead.name} fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Company" name="company" value={newLead.company} fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Email" name="email" value={newLead.email} fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Phone" name="phone" value={newLead.phone} fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Last Contact" name="lastContact" type="date" value={newLead.lastContact} fullWidth margin="dense" onChange={handleChange} />
          <TextField label="Deal Value" name="dealValue" value={newLead.dealValue} fullWidth margin="dense" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} className="text-gray-600">Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveLead} className="bg-blue-600 hover:bg-blue-700 text-white">{editingLead ? "Save" : "Submit"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CRM;