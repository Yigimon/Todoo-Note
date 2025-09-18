import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'AlLl', icon: <FiberNewIcon /> },
  { value: 'NEW', label: 'New', icon: <FiberNewIcon /> },
  { value: 'OPEN', label: 'Open', icon: <PlayArrowIcon /> },
  { value: 'COMPLETED', label: 'Completed', icon: <CheckCircleIcon /> }
];

export default function StatusFilter() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedIndex(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      value={selectedIndex}
      onChange={handleChange}
      sx={{ width: '100%', mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}
    >
      {STATUS_OPTIONS.map((option) => (
        <BottomNavigationAction
          key={option.value}
          label={option.label}
          icon={option.icon}
        />
      ))}
    </BottomNavigation>
  );
}