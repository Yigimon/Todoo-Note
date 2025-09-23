import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { type TodoQueryParams } from '../../services/filterServices';

interface TodoFilterProps {
  filters: TodoQueryParams;
  onFiltersChange: (filters: TodoQueryParams) => void;
  onClearFilters: () => void;
  filterAnchorEl: HTMLButtonElement | null;
  onFilterClose: () => void;
  viewAnchorEl: HTMLButtonElement | null;
  onViewClose: () => void;
}

export default function TodoFilter({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  filterAnchorEl,
  onFilterClose,
  viewAnchorEl,
  onViewClose
}: TodoFilterProps) {
  const filterOpen = Boolean(filterAnchorEl);
  const viewOpen = Boolean(viewAnchorEl);

  // Filter-Handler
  const handleFilterChange = (key: keyof TodoQueryParams, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  return (
    <React.Fragment>

      {/* Filter Popover */}
      <Popover
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={onFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Filter
          </Typography>
          
          <Stack spacing={2}>
            {/* Erstellungsdatum Filter */}
            <TextField
              label="Erstellt am"
              type="date"
              size="small"
              fullWidth
              value={filters.createdAt || ''}
              onChange={(e) => handleFilterChange('createdAt', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            {/* Ablaufdatum Filter */}
            <TextField
              label="Läuft ab am"
              type="date"
              size="small"
              fullWidth
              value={filters.expiresAt || ''}
              onChange={(e) => handleFilterChange('expiresAt', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <Divider />

            {/* Sortierung */}
            <Typography variant="subtitle2">
              Sortierung
            </Typography>
            
            <FormControl size="small" fullWidth>
              <InputLabel>Sortieren nach</InputLabel>
              <Select
                value={filters.sortBy || 'createdAt'}
                label="Sortieren nach"
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <MenuItem value="title">Titel</MenuItem>
                <MenuItem value="createdAt">Erstellt am</MenuItem>
                <MenuItem value="expiresAt">Läuft ab am</MenuItem>
                <MenuItem value="status">Status</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Reihenfolge</InputLabel>
              <Select
                value={filters.sortOrder || 'desc'}
                label="Reihenfolge"
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
              >
                <MenuItem value="asc">Aufsteigend</MenuItem>
                <MenuItem value="desc">Absteigend</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={onFilterClose}
                sx={{ flex: 1 }}
              >
                Anwenden
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  onClearFilters();
                  onFilterClose();
                }}
              >
                Zurücksetzen
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>

      {/* View Options Popover (für später) */}
      <Popover
        open={viewOpen}
        anchorEl={viewAnchorEl}
        onClose={onViewClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Ansicht
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Spalten-Optionen (Coming soon...)
          </Typography>
        </Box>
      </Popover>
    </React.Fragment>
  );
}
