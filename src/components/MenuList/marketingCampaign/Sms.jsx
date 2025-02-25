import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { Send, ChatBubbleOutline } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Dashboard() {
  const campaigns = [
    { name: "Summer Sale", status: "Active", sent: 1250 },
    { name: "New Product Launch", status: "Scheduled", sent: 0 },
    { name: "Customer Feedback", status: "Completed", sent: 2500 },
  ];

  const smsData = [
    { name: "Jan", sent: 400 },
    { name: "Feb", sent: 600 },
    { name: "Mar", sent: 500 },
    { name: "Apr", sent: 700 },
  ];

  const pieData = [
    { name: "Used", value: 70 },
    { name: "Remaining", value: 30 },
  ];

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f4f6f8" }}>
      {/* Summary Cards */}
      <Grid container spacing={3}>
        {["Sent", "Delivered", "Processing", "Failed"].map((status, idx) => {
          const colors = {
            Sent: "primary.main",
            Delivered: "success.main",
            Processing: "warning.main",
            Failed: "error.main",
          };
          return (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{ borderLeft: `5px solid`, borderColor: colors[status] }}>
                <CardContent>
                  <Typography variant="h6">SMS {status}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    878
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    +2.4% from last week
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Campaigns Section */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Campaigns
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Campaign</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Sent</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign, idx) => (
                  <TableRow key={idx} sx={{ backgroundColor: idx % 2 ? "rgba(0, 0, 0, 0.04)" : "white" }}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.status}</TableCell>
                    <TableCell>{campaign.sent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Template Selection */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Select a Template
          </Typography>
          <Grid container spacing={2}>
            {["Welcome Message", "Promotional", "Reminder", "Survey"].map((template, idx) => {
              const colors = ["primary", "success", "warning", "secondary"];
              return (
                <Grid item xs={6} sm={3} key={idx}>
                  <Button variant="contained" color={colors[idx]} fullWidth sx={{ py: 2 }}>
                    {template}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="primary">
                SMS Activity Report
              </Typography>
              <LineChart width={300} height={200} data={smsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#3f51b5" strokeWidth={2} />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success">
                Credits Tracker
              </Typography>
              <PieChart width={300} height={200}>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  <Cell fill="#4caf50" />
                  <Cell fill="#81c784" />
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning">
                SMS Performance
              </Typography>
              <BarChart width={300} height={200} data={smsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="sent" fill="#ff9800" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}