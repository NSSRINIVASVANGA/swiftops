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
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        Finance Manager
      </Typography>

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