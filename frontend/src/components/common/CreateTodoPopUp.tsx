import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

interface CreateTodoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (todo: NewTodoData) => void;
}

interface NewTodoData {
  title: string;
  description: string;
  status: string;
  priority: string;
  expiresAt?: string;
  remindAt?: string;
  tags?: string[];
}

export default function CreateTodoPopUp({ open, onClose, onSubmit }: CreateTodoModalProps) {
  const [formData, setFormData] = React.useState<NewTodoData>({
    title: '',
    description: '',
    status: 'NEW',
    priority: 'MEDIUM',
    expiresAt: '',
    remindAt: '',
    tags: []
  });

  const handleChange = (field: keyof NewTodoData) => (
    event: React.ChangeEvent<HTMLInputElement> | { target: { value: unknown } }
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.title.trim()) {
      onSubmit?.(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      status: 'NEW',
      priority: 'MEDIUM',
      expiresAt: '',
      remindAt: '',
      tags: []
    });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Neues Todo erstellen</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Titel *"
            value={formData.title}
            onChange={handleChange('title')}
            fullWidth
            required
          />
          
          <TextField
            label="Beschreibung"
            value={formData.description}
            onChange={handleChange('description')}
            multiline
            rows={3}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={handleChange('status')}
            >
              <MenuItem value="NEW">New</MenuItem>
              <MenuItem value="OPEN">Open</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Priorität</InputLabel>
            <Select
              value={formData.priority}
              label="Priorität"
              onChange={handleChange('priority')}
            >
              <MenuItem value="LOW">Niedrig</MenuItem>
              <MenuItem value="MEDIUM">Mittel</MenuItem>
              <MenuItem value="HIGH">Hoch</MenuItem>
              <MenuItem value="URGENT">Dringend</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Fälligkeitsdatum"
            type="date"
            value={formData.expiresAt}
            onChange={handleChange('expiresAt')}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            label="Erinnerungsdatum"
            type="datetime-local"
            value={formData.remindAt}
            onChange={handleChange('remindAt')}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbrechen</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.title.trim()}
        >
          Erstellen
        </Button>
      </DialogActions>
    </Dialog>
  );
}