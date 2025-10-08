import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import blurStyle from '../../services/stylingService';

interface NavigationBarProps {
  onLogout: () => void;
  statusButtons?: React.ReactNode;
}

export default function ButtonAppBar({ onLogout, statusButtons }: NavigationBarProps) {
  return (
    <Box sx={{ flexGrow: 1, ...blurStyle }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TODO NOTE
          </Typography>
          {statusButtons && (
            <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
              {statusButtons}
            </Box>
          )}
          <Button color="inherit" onClick={onLogout}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}