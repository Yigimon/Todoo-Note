
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TodoStatusButtons from '../common/TodoStatusButtons';
import type { Todo } from '../../services/todoServices';
import { updateTodoStatusAxios, updateTodoAxios, deleteTodoAxios } from '../../services/todoServices';
import { useTodoSelection } from '../../hooks/useTodoSelection';
import { useTodoStatus } from '../../hooks/useTodoStatus';
import blurStyling from '../../services/stylingService';
import EditTodoPopUp from '../common/EditTodoPopUp';
import { useState } from 'react';
import type { NewTodoData } from '../../hooks/useTodoForm';

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
  onDeleteTodo: (todoId: string) => void;
}

export default function KanbanTransferList({ todos, loading = false, onUpdateTodo, onDeleteTodo }: TodoListProps) {
  const { checked, handleToggle, getCheckedTodosForStatus, clearSelection } = useTodoSelection();
  const { newTodos, openTodos, completedTodos } = useTodoStatus(todos);
  const [editTodoOpen, setEditTodoOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const handleEditTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setEditTodoOpen(true);
  };

  const handleCloseEdit = () => {
    setEditTodoOpen(false);
    setSelectedTodo(null);
  };

  const handleEditSubmit = async (todoData: NewTodoData) => {
    if (!selectedTodo) return;
    
    try {
      const updatedTodo = await updateTodoAxios(selectedTodo.id, todoData);
      onUpdateTodo(updatedTodo);
      handleCloseEdit();
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Fehler beim Aktualisieren des Todos');
    }
  };

  const handleDeleteClick = (todo: Todo, event: React.MouseEvent) => {
    event.stopPropagation(); // Verhindert Edit-Click
    setTodoToDelete(todo);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    
    try {
      await deleteTodoAxios(todoToDelete.id);
      onDeleteTodo(todoToDelete.id);
      setDeleteDialogOpen(false);
      setTodoToDelete(null);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Fehler beim Löschen des Todos');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  };

  // Move Todos zwischen Status mit Backend-Persistierung
  const moveChecked = async (from: Todo[], toStatus: string) => {
    const validStatus = toStatus as 'NEW' | 'OPEN' | 'COMPLETED';
    
    try {
      // Update alle ausgewählten Todos im Backend
      const updatePromises = from.map(async (todo) => {
        const updatedTodo = await updateTodoStatusAxios(todo.id, validStatus);
        onUpdateTodo(updatedTodo);
      });
      
      await Promise.all(updatePromises);
      clearSelection();
    } catch (error) {
      console.error('Failed to update todo status:', error);
      alert('Fehler beim Aktualisieren des Status');
    }
  };// List für eine Status-Spalte
const customList = (items: readonly Todo[]) => (
  <Paper elevation={3} sx={{ 
    width: '100%',
    height: '100vh',
    overflow: 'auto',
    p: 3,
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
              sx={{ flex: 1, p: 1, display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <ListItemText
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
                    </div>
                  </div>
                }                
              />
              
              {/* Delete Button */}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => handleDeleteClick(todo, e)}
                sx={{ 
                  color: '#f44336',
                  '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemButton>
          </Box>
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
      
      {/* Edit Todo Popup */}
      <EditTodoPopUp
        open={editTodoOpen}
        onClose={handleCloseEdit}
        onSubmit={handleEditSubmit}
        initialData={selectedTodo}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Todo löschen?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Möchten Sie das Todo "{todoToDelete?.title}" wirklich löschen? 
            Diese Aktion kann nicht rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}