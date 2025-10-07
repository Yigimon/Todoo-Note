import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

interface FloatingActionButtonProps {
  onAdd?: () => void;
}

export default function FloatingActionButton({ onAdd }: FloatingActionButtonProps) {
  return (
    <Fab 
      color="primary" 
      aria-label="add"
      onClick={onAdd}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <AddIcon />
    </Fab>
  );
}
