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
import SortTodos from './SortTodos';
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

  //  List für eine Status-Spalte
  const customList = (items: readonly Todo[]) => (
    <Paper elevation={3} sx={{ 
      width: '100%', 
      minWidth: 400,
      height: 600, 
      overflow: 'auto', 
      p: 3,
      mx: 1
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
                secondary={
                  <div>
                    <div>{todo.description || 'Keine Beschreibung vorhanden'}</div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666', 
                      marginTop: '4px',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <Tooltip title={`Erstellt am: ${new Date(todo.createdAt).toLocaleDateString('de-DE')}`}>
                        <span>{new Date(todo.createdAt).toLocaleDateString('de-DE')}</span>
                      </Tooltip>
                      <Tooltip title={`Gültig bis: ${todo.expiresAt ? new Date(todo.expiresAt).toLocaleDateString('de-DE') : 'Kein Limit'}`}>
                        <span>{todo.expiresAt ? new Date(todo.expiresAt).toLocaleDateString('de-DE') : 'Kein Limit'}</span>
                      </Tooltip>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '8px',
                        backgroundColor: todo.priority === 'URGENT' ? '#f44336' :
                                       todo.priority === 'HIGH' ? '#ff9800' :
                                       todo.priority === 'MEDIUM' ? '#2196f3' :
                                       '#4caf50',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {todo.priority}
                      </span>
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
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch'
    }}>
      {customList(todos)}
      <SortTodos status={status} checkedTodos={checkedTodos} onMoveTodos={moveChecked} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ 
        justifyContent: 'stretch',
        alignItems: 'flex-start'
      }}>
        {createTodoColumn(newTodos, 'NEW', newChecked)}
        {createTodoColumn(openTodos, 'OPEN', openChecked)}
        {createTodoColumn(completedTodos, 'COMPLETED', completedChecked)}
      </Stack>
    </Box>
  );
}




