
import { Box } from '@mui/material';

import TodoKanbanBoard from '../components/todos/TodoKanbanBoard';
import CreateTodoPopUp from '../components/common/CreateTodoPopUp';
import StatusColumns from '../components/common/StatusColumns';
import SearchBar from '../components/common/SearchBar';
import QuickFilter from '../components/common/QuickFilter';
import FilterToolbar from '../components/common/FilterToolbar';
import TodoFilter from '../components/common/TodoFilter';
import FloatingActionButton from '../components/common/FloatingActionButton';

// Custom Hooks
import { useTodos } from '../hooks/useTodos';
import { useFilters } from '../hooks/useFilters';
import { usePopovers } from '../hooks/usePopovers';
import { useCreateTodo } from '../hooks/useCreateTodo';

export default function MainTodos() {
  // Custom Hooks für saubere Trennung der Logik
  const { filters, handleFiltersChange, handleClearFilters } = useFilters();
  const { todos, loading, addTodo } = useTodos(filters);
  const {
    filterAnchorEl,
    viewAnchorEl,
    handleFilterClick,
    handleFilterClose,
    handleViewClick,
    handleViewClose
  } = usePopovers();
  const {
    createTodoOpen,
    loading: createLoading,
    error: createError,
    handleCloseCreateTodo,
    handleCreateTodo,
    handleOpenCreateTodo
  } = useCreateTodo(addTodo);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <StatusColumns />
      
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

      {/* Todo Kanban Board */}
      <TodoKanbanBoard 
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
        <FloatingActionButton onAdd={handleOpenCreateTodo} />
      </Box>

      <CreateTodoPopUp 
        open={createTodoOpen}
        onClose={handleCloseCreateTodo}
        onSubmit={handleCreateTodo}
        loading={createLoading}
        error={createError}
      />
    </Box>
  );
}