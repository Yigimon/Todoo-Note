
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
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useTodoForm, type NewTodoData } from '../../hooks/useTodoForm';

interface CreateTodoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (todo: NewTodoData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export default function CreateTodoPopUp({ 
  open, 
  onClose, 
  onSubmit, 
  loading = false, 
  error = null 
}: CreateTodoModalProps) {
  const { formData, handleChange, handleSubmit, handleClose } = useTodoForm(onSubmit, onClose);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Neues Todo erstellen</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Titel"
            value={formData.title}
            onChange={handleChange('title')}
            fullWidth
            required
            disabled={loading}
          />
          
          <TextField
            label="Beschreibung"
            value={formData.description}
            onChange={handleChange('description')}
            multiline
            rows={3}
            fullWidth
            disabled={loading}
          />

          <FormControl fullWidth disabled={loading}>
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

          <FormControl fullWidth disabled={loading}>
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
            slotProps={{
              inputLabel: { shrink: true },
            }}
            fullWidth
            disabled={loading}
          />

          <TextField
            label="Erinnerungsdatum"
            type="datetime-local"
            value={formData.remindAt}
            onChange={handleChange('remindAt')}
            slotProps={{
              inputLabel: { shrink: true},
            }}
            fullWidth
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Abbrechen
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          disabled={!formData.title.trim() || loading}
          startIcon={loading ? <CircularProgress size={20} /> : undefined}
        >
          {loading ? 'Wird erstellt...' : 'Erstellen'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}