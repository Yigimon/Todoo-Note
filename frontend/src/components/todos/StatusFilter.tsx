import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All', icon: <FiberNewIcon /> },
  { value: 'NEW', label: 'New', icon: <FiberNewIcon /> },
  { value: 'OPEN', label: 'Open', icon: <PlayArrowIcon /> },
  { value: 'COMPLETED', label: 'Completed', icon: <CheckCircleIcon /> }
];

export default function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onStatusChange(newValue);
  };

  const selectedIndex = STATUS_OPTIONS.findIndex(option => option.value === selectedStatus);

  return (
    <BottomNavigation
      showLabels
      value={selectedIndex}
      onChange={handleChange}
      sx={{ width: '100%', mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}
    >
      {STATUS_OPTIONS.map((option, index) => (
        <BottomNavigationAction
          key={option.value}
          label={option.label}
          icon={option.icon}
          value={index}
          onClick={() => onStatusChange(option.value)}
        />
      ))}
    </BottomNavigation>
  );
}