import React from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  CurrencyExchange as RevenueIcon,
  Groups as UsersIcon,
  TrendingUp as GrowthIcon,
  Speed as PerformanceIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  MoreVert,
  Dashboard as DashboardIcon,
  DonutLarge as ChartIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart,
  Timeline as LineChartIcon,
  Today as WeekIcon,
  DateRange as MonthIcon,
  Event as YearIcon,
  Label as LabelIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  AccountTree as AccountTreeIcon,
  BubbleChart as BubbleChartIcon,
  Insights as InsightsIcon,
  TrendingDown as TrendingDownIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  FilterList as FilterIcon,
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
const userActivityDataByRange = {
  week: [
    { date: 'Mon', active: 2000, new: 1200, total: 3200 },
    { date: 'Tue', active: 2200, new: 1100, total: 3300 },
    { date: 'Wed', active: 2400, new: 1300, total: 3700 },
    { date: 'Thu', active: 2100, new: 1400, total: 3500 },
    { date: 'Fri', active: 2300, new: 1500, total: 3800 },
    { date: 'Sat', active: 1800, new: 1000, total: 2800 },
    { date: 'Sun', active: 1600, new: 900, total: 2500 },
  ],
  month: [
    { date: 'Jan', active: 4000, new: 2400, total: 6400 },
    { date: 'Feb', active: 3000, new: 1398, total: 4398 },
    { date: 'Mar', active: 2000, new: 9800, total: 11800 },
    { date: 'Apr', active: 2780, new: 3908, total: 6688 },
    { date: 'May', active: 1890, new: 4800, total: 6690 },
    { date: 'Jun', active: 2390, new: 3800, total: 6190 },
  ],
  year: [
    { date: '2023', active: 45000, new: 28000, total: 73000 },
    { date: '2024', active: 52000, new: 32000, total: 84000 },
    { date: '2025', active: 61000, new: 38000, total: 99000 },
  ]
};

const revenueData = {
  week: [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ],
  month: [
    { name: 'Week 1', revenue: 15000 },
    { name: 'Week 2', revenue: 18000 },
    { name: 'Week 3', revenue: 12000 },
    { name: 'Week 4', revenue: 16780 },
  ],
  year: [
    { name: 'Jan', revenue: 54000 },
    { name: 'Feb', revenue: 48000 },
    { name: 'Mar', revenue: 62000 },
    { name: 'Apr', revenue: 58780 },
    { name: 'May', revenue: 71890 },
    { name: 'Jun', revenue: 63390 },
    { name: 'Jul', revenue: 69490 },
    { name: 'Aug', revenue: 74200 },
    { name: 'Sep', revenue: 68100 },
    { name: 'Oct', revenue: 72300 },
    { name: 'Nov', revenue: 76500 },
    { name: 'Dec', revenue: 82700 },
  ],
};

const userTypeData = {
  default: [
    { name: 'Premium', value: 400, color: '#0088FE', percentage: '40%' },
    { name: 'Basic', value: 300, color: '#00C49F', percentage: '30%' },
    { name: 'Free', value: 300, color: '#FFBB28', percentage: '30%' },
  ],
  detailed: [
    { name: 'Premium Plus', value: 200, color: '#0088FE', percentage: '20%' },
    { name: 'Premium', value: 200, color: '#1976D2', percentage: '20%' },
    { name: 'Basic Plus', value: 150, color: '#00C49F', percentage: '15%' },
    { name: 'Basic', value: 150, color: '#00796B', percentage: '15%' },
    { name: 'Free Trial', value: 150, color: '#FFBB28', percentage: '15%' },
    { name: 'Free', value: 150, color: '#ED6C02', percentage: '15%' },
  ]
};

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
    icon: RevenueIcon,
    color: '#10B981',
    bgColor: '#ECFDF5',
    trend: 'up',
  },
  {
    title: 'Active Users',
    value: '8,549',
    change: '+8.1%',
    icon: UsersIcon,
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    trend: 'up',
  },
  {
    title: 'Growth Rate',
    value: '12.5%',
    change: '+2.3%',
    icon: GrowthIcon,
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    trend: 'up',
  },
  {
    title: 'Performance',
    value: '94.2%',
    change: '-0.8%',
    icon: PerformanceIcon,
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    trend: 'down',
  },
];


const SuperAdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Chart dimensions based on screen size
  const getChartDimensions = () => {
    if (isMobile) return 200;
    if (isTablet) return 250;
    return 300;
  };

  // Chart states
  const [dateRange, setDateRange] = React.useState('month');
  const [chartType, setChartType] = React.useState('area');
  const [distributionViewType, setDistributionViewType] = React.useState('default');
  const [performanceChartType, setPerformanceChartType] = React.useState('line');

  // Performance metrics data
  const performanceMetrics = [
    { name: 'User Engagement', value: 85, target: 80 },
    { name: 'System Uptime', value: 99.9, target: 99.5 },
    { name: 'Response Time', value: 95, target: 90 },
    { name: 'Error Rate', value: 0.5, target: 1 },
  ];

  const performanceData = [
    { name: 'Jan', value: 78 },
    { name: 'Feb', value: 82 },
    { name: 'Mar', value: 85 },
    { name: 'Apr', value: 89 },
    { name: 'May', value: 92 },
    { name: 'Jun', value: 87 },
  ];
  const [showDistributionLabels, setShowDistributionLabels] = React.useState(true);
  const [revenueRange, setRevenueRange] = React.useState('week');
  const [revenueChartType, setRevenueChartType] = React.useState('area');
  
  // Get current activity data based on date range
  const getCurrentActivityData = () => {
    return userActivityDataByRange[dateRange] || [];
  };

  // State for handling menu actions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [detailsDialog, setDetailsDialog] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(null);

  // Handle menu open
  const handleMenuClick = (event, cardId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(cardId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
  };

  // Get card title for dialog
  const getCardTitle = () => {
    if (!selectedCard) return 'Details';
    
    if (typeof selectedCard === 'number') {
      return stats[selectedCard]?.title || 'Details';
    }
    
    const titles = {
      'activity': 'User Activity',
      'distribution': 'User Distribution',
      'revenue': 'Revenue',
      'performance': 'Performance Metrics'
    };
    
    return titles[selectedCard] || 'Details';
  };

  // Format data for display
  const formatDataForDisplay = (data) => {
    if (!data) return [];
    
    // If data is a single object (like from stats), convert it to array
    if (!Array.isArray(data)) {
      return [data];
    }
    return data;
  };

  // Handle menu actions
  const handleMenuAction = (action) => {
    let data = [];
    
    try {
      switch (selectedCard) {
        case 'activity':
          data = userActivityData;
          break;
        case 'distribution':
          data = userTypeData;
          break;
        case 'revenue':
          data = revenueData;
          break;
        case 'performance':
          data = performanceData;
          break;
        default:
          // For stats cards, format the data appropriately
          if (typeof selectedCard === 'number' && stats[selectedCard]) {
            const stat = stats[selectedCard];
            data = [{
              Title: stat.title,
              Value: stat.value,
              Change: stat.change,
              Trend: stat.trend
            }];
          }
      }

      const formattedData = formatDataForDisplay(data);
      
      switch (action) {
        case 'view':
          setSelectedData(formattedData);
          setDetailsDialog(true);
          break;
        case 'export':
          exportToCSV(formattedData);
          break;
      }
    } catch (error) {
      console.error('Error handling menu action:', error);
      setSelectedData([]);
    }
    
    handleMenuClose();
  };

  // Handle export to CSV
  const exportToCSV = (data) => {
    if (!data) return;

    // Convert data to CSV format
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    const csv = [headers, ...rows].join('\n');

    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `dashboard_data_${selectedCard}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDetailsDialog(false);
    setSelectedData(null);
  };

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
    <Box sx={{
      p: { xs: 2, sm: 3, md: 4 },
      bgcolor: '#F9FAFB',
      minHeight: '100vh',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 1,
            color: '#111827',
            fontWeight: 600,
          }}
        >
          <DashboardIcon sx={{ color: '#4B5563', fontSize: 32 }} />
          Super Admin Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#6B7280',
            fontSize: '1.1rem',
          }}
        >
          Real-time metrics and performance analytics
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 4 } }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              p: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              },
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {React.createElement(stat.icon, { 
                      sx: { color: stat.color, fontSize: 28 }
                    })}
                  </Box>
                  <IconButton 
                    size="small" 
                    sx={{ color: '#9CA3AF' }}
                    onClick={(e) => handleMenuClick(e, index)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ color: '#6B7280', fontWeight: 500 }}>
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: stat.trend === 'up' ? '#059669' : '#DC2626',
                      fontWeight: 600,
                    }}
                  >
                    {stat.trend === 'up' ? <ArrowUpIcon sx={{ fontSize: 18, mr: 0.5 }} /> : <ArrowDownIcon sx={{ fontSize: 18, mr: 0.5 }} />}
                    {stat.change}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* User Activity Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#111827' }}>
                    User Activity Overview
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    Monthly active and new user trends
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => setDateRange('week')}
                      aria-label="Show weekly data"
                      aria-pressed={dateRange === 'week'}
                      sx={{
                        bgcolor: dateRange === 'week' ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: dateRange === 'week' ? '#2563EB' : '#E5E7EB' },
                      }}
                    >
                      <WeekIcon sx={{ color: dateRange === 'week' ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDateRange('month')}
                      aria-label="Show monthly data"
                      aria-pressed={dateRange === 'month'}
                      sx={{
                        bgcolor: dateRange === 'month' ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: dateRange === 'month' ? '#2563EB' : '#E5E7EB' },
                      }}
                    >
                      <MonthIcon sx={{ color: dateRange === 'month' ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDateRange('year')}
                      aria-label="Show yearly data"
                      aria-pressed={dateRange === 'year'}
                      sx={{
                        bgcolor: dateRange === 'year' ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: dateRange === 'year' ? '#2563EB' : '#E5E7EB' },
                      }}
                    >
                      <YearIcon sx={{ color: dateRange === 'year' ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                  </Box>
                  <IconButton 
                    size="small" 
                    aria-label="More options"
                    aria-haspopup="true"
                    sx={{ 
                      bgcolor: '#F3F4F6',
                      '&:hover': { bgcolor: '#E5E7EB' },
                    }}
                    onClick={(e) => handleMenuClick(e, 'activity')}
                  >
                    <MoreVert sx={{ color: '#4B5563' }} />
                  </IconButton>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={getChartDimensions()}>
                <AreaChart data={getCurrentActivityData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="active" 
                    name="Active Users"
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorActive)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="new" 
                    name="New Users"
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill="url(#colorNew)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* User Distribution Pie Chart */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card sx={{
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#111827' }}>
                    User Distribution
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    Breakdown by subscription type
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small"
                      aria-label="Toggle detailed view"
                      aria-pressed={distributionViewType === 'detailed'}
                      sx={{ 
                        bgcolor: distributionViewType === 'detailed' ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: distributionViewType === 'detailed' ? '#2563EB' : '#E5E7EB' },
                      }}
                      onClick={() => setDistributionViewType(prev => prev === 'detailed' ? 'default' : 'detailed')}
                    >
                      <PieChartIcon sx={{ color: distributionViewType === 'detailed' ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                    <IconButton 
                      size="small"
                      aria-label="Toggle labels"
                      aria-pressed={showDistributionLabels}
                      sx={{ 
                        bgcolor: showDistributionLabels ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: showDistributionLabels ? '#2563EB' : '#E5E7EB' },
                      }}
                      onClick={() => setShowDistributionLabels(prev => !prev)}
                    >
                      <LabelIcon sx={{ color: showDistributionLabels ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                  </Box>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      bgcolor: '#F3F4F6',
                      '&:hover': { bgcolor: '#E5E7EB' },
                    }}
                    onClick={(e) => handleMenuClick(e, 'distribution')}
                  >
                    <MoreVert sx={{ color: '#4B5563' }} />
                  </IconButton>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={getChartDimensions()}>
                <PieChart>
                  <Pie
                    data={userTypeData[distributionViewType]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={showDistributionLabels && ((entry) => entry.percentage)}
                    labelLine={showDistributionLabels}
                  >
                    {userTypeData[distributionViewType].map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        strokeWidth={1}
                        stroke="#fff"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value, name) => [
                      `${value} users (${userTypeData[distributionViewType].find(item => item.name === name)?.percentage})`,
                      name
                    ]}
                  />
                  <Legend 
                    formatter={(value, entry) => {
                      const data = userTypeData[distributionViewType].find(item => item.name === value);
                      return `${value} (${data?.percentage})`;
                    }}
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Overview Chart */}
        <Grid item xs={12} sm={6} lg={6}>
          <Card sx={{
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#111827' }}>
                    Revenue Overview
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    {revenueRange === 'week' ? 'Daily revenue for the week' :
                     revenueRange === 'month' ? 'Weekly revenue for the month' :
                     'Monthly revenue for the year'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      aria-label="Show weekly revenue"
                      aria-pressed={revenueRange === 'week'}
                      onClick={() => setRevenueRange('week')}
                      sx={{ 
                        bgcolor: revenueRange === 'week' ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: revenueRange === 'week' ? '#2563EB' : '#E5E7EB' },
                      }}
                    >
                      <WeekIcon sx={{ color: revenueRange === 'week' ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Show monthly revenue"
                      aria-pressed={revenueRange === 'month'}
                      onClick={() => setRevenueRange('month')}
                      sx={{ 
                        bgcolor: revenueRange === 'month' ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: revenueRange === 'month' ? '#2563EB' : '#E5E7EB' },
                      }}
                    >
                      <MonthIcon sx={{ color: revenueRange === 'month' ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Show yearly revenue"
                      aria-pressed={revenueRange === 'year'}
                      onClick={() => setRevenueRange('year')}
                      sx={{ 
                        bgcolor: revenueRange === 'year' ? '#3B82F6' : '#F3F4F6',
                        '&:hover': { bgcolor: revenueRange === 'year' ? '#2563EB' : '#E5E7EB' },
                      }}
                    >
                      <YearIcon sx={{ color: revenueRange === 'year' ? '#ffffff' : '#4B5563' }} />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      aria-label="Toggle chart type"
                      onClick={() => setRevenueChartType(prev => {
                        const types = ['area', 'line', 'bar'];
                        const currentIndex = types.indexOf(prev);
                        return types[(currentIndex + 1) % types.length];
                      })}
                      sx={{ 
                        bgcolor: '#F3F4F6',
                        '&:hover': { bgcolor: '#E5E7EB' },
                      }}
                    >
                      {revenueChartType === 'area' ? <ShowChart sx={{ color: '#4B5563' }} /> :
                       revenueChartType === 'line' ? <LineChartIcon sx={{ color: '#4B5563' }} /> :
                       <BarChartIcon sx={{ color: '#4B5563' }} />}
                    </IconButton>
                    <IconButton 
                      size="small"
                      aria-label="More options" 
                      sx={{ 
                        bgcolor: '#F3F4F6',
                        '&:hover': { bgcolor: '#E5E7EB' },
                      }}
                      onClick={(e) => handleMenuClick(e, 'revenue')}
                    >
                      <MoreVert sx={{ color: '#4B5563' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={getChartDimensions()}>
                {revenueChartType === 'area' ? (
                  <AreaChart data={revenueData[revenueRange]}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                ) : revenueChartType === 'line' ? (
                  <LineChart data={revenueData[revenueRange]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={revenueData[revenueRange]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics */}
        <Grid item xs={12} sm={6} lg={6}>
          <Card sx={{
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            },
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: '#111827' }}>
                    Performance Metrics
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B7280' }}>
                    Current vs target performance
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    aria-label="Toggle chart type"
                    onClick={() => setPerformanceChartType(prev => prev === 'line' ? 'bar' : 'line')}
                    sx={{ 
                      bgcolor: '#F3F4F6',
                      '&:hover': { bgcolor: '#E5E7EB' },
                    }}
                  >
                    {performanceChartType === 'line' ? 
                      <LineChartIcon sx={{ color: '#4B5563' }} /> : 
                      <BarChartIcon sx={{ color: '#4B5563' }} />
                    }
                  </IconButton>
                  <IconButton 
                    size="small" 
                    aria-label="More options"
                    sx={{ 
                      bgcolor: '#F3F4F6',
                      '&:hover': { bgcolor: '#E5E7EB' },
                    }}
                    onClick={(e) => handleMenuClick(e, 'performance')}
                  >
                    <MoreVert sx={{ color: '#4B5563' }} />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ mb: 3 }}>
                {performanceMetrics.map((metric, index) => (
                  <Box key={metric.name} sx={{ mb: index !== performanceMetrics.length - 1 ? 2 : 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#4B5563', fontWeight: 500 }}>
                        {metric.name}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: metric.name === 'Error Rate' ? 
                          (metric.value <= metric.target ? '#10B981' : '#EF4444') :
                          (metric.value >= metric.target ? '#10B981' : '#EF4444'),
                        fontWeight: 600 
                      }}>
                        {metric.value}%
                      </Typography>
                    </Box>
                    <Box sx={{ width: '100%', position: 'relative' }}>
                      <LinearProgress
                        variant="determinate"
                        value={metric.name === 'Error Rate' ? 
                          (100 - (metric.value / metric.target) * 100) :
                          (metric.value / metric.target) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#E5E7EB',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            backgroundColor: metric.name === 'Error Rate' ?
                              (metric.value <= metric.target ? '#10B981' : '#EF4444') :
                              (metric.value >= metric.target ? '#10B981' : '#EF4444'),
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          position: 'absolute',
                          right: 0,
                          top: '100%',
                          color: '#6B7280',
                          mt: 0.5,
                        }}
                      >
                        Target: {metric.target}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              {/* RensponsiveContainer */}
              <ResponsiveContainer 
                width="100%" 
                height={isMobile ? 250 : isTablet ? 300 : 200}
                sx={{
                  '& .recharts-wrapper': {
                    mx: { xs: -2, sm: -2, md: 0 },
                  },
                }}>
                {performanceChartType === 'line' ? (
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Performance']}
                      contentStyle={{
                        backgroundColor: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Performance']}
                      contentStyle={{
                        backgroundColor: '#FFF',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Menu for card actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }
        }}
      >
        <MenuItem onClick={() => handleMenuAction('view')}>
          <Typography variant="body2">View Details</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('edit')}>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('export')}>
          <Typography variant="body2">Export Data</Typography>
        </MenuItem>
      </Menu>

      {/* Details Dialog */}
      <Dialog
        open={detailsDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {getCardTitle()}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {Array.isArray(selectedData) && selectedData.length > 0 && Object.keys(selectedData[0]).map((header, index) => (
                    <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(selectedData) && selectedData.length > 0 ? (
                  selectedData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Object.values(row).map((value, cellIndex) => (
                        <TableCell key={cellIndex}>{value?.toString() || ''}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
          <Button 
            onClick={() => exportToCSV(selectedData)} 
            color="primary" 
            variant="contained"
          >
            Export to CSV
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuperAdminDashboard;