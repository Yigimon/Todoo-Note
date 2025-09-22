import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import IconButton from '@mui/material/IconButton';
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
}

export default function TodoFilter({ filters, onFiltersChange, onClearFilters }: TodoFilterProps) {
  const [filterAnchorEl, setFilterAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [viewAnchorEl, setViewAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const filterOpen = Boolean(filterAnchorEl);
  const viewOpen = Boolean(viewAnchorEl);

  // Filter-Count für Badge berechnen
  const filterCount = React.useMemo(() => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => {
      if (key === 'sortBy' || key === 'sortOrder') return false; // Sortierung nicht als Filter zählen
      return value !== undefined && value !== null && value !== '';
    });
    return activeFilters.length;
  }, [filters]);

  // Such-Handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    onFiltersChange({
      ...filters,
      search: searchValue || undefined
    });
  };

  // Such-Clear Handler
  const handleClearSearch = () => {
    onFiltersChange({
      ...filters,
      search: undefined
    });
  };

  // Filter-Handler
  const handleFilterChange = (key: keyof TodoQueryParams, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  // Filter-Popover Handler
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // View-Popover Handler
  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setViewAnchorEl(event.currentTarget);
  };

  const handleViewClose = () => {
    setViewAnchorEl(null);
  };

  // Quick-Filter Presets
  const quickFilters = [
    { label: 'Alle', filters: {} },
    { label: 'Neue', filters: { status: 'NEW' as const } },
    { label: 'Offene', filters: { status: 'OPEN' as const } },
    { label: 'Abgeschlossen', filters: { status: 'COMPLETED' as const } },
    { label: 'Heute', filters: { expiresAt: new Date().toISOString().split('T')[0] } },
  ];

  const applyQuickFilter = (quickFilter: any) => {
    onFiltersChange({ ...filters, ...quickFilter });
  };

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Search Bar */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box id="filter-panel">
          <TextField
            value={filters.search || ''}
            onChange={handleSearchChange}
            sx={{ width: '100%' }}
            aria-label="Search"
            placeholder="Suche in Titel und Beschreibung..."
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: filters.search ? (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                      aria-label="Clear search"
                      onClick={handleClearSearch}
                      sx={{ marginRight: -0.75 }}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        </Box>
      </Grid>

      {/* Quick Filter Dropdown */}
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Schnellfilter</InputLabel>
          <Select
            value={(() => {
              // Aktueller Filter ermitteln
              const currentFilter = Object.fromEntries(
                Object.entries(filters).filter(([key]) => 
                  !['sortBy', 'sortOrder'].includes(key)
                )
              );
              
              const matchingFilter = quickFilters.find(qf => 
                JSON.stringify(qf.filters) === JSON.stringify(currentFilter)
              );
              
              return matchingFilter ? matchingFilter.label : '';
            })()}
            label="Schnellfilter"
            onChange={(e) => {
              const selectedFilter = quickFilters.find(qf => qf.label === e.target.value);
              if (selectedFilter) {
                applyQuickFilter(selectedFilter.filters);
              }
            }}
          >
            {quickFilters.map((quickFilter) => (
              <MenuItem key={quickFilter.label} value={quickFilter.label}>
                {quickFilter.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Toolbar Buttons */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
          <Tooltip title="Spalten">
            <IconButton onClick={handleViewClick} size="small">
              <ViewColumnIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Filter">
            <IconButton onClick={handleFilterClick} size="small">
              <Badge
                badgeContent={filterCount}
                color="primary"
                variant="dot"
              >
                <FilterListIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {filterCount > 0 && (
            <Button
              size="small"
              variant="outlined"
              onClick={onClearFilters}
              startIcon={<CancelIcon />}
            >
              Filter löschen
            </Button>
          )}
        </Stack>
      </Grid>

      {/* Filter Popover */}
      <Popover
        open={filterOpen}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
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
                onClick={handleFilterClose}
                sx={{ flex: 1 }}
              >
                Anwenden
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  onClearFilters();
                  handleFilterClose();
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
        onClose={handleViewClose}
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
    </Grid>
  );
}
