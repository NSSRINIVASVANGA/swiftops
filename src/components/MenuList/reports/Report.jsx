import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
 import DownloadIcon from "@mui/icons-material/Download";

const reports = [
  { id: 1, title: "Monthly Revenue Report", type: "Financial", lastGenerated: "2024-02-20",content: "Detailed financial revenue analysis for the past month." },
  { id: 2, title: "User Activity Summary", type: "Analytics", lastGenerated: "2024-02-22",content: "Summary of user interactions and engagement over time." },
  { id: 3, title: "Integration Usage Stats", type: "System", lastGenerated: "2024-02-18" ,content: "Statistics on API and third-party service integrations."},
];

const ReportDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [exportFormat, setExportFormat] = useState("PDF");
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  // Open modal
  const handleOpen = (report) => {
    setSelectedReport(report);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedReport(null);
  };

  // Handle export
  // const handleExport = () => {
  //   const fileName = `${selectedReport.title.replace(/\s+/g, "_")}.${exportFormat.toLowerCase()}`;
  //   const blob = new Blob([""], { type: "text/plain" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   handleClose();
  // };
  // const handleOpenSettings = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleCloseSettings = () => {
  //   setAnchorEl(null);
  // };
  const handleExport = () => {
    if (!selectedReport) return;

    const fileName = `${selectedReport.title.replace(/\s+/g, "_")}.${exportFormat.toLowerCase()}`;
    if (exportFormat === "PDF") {
      const doc = new jsPDF();
      doc.text(selectedReport.title, 10, 10);
      doc.text(`Time Range: ${timeRange}`, 10, 20);
      doc.text(selectedReport.content, 10, 30);
      doc.save(fileName);
    } else {
      let content;
      let blob;

    if (exportFormat === "CSV") {
      content = `Title,Time Range,Content\n"${selectedReport.title}","${timeRange}","${selectedReport.content}"`;
      blob = new Blob([content], { type: "text/csv" });
    } else if (exportFormat === "Excel") {
      content = `<table><tr><th>Title</th><th>Time Range</th><th>Content</th></tr><tr><td>${selectedReport.title}</td><td>${timeRange}</td><td>${selectedReport.content}</td></tr></table>`;
      blob = new Blob([content], { type: "application/vnd.ms-excel" });
    } else {
      blob = new Blob([content], { type: "application/pdf" });
    }
    if (blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  handleClose();

   
  };

  return (
    <Box>
    <Box sx={{ width:"100%", margin: "auto", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold">
        Reports Dashboard
      </Typography>
      <Typography variant="subtitle1" color="black" mb={2}>
        Generate and export business reports
        </Typography>
    
     
      {reports.map((report) => (
        <Card key={report.id} sx={{ width:'100%',mb: 2, p: 2 ,marginLeft:'20px',marginRight:'120px'}}>
          <CardContent>
            <Typography variant="h6">{report.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Type: {report.type}
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>
              Last Generated: {report.lastGenerated}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => handleOpen(report)}
              fullWidth
              sx={{width:'90%',marginLeft:'2px'}}
            >
              Export Report
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Export Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >Export Reports</DialogTitle>
        <DialogContent>
          {/* Export Format Selection */}
          <FormControl fullWidth sx={{ mt: 2, }}>
            <InputLabel>Export Format</InputLabel>
            <Select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <MenuItem value="PDF">PDF</MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
              <MenuItem value="Excel">Excel</MenuItem>
            </Select>
          </FormControl>

          {/* Time Range Selection */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Time Range</InputLabel>
            <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
              <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
              <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
              <MenuItem value="Above 1 Year">Above 1 Year</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex", gap: 5, px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleExport} variant="contained" color="primary">
            Export Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
};

export default ReportDashboard;