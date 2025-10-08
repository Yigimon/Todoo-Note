
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Chip } from '@mui/material';
import TodoStatusButtons from '../common/TodoStatusButtons';
import type { Todo } from '../../services/todoServices';
import { useTodoSelection } from '../../hooks/useTodoSelection';
import { useTodoStatus } from '../../hooks/useTodoStatus';
import blurStyling from '../../services/stylingService';
import EditTodoPopUp from '../common/EditTodoPopUp';
import { useState } from 'react';
import { updateTodoAxios, deleteTodoAxios } from '../../services/todoServices';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

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
  onUpdateTodo: (updatedTodo: Todo) => void;
}

export default function KanbanTransferList({ todos, loading = false, onUpdateTodo }: TodoListProps) {
  const { checked, handleToggle, getCheckedTodosForStatus, clearSelection } = useTodoSelection();
  const { newTodos, openTodos, completedTodos } = useTodoStatus(todos);
  const [editTodoOpen, setEditTodoOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setEditTodoOpen(true);
  };

  const handleCloseEdit = () => {
    setEditTodoOpen(false);
    setSelectedTodo(null);
  };

  const handleUpdateTodo = async (updatedData: Partial<Todo>) => {
    if (!selectedTodo) return;
    
    try {
      const updated = await updateTodoAxios(selectedTodo.id, updatedData);
      onUpdateTodo(updated);
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    if (!window.confirm('Möchten Sie dieses Todo wirklich löschen?')) {
      return;
    }
    
    try {
      await deleteTodoAxios(todoId);
      // Optimistic update: Remove from local state
      // Note: Parent component should handle refreshing the list
      window.location.reload(); // Temporary solution
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Fehler beim Löschen des Todos');
    }
  };

  // Move Todos zwischen Status
  const moveChecked = (from: Todo[], toStatus: string) => {
    const validStatus = toStatus as 'NEW' | 'OPEN' | 'COMPLETED';
    from.forEach(todo => {
      const updatedTodo = { ...todo, status: validStatus };
      onUpdateTodo(updatedTodo);
      // TODO: Backend-Update (z.B. per Axios PUT/POST)
    });
    // Markierungen nach dem Verschieben löschen
    clearSelection();
  };// List für eine Status-Spalte
const customList = (items: readonly Todo[]) => (
  <Paper elevation={3} sx={{ 
    width: '100%',
    height: '100%',
    overflow: 'auto',
    p: 2,
    ...blurStyling
  
  }}>
    <List dense component="div" role="list">
      {items.map((todo) => {
        return (
          <Box key={todo.id} sx={{ display: 'flex', mb: 1 }}>
            {/* Links: Kleiner Bereich für Checkbox */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' }
              }}
            >
              <Checkbox
                checked={checked.some(t => t.id === todo.id)}
                onChange={handleToggle(todo)}
                tabIndex={-1}
                disableRipple
              />
            </Box>
            
            {/* Rechts: Großer Bereich für Edit */}
            <ListItemButton
              onClick={() => handleEditTodo(todo)}
              sx={{ flex: 1, p: 1 }}
            >
              <ListItemText
                primaryTypographyProps={{ component: 'div' }}
                secondaryTypographyProps={{ component: 'div' }}
                primary={
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <strong style={{ flex: 1 }}>{todo.title}</strong>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTodo(todo.id);
                      }}
                      size="small"
                      sx={{ color: '#f44336' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
                secondary={
                  <Box component="span" sx={{ display: 'block' }}>
                    <Box component="span" sx={{ display: 'block' }}>
                      {todo.description || 'Keine Beschreibung vorhanden'}
                    </Box>
                    <Box component="span" sx={{ 
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
                          sx={blurStyling}
                        />
                      </Tooltip>
                      
                      <Tooltip title={`Gültig bis: ${todo.expiresAt ? new Date(todo.expiresAt).toLocaleDateString('de-DE') : 'Kein Limit'}`}>
                        <Chip 
                          label={todo.expiresAt ? new Date(todo.expiresAt).toLocaleDateString('de-DE') : 'Kein Limit'} 
                          size="small"
                          variant="outlined"
                          sx={blurStyling}
                        />
                      </Tooltip>
                      
                      <Tooltip title={`Priorität: ${todo.priority}`}>
                        <Chip
                          label={todo.priority}
                          size="small"
                          sx={{
                            ...blurStyling,
                            backgroundColor: getPriorityColor(todo.priority),
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '12px'
                          }}
                        />
                      </Tooltip> 
                    </Box>
                  </Box>
                }                
              />
            </ListItemButton>
          </Box>
        );
      })}
    </List>
  </Paper>
);

const createTodoColumn = (todos: readonly Todo[]) => (
  <Box sx={{ 
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%',
  }}>
    {customList(todos)}
  </Box>
);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          Lade Todos...
        </Box>
        
      ) : (
        <>
          {/* Status Buttons oben */}
          <Stack direction="row" spacing={2} sx={{ 
            mb: 2,
            flexShrink: 0
          }}>
            <Box sx={{ flex: 1 }}>
              <TodoStatusButtons 
                status="NEW" 
                checkedTodos={getCheckedTodosForStatus(newTodos)} 
                onMoveTodos={moveChecked} 
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TodoStatusButtons 
                status="OPEN" 
                checkedTodos={getCheckedTodosForStatus(openTodos)} 
                onMoveTodos={moveChecked} 
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TodoStatusButtons 
                status="COMPLETED" 
                checkedTodos={getCheckedTodosForStatus(completedTodos)} 
                onMoveTodos={moveChecked} 
              />
            </Box>
          </Stack>

          {/* Kanban Spalten mit fixer Höhe */}
          <Stack direction="row" spacing={2} sx={{ 
            justifyContent: 'space-between',
            alignItems: 'stretch',
            width: '100%',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
          }}>
            {createTodoColumn(newTodos)}
            {createTodoColumn(openTodos)}
            {createTodoColumn(completedTodos)}
          </Stack>
        </>
      )}
      
      {/* Edit Todo Popup */}
      <EditTodoPopUp
        open={editTodoOpen}
        onClose={handleCloseEdit}
        todo={selectedTodo}
        onSubmit={handleUpdateTodo}
      />
    </Box>
  );
}