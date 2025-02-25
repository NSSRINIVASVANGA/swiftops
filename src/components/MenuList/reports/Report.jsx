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
  MenuItem,
  Select,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { jsPDF } from "jspdf";

const reports = [
  { id: 1, title: "Monthly Revenue Report", type: "Financial", lastGenerated: "2024-02-20", content: "Detailed financial revenue analysis for the past month." },
  { id: 2, title: "User Activity Summary", type: "Analytics", lastGenerated: "2024-02-22", content: "Summary of user interactions and engagement over time." },
  { id: 3, title: "Integration Usage Stats", type: "System", lastGenerated: "2024-02-18", content: "Statistics on API and third-party service integrations." },
];

const ReportDashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [exportFormat, setExportFormat] = useState("PDF");
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        blob = new Blob([content], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
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
    <Box sx={{ width: "100%", margin: "auto", mt: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Reports Dashboard
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search Reports"
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Typography variant="subtitle1" color="black" mb={2}>
        Generate and export business reports
      </Typography>
      {filteredReports.map((report) => (
        <Card key={report.id} sx={{ width: "100%", mb: 2, p: 2 }}>
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
              sx={{
                transition: "all 0.3s",
                "&:hover": { backgroundColor: "#1976d2", color: "white", transform: "scale(1.05)" },
              }}
            >
              Export Report
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Export Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Export Reports</DialogTitle>
        <DialogContent>
          {/* Export Format Selection */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>Export Format</Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} displayEmpty>
              <MenuItem value="PDF">PDF</MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
              <MenuItem value="Excel">Excel</MenuItem>
            </Select>
          </FormControl>

          {/* Time Range Selection */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>Time Range</Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} displayEmpty>
              <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
              <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
              <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
              <MenuItem value="Above 1 Year">Above 1 Year</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleExport} variant="contained" color="primary">Export Now</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportDashboard;
