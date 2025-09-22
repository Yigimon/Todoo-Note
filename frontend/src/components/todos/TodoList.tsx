import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Chip } from '@mui/material';
import SortTodos from './SortTodos';
import TodoFilter from './TodoFilter';
import type { Todo } from '../../services/todoServices';
import { fetchAllTodosAxios } from '../../services/todoServices';
import TodoFilterService, {type  TodoQueryParams } from '../../services/filterServices';

// Helper functions
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'LOW': return '#4caf50';
    case 'MEDIUM': return '#2196f3';
    case 'HIGH': return '#ff9800';
    case 'URGENT': return '#f44336';
    default: return '#e0e0e0';
  }
};

const getCheckedTodosForStatus = (todos: readonly Todo[], checked: readonly Todo[]): readonly Todo[] =>
  todos.filter(todo => checked.some(c => c.id === todo.id));


function notTodos(a: readonly Todo[], b: readonly Todo[]) {
  return a.filter((todo) => !b.some(t => t.id === todo.id));
}



interface TodoListProps {
  filterStatus?: string;
  refreshTrigger?: number;
}

export default function KanbanTransferList({ filterStatus, refreshTrigger }: TodoListProps) {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [checked, setChecked] = React.useState<readonly Todo[]>([]);
  const [loading, setLoading] = React.useState(false);
  
  // Filter State
  const [filters, setFilters] = React.useState<TodoQueryParams>({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Todos laden mit Filtern
  React.useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        // Wenn filterStatus prop gesetzt ist, überschreibe Filter
        const queryFilters = filterStatus 
          ? { ...filters, status: filterStatus as any }
          : filters;

        const filteredTodos = await TodoFilterService.fetchFilteredTodos(queryFilters);
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
  }, [filters, filterStatus, refreshTrigger]);

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

  // Status-Listen (gefilterte Todos nach Status aufteilen)
  const safeTodos = Array.isArray(todos) ? todos : [];
  const newTodos = safeTodos.filter(todo => todo.status === 'NEW');
  const openTodos = safeTodos.filter(todo => todo.status === 'OPEN');
  const completedTodos = safeTodos.filter(todo => todo.status === 'COMPLETED');

  // Toggle Checkbox
  const handleToggle = (todo: Todo) => () => {
    const currentIndex = checked.findIndex(t => t.id === todo.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(todo);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  // Move Todos zwischen Status
  const moveChecked = (from: Todo[], toStatus: string) => {
    const validStatus = toStatus as 'NEW' | 'OPEN' | 'COMPLETED';
    setTodos(prev => prev.map(todo =>
      from.some(t => t.id === todo.id) ? { ...todo, status: validStatus } : todo
    ));
    setChecked(notTodos(checked, from));
    // TODO: Backend-Update (z.B. per Axios PUT/POST)
  };// List für eine Status-Spalte
const customList = (items: readonly Todo[]) => (
  <Paper elevation={3} sx={{ 
    width: '100%',
   height: 500,
    overflow: 'auto',
    p: 3,
  
  }}>
    <List dense component="div" role="list">
      {items.map((todo) => {
        const labelId = `transfer-list-item-${todo.id}-label`;
        return (
          <ListItemButton
            key={todo.id}
            role="listitem"
            onClick={handleToggle(todo)}
            sx={{ mb: 1 }}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.some(t => t.id === todo.id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <strong style={{ flex: 1 }}>{todo.title}</strong>
                </div>
              }
              secondary={
                <div>
                  <div>{todo.description || 'Keine Beschreibung vorhanden'}</div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    marginTop: '8px',
                    display: 'flex',
                    gap: '8px',
                   
                  }}>
                    {/* Erstellungsdatum, Fälligkeitsdatum, Priorität */}
                    <Tooltip title={`Erstellt am: ${new Date(todo.createdAt).toLocaleDateString('de-DE')}`}>
                      <Chip 
                        label={new Date(todo.createdAt).toLocaleDateString('de-DE')} 
                        size="small"
                        variant="outlined"
                      />
                    </Tooltip>
                    
                    <Tooltip title={`Gültig bis: ${todo.expiresAt ? new Date(todo.expiresAt).toLocaleDateString('de-DE') : 'Kein Limit'}`}>
                      <Chip 
                        label={todo.expiresAt ? new Date(todo.expiresAt).toLocaleDateString('de-DE') : 'Kein Limit'} 
                        size="small"
                        variant="outlined"
                      />
                    </Tooltip>
                    
                    <Tooltip title={`Priorität: ${todo.priority}`}>
                      <Chip
                        label={todo.priority}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(todo.priority),
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '12px'
                        }}
                      />
                    </Tooltip> 
                  </div>
                </div>
              }                
            />
          </ListItemButton>
        );
      })}
    </List>
  </Paper>
);

const createTodoColumn = (todos: readonly Todo[], status: string, checkedTodos: readonly Todo[]) => (
  <Box sx={{ 
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'stretch'
  }}>
    {customList(todos)}
    <SortTodos status={status} checkedTodos={checkedTodos} onMoveTodos={moveChecked} />
  </Box>
);

return (
  <Box sx={{ width: '100%' }}>
    {/* Filter Component */}
    <TodoFilter
      filters={filters}
      onFiltersChange={handleFiltersChange}
      onClearFilters={handleClearFilters}
    />

    {loading ? (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        Lade Todos...
      </Box>
    ) : (
      <Stack direction="row" spacing={2} sx={{ 
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%'
      }}>
        {createTodoColumn(newTodos, 'NEW', getCheckedTodosForStatus(newTodos, checked))}
        {createTodoColumn(openTodos, 'OPEN', getCheckedTodosForStatus(openTodos, checked))}
        {createTodoColumn(completedTodos, 'COMPLETED', getCheckedTodosForStatus(completedTodos, checked))}
      </Stack>
    )}
  </Box>
);




}