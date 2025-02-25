import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import PropTypes from 'prop-types';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart 
} from 'recharts';

// Sample Data Definitions
const leadsData = [
  { date: 'Mon', leads: 10 },
  { date: 'Tue', leads: 20 },
  { date: 'Wed', leads: 15 },
  { date: 'Thu', leads: 30 },
  { date: 'Fri', leads: 25 },
];

const repeatCustomerData = [
  { date: 'Mon', firstTime: 20, returning: 10 },
  { date: 'Tue', firstTime: 15, returning: 12 },
  { date: 'Wed', firstTime: 30, returning: 20 },
];

const recentOrdersData = [
  { name: 'Completed', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Canceled', value: 300 },
];

const revenueData = [
  { month: "Jan", income: 12000, users: 150 },
  { month: "Feb", income: 18000, users: 200 },
  { month: "Mar", income: 25000, users: 300 },
  { month: "Apr", income: 22000, users: 280 },
  { month: "May", income: 30000, users: 350 },
  { month: "Jun", income: 27000, users: 320 },
  { month: "Jul", income: 35000, users: 400 },
  { month: "Aug", income: 33000, users: 380 },
  { month: "Sep", income: 40000, users: 450 },
  { month: "Oct", income: 38000, users: 420 },
  { month: "Nov", income: 42000, users: 500 },
  { month: "Dec", income: 45000, users: 550 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const MetricsCard = ({ title, value, color }) => (
  <Card sx={{ bgcolor: color, color: 'white', p: 0, textAlign: 'center',mt:"10" }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

MetricsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

const SalesChart = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>Total Leads</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={leadsData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="leads" stroke="#d500f9" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const RepeatCustomers = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>Repeat Customers</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={repeatCustomerData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="firstTime" stroke="#FFA500" strokeWidth={3} />
          <Line type="monotone" dataKey="returning" stroke="#0088FE" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const RecentOrders = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>Recent Orders</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={recentOrdersData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
            {recentOrdersData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const MonthlyAcquisition = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>Monthly Marketing Revenue & Users</Typography>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={revenueData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#8884d8" barSize={40} name="Revenue ($)" />
          <Bar dataKey="users" fill="#82ca9d" barSize={40} name="Users" />
          <Line type="monotone" dataKey="income" stroke="#ff7300" strokeWidth={3} name="Revenue Trend" />
        </ComposedChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box
      sx={{
        marginLeft: isSidebarOpen ? '15px' : '80px',
        width: `calc(100% - ${isSidebarOpen ? '15px' : '80px'})`,
        height: 'auto',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ flexGrow: 1, height: '100%' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Total Revenue" value="$15,600" color="#f06292" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Annual Invoices" value="$6,700" color="#64b5f6" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Annual Reports" value="$10,200" color="#9575cd" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Total Orders" value="$20,200" color="#4db6ac" /></Grid>

          <Grid item xs={12} md={6}><SalesChart /></Grid>
          <Grid item xs={12} md={6}><RepeatCustomers /></Grid>
          <Grid item xs={12} md={6}><RecentOrders /></Grid>
          <Grid item xs={12} md={6}><MonthlyAcquisition /></Grid> {/* Added MonthlyAcquisition Here */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;