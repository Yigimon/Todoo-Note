import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ModeIcon from '@mui/icons-material/Mode';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useSpeedDial } from '../../hooks/useSpeedDial';

interface FloatingActionButtonProps {
  onAdd?: () => void;
}

const actions = [
  { icon: <PlaylistAddIcon />, name: 'Add todo' },
  { icon: <ModeIcon />, name: 'Edit' }
];

export default function FloatingActionButton({ onAdd }: FloatingActionButtonProps) {
  const { open, handleOpen, handleClose } = useSpeedDial();

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                open: true,
                title: action.name,
              },
            }}
            onClick={() => {
              if (action.name === 'Add todo' && onAdd) {
                onAdd();
              }
              handleClose();
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
