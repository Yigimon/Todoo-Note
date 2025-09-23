import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { type TodoQueryParams } from '../../services/filterServices';

interface QuickFilterProps {
  filters: TodoQueryParams;
  onFiltersChange: (filters: TodoQueryParams) => void;
}

export default function QuickFilter({ filters, onFiltersChange }: QuickFilterProps) {
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
  );
}
