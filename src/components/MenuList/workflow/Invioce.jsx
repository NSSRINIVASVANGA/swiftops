import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Edit, Delete, Pause } from "@mui/icons-material";

const WorkflowManagement = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Order Processing",
      description: "Handles customer orders from placement to delivery.",
      trigger: "New Order Received",
      actions: ["Validate Order", "Process Payment", "Ship Order"],
    },
    {
      id: 2,
      name: "User Registration",
      description: "Automates user onboarding and verification.",
      trigger: "New User Signup",
      actions: ["Send Verification Email", "Activate Account", "Send Welcome Email"],
    },
  ]);
  
  const [newWorkflow, setNewWorkflow] = useState({ name: "", description: "", trigger: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);

  const handleCreateWorkflow = () => {
    if (newWorkflow.name && newWorkflow.description && newWorkflow.trigger) {
      setWorkflows([
        ...workflows,
        {
          id: workflows.length + 1,
          name: newWorkflow.name,
          description: newWorkflow.description,
          trigger: newWorkflow.trigger,
          actions: ["Action 1", "Action 2", "Action 3"],
        },
      ]);
      setNewWorkflow({ name: "", description: "", trigger: "" });
      setIsCreating(false);
    }
  };

  const handleDelete = (id) => {
    setWorkflows(workflows.filter((workflow) => workflow.id !== id));
  };

  const handleEdit = (workflow) => {
    setEditingWorkflow(workflow);
    setNewWorkflow({ name: workflow.name, description: workflow.description, trigger: workflow.trigger });
    setIsCreating(true);
  };

  const handleUpdateWorkflow = () => {
    setWorkflows(
      workflows.map((wf) => (wf.id === editingWorkflow.id ? { ...wf, ...newWorkflow } : wf))
    );
    setNewWorkflow({ name: "", description: "", trigger: "" });
    setIsCreating(false);
    setEditingWorkflow(null);
  };

  return (
    <div style={{ padding: 20, width: "90vw", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "top" }}>
        <Typography variant="h4">Workflow Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setIsCreating(true)}>
          Create Workflow
        </Button>
      </div>
      
      <Typography variant="subtitle1" textAlign="left">Manage and automate your business processes</Typography>
      
      <Dialog 
        open={isCreating} 
        onClose={() => { setIsCreating(false); setEditingWorkflow(null); }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingWorkflow ? "Edit Workflow" : "Create New Workflow"}</DialogTitle>
        <DialogContent sx={{ pb: 4, pt: 2 }}>
          <TextField
            label="Workflow Name"
            value={newWorkflow.name}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newWorkflow.description}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Trigger"
            value={newWorkflow.trigger}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, trigger: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => { setIsCreating(false); setEditingWorkflow(null); }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={editingWorkflow ? handleUpdateWorkflow : handleCreateWorkflow}
          >
            {editingWorkflow ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {workflows.map((workflow) => (
        <Card key={workflow.id} style={{ marginTop: 20, padding: 15, borderRadius: 10, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", position: "relative" }}>
          <CardContent>
            <Box style={{ textAlign: "left" }}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>{workflow.name}</Typography>
              <Typography color="textSecondary">{workflow.description}</Typography>
              <Typography variant="subtitle2" style={{ fontWeight: "bold", marginTop: 10 }}>Triggers:</Typography>
              <Chip label={workflow.trigger} color="secondary" style={{ marginRight: 5, backgroundColor: "#d3b5f7" }} />
            </Box>

            <Box style={{ marginTop: 10, textAlign: "left" }}>
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>Actions:</Typography>
              {workflow.actions.map((action, index) => (
                <Chip key={index} label={action} style={{ margin: 5, backgroundColor: "#a3d0ff" }} />
              ))}
            </Box>
            
            <Box style={{ position: "absolute", top: 10, right: 10, display: "flex" }}>
              <IconButton color="warning">
                <Pause />
              </IconButton>
              <IconButton color="primary" onClick={() => handleEdit(workflow)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(workflow.id)}>
                <Delete />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkflowManagement;