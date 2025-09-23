import { useMemo } from 'react';
import { type TodoQueryParams } from '../services/todoFilterService';

export const useFilterCalculations = (filters: TodoQueryParams) => {
  // Filter-Count für Badge berechnen
  const filterCount = useMemo(() => {
    const activeFilters = Object.entries(filters).filter(([key, value]) => {
      if (key === 'sortBy' || key === 'sortOrder') return false; // Sortierung nicht als Filter zählen
      return value !== undefined && value !== null && value !== '';
    });
    return activeFilters.length;
  }, [filters]);

  const hasActiveFilters = filterCount > 0;

  return {
    filterCount,
    hasActiveFilters
  };
};
