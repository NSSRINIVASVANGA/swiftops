import React, { useState, useEffect } from "react";
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TablePagination
} from "@mui/material";
import { Edit, Delete, Search, PictureAsPdf } from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const mockReports = [
  {
    report_id: "1",
    business_id: "101",
    report_type: "Revenue",
    report_data: JSON.stringify({ amount: "$5000", month: "January" }),
    generated_at: "2025-02-20",
    created_at: "2025-02-15",
    updated_at: "2025-02-18"
  },
  {
    report_id: "2",
    business_id: "102",
    report_type: "Leads",
    report_data: JSON.stringify({ count: 150, source: "Social Media" }),
    generated_at: "2025-02-19",
    created_at: "2025-02-14",
    updated_at: "2025-02-17"
  }
];

const Report = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    report_id: "", business_id: "", report_type: "", report_data: ""
  });

  useEffect(() => {
    setReports(mockReports);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleOpenForm = (report = null) => {
    if (report) {
      setEditMode(true);
      setFormData(report);
    } else {
      setEditMode(false);
      setFormData({ report_id: "", business_id: "", report_type: "", report_data: "" });
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editMode) {
      setReports(reports.map((r) => (r.report_id === formData.report_id ? formData : r)));
    } else {
      const newReport = {
        report_id: (reports.length + 1).toString(),
        ...formData,
        generated_at: new Date().toISOString().split("T")[0],
        created_at: new Date().toISOString().split("T")[0],
        updated_at: new Date().toISOString().split("T")[0]
      };
      setReports([...reports, newReport]);
    }
    setOpenForm(false);
  };

  const handleDelete = (reportId) => {
    setReports(reports.filter(report => report.report_id !== reportId));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Business Reports", 14, 10);
    autoTable(doc, {
      head: [["Report ID", "Business ID", "Type", "Data", "Generated At", "Created At", "Updated At"]],
      body: reports.map((report) => [
        report.report_id,
        report.business_id,
        report.report_type,
        report.report_data,
        report.generated_at,
        report.created_at,
        report.updated_at,
      ]),
    });
    doc.save("Business_Reports.pdf");
  };

  const filteredReports = reports.filter(report =>
    Object.values(report).some(value => 
      typeof value === "string" && value.toLowerCase().includes(searchTerm)
    )
  );

  return (
    <Box sx={{ 
      p: 3, 
      width: "85vw", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      backgroundColor: "#f5f5f5",
      position:"fixed"
    }}>
      <Typography variant="h5" sx={{ mb: 3, mt: 2, textAlign: "center", color:"black", marginTop: "20px" }}>Business Reports</Typography>

      {/* Search & Actions */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", mb: 2 }}>
        <TextField 
          label="Search Reports" 
          variant="outlined" 
          onChange={handleSearch} 
          sx={{ width: { xs: "100%", sm: "auto" } }} 
        />
        <IconButton color="primary"><Search /></IconButton>
        <Button variant="contained" onClick={() => handleOpenForm()}>Create Report</Button>
        <Button variant="contained" color="secondary" onClick={downloadPDF}>
          <PictureAsPdf /> Download PDF
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report ID</TableCell>
              <TableCell>Business ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report) => (
              <TableRow key={report.report_id}>
                <TableCell>{report.report_id}</TableCell>
                <TableCell>{report.business_id}</TableCell>
                <TableCell>{report.report_type}</TableCell>
                <TableCell sx={{ wordBreak: "break-word", maxWidth: 200 }}>{report.report_data}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenForm(report)}><Edit /></IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(report.report_id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredReports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </TableContainer>

      {/* Modal */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Report" : "Create Report"}</DialogTitle>
        <DialogContent>
        <TextField label="Report ID" name="report_id" fullWidth value={formData.report_id} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField label="Business ID" name="business_id" fullWidth value={formData.business_id} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField label="Report Type" name="report_type" fullWidth value={formData.report_type} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField label="Report Data" name="report_data" fullWidth value={formData.report_data} onChange={handleChange} multiline rows={3} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">{editMode ? "Update" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Report;