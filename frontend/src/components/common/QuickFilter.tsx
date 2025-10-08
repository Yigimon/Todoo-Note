import React from 'react';
import { Box, Chip, Stack } from '@mui/material';

interface Filters {
  status?: string;
  priority?: string;
  search?: string;
}

interface QuickFilterProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const QuickFilter: React.FC<QuickFilterProps> = ({ filters, onFilterChange }) => {
  const quickFilters = [
    { label: 'All', value: '', type: 'status' },
    { label: 'Open', value: 'OPEN', type: 'status' },
    { label: 'In Progress', value: 'IN_PROGRESS', type: 'status' },
    { label: 'Completed', value: 'COMPLETED', type: 'status' },
    { label: 'High Priority', value: 'HIGH', type: 'priority' },
    { label: 'Urgent', value: 'URGENT', type: 'priority' },
  ];

  const handleQuickFilter = (value: string, type: string) => {
    if (type === 'status') {
      onFilterChange({ ...filters, status: value === '' ? undefined : value });
    } else if (type === 'priority') {
      onFilterChange({ ...filters, priority: value === '' ? undefined : value });
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {quickFilters.map((filter) => {
          const isActive = 
            (filter.type === 'status' && filters.status === filter.value) ||
            (filter.type === 'priority' && filters.priority === filter.value) ||
            (filter.value === '' && !filters[filter.type as keyof typeof filters]);
          
          return (
            <Chip
              key={`${filter.type}-${filter.value}`}
              label={filter.label}
              onClick={() => handleQuickFilter(filter.value, filter.type)}
              variant={isActive ? 'filled' : 'outlined'}
              color={isActive ? 'primary' : 'default'}
              size="small"
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default QuickFilter;
