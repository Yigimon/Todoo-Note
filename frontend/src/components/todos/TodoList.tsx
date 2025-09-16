import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import type { Todo } from '../../services/todoServices';
import { fetchAllTodosAxios } from '../../services/todoServices';


function notTodos(a: readonly Todo[], b: readonly Todo[]) {
  return a.filter((todo) => !b.some(t => t.id === todo.id));
}

function intersectionTodos(a: readonly Todo[], b: readonly Todo[]) {
  return a.filter((todo) => b.some(t => t.id === todo.id));
}

interface TodoListProps {
  filterStatus?: string;
  refreshTrigger?: number;
}

export default function KanbanTransferList({ filterStatus, refreshTrigger }: TodoListProps) {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [checked, setChecked] = React.useState<readonly Todo[]>([]);

  React.useEffect(() => {
    fetchAllTodosAxios().then((response) => {
      setTodos(response.data || []);
    }).catch(console.error);
  }, [refreshTrigger]); // Reagiert auf refreshTrigger-Änderungen

  // Status-Listen - gefiltert nach ausgewähltem Status oder alle anzeigen
  const filteredTodos = filterStatus ? todos.filter(todo => todo.status === filterStatus) : todos;
  const newTodos = filterStatus === 'NEW' ? filteredTodos : todos.filter(todo => todo.status === 'NEW');
  const openTodos = filterStatus === 'OPEN' ? filteredTodos : todos.filter(todo => todo.status === 'OPEN');
  const completedTodos = filterStatus === 'COMPLETED' ? filteredTodos : todos.filter(todo => todo.status === 'COMPLETED');

  // Checked-Listen
  const newChecked = intersectionTodos(checked, newTodos);
  const openChecked = intersectionTodos(checked, openTodos);
  const completedChecked = intersectionTodos(checked, completedTodos);

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
    setTodos(prev => prev.map(todo =>
      from.some(t => t.id === todo.id) ? { ...todo, status: toStatus } : todo
    ));
    setChecked(notTodos(checked, from));
    // TODO: Backend-Update (z.B. per Axios PUT/POST)
  };

  // Custom List für eine Status-Spalte
  const customList = (items: readonly Todo[], status: string, checkedItems: readonly Todo[], moveTo: (from: Todo[], toStatus: string) => void) => (
    <Paper sx={{ width: 320, height: 400, overflow: 'auto', p: 2 }}>
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', flex: '0 0 auto', minWidth: 100 }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        backgroundColor: todo.status === 'COMPLETED' ? '#4caf50' :
                                        todo.status === 'OPEN' ? '#2196f3' :
                                        todo.status === 'NEW' ? '#ff9800' : '#ccc',
                        color: 'white',
                        textAlign: 'right'
                      }}>
                        {todo.status}
                      </span>
                    </div>
                  </div>
                }
                secondary={todo.description || 'Keine Beschreibung vorhanden'}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Grid container direction="column" sx={{ alignItems: 'center', mt: 2 }}>
        {status === 'NEW' && (
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => moveTo(newChecked, 'OPEN')}
            disabled={newChecked.length === 0}
            aria-label="move selected to OPEN"
          >
            &gt; OPEN
          </Button>
        )}
        {status === 'OPEN' && (
          <>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={() => moveTo(openChecked, 'NEW')}
              disabled={openChecked.length === 0}
              aria-label="move selected to NEW"
            >
              &lt; NEW
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={() => moveTo(openChecked, 'COMPLETED')}
              disabled={openChecked.length === 0}
              aria-label="move selected to COMPLETED"
            >
              &gt; COMPLETED
            </Button>
          </>
        )}
        {status === 'COMPLETED' && (
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => moveTo(completedChecked, 'OPEN')}
            disabled={completedChecked.length === 0}
            aria-label="move selected to OPEN"
          >
            &lt; OPEN
          </Button>
        )}
      </Grid>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid item>{customList(newTodos, 'NEW', newChecked, moveChecked)}</Grid>
      <Grid item>{customList(openTodos, 'OPEN', openChecked, moveChecked)}</Grid>
      <Grid item>{customList(completedTodos, 'COMPLETED', completedChecked, moveChecked)}</Grid>
    </Grid>
  );
}




