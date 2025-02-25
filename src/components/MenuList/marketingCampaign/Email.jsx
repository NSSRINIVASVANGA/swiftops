import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Grid, Button, TextField, Select, MenuItem, InputAdornment, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GetAppIcon from '@mui/icons-material/GetApp';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const subscriberData = [
  { month: 'Jan', subscribers: 1000 },
  { month: 'Feb', subscribers: 1500 },
  { month: 'Mar', subscribers: 2000 },
  { month: 'Apr', subscribers: 3000 },
  { month: 'May', subscribers: 5000 },
  { month: 'Jun', subscribers: 7000 }
];

const Email = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [campaigns, setCampaigns] = useState([
    { name: "Summer Sale", sent: "2 hours ago", opens: "45%", clicks: "12%", status: "Active" },
    { name: "New Product Launch", sent: "1 day ago", opens: "52%", clicks: "18%", status: "Completed" },
    { name: "Monthly Newsletter", sent: "3 days ago", opens: "38%", clicks: "8%", status: "Completed" }
  ]);

  const handleNewCampaign = () => {
    if (newCampaignName.trim() !== '') {
      setCampaigns([{ name: newCampaignName, sent: 'Just Now', opens: '0%', clicks: '0%', status: 'Active' }, ...campaigns]);
      setNewCampaignName('');
      setOpenModal(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box flex={1} p={2}>
      <Typography variant="h4" color="primary">Email Marketing</Typography>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>New Campaign</Button>
        <Button variant="contained" color="secondary" startIcon={<GetAppIcon />}>Export Data</Button>
      </Box>

      <Grid container spacing={1} my={1}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Subscribers</Typography>
              <Typography variant="h4">27,500</Typography>
              <Typography color="success.main">+3.8% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Open Rate</Typography>
              <Typography variant="h4">24.1%</Typography>
              <Typography color="error.main">-0.9% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Click Rate</Typography>
              <Typography variant="h4">4.5%</Typography>
              <Typography color="success.main">+1.1% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Campaigns Sent</Typography>
              <Typography variant="h4">50</Typography>
              <Typography color="textSecondary">This month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 2 }}>
        <CardHeader title="Subscriber Growth" subheader="Last 6 months" />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={subscriberData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="subscribers" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2 }}>
        <CardHeader title="Recent Campaigns" subheader="Your latest email marketing campaigns" />
        <CardContent>
          <TextField 
            variant="outlined" 
            placeholder="Search campaigns..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            fullWidth
          />
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Campaign Name</TableCell>
                  <TableCell>Sent</TableCell>
                  <TableCell>Opens</TableCell>
                  <TableCell>Clicks</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCampaigns.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.sent}</TableCell>
                    <TableCell>{campaign.opens}</TableCell>
                    <TableCell>{campaign.clicks}</TableCell>
                    <TableCell>
                      <Typography color={campaign.status === 'Active' ? "success.main" : "textSecondary"}>{campaign.status}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box p={3} sx={{ backgroundColor: 'white', width: 400, margin: 'auto', mt: 10 }}>
          <Typography variant="h6">Create New Campaign</Typography>
          <TextField fullWidth label="Campaign Name" variant="outlined" value={newCampaignName} onChange={(e) => setNewCampaignName(e.target.value)} sx={{ mt: 2 }} />
          <Button variant="contained" color="primary" onClick={handleNewCampaign} sx={{ mt: 2 }}>Create</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Email;