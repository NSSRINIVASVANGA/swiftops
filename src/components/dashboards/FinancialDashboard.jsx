import React from 'react';
import { 
  Box, Typography, Paper, Grid, List, ListItem, ListItemText, Divider, 
  IconButton, Tooltip as MuiTooltip 
} from '@mui/material';
import { styled } from '@mui/system';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const DashboardContainer = styled(Box)({
  padding: '24px',
  backgroundColor: '#f5f5f5',
});

const StatBox = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
});

const ChartContainer = styled(Paper)({
  padding: '20px',
  marginTop: '24px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
});

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
];

const expenseCategories = [
  { name: 'Operations', value: 35000, color: '#0088FE' },
  { name: 'Marketing', value: 15000, color: '#00C49F' },
  { name: 'Development', value: 25000, color: '#FFBB28' },
  { name: 'Sales', value: 20000, color: '#FF8042' },
];

const subscriptionData = [
  { month: 'Jan', new: 120, churned: 80 },
  { month: 'Feb', new: 140, churned: 70 },
  { month: 'Mar', new: 160, churned: 90 },
  { month: 'Apr', new: 180, churned: 85 },
  { month: 'May', new: 200, churned: 95 },
  { month: 'Jun', new: 220, churned: 100 },
];

const FinanceDashboard = () => {
  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>Finance Manager</Typography>

      <Grid container spacing={3}>
        {[ 
          { title: "Total Revenue", value: "$54,239", change: "+8.5% vs last month", icon: <TrendingUpIcon />, color: "success.main" },
          { title: "Pending Invoices", value: "23", change: "$12,450 total value", color: "warning.main" },
          { title: "Active Subscriptions", value: "1,829", change: "+3.2% this week", icon: <TrendingUpIcon />, color: "success.main" },
          { title: "Churn Rate", value: "2.4%", change: "-0.5% vs last month", icon: <TrendingDownIcon />, color: "error.main" },
        ].map((stat, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <StatBox>
              <Typography variant="h6" color="textSecondary">{stat.title}</Typography>
              <Typography variant="h4" sx={{ my: 1 }}>{stat.value}</Typography>
              <Typography variant="body2" color={stat.color} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon} {stat.change}
              </Typography>
            </StatBox>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={8}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#1976d2" fillOpacity={1} fill="#1976d2" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} lg={4}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>Expense Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default FinanceDashboard;
