import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

export default function NamedTopSection() {
return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      sx={{ width: '100%', mb: 3 }}
    >
      
      <Paper elevation={10} sx={{ 
        flex: 1,
        height: 80,
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center',width: "100%" }}>
            <Chip label="NEW" /> 
            <Chip label="OPEN" />
            <Chip label="COMPLETED" />
        </Stack>
      </Paper>
    </Stack>
  );
}