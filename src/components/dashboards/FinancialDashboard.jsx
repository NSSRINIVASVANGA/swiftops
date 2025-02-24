import React from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/system';

const DashboardContainer = styled(Box)({
  padding: '24px',
});

const StatBox = styled(Paper)({
  padding: '16px',
  textAlign: 'center',
});

const RecentInvoices = styled(Paper)({
  padding: '16px',
  marginTop: '16px',
});

const FinanceDashboard = () => {
  return (
    <Grid container spacing={4}>
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


      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">$54,239</Typography>
          </StatBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6">Pending Invoices</Typography>
            <Typography variant="h4">23</Typography>
          </StatBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6">Active Subscriptions</Typography>
            <Typography variant="h4">1,829</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              +8.1%
            </Typography>
          </StatBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox>
            <Typography variant="h6">Subscriptions Growth</Typography>
            <Typography variant="h4">+12.5%</Typography>
          </StatBox>
        </Grid>
      </Grid>

      <RecentInvoices>
        <Typography variant="h6" gutterBottom>
          Recent Invoices
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="INV-001" secondary="Acme Corp - $1,200 - Paid" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="INV-002" secondary="Globex Inc - $850 - Pending" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="INV-003" secondary="Tech Ltd - $2,300 - Overdue" />
          </ListItem>
        </List>
      </RecentInvoices>
    </DashboardContainer>
  );
};

export default FinanceDashboard;