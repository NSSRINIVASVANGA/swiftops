import React, { useState } from "react";
import MaterialTable from "../../MaterialTable";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Report = () => {
  const [reports, setReports] = useState([
    { report_id: "1", report_type: "Revenue", created_at: "2025-02-15", updated_at: "2025-02-18" },
    { report_id: "2", report_type: "Leads", created_at: "2025-02-14", updated_at: "2025-02-17" },
    { report_id: "3", report_type: "Sales", created_at: "2025-02-13", updated_at: "2025-02-16" },
    { report_id: "4", report_type: "Expenses", created_at: "2025-02-12", updated_at: "2025-02-15" },
    { report_id: "5", report_type: "Growth", created_at: "2025-02-11", updated_at: "2025-02-14" }
  ]);

  const [open, setOpen] = useState(false);
  const [newReport, setNewReport] = useState({ report_type: "", created_at: "", updated_at: "" });

  const columns = [
    { label: "ID", field: "report_id" },
    { label: "Report Type", field: "report_type" },
    { label: "Created At", field: "created_at" },
    { label: "Updated At", field: "updated_at" }
  ];

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setNewReport({ ...newReport, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newEntry = {
      report_id: (reports.length + 1).toString(),
      ...newReport
    };
    setReports([...reports, newEntry]);
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
        <Button variant="contained" onClick={handleOpenForm}>
          Create Report
        </Button>
        <Button variant="contained" color="secondary">
          <PictureAsPdf /> Download PDF
        </Button>
      </Box>

      <MaterialTable columns={columns} initialData={reports} />

      {/* Modal Form */}
      <Dialog open={open} onClose={handleCloseForm}>
        <DialogTitle>Create New Report</DialogTitle>
        <DialogContent>
          <TextField name="report_type" label="Report Type" fullWidth margin="dense" onChange={handleInputChange} />
          <TextField name="created_at" label="Created At" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} onChange={handleInputChange} />
          <TextField name="updated_at" label="Updated At" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Report;
