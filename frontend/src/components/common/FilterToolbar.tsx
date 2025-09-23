
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { type TodoQueryParams } from '../../services/todoFilterService';
import { useFilterCalculations } from '../../hooks/useFilterCalculations';

interface FilterToolbarProps {
  filters: TodoQueryParams;
  onFilterClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onViewClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClearFilters: () => void;
}

export default function FilterToolbar({ 
  filters, 
  onFilterClick, 
  onViewClick, 
  onClearFilters 
}: FilterToolbarProps) {
  const { filterCount } = useFilterCalculations(filters);

  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
      <Tooltip title="Spalten">
        <IconButton onClick={onViewClick} size="small">
          <ViewColumnIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Filter">
        <IconButton onClick={onFilterClick} size="small">
          <Badge
            badgeContent={filterCount}
            color="primary"
            variant="dot"
          >
            <FilterListIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>

      {filterCount > 0 && (
        <Button
          size="small"
          variant="outlined"
          onClick={onClearFilters}
          startIcon={<CancelIcon />}
        >
          Filter löschen
        </Button>
      )}
    </Stack>
  );
}
