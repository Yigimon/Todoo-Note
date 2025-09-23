import { useState } from 'react';

export const usePopovers = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [viewAnchorEl, setViewAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setViewAnchorEl(event.currentTarget);
  };

  const handleViewClose = () => {
    setViewAnchorEl(null);
  };

  return {
    filterAnchorEl,
    viewAnchorEl,
    handleFilterClick,
    handleFilterClose,
    handleViewClick,
    handleViewClose
  };
};
