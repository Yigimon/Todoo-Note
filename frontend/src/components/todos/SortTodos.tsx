import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import type { Todo } from '../../services/todoServices';

interface SortTodosProps {
  status: string;
  checkedTodos: readonly Todo[];
  onMoveTodos: (from: Todo[], toStatus: string) => void;
}

export default function SortTodos({ status, checkedTodos, onMoveTodos }: SortTodosProps) {
  const handleMoveToOpen = () => {
    onMoveTodos([...checkedTodos], 'OPEN');
  };

  const handleMoveToNew = () => {
    onMoveTodos([...checkedTodos], 'NEW');
  };

  const handleMoveToCompleted = () => {
    onMoveTodos([...checkedTodos], 'COMPLETED');
  };

  return (
    <Paper elevation={3} sx={{ 
      width: '100%', 
      minWidth: 400,
      height: 80,
      p: 3,
      mx: 1,
      mt: 3, // Mehr Abstand nach oben
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          {status === 'NEW' && (
            <Chip
              label="Nach OPEN verschieben"
              onClick={handleMoveToOpen}
              disabled={checkedTodos.length === 0}
              deleteIcon={<ArrowForwardIcon />}
              onDelete={handleMoveToOpen}
              variant="outlined"
              sx={{ minWidth: 200 }}
            />
          )}
          
          {status === 'OPEN' && (
            <>
              <Chip
                label="Zurück zu NEW"
                onClick={handleMoveToNew}
                disabled={checkedTodos.length === 0}
                deleteIcon={<ArrowBackIcon />}
                onDelete={handleMoveToNew}
                variant="outlined"
                sx={{ minWidth: 150 }}
              />
              <Chip
                label="Als COMPLETED markieren"
                onClick={handleMoveToCompleted}
                disabled={checkedTodos.length === 0}
                deleteIcon={<DoneIcon />}
                onDelete={handleMoveToCompleted}
                sx={{ minWidth: 180 }}
              />
            </>
          )}
          
          {status === 'COMPLETED' && (
            <Chip
              label="Zurück zu OPEN"
              onClick={handleMoveToOpen}
              disabled={checkedTodos.length === 0}
              deleteIcon={<ArrowBackIcon />}
              onDelete={handleMoveToOpen}
              variant="outlined"
              sx={{ minWidth: 200 }}
            />
          )}
        </Stack>
      </Paper>
  );
}