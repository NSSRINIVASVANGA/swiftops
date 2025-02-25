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


const MetricsCard = ({ title, value, color }) => (
  <Card sx={{ bgcolor: color, color: "white", p: 0, textAlign: "center" }}>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

MetricsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};

const SalesChart = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom> Total Leads</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={leadsData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="leads" stroke="#d500f9" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const MonthlyAcquisition = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>Total Marketing Revenue</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#8884d8" />
          <Bar dataKey="users" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const RepeatCustomers = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>Repeat Customers</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={repeatCustomerData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="firstTime" stroke="#FFA500" strokeWidth={3} />
          <Line type="monotone" dataKey="returning" stroke="#0088FE" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const RecentOrders = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>Recent Orders</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={recentOrdersData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
            {recentOrdersData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);



const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box
      sx={{
        marginLeft: isSidebarOpen ? "15px" : "80px",
        width: `calc(100% - ${isSidebarOpen ? "15px" : "80px"})`,
        height: "auto",
        display: "flex",
        overflow: "hidden",
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ flexGrow: 1, height: "100%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Total Revenue" value="$15,600" color="#f06292" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Annual Invoices" value="$6,700" color="#64b5f6" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Annual Reports" value="$10,200" color="#9575cd" /></Grid>
          <Grid item xs={12} sm={6} md={3}><MetricsCard title="Total Orders" value="$20,200" color="#4db6ac" /></Grid>

          <Grid item xs={12} md={6}><SalesChart /></Grid>
          <Grid item xs={12} md={6}><MonthlyAcquisition /></Grid>
          <Grid item xs={12} md={6}><RepeatCustomers /></Grid>
          <Grid item xs={12} md={6}><RecentOrders /></Grid>
         
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
