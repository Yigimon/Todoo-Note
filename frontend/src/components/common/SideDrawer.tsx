import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (action: string) => void;
}

export default function SideDrawer({ open, onClose, onNavigate }: SideDrawerProps) {
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
    onClose(); // Drawer schließen nach Klick
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleItemClick(item.action)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}