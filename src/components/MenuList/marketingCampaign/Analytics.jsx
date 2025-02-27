import { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    campaignPerformance: [
      { name: 'Jan', email: 4000, social: 2400, sms: 2210 },
      { name: 'Feb', email: 3000, social: 1398, sms: 2000 },
      { name: 'Mar', email: 2000, social: 9800, sms: 2290 },
      { name: 'Apr', email: 2780, social: 3908, sms: 2000 },
      { name: 'May', email: 1890, social: 4800, sms: 2181 },
      { name: 'Jun', email: 2390, social: 3800, sms: 2500 }
    ],
    channelDistribution: [
      { name: 'Email', value: 45 },
      { name: 'Social', value: 30 },
      { name: 'SMS', value: 25 }
    ],
    channelPerformance: [
      { name: 'Email', sent: 15000, delivered: 14500, opened: 7250, clicked: 2175 },
      { name: 'Social', sent: 10000, delivered: 9800, opened: 4900, clicked: 1470 },
      { name: 'SMS', sent: 8000, delivered: 7840, opened: 3920, clicked: 1176 }
    ],
    metrics: {
      totalCampaigns: 24,
      activeSubscribers: 15000,
      averageEngagement: '23%',
      conversionRate: '3.5%'
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Uncomment this when your backend is ready
    // fetchAnalytics();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="h2" sx={{ mb: 4 }}>
        Marketing Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="text.secondary">
              Total Campaigns
            </Typography>
            <Typography variant="h3" sx={{ color: 'primary.main' }}>
              {analyticsData.metrics.totalCampaigns}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="text.secondary">
              Active Subscribers
            </Typography>
            <Typography variant="h3" sx={{ color: 'primary.main' }}>
              {analyticsData.metrics.activeSubscribers.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="text.secondary">
              Avg. Engagement
            </Typography>
            <Typography variant="h3" sx={{ color: 'success.main' }}>
              {analyticsData.metrics.averageEngagement}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h6" color="text.secondary">
              Conversion Rate
            </Typography>
            <Typography variant="h3" sx={{ color: 'secondary.main' }}>
              {analyticsData.metrics.conversionRate}
            </Typography>
          </Paper>
        </Grid>

        {/* Campaign Performance Line Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Campaign Performance Trends
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={analyticsData.campaignPerformance}
                margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="email" name="Email" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="social" name="Social" stroke="#00C49F" strokeWidth={2} />
                <Line type="monotone" dataKey="sms" name="SMS" stroke="#FFBB28" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Channel Distribution Pie Chart */}
        <Grid item xs={12} md={6} lg={4}>
  <Paper sx={{ p: 3, minHeight: 450, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <Typography variant="h6" gutterBottom color="text.secondary">
      Channel Distribution
    </Typography>
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={analyticsData.channelDistribution}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {analyticsData.channelDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length] || "#CCCCCC"} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </Paper>
</Grid>


        {/* Channel Performance Bar Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Channel Performance Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={analyticsData.channelPerformance}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sent" name="Sent" fill="#0088FE" />
                <Bar dataKey="delivered" name="Delivered" fill="#00C49F" />
                <Bar dataKey="opened" name="Opened" fill="#FFBB28" />
                <Bar dataKey="clicked" name="Clicked" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {error && <Typography color="error" sx={{ mt: 2 }}>Error loading data: {error}</Typography>}
    </Box>
  );
}

export default Analytics;