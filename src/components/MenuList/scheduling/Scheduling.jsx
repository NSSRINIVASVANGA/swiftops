import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";

const initialAppointments = [
  {
    id: 1,
    title: "Client Meeting",
    time: "09:00 AM (1 hour)",
    person: "John Smith",
    location: "Virtual",
    status: "Confirmed",
    statusColor: "success",
  },
  {
    id: 2,
    title: "Project Review",
    time: "02:00 PM (30 mins)",
    person: "Sarah Johnson",
    location: "Office",
    status: "Pending",
    statusColor: "warning",
  },
  {
    id: 3,
    title: "Strategy Session",
    time: "04:00 PM (45 mins)",
    person: "Michael Lee",
    location: "Conference Room",
    status: "Confirmed",
    statusColor: "success",
  },
];

const Schedule = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ title: "", time: "", person: "", location: "" });
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // Search Function
  const filteredAppointments = appointments.filter((appt) =>
    appt.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter Function
  const handleFilter = () => {
    if (filterStatus) {
      setFilterStatus(null); // Reset filter
    } else {
      setFilterStatus("Confirmed");
    }
  };

  const displayedAppointments = filterStatus
    ? filteredAppointments.filter((appt) => appt.status === filterStatus)
    : filteredAppointments;

  // Open New Appointment Dialog
  const handleOpenNewDialog = () => {
    setOpenNewDialog(true);
  };

  // Close Dialogs
  const handleCloseDialog = () => {
    setOpenNewDialog(false);
    setOpenDetailsDialog(false);
  };

  // Add New Appointment
  const handleAddAppointment = () => {
    setAppointments([
      ...appointments,
      { id: appointments.length + 1, ...newAppointment, status: "Pending", statusColor: "warning" },
    ]);
    setNewAppointment({ title: "", time: "", person: "", location: "" });
    setOpenNewDialog(false);
  };

  // View Details
  const handleViewDetails = (appt) => {
    setSelectedAppointment(appt);
    setOpenDetailsDialog(true);
  };

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Scheduling
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: 2 }} onClick={handleOpenNewDialog}>
          New Appointment
        </Button>
      </Stack>

      {/* Search & Filter */}
      <Stack direction="row" spacing={1} mb={3}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search appointments..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton color="primary" onClick={handleFilter}>
          <FilterListIcon />
        </IconButton>
      </Stack>

      {/* Schedule List */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Today's Schedule
      </Typography>

      {displayedAppointments.map((appt) => (
                <Card key={appt.id} sx={{ mb: 2, p: 2, borderLeft: `5px solid #1976D2` }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              {/* Left Side: Title & Time */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {appt.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {appt.time}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <PlaceIcon fontSize="small" />
                  <Typography variant="body2">{appt.location}</Typography>
                </Stack>
              </Box>

              {/* Right Side: Client Lead */}
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="body2" fontWeight="bold">
                    {appt.person}
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* Status & Button */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
              <Chip label={appt.status} color={appt.statusColor} size="small" />
              <Button variant="outlined" size="small" onClick={() => handleViewDetails(appt)}>
                View Details
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}

      {/* Add New Appointment Dialog */}
      <Dialog open={openNewDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogContent>
        <TextField
  fullWidth
  label="Title"
  margin="dense"
  required
  value={newAppointment.title}
  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
  error={Boolean(!newAppointment.title)}
  helperText={!newAppointment.title ? "Title is required" : ""}
/>

  <TextField
    fullWidth
    label="Date"
    type="date"
    margin="dense"
    required
    InputLabelProps={{ shrink: true }}
    value={newAppointment.date}
    onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
    error={!newAppointment.date}
    helperText={!newAppointment.date ? "Date is required" : ""}
  />
  <TextField
    fullWidth
    label="Time"
    type="time"
    margin="dense"
    required
    InputLabelProps={{ shrink: true }}
    value={newAppointment.time}
    onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
    error={!newAppointment.time}
    helperText={!newAppointment.time ? "Time is required" : ""}
  />
  <TextField
    fullWidth
    label="Duration (e.g., 1 hour, 30 mins)"
    margin="dense"
    required
    value={newAppointment.duration}
    onChange={(e) => setNewAppointment({ ...newAppointment, duration: e.target.value })}
    error={!newAppointment.duration}
    helperText={!newAppointment.duration ? "Duration is required" : ""}
  />
  <TextField
    fullWidth
    label="Client Name"
    margin="dense"
    required
    value={newAppointment.client}
    onChange={(e) => setNewAppointment({ ...newAppointment, client: e.target.value })}
    error={!newAppointment.client}
    helperText={!newAppointment.client ? "Client name is required" : ""}
  />
  <TextField
    fullWidth
    label="Person"
    margin="dense"
    required
    value={newAppointment.person}
    onChange={(e) => setNewAppointment({ ...newAppointment, person: e.target.value })}
    error={!newAppointment.person}
    helperText={!newAppointment.person ? "Person is required" : ""}
  />
  <TextField
    fullWidth
    label="Location"
    margin="dense"
    required
    value={newAppointment.location}
    onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
    error={!newAppointment.location}
    helperText={!newAppointment.location ? "Location is required" : ""}
  />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddAppointment}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDialog}>
        <DialogTitle>Appointment Details</DialogTitle>
        {selectedAppointment && (
          <DialogContent>
            <Typography variant="h6">{selectedAppointment.title}</Typography>
            <Typography>{selectedAppointment.time}</Typography>
            <Typography>
              <PersonIcon /> {selectedAppointment.person}
            </Typography>
            <Typography>
              <PlaceIcon /> {selectedAppointment.location}
            </Typography>
            <Chip label={selectedAppointment.status} color={selectedAppointment.statusColor} />
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Schedule;