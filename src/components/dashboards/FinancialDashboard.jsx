import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
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

const RecentInvoices = styled(Paper)({
  padding: '20px',
  marginTop: '24px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
});

const FinanceDashboard = () => {
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
  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        Finance Manager
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6" color="textSecondary">Total Revenue</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>$54,239</Typography>
            <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUpIcon sx={{ mr: 1 }} /> +8.5% vs last month
            </Typography>
          </StatBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6" color="textSecondary">Pending Invoices</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>23</Typography>
            <Typography variant="body2" color="warning.main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              $12,450 total value
            </Typography>
          </StatBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6" color="textSecondary">Active Subscriptions</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>1,829</Typography>
            <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUpIcon sx={{ mr: 1 }} /> +3.2% this week
            </Typography>
          </StatBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6" color="textSecondary">Churn Rate</Typography>
            <Typography variant="h4" sx={{ my: 1 }}>2.4%</Typography>
            <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingDownIcon sx={{ mr: 1 }} /> -0.5% vs last month
            </Typography>
          </StatBox>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={8}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1976d2" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#1976d2" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} lg={4}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>Expense Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
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

        <Grid item xs={12}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>Subscription Analytics</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subscriptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" fill="#4caf50" name="New Subscriptions" />
                <Bar dataKey="churned" fill="#f44336" name="Churned Customers" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Grid>
      </Grid>

      <RecentInvoices>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Recent Invoices</Typography>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem>
            <ListItemText 
              primary="INV-001" 
              secondary="Acme Corp"
              secondaryTypographyProps={{ color: 'textSecondary' }}
            />
            <Typography variant="body2" color="success.main">$1,200 - Paid</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="INV-002" 
              secondary="Globex Inc"
              secondaryTypographyProps={{ color: 'textSecondary' }}
            />
            <Typography variant="body2" color="warning.main">$850 - Pending</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText 
              primary="INV-003" 
              secondary="Tech Ltd"
              secondaryTypographyProps={{ color: 'textSecondary' }}
            />
            <Typography variant="body2" color="error.main">$2,300 - Overdue</Typography>
          </ListItem>
        </List>
      </RecentInvoices>
    </DashboardContainer>
  );
};

export default FinanceDashboard;