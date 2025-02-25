import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Notifications as NotificationsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  MonetizationOn as MonetizationOnIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for charts
const userActivityData = [
  { month: 'Jan', active: 4000, new: 2400, total: 6400 },
  { month: 'Feb', active: 3000, new: 1398, total: 4398 },
  { month: 'Mar', active: 2000, new: 9800, total: 11800 },
  { month: 'Apr', active: 2780, new: 3908, total: 6688 },
  { month: 'May', active: 1890, new: 4800, total: 6690 },
  { month: 'Jun', active: 2390, new: 3800, total: 6190 },
];

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const userTypeData = [
  { name: 'Premium', value: 400, color: '#0088FE' },
  { name: 'Basic', value: 300, color: '#00C49F' },
  { name: 'Free', value: 300, color: '#FFBB28' },
];

const performanceData = [
  { category: 'CPU', current: 85, target: 95 },
  { category: 'Memory', current: 75, target: 85 },
  { category: 'Storage', current: 92, target: 90 },
  { category: 'Network', current: 88, target: 90 },
];

const stats = [
  {
    title: 'Total Revenue',
    value: '$124,592',
    change: '+14.2%',
    icon: MonetizationOnIcon,
    color: 'bg-green-500',
    trend: 'up',
  },
  {
    title: 'Active Users',
    value: '8,549',
    change: '+8.1%',
    icon: GroupIcon,
    color: 'bg-blue-500',
    trend: 'up',
  },
  {
    title: 'Growth Rate',
    value: '12.5%',
    change: '+2.3%',
    icon: TrendingUpIcon,
    color: 'bg-purple-500',
    trend: 'up',
  },
  {
    title: 'Performance',
    value: '94.2%',
    change: '-0.8%',
    icon: AssessmentIcon,
    color: 'bg-orange-500',
    trend: 'down',
  },
];


const AdminDashboard = () => {
  const getGradient = (color1, color2) => {
    return {
      background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    };
  };

  const chartStyles = {
    areaChart: {
      gradient1: getGradient('#3B82F6', '#60A5FA'),
      gradient2: getGradient('#10B981', '#34D399'),
    },
    barChart: {
      gradient1: getGradient('#8B5CF6', '#A78BFA'),
    },
    pieChart: {
      gradient1: getGradient('#F59E0B', '#FBBF24'),
    },
  };

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 mb-2 flex items-center gap-2">
          <AssessmentIcon className="text-gray-600" />
          Super Admin Dashboard
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Real-time metrics and performance analytics
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} className="mb-6">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-full bg-opacity-10`}>
                    <stat.icon className={`text-${stat.color.split('-')[1]}-500`} />
                  </div>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </div>
                <Typography variant="h5" className="font-semibold mb-1">
                  {stat.value}
                </Typography>
                <div className="flex items-center justify-between">
                  <Typography variant="body2" className="text-gray-600">
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={`flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {stat.trend === 'up' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                    {stat.change}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* User Activity Chart */}
        <Grid item xs={12} lg={8}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Typography variant="h6" className="mb-1">
                    User Activity Overview
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Monthly active and new user trends
                  </Typography>
                </div>
                <IconButton size="small" className="bg-gray-50 hover:bg-gray-100">
                  <MoreVertIcon />
                </IconButton>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="active" stroke="#3B82F6" fillOpacity={1} fill="url(#colorActive)" />
                  <Area type="monotone" dataKey="new" stroke="#10B981" fillOpacity={1} fill="url(#colorNew)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* User Distribution Pie Chart */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Typography variant="h6" className="mb-1">
                    User Distribution
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Breakdown by subscription type
                  </Typography>
                </div>
                <IconButton size="small" className="bg-gray-50 hover:bg-gray-100">
                  <MoreVertIcon />
                </IconButton>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Revenue Chart */}
        <Grid item xs={12} sm={6} lg={6}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Typography variant="h6" className="mb-1">
                    Weekly Revenue
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Daily revenue breakdown
                  </Typography>
                </div>
                <IconButton size="small" className="bg-gray-50 hover:bg-gray-100">
                  <MoreVertIcon />
                </IconButton>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Comparison */}
        <Grid item xs={12} sm={6} lg={6}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Typography variant="h6" className="mb-1">
                    Performance Metrics
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Current vs target performance
                  </Typography>
                </div>
                <IconButton size="small" className="bg-gray-50 hover:bg-gray-100">
                  <MoreVertIcon />
                </IconButton>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
                  <YAxis dataKey="category" type="category" stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="current"
                    fill="#3B82F6"
                    name="Current"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={30}
                  />
                  <Bar
                    dataKey="target"
                    fill="#10B981"
                    name="Target"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;