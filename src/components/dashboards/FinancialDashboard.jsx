import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000, tickets: 50 },
  { month: "Feb", revenue: 15000, tickets: 80 },
  { month: "Mar", revenue: 18000, tickets: 60 },
  { month: "Apr", revenue: 21000, tickets: 90 },
  { month: "May", revenue: 19000, tickets: 70 },
  { month: "Jun", revenue: 23000, tickets: 100 },
];

const incomeBudgetData = [{ name: "Used", value: 94 }, { name: "Remaining", value: 6 }];
const COLORS = ["#00C49F", "#D3D3D3"];

const radarData = [
  { subject: "Marketing", value: 80, fullMark: 100 },
  { subject: "Sales", value: 90, fullMark: 100 },
  { subject: "Development", value: 75, fullMark: 100 },
  { subject: "Operations", value: 85, fullMark: 100 },
];

const Dashboard = () => {
  return (
    <Grid container spacing={4} style={{ padding: "70px", }}>
      {[ 
        { title: "Total Revenue", value: "$120,000", backgroundColor: "#ba68c8", textColor: "#fff" },
        { title: "Total Expenses", value: "$45,000", backgroundColor: "#ec407a", textColor: "#fff" },
        { title: "Net Profit", value: "$75,000", backgroundColor: "#42a5f5", textColor: "#fff" },
        { title: "Pending Invoices", value: "$8,000", backgroundColor: "#26a69a", textColor: "#fff" },
      ].map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            style={{
              padding: "10px",
              textAlign: "center",
              height: "80px",
              backgroundColor: item.backgroundColor,
              color: item.textColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="h5">{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Revenue Trend Line Chart */}
      <Grid item xs={12} md={6}>
        <Card style={{ padding: "20px", height: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3f51b5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Financial Summary Bar Chart */}
      <Grid item xs={12} md={6}>
        <Card style={{ padding: "20px", height: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Income and Expenses</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tickets" fill="#3f51b5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

       {/* Income Budget Chart Below Line Chart */}
      <Grid item xs={12} md={6}>
        <Card style={{ padding: "20px", marginTop: "10px", position: "relative" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>% of Income Budget</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeBudgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  dataKey="value"
                >
                  {incomeBudgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position: "absolute", 
              top: "50%", 
              left: "50%", 
              transform: "translate(-50%, -50%)",
              fontSize: "24px",
              fontWeight: "bold"
            }}>94%</div>
            <Typography variant="body2" align="center">Budget: $5,000</Typography>
            <Typography variant="body2" align="center">Balance: -$281</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Radar Chart */}
      <Grid item xs={12} md={6}>
        <Card style={{ padding: "20px", marginTop: "10px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Department Performance</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Performance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
