import PropTypes from "prop-types";
import { Container, Grid, Box, Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";


const leadsData = [
  { date: "22/07", leads: 300 },
  { date: "24/07", leads: 280 },
  { date: "26/07", leads: 350 },
  { date: "28/07", leads: 250 },
];

const revenueData = [
  { month: "Jan", income: 10, users: 5 },
  { month: "Feb", income: 15, users: 7 },
  { month: "Mar", income: 20, users: 10 },
  { month: "Apr", income: 12, users: 6 },
  { month: "May", income: 18, users: 9 },
];

const repeatCustomerData = [
  { date: "22/07", firstTime: 8, returning: 2 },
  { date: "24/07", firstTime: 7, returning: 3 },
  { date: "26/07", firstTime: 6, returning: 4 },
  { date: "28/07", firstTime: 5, returning: 5 },
];

const recentOrdersData = [
  { name: "Returning", value: 83 },
  { name: "First Time", value: 17 },
];

const historyData = [
  { month: "January", value: 10000, goal: 20000 },
  { month: "February", value: 14000, goal: 20000 },
  { month: "March", value: 4000, goal: 20000 },
  { month: "April", value: 12000, goal: 20000 },
  { month: "May", value: 14000, goal: 30000 },
];

const COLORS = ["#ec407a", "#29b6f6"];

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
