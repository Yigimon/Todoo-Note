import { useMemo } from 'react';
import { type TodoQueryParams } from '../services/todoFilterService';

export const useQuickFilters = (filters: TodoQueryParams, onFiltersChange: (filters: TodoQueryParams) => void) => {
  // Quick-Filter Presets
  const quickFilters = useMemo(() => [
    { label: 'All', filters: {} },
    { label: 'New', filters: { status: 'NEW' as const } },
    { label: 'Open', filters: { status: 'OPEN' as const } },
    { label: 'Completed', filters: { status: 'COMPLETED' as const } },
    { label: 'Today', filters: { expiresAt: new Date().toISOString().split('T')[0] } },
   
  ], []);

  const applyQuickFilter = (quickFilter: Partial<TodoQueryParams>) => {
    onFiltersChange({ ...filters, ...quickFilter });
  };

  const getCurrentFilterLabel = () => {
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
  };

  return {
    quickFilters,
    applyQuickFilter,
    getCurrentFilterLabel
  };
};
