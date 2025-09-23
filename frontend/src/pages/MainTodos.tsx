import * as React from 'react';
import { Box } from '@mui/material';

import TodoList from '../components/todos/TodoList';
import CreateTodoPopUp from '../components/common/CreateTodoPopUp';
import NamedTopSection from '../components/common/todosplittedNames';
import SearchBar from '../components/common/SearchBar';
import QuickFilter from '../components/common/QuickFilter';
import FilterToolbar from '../components/common/FilterToolbar';
import TodoFilter from '../components/common/TodoFilter';
import SpeedDialTooltipOpen from '../components/common/speedDial';
import { fetchAllTodosAxios, type Todo } from '../services/todoServices';
import TodoFilterService, { type TodoQueryParams } from '../services/filterServices';

export default function MainTodos() {
  const [createTodoOpen, setCreateTodoOpen] = React.useState(false);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(false);
  
  // Filter State
  const [filters, setFilters] = React.useState<TodoQueryParams>({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Popover States
  const [filterAnchorEl, setFilterAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [viewAnchorEl, setViewAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  // Todos laden mit Filtern
  React.useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const filteredTodos = await TodoFilterService.fetchFilteredTodos(filters);
        setTodos(filteredTodos || []);
      } catch (error) {
        console.error('Error loading filtered todos:', error);
        // Fallback zu lokalen Daten
        const fallbackTodos = await fetchAllTodosAxios();
        setTodos(fallbackTodos || []);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [filters]);

  // Filter Handler
  const handleFiltersChange = (newFilters: TodoQueryParams) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  // Popover Handler
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setViewAnchorEl(event.currentTarget);
  };

  const handleViewClose = () => {
    setViewAnchorEl(null);
  };

  const handleCreateTodo = async (_todoData: any) => {
    // TODO: Implement todo creation logic
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <NamedTopSection />
      
      {/* Filter Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 300px' }}>
          <SearchBar 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </Box>

        <Box sx={{ flex: '1 1 300px' }}>
          <QuickFilter 
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </Box>

        <Box sx={{ flex: '1 1 300px' }}>
          <FilterToolbar 
            filters={filters}
            onFilterClick={handleFilterClick}
            onViewClick={handleViewClick}
            onClearFilters={handleClearFilters}
          />
        </Box>
      </Box>

      {/* Todo List */}
      <TodoList 
        todos={todos}
        loading={loading}
      />

      {/* Filter Popover */}
      <TodoFilter
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        filterAnchorEl={filterAnchorEl}
        onFilterClose={handleFilterClose}
        viewAnchorEl={viewAnchorEl}
        onViewClose={handleViewClose}
      />

      {/* SpeedDial am unteren rechten Rand */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 16, 
        right: 16,
        zIndex: 1000
      }}>
        <SpeedDialTooltipOpen />
      </Box>

      <CreateTodoPopUp 
        open={createTodoOpen}
        onClose={() => setCreateTodoOpen(false)}
        onSubmit={handleCreateTodo}
      />
    </Box>
  );
}