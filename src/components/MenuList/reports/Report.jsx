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
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";

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
    <Box sx={{ width:"100%", margin: "auto", mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Reports Dashboard
          </Typography>
          <Typography variant="subtitle1" color="black">
            Generate and export business reports
          </Typography>
        </Box>
        <Box sx={{ width: '300px' }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
     
      {filteredReports.map((report) => (
        <Card 
          key={report.id} 
          sx={{ 
            width:'98%', 
            mb: 2, 
            p: 2, 
            marginLeft:'10px', 
            marginRight:'0px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
              bgcolor: '#f8f9ff'
            },
            cursor: 'pointer'
          }}
        >
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
                width:'90%',
                marginLeft:'2px',
                '&:hover': {
                  bgcolor: '#00ced1'
                }
              }}
            >
              Export Report
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Export Modal */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '70vh',
            maxHeight: '60vh',
            position: 'absolute',
            right: '10%',

           m: 1,
            transform: 'translateX(0)',
            '@media (max-width: 960px)': {
              right: '5%',
              
            },
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            pb: 2,
            borderBottom: '1px solid #e0e0e0',
            bgcolor: '#f8f9fa',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }} 
        >
          Export Reports
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>Report Details</Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              {selectedReport?.content}
            </Typography>
          </Box>
          
          {/* Export Format Selection */}
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1, 
              fontWeight: 'medium',
              color: 'text.primary' 
            }}
          >
            Export Format
          </Typography>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              displayEmpty
              sx={{
                height: '50px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <MenuItem value="PDF">PDF</MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
              <MenuItem value="Excel">Excel</MenuItem>
            </Select>
          </FormControl>

          {/* Time Range Selection */}
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1, 
              fontWeight: 'medium',
              color: 'text.primary' 
            }}
          >
            Time Range
          </Typography>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              displayEmpty
              sx={{
                height: '50px',
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
              <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
              <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
              <MenuItem value="Above 1 Year">Above 1 Year</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions 
          sx={{ 
            justifyContent: "flex", 
            gap: 2, 
            px: 4, 
            py: 3,
            borderTop: '1px solid #e0e0e0',
            bgcolor: '#f8f9fa'
          }}
        >
          <Button 
            onClick={handleClose} 
            variant="outlined"
            sx={{ 
              px: 4, 
              py: 1,
              borderColor: '#e0e0e0',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'transparent'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleExport} 
            variant="contained" 
            color="primary"
            sx={{ 
              px: 4, 
              py: 1,
              bgcolor: '#00ced1',
              '&:hover': {
                bgcolor: '#00bcd4'
              }
            }}
          >
            Export Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
};

export default ReportDashboard;