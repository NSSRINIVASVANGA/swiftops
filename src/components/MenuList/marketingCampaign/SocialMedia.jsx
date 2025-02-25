import React, { useState, useEffect } from 'react';
import {
  Box, Container, Paper, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Select, MenuItem, IconButton, Grid, List, ListItem,
  ListItemIcon, ListItemText
} from '@mui/material';
import {
  Instagram, Twitter, Business, Public, Add as AddIcon, Close as CloseIcon
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SocialMedia = () => {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [postContent, setPostContent] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [engagementStats, setEngagementStats] = useState({
    instagram: 45200, twitter: 32100, business: 28500, social: 52800,
  });

  // Recent Activity state
  const [recentActivity, setRecentActivity] = useState([
    { platform: 'Instagram', message: 'New post published - 2h ago', icon: <Instagram /> },
    { platform: 'Twitter', message: 'Engagement spike - 4h ago', icon: <Twitter /> },
    { platform: 'Business', message: 'New followers - 6h ago', icon: <Business /> }
  ]);

  // Simulated engagement data for charts
  const [engagementData, setEngagementData] = useState([
    { day: 'Mon', instagram: 120, twitter: 100, business: 90, social: 85 },
    { day: 'Tue', instagram: 130, twitter: 110, business: 95, social: 95 },
    { day: 'Wed', instagram: 145, twitter: 115, business: 100, social: 100 },
    { day: 'Thu', instagram: 135, twitter: 125, business: 110, social: 105 },
    { day: 'Fri', instagram: 140, twitter: 130, business: 115, social: 110 },
  ]);

  useEffect(() => {
    // Simulate real-time engagement updates
    const interval = setInterval(() => {
      setEngagementStats(prev => ({
        instagram: prev.instagram + Math.floor(Math.random() * 100),
        twitter: prev.twitter + Math.floor(Math.random() * 80),
        business: prev.business + Math.floor(Math.random() * 50),
        social: prev.social + Math.floor(Math.random() * 90),
      }));

      setEngagementData(prev => [
        ...prev.slice(1),
        {
          day: 'Sat',
          instagram: Math.floor(Math.random() * 200),
          twitter: Math.floor(Math.random() * 150),
          business: Math.floor(Math.random() * 120),
          social: Math.floor(Math.random() * 130),
        },
      ]);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNewPost = () => {
    setOpenNewPost(true);
  };

  const handleClose = () => {
    setOpenNewPost(false);
    setSelectedPlatform('');
    setPostContent('');
  };

  const handleSchedulePost = () => {
    if (selectedPlatform && postContent) {
      const newPost = {
        platform: selectedPlatform,
        content: postContent,
        time: new Date().toLocaleTimeString(),
      };

      setScheduledPosts([newPost, ...scheduledPosts]);

      const platformIcons = {
        instagram: <Instagram />,
        twitter: <Twitter />,
        business: <Business />,
        social: <Public />
      };

      const newActivity = {
        platform: selectedPlatform,
        message: `New post scheduled - Just now`,
        icon: platformIcons[selectedPlatform],
      };

      setRecentActivity([newActivity, ...recentActivity]);

      handleClose();
    }
  };

  const chartData = {
    labels: engagementData.map(data => data.day),
    datasets: [
      { label: 'Instagram', data: engagementData.map(d => d.instagram), borderColor: '#E1306C', tension: 0.4, borderWidth: 2 },
      { label: 'Twitter', data: engagementData.map(d => d.twitter), borderColor: '#1DA1F2', tension: 0.4, borderWidth: 2 },
      { label: 'Business', data: engagementData.map(d => d.business), borderColor: '#0077B5', tension: 0.4, borderWidth: 2 },
      { label: 'Social', data: engagementData.map(d => d.social), borderColor: '#4267B2', tension: 0.4, borderWidth: 2 }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true }, x: { grid: { display: false } } },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
         
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewPost}>New Post</Button>
        </Box>

        <Grid container spacing={3}>
          {[{ platform: 'Instagram', icon: <Instagram color="secondary" />, value: engagementStats.instagram, color: "#E1306C" },
            { platform: 'Twitter', icon: <Twitter color="primary" />, value: engagementStats.twitter, color: "#1DA1F2" },
            { platform: 'Business', icon: <Business color="primary" />, value: engagementStats.business, color: "#0077B5" },
            { platform: 'Social', icon: <Public color="primary" />, value: engagementStats.social, color: "#4267B2" }]
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  {item.icon}
                  <Typography variant="h4" sx={{ color: item.color }}>{item.value.toLocaleString()}</Typography>
                  <Typography color="textSecondary">Engagement: {(Math.random() * 6).toFixed(1)}%</Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
          <List>
            {recentActivity.map((activity, index) => (
              <ListItem key={index}>
                <ListItemIcon>{activity.icon}</ListItemIcon>
                <ListItemText primary={activity.platform} secondary={activity.message} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 4, height: 300 }}>
          <Typography variant="h6">Engagement Trends</Typography>
          <Line options={chartOptions} data={chartData} />
        </Box>
      </Paper>

      <Dialog open={openNewPost} onClose={handleClose}>
        <DialogTitle>Schedule New Post</DialogTitle>
        <DialogContent>
          <Select fullWidth value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} sx={{ mb: 2 }} displayEmpty>
            <MenuItem value="" disabled>Platform</MenuItem>
            <MenuItem value="instagram">Instagram</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="instagram">Business Network</MenuItem>
            <MenuItem value="instagram">Social Network</MenuItem>
          </Select>
          <TextField fullWidth multiline rows={4} value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Post content..." sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSchedulePost}>Schedule Post</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SocialMedia;


// import React, { useState } from 'react'
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   IconButton,
//   Grid,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText
// } from '@mui/material';
// import {
//   Instagram,
//   Twitter,
//   Business,
//   Public,
//   Notifications,
//   Add as AddIcon,
//   Close as CloseIcon,
// } from '@mui/icons-material';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const engagementData = [
//   { day: 'Mon', instagram: 120, twitter: 100, business: 90, social: 85 },
//   { day: 'Tue', instagram: 130, twitter: 110, business: 95, social: 95 },
//   { day: 'Wed', instagram: 145, twitter: 115, business: 100, social: 100 },
//   { day: 'Thu', instagram: 135, twitter: 125, business: 110, social: 105 },
//   { day: 'Fri', instagram: 140, twitter: 130, business: 115, social: 110 },
// ];

// const chartData = {
//   labels: engagementData.map(data => data.day),
//   datasets: [
//     {
//       label: 'Instagram',
//       data: engagementData.map(data => data.instagram),
//       borderColor: '#E1306C',
//       tension: 0.4,
//       borderWidth: 2
//     },
//     {
//       label: 'Twitter',
//       data: engagementData.map(data => data.twitter),
//       borderColor: '#1DA1F2',
//       tension: 0.4,
//       borderWidth: 2
//     },
//     {
//       label: 'Business',
//       data: engagementData.map(data => data.business),
//       borderColor: '#0077B5',
//       tension: 0.4,
//       borderWidth: 2
//     },
//     {
//       label: 'Social',
//       data: engagementData.map(data => data.social),
//       borderColor: '#4267B2',
//       tension: 0.4,
//       borderWidth: 2
//     }
//   ]
// };

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: 'top',
//     }
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       grid: {
//         drawBorder: false
//       }
//     },
//     x: {
//       grid: {
//         display: false
//       }
//     }
//   }
// };

// function SocialMedia() {
//   const [openNewPost, setOpenNewPost] = useState(false);
//   const [selectedPlatform, setSelectedPlatform] = useState('');

//   const handleNewPost = () => {
//     setOpenNewPost(true);
//   };

//   const handleClose = () => {
//     setOpenNewPost(false);
//     setSelectedPlatform('');
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//           <Typography variant="h4">Marketing Dashboard</Typography>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewPost}>
//             New Post
//           </Button>
//         </Box>

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, textAlign: 'center' }}>
//               <Instagram color="secondary" />
//               <Typography variant="h4">45.2K</Typography>
//               <Typography color="textSecondary">Engagement: 5.8%</Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, textAlign: 'center' }}>
//               <Twitter color="primary" />
//               <Typography variant="h4">32.1K</Typography>
//               <Typography color="textSecondary">Engagement: 3.2%</Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, textAlign: 'center' }}>
//               <Business color="primary" />
//               <Typography variant="h4">28.5K</Typography>
//               <Typography color="textSecondary">Engagement: 4.1%</Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper sx={{ p: 2, textAlign: 'center' }}>
//               <Public color="primary" />
//               <Typography variant="h4">52.8K</Typography>
//               <Typography color="textSecondary">Engagement: 2.9%</Typography>
//             </Paper>
//           </Grid>
//         </Grid>
        
//         <Box sx={{ mt: 4 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
//             <List>
//               <ListItem>
//                 <ListItemIcon><Instagram /></ListItemIcon>
//                 <ListItemText primary="Instagram" secondary="New post published - 2h ago" />
//               </ListItem>
//               <ListItem>
//                 <ListItemIcon><Twitter /></ListItemIcon>
//                 <ListItemText primary="Twitter" secondary="Engagement spike - 4h ago" />
//               </ListItem>
//               <ListItem>
//                 <ListItemIcon><Business /></ListItemIcon>
//                 <ListItemText primary="Business Network" secondary="New followers - 6h ago" />
//               </ListItem>
//             </List>
//           </Box>

//         <Box sx={{ mt: 4, height: 300 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>Engagement Trends</Typography>
//           <Line options={chartOptions} data={chartData} />
//         </Box>
//       </Paper>

//       <Dialog open={openNewPost} onClose={handleClose}>
//         <DialogTitle>
//           Schedule New Post
//           <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle1" sx={{ mb: 1 }}>Create and schedule your social media post</Typography>
//             <Select fullWidth value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} sx={{ mb: 2 }} displayEmpty>
//               <MenuItem value="" disabled>Platform</MenuItem>
//               <MenuItem value="instagram">Instagram</MenuItem>
//               <MenuItem value="twitter">Twitter</MenuItem>
//               <MenuItem value="business">Business Network</MenuItem>
//               <MenuItem value="social">Social Network</MenuItem>
//             </Select>
//             <TextField fullWidth multiline rows={4} placeholder="Post content..." sx={{ mb: 2 }} />
//             <TextField fullWidth type="datetime-local" sx={{ mb: 2 }} />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleClose}>Schedule Post</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default SocialMedia;