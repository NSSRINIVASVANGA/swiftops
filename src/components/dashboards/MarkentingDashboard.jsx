// import React, { useState, useEffect } from 'react';
// import { 
//   Box, Grid, Paper, Typography, Card, CardContent, 
//   useTheme, Divider
// } from '@mui/material';
// import { 
//   PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
// } from 'recharts';

// const generateRandomData = () => {
//   return {
//     siteVisits: Math.floor(Math.random() * 3000000) + 1000000,
//     customers: Math.floor(Math.random() * 1000) + 500,
//     pagePerSession: (Math.random() * 5 + 1).toFixed(1),
//     avgDuration: `${Math.floor(Math.random() * 20)}:${Math.floor(Math.random() * 60)}`,

//     bounceRate: (Math.random() * 10).toFixed(2) + '%',
//     conversionRate: (Math.random() * 5).toFixed(2) + '%'
//   };
// };

// const generateChartData = () => {
//   return Array.from({ length: 7 }, (_, i) => ({
//     name: `Day ${i + 1}`,
//     value: Math.floor(Math.random() * 4000) + 1000
//   }));
// };

// const colors = ['#ff4081', '#ff9800', '#8bc34a', '#03a9f4'];

// const pieData = [
//   { name: 'Organic Search', value: 40 },
//   { name: 'Direct', value: 30 },
//   { name: 'Social', value: 20 },
//   { name: 'Referral', value: 10 }
// ];

// const MarketingDashboard = () => {
//   const theme = useTheme();
//   const [kpiData, setKpiData] = useState(generateRandomData);
//   const [chartData, setChartData] = useState(generateChartData);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setKpiData(generateRandomData());
//       setChartData(generateChartData());
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
//         <Typography variant="h4" component="h1" gutterBottom color="secondary" fontWeight="bold" textAlign="center">
//           MARKETING DASHBOARD
//         </Typography>
        
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {Object.entries(kpiData).map(([key, value], index) => (
//             <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
//               <Card sx={{ height: '100%', bgcolor: colors[index % colors.length], color: 'white' }}>
//                 <CardContent sx={{ textAlign: 'center', py: 3 }}>
//                   <Typography variant="h4" component="div" fontWeight="bold">
//                     {value}
//                   </Typography>
//                   <Typography variant="subtitle1">
//                     {key.toUpperCase().replace('_', ' ')}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={4}>
//             <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//               <Typography variant="h6" gutterBottom fontWeight="medium">
//                 TRAFFIC SOURCES
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
//                     {pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`}  fill={colors[index % colors.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//               <Typography variant="h6" gutterBottom fontWeight="medium">
//                 SALES PERFORMANCE
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="value" fill="#ff9800" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//               <Typography variant="h6" gutterBottom fontWeight="medium">
//                 TREND ANALYSIS
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <ResponsiveContainer width="100%" height={250}>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="value" stroke="#03a9f4" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={6} lg={4}>
//             <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
//               <Typography variant="h6" gutterBottom fontWeight="medium">
//                 CUSTOMER GROWTH
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               <ResponsiveContainer width="100%" height={250}>
//                 <AreaChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Area type="monotone" dataKey="value" fill="#8bc34a" stroke="#388e3c" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default MarketingDashboard;


import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import MailIcon from '@mui/icons-material/Mail';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const campaignData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const engagementData = [
  { name: 'Mon', clicks: 2400, impressions: 4000 },
  { name: 'Tue', clicks: 1398, impressions: 3000 },
  { name: 'Wed', clicks: 9800, impressions: 2000 },
  { name: 'Thu', clicks: 3908, impressions: 2780 },
  { name: 'Fri', clicks: 4800, impressions: 1890 },
];

function StatCard({ title, value, icon, color }) {
  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function MarketingDashboard() {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        bgcolor: 'grey.100',
        minHeight: '100vh', 
        py: 4,
        px: { xs: 2, sm: 3 }
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          gutterBottom 
          component="h1" 
          sx={{ 
            mb: 4,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Marketing Campaign Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Campaigns"
              value="12"
              icon={<TrendingUpIcon sx={{ color: 'white' }} />}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Subscribers"
              value="1,234"
              icon={<PeopleIcon sx={{ color: 'white' }} />}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Emails Sent"
              value="45,678"
              icon={<MailIcon sx={{ color: 'white' }} />}
              color={theme.palette.warning.main}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Revenue"
              value="$12,345"
              icon={<MonetizationOnIcon sx={{ color: 'white' }} />}
              color={theme.palette.secondary.main}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper 
              sx={{ 
                p: 3,
                height: '100%',
                boxShadow: 2,
                '&:hover': { boxShadow: 4 }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" color="primary">Campaign Performance</Typography>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[300]} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme.palette.text.secondary}
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.grey[300]}`
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={{ fill: theme.palette.primary.main }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              sx={{ 
                p: 3,
                height: '100%',
                boxShadow: 2,
                '&:hover': { boxShadow: 4 }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" color="primary">Engagement Metrics</Typography>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[300]} />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme.palette.text.secondary}
                  />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.grey[300]}`
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="clicks" 
                    fill={theme.palette.primary.main}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="impressions" 
                    fill={theme.palette.secondary.main}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default MarketingDashboard;