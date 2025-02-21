import React, { useState, useEffect } from 'react';
import { 
  Box, Grid, Paper, Typography, Card, CardContent, 
  useTheme, Divider
} from '@mui/material';
import { 
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const generateRandomData = () => {
  return {
    siteVisits: Math.floor(Math.random() * 3000000) + 1000000,
    customers: Math.floor(Math.random() * 1000) + 500,
    pagePerSession: (Math.random() * 5 + 1).toFixed(1),
    avgDuration: `${Math.floor(Math.random() * 20)}:${Math.floor(Math.random() * 60)}`,

    bounceRate: (Math.random() * 10).toFixed(2) + '%',
    conversionRate: (Math.random() * 5).toFixed(2) + '%'
  };
};

const generateChartData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 4000) + 1000
  }));
};

const colors = ['#ff4081', '#ff9800', '#8bc34a', '#03a9f4'];

const pieData = [
  { name: 'Organic Search', value: 40 },
  { name: 'Direct', value: 30 },
  { name: 'Social', value: 20 },
  { name: 'Referral', value: 10 }
];

const MarketingDashboard = () => {
  const theme = useTheme();
  const [kpiData, setKpiData] = useState(generateRandomData);
  const [chartData, setChartData] = useState(generateChartData);

  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(generateRandomData());
      setChartData(generateChartData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom color="secondary" fontWeight="bold" textAlign="center">
          MARKETING DASHBOARD
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(kpiData).map(([key, value], index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card sx={{ height: '100%', bgcolor: colors[index % colors.length], color: 'white' }}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {value}
                  </Typography>
                  <Typography variant="subtitle1">
                    {key.toUpperCase().replace('_', ' ')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                TRAFFIC SOURCES
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`}  fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                SALES PERFORMANCE
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#ff9800" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                TREND ANALYSIS
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#03a9f4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                CUSTOMER GROWTH
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="value" fill="#8bc34a" stroke="#388e3c" />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MarketingDashboard;
