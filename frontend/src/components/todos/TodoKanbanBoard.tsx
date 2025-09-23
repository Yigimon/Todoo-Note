
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
import TodoStatusButtons from '../common/TodoStatusButtons';
import type { Todo } from '../../services/todoServices';
import { useTodoSelection } from '../../hooks/useTodoSelection';
import { useTodoStatus } from '../../hooks/useTodoStatus';

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

interface TodoListProps {
  todos: Todo[];
  loading?: boolean;
}

export default function KanbanTransferList({ todos, loading = false }: TodoListProps) {
  const { checked, handleToggle, getCheckedTodosForStatus } = useTodoSelection();
  const { newTodos, openTodos, completedTodos } = useTodoStatus(todos);

  // Move Todos zwischen Status (vereinfacht)
  const moveChecked = (from: Todo[], toStatus: string) => {
    // TODO: Implement proper state update and backend call
    console.log('Moving todos:', from, 'to status:', toStatus);
  };// List für eine Status-Spalte
const customList = (items: readonly Todo[]) => (
  <Paper elevation={3} sx={{ 
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    p: 3,
    backgroundColor : 'rgba(114, 111, 111, 0.6)'
  
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
                slotProps={{ 'input': labelId }}
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
                    flexWrap: 'wrap'
                   
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
    alignItems: 'stretch',
    height: '100%',
  }}>
    {customList(todos)}
    <TodoStatusButtons status={status} checkedTodos={checkedTodos} onMoveTodos={moveChecked} />
  </Box>
);

return (
  <Box sx={{ width: '100%'}}>
    {loading ? (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        Lade Todos...
      </Box>
      
    ) : (
      <Stack direction="row" spacing={2} sx={{ 
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%',
        
      }}>
        {createTodoColumn(newTodos, 'NEW', getCheckedTodosForStatus(newTodos))}
        {createTodoColumn(openTodos, 'OPEN', getCheckedTodosForStatus(openTodos))}
        {createTodoColumn(completedTodos, 'COMPLETED', getCheckedTodosForStatus(completedTodos))}
       
      </Stack>
    )}
  </Box>
);




}