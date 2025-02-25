import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  IconButton,
  Tooltip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Code as GitHubIcon,
  Google as GoogleIcon,
  Message as SlackIcon,
  Work as LinkedInIcon,
  Settings,
  Add as AddIcon,
  InfoOutlined,
  Security,
} from '@mui/icons-material';

// Sample integrations data
const initialIntegrations = [
  {
    id: 1,
    name: 'GitHub',
    icon: GitHubIcon,
    status: 'connected',
    lastSync: '2025-02-24 17:30:00',
    apiKey: '****************************abc1',
    enabled: true,
  },
  {
    id: 2,
    name: 'Google Workspace',
    icon: GoogleIcon,
    status: 'connected',
    lastSync: '2025-02-24 17:15:00',
    apiKey: '****************************def2',
    enabled: true,
  },
  {
    id: 3,
    name: 'Slack',
    icon: SlackIcon,
    status: 'disconnected',
    lastSync: null,
    apiKey: null,
    enabled: false,
  },
  {
    id: 4,
    name: 'LinkedIn',
    icon: LinkedInIcon,
    status: 'connected',
    lastSync: '2025-02-24 16:45:00',
    apiKey: '****************************ghi3',
    enabled: false,
  },
];

const SecuritySetting = () => {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [newApiKey, setNewApiKey] = useState('');
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: 'custom',
    apiKey: '',
    description: '',
  });

  const handleToggle = (id) => {
    setIntegrations(integrations.map(integration =>
      integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
    ));
  };

  const handleOpenSettings = (integration) => {
    setSelectedIntegration(integration);
    setNewApiKey('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIntegration(null);
  };

  const handleAddIntegration = () => {
    const newId = integrations.length + 1;
    const integration = {
      id: newId,
      name: newIntegration.name,
      icon: newIntegration.type === 'github' ? GitHubIcon :
            newIntegration.type === 'google' ? GoogleIcon :
            newIntegration.type === 'slack' ? SlackIcon :
            newIntegration.type === 'linkedin' ? LinkedInIcon :
            BusinessIcon,
      status: 'connected',
      lastSync: new Date().toISOString().slice(0, 19).replace('T', ' '),
      apiKey: newIntegration.apiKey,
      enabled: true,
    };
    
    setIntegrations([...integrations, integration]);
    setOpenNewDialog(false);
    setNewIntegration({
      name: '',
      type: 'custom',
      apiKey: '',
      description: '',
    });
    setShowSuccess(true);
  };

  const handleSaveSettings = () => {
    if (newApiKey) {
      setIntegrations(integrations.map(integration =>
        integration.id === selectedIntegration.id
          ? { ...integration, apiKey: newApiKey, status: 'connected' }
          : integration
      ));
    }
    handleCloseDialog();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Box className="mb-6 flex justify-between items-center">
        <div>
          <Typography variant="h4" className="text-gray-800 mb-2">
            Integrations
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Manage your third-party connections and API integrations
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setOpenNewDialog(true)}
        >
          Add New Integration
        </Button>

      {/* Add New Integration Dialog */}
      <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add New Integration
        </DialogTitle>
        <DialogContent>
          <div className="mt-4 space-y-4">
            <TextField
              fullWidth
              label="Integration Name"
              value={newIntegration.name}
              onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
              variant="outlined"
              placeholder="Enter integration name"
            />
            
            <FormControl fullWidth>
              <InputLabel>Integration Type</InputLabel>
              <Select
                value={newIntegration.type}
                onChange={(e) => setNewIntegration({ ...newIntegration, type: e.target.value })}
                label="Integration Type"
              >
                <MenuItem value="github">GitHub</MenuItem>
                <MenuItem value="google">Google Workspace</MenuItem>
                <MenuItem value="slack">Slack</MenuItem>
                <MenuItem value="linkedin">LinkedIn</MenuItem>
                <MenuItem value="custom">Custom Integration</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="API Key"
              type="password"
              value={newIntegration.apiKey}
              onChange={(e) => setNewIntegration({ ...newIntegration, apiKey: e.target.value })}
              variant="outlined"
              placeholder="Enter API key"
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newIntegration.description}
              onChange={(e) => setNewIntegration({ ...newIntegration, description: e.target.value })}
              variant="outlined"
              placeholder="Enter integration description"
            />

            <Typography variant="body2" className="text-gray-600 flex items-center gap-1">
              <InfoOutlined fontSize="small" />
              API keys are encrypted and stored securely
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleAddIntegration}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!newIntegration.name || !newIntegration.apiKey}
          >
            Add Integration
          </Button>
        </DialogActions>
      </Dialog>
      </Box>

      <Alert severity="info" className="mb-6">
        Ensure your API keys are kept secure and regularly rotated for optimal security.
      </Alert>

      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid item xs={12} md={6} key={integration.id}>
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <integration.icon className="text-gray-700 text-3xl" />
                    <div>
                      <Typography variant="h6" className="font-medium">
                        {integration.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-500">
                        {integration.status === 'connected' ? (
                          <span className="text-green-600">●</span>
                        ) : (
                          <span className="text-red-600">●</span>
                        )}
                        <span className="ml-1">
                          {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={integration.enabled}
                      onChange={() => handleToggle(integration.id)}
                      color="primary"
                    />
                    <Tooltip title="Integration Settings">
                      <IconButton
                        onClick={() => handleOpenSettings(integration)}
                        size="small"
                        className="text-gray-600"
                      >
                        <Settings />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Security fontSize="small" />
                    <span>API Key: {integration.apiKey || 'Not configured'}</span>
                  </div>
                  {integration.lastSync && (
                    <Typography variant="body2" className="text-gray-500">
                      Last sync: {integration.lastSync}
                    </Typography>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedIntegration?.name} Settings
        </DialogTitle>
        <DialogContent>
          <div className="mt-4">
            <TextField
              fullWidth
              label="API Key"
              type="password"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              variant="outlined"
              placeholder="Enter new API key"
            />
            <Typography variant="body2" className="mt-2 text-gray-600 flex items-center gap-1">
              <InfoOutlined fontSize="small" />
              API keys are encrypted and stored securely
            </Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveSettings}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SecuritySetting;
