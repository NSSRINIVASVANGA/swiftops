import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const localizer = momentLocalizer(moment);

// Default Events
const initialEvents = [
  {
    id: 1,
    title: "New Theme Release",
    start: new Date(2025, 1, 19, 11, 59),
    end: new Date(2025, 1, 19, 12, 30),
    color: "#17a2b8",
  },
  {
    id: 2,
    title: "Meeting with Mr. Shreyu",
    start: new Date(2025, 1, 23, 7, 52),
    end: new Date(2025, 1, 23, 9, 0),
    color: "#f39c12",
  },
];

const CalendarComponent = () => {
  const [events, setEvents] = useState(initialEvents);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventData, setEventData] = useState({ title: "", start: "", end: "" });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Custom Event Styling
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: "5px",
      padding: "5px",
      color: "white",
      border: "none",
    };
    return { style };
  };

  // Open Dialog for New Event
  const handleOpenDialog = () => {
    setSelectedEvent(null);
    setEventData({ title: "", start: "", end: "" });
    setOpenDialog(true);
  };

  // Open Dialog for Editing Event
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEventData({
      title: event.title,
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
    });
    setOpenDialog(true);
  };

  // Handle Event Submission
  const handleSaveEvent = () => {
    if (!eventData.title || !eventData.start || !eventData.end) {
      setSnackbar({ open: true, message: "All fields are required!", severity: "error" });
      return;
    }

    if (selectedEvent) {
      // Editing Existing Event
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id
            ? { ...evt, title: eventData.title, start: new Date(eventData.start), end: new Date(eventData.end) }
            : evt
        )
      );
      setSnackbar({ open: true, message: "Event updated successfully!", severity: "info" });
    } else {
      // Adding New Event
      const newEvent = {
        id: events.length + 1,
        title: eventData.title,
        start: new Date(eventData.start),
        end: new Date(eventData.end),
        color: "#007bff",
      };
      setEvents([...events, newEvent]);
      setSnackbar({ open: true, message: "Event added successfully!", severity: "success" });
    }
    
    setOpenDialog(false);
  };

  // Handle Event Deletion
  const handleDeleteEvent = () => {
    setEvents(events.filter((evt) => evt.id !== selectedEvent.id));
    setSnackbar({ open: true, message: "Event deleted successfully!", severity: "error" });
    setOpenDialog(false);
  };

  return (
    <Box display="flex" gap={-} m={-3} ml={-4}>

      {/* Sidebar and Button Section */}
      <Box display="flex" flexDirection="column">
      <Paper sx={{ margin: 5, marginTop: 1, width: "270px", padding: 5 }}>


          <Typography variant="h6" gutterBottom>
            Drag and drop your event
          </Typography>
          <List>
            {events.map((event) => (
              <ListItem
                key={event.id}
                sx={{ backgroundColor: event.color, color: "white", marginBottom: 1 }}
                onClick={() => handleEventClick(event)}
                style={{ cursor: "pointer" }}
              >
                <ListItemText primary={event.title} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ marginZ: 2 }} />

          <Typography variant="h6">How It Works?</Typography>
          <Typography variant="body2">
            Click on an event to edit or delete. Click 'Create New Event' to add one.
          </Typography>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ marginTop: 2, width: "270px", alignSelf: "center" }}
          onClick={handleOpenDialog}
        >
          Create New Event
        </Button>
      </Box>

      {/* Calendar Section */}
      <Box flexGrow={1}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "95vh", width: "100%", padding: "7px", borderRadius: "10px", background: "#fff" }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
        />
      </Box>

      {/* Add/Edit Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Event Title"
            margin="dense"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Start Time"
            type="datetime-local"
            margin="dense"
            value={eventData.start}
            onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
          />
          <TextField
            fullWidth
            label="End Date"
            type="datetime-local"
            margin="dense"
            value={eventData.end}
            onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button color="error" onClick={handleDeleteEvent}>
              Delete
            </Button>
          )}
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveEvent}>
            {selectedEvent ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CalendarComponent;
