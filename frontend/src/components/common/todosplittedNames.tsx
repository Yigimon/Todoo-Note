import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function NamedTopSection() {
  return (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      mb: 3,
      px: 1
    }}>
      <Stack direction="row" spacing={2} sx={{ 
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px' // Gleiche maximale Breite wie die untere Sektion
      }}>
        {/* NEW Section */}
        <Paper elevation={3} sx={{ 
          flex: 1, 
          minWidth: 200,
          height: 80,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Chip
            label="NEW"
            variant="outlined"
            sx={{ minWidth: 120 }}
          />
        </Paper>

        {/* OPEN Section */}
        <Paper elevation={3} sx={{ 
          flex: 1, 
          minWidth: 150,
          height: 80,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Chip
            label="OPEN"
            variant="outlined"
            sx={{ minWidth: 120 }}
          />
        </Paper>

        {/* COMPLETED Section */}
        <Paper elevation={3} sx={{ 
          flex: 1, 
          minWidth: 200,
          height: 80,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Chip
            label="COMPLETED"
            variant="outlined"
            sx={{ minWidth: 120 }}
          />
        </Paper>
      </Stack>
    </Box>
  );
}