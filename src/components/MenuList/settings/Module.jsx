import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Save as SaveIcon,
  Backup as BackupIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Module = () => {
  const [settings, setSettings] = useState({
    platformName: 'SwiftOps Platform',
    multiTenancy: true,
    backupFrequency: 'daily',
    lastBackup: '2025-02-24 12:00:00',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings(prev => ({ ...prev, [field]: value }));
    setIsEdited(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the settings
    console.log('Saving settings:', settings);
    setShowSuccess(true);
    setIsEdited(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 mb-2 flex items-center gap-2">
          <SettingsIcon className="text-gray-600" />
          Platform Settings
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Configure platform-wide settings and preferences
        </Typography>
      </Box>

      {/* Main Settings Card */}
      <Card className="mb-8 shadow-sm">
        <CardContent className="space-y-8 p-6">
          {/* Platform Identity */}
          <div className="py-2">
            <Typography variant="h6" className="mb-6 flex items-center gap-3">
              <BusinessIcon className="text-gray-600" />
              Platform Identity
            </Typography>
            <TextField
              fullWidth
              label="Platform Name"
              variant="outlined"
              value={settings.platformName}
              onChange={handleChange('platformName')}
              className="mb-6"
            />
          </div>

          <Divider className="my-6" />

          {/* Multi-Tenancy Settings */}
          <div className="py-2">
            <Typography variant="h6" className="mb-7 flex items-center gap-3">
              <BusinessIcon className="text-gray-600" />
              Multi-Tenancy Configuration
            </Typography>
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="subtitle1">Enable Multi-Tenancy</Typography>
                <Typography variant="body4" className="text-gray-600">
                  Allow multiple organizations to use isolated instances
                </Typography>
              </div>
              <Switch
                checked={settings.multiTenancy}
                onChange={handleChange('multiTenancy')}
                color="primary"
              />
            </div>
          </div>

          <Divider className="my-4" />

          {/* Backup Settings */}
          <div className="py-3">
            <Typography variant="h6" className="mb-9 flex items-center gap-5">
              <BackupIcon className="text-gray-800" />
              Backup Configuration
            </Typography>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Backup Frequency</InputLabel>
              <Select
                value={settings.backupFrequency}
                onChange={handleChange('backupFrequency')}
                label="Backup Frequency"
              >
                <MenuItem value="hourly">Every Hour</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
              <Typography variant="body2" className="mt-4 text-gray-500">
                Last backup: {settings.lastBackup}
              </Typography>
            </FormControl>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box className="flex justify-end gap-3 mt-8 px-2">
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!isEdited}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
        >
          Save Changes
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled">
          Settings saved successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Module;
