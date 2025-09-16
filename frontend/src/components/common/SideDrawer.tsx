import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

type Anchor = 'left';

interface SideDrawerProps {
  onNavigate?: (page: string) => void;
}

export default function SideDrawer({ onNavigate }: SideDrawerProps) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const menuItems = [
    { text: 'Neues Todo', icon: <AddIcon />, action: 'create-todo' },
    { text: 'Todo bearbeiten', icon: <EditIcon />, action: 'edit-todo' },
    { text: 'Suchen', icon: <SearchIcon />, action: 'search' },
    { text: 'Filter', icon: <FilterListIcon />, action: 'filter' },
    { text: 'Todo löschen', icon: <DeleteIcon />, action: 'delete-todo' },
    { text: 'Einstellungen', icon: <SettingsIcon />, action: 'settings' },
    { text: 'Über uns', icon: <InfoIcon />, action: 'about' },
  ];

  const handleItemClick = (action: string) => {
    if (onNavigate) {
      onNavigate(action);
    }
    setState({ ...state, left: false }); // Drawer schließen nach Klick
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item.action)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Version 1.0.0" sx={{ textAlign: 'center', color: 'gray' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer('left', true)}
        startIcon={<MenuIcon />}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Menü
      </Button>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
}