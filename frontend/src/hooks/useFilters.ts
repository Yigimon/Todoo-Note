import { useState } from 'react';
import { type TodoQueryParams } from '../services/todoFilterService';

export const useFilters = () => {
  const [filters, setFilters] = useState<TodoQueryParams>({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const handleFiltersChange = (newFilters: TodoQueryParams) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  return {
    filters,
    handleFiltersChange,
    handleClearFilters
  };
};
