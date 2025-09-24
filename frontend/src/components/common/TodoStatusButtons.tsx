import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import type { Todo } from '../../services/todoServices';
import blurStyling from '../../services/stylingService';

interface SortTodosProps {
  status: string;
  checkedTodos: readonly Todo[];
  onMoveTodos: (from: Todo[], toStatus: string) => void;
}

export default function SortTodos({ status, checkedTodos, onMoveTodos }: SortTodosProps) {
  const moveTodos = (toStatus: string) => () => {
    onMoveTodos([...checkedTodos], toStatus);
  };

  return (

        <Stack direction="row" spacing={2} sx={{ 
          alignItems: 'center',
          justifyContent: 'center',
          px: 2, 
          py: 2,
          width: '100%'
         }}>
          {status === 'NEW' && (
            <Chip
              label="Nach OPEN verschieben"
              onClick={moveTodos('OPEN')}
              disabled={checkedTodos.length === 0}
              deleteIcon={<ArrowForwardIcon />}
              onDelete={moveTodos('OPEN')}
              variant="outlined"
              sx={{ ...blurStyling, minWidth: 200 }}
            />
          )}
          
          {status === 'OPEN' && (
            <>
              <Chip
                label="Zurück zu NEW"
                onClick={moveTodos('NEW')}
                disabled={checkedTodos.length === 0}
                deleteIcon={<ArrowBackIcon />}
                onDelete={moveTodos('NEW')}
                variant="outlined"
                sx={{ ...blurStyling, minWidth: 150 }}
              />
              <Chip
                label="Als COMPLETED markieren"
                onClick={moveTodos('COMPLETED')}
                disabled={checkedTodos.length === 0}
                deleteIcon={<DoneIcon />}
                onDelete={moveTodos('COMPLETED')}
                variant="outlined"
                sx={{ ...blurStyling, minWidth: 180 }}
              />
            </>
          )}
          
          {status === 'COMPLETED' && (
            <Chip
              label="Zurück zu OPEN"
              onClick={moveTodos('OPEN')}
              disabled={checkedTodos.length === 0}
              deleteIcon={<ArrowBackIcon />}
              onDelete={moveTodos('OPEN')}
              variant="outlined"
              sx={{ ...blurStyling, minWidth: 180 }}
            />
          )}
        </Stack>
       
      
  
  );
}