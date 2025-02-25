import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import BusinessIcon from "@mui/icons-material/Business";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// Animation variants for motion effects
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const cardHoverEffect = { whileHover: { scale: 1.05, transition: { duration: 0.3 } } };

// Sample Data for Charts (Replace with API data later)
const lineChartData = [
  { name: "Jan", revenue: 10 },
  { name: "Feb", revenue: 25 },
  { name: "Mar", revenue: 40 },
  { name: "Apr", revenue: 30 },
  { name: "May", revenue: 50 },
  { name: "Jun", revenue: 60 },
];

const pieChartData = [
  { name: "Marketing", value: 30 },
  { name: "Development", value: 40 },
  { name: "Operations", value: 30 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const transactionRows = [
  { id: 1, customer: "John Doe", amount: "$500", status: "Completed" },
  { id: 2, customer: "Jane Smith", amount: "$1,200", status: "Pending" },
  { id: 3, customer: "Michael Brown", amount: "$800", status: "Completed" },
  { id: 4, customer: "Alice Johnson", amount: "$2,500", status: "Failed" },
];

const transactionColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "customer", headerName: "Customer", width: 150 },
  { field: "amount", headerName: "Amount", width: 100 },
  { field: "status", headerName: "Status", width: 120 },
];

const BuDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ p: isMobile ? 2 : 4, width: "100%", background: "linear-gradient(135deg, #f8f9fa 30%, #e9ecef 90%)", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>Business  User  Dashboard</Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        {[{ icon: <BusinessIcon />, title: "Total Businesses", value: "1,200", color: "primary.main" },
          { icon: <TrendingUpIcon />, title: "Revenue Growth", value: "+18%", color: "success.main" },
          { icon: <PersonIcon />, title: "Active Users", value: "4,500", color: "secondary.main" },
          { icon: <MonetizationOnIcon />, title: "Total Revenue", value: "$2.5M", color: "warning.main" },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div variants={fadeIn} initial="hidden" animate="visible" whileHover={cardHoverEffect.whileHover}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: item.color, mb: 2 }}>{item.icon}</Avatar>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h4">{item.value}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Revenue Trend Chart */}
        <Grid item xs={12} md={8}>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Box p={3} bgcolor="background.paper" borderRadius={2} boxShadow={2}>
              <Typography variant="h6" mb={2}>Revenue Trend</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </motion.div>
        </Grid>

        {/* Department Expenses Pie Chart */}
        <Grid item xs={12} md={4}>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Box p={3} bgcolor="background.paper" borderRadius={2} boxShadow={2}>
              <Typography variant="h6" mb={2}>Department Expenses</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Transactions Table */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <Box sx={{ mt: 3, p: 2, bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6" mb={2}>Recent Transactions</Typography>
          <DataGrid rows={transactionRows} columns={transactionColumns} pageSize={5} autoHeight />
        </Box>
      </motion.div>
    </Box>
  );
};

export default BuDashboard;
