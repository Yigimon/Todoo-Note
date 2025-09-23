import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { type TodoQueryParams } from '../../services/todoFilterService';

interface SearchBarProps {
  filters: TodoQueryParams;
  onFiltersChange: (filters: TodoQueryParams) => void;
}

export default function SearchBar({ filters, onFiltersChange }: SearchBarProps) {
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

  return (
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
  );
}
