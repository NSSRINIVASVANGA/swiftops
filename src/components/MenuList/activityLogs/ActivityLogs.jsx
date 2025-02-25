import React, { useState } from 'react';
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
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-[250px]"
            />
            <TextField
              select
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
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
            <IconButton size="small" className="bg-gray-50 hover:bg-gray-100">
              <Refresh />
            </IconButton>
          </div>
        </Box>
      </Paper>

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
            {sampleLogs.map((log) => (
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
      </TableContainer>
    </div>
  );
};

export default ActivityLogs;