import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { type TodoQueryParams } from '../../services/todoFilterService';
import { useQuickFilters } from '../../hooks/useQuickFilters';

interface QuickFilterProps {
  filters: TodoQueryParams;
  onFiltersChange: (filters: TodoQueryParams) => void;
}

export default function QuickFilter({ filters, onFiltersChange }: QuickFilterProps) {
  const { quickFilters, applyQuickFilter, getCurrentFilterLabel } = useQuickFilters(filters, onFiltersChange);

  return (
    <FormControl size="small" fullWidth>
      <InputLabel>Schnellfilter</InputLabel>
      <Select
        value={getCurrentFilterLabel()}
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
