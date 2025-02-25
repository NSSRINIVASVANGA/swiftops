import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TextField,
  MenuItem,
  Box,
  Typography,
  TablePagination,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { FilterList, Search, Refresh } from '@mui/icons-material';

// Sample data - replace with actual API data
const sampleLogs = [
  {
    id: 1,
    timestamp: '2025-02-24 17:30:25',
    user: 'john.doe@example.com',
    action: 'LOGIN',
    description: 'User logged in successfully',
    ipAddress: '192.168.1.1',
    status: 'success'
  },
  {
    id: 2,
    timestamp: '2025-02-24 17:28:15',
    user: 'jane.smith@example.com',
    action: 'UPDATE_PROFILE',
    description: 'Updated user profile settings',
    ipAddress: '192.168.1.2',
    status: 'success'
  },
  {
    id: 3,
    timestamp: '2025-02-24 17:25:10',
    user: 'admin@example.com',
    action: 'DELETE_USER',
    description: 'Attempted to delete user account',
    ipAddress: '192.168.1.3',
    status: 'failed'
  },
];

const ActivityLogs = () => {
  const [logs, setLogs] = useState(sampleLogs);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch logs from API
  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      // Replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      setLogs(sampleLogs);
      setError(null);
    } catch (err) {
      setError('Failed to fetch activity logs');
      setSnackbar({
        open: true,
        message: 'Failed to fetch activity logs',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Handle refresh
  const handleRefresh = () => {
    fetchLogs();
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter and search logs
  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.status === filter;
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'success' : 'error';
  };

  const getActionColor = (action) => {
    const colors = {
      LOGIN: 'primary',
      UPDATE_PROFILE: 'info',
      DELETE_USER: 'warning'
    };
    return colors[action] || 'default';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Typography variant="h4" className="text-gray-800 mb-2">
          Activity Logs
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Track and monitor platform-wide user actions and security events
        </Typography>
      </div>

      <Paper className="mb-6 p-4">
        <Box className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search logs..."
              InputProps={{
                startAdornment: <Search className="text-gray-400 mr-2" />,
              }}
              value={searchQuery}
              onChange={handleSearch}
              className="min-w-[250px]"
            />
            <TextField
              select
              size="small"
              value={filter}
              onChange={handleFilterChange}
              className="min-w-[150px]"
            >
              <MenuItem value="all">All Events</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </TextField>
          </div>
          <div className="flex gap-2">
            <IconButton size="small" className="bg-gray-50 hover:bg-gray-100">
              <FilterList />
            </IconButton>
            <IconButton 
              size="small" 
              className="bg-gray-50 hover:bg-gray-100"
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : <Refresh />}
            </IconButton>
          </div>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} className="shadow-sm">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => (
              <TableRow key={log.id} className="hover:bg-gray-50">
                <TableCell className="text-sm text-gray-600">{log.timestamp}</TableCell>
                <TableCell className="text-sm font-medium">{log.user}</TableCell>
                <TableCell>
                  <Chip
                    label={log.action}
                    size="small"
                    color={getActionColor(log.action)}
                    className="font-medium"
                  />
                </TableCell>
                <TableCell className="text-sm">{log.description}</TableCell>
                <TableCell className="text-sm font-mono">{log.ipAddress}</TableCell>
                <TableCell>
                  <Chip
                    label={log.status}
                    size="small"
                    color={getStatusColor(log.status)}
                    className="font-medium"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLogs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </TableContainer>
    </div>
  );
};

export default ActivityLogs;