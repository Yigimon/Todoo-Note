
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import { Status } from '../../services/todoServices';

const todoNames = Object.values(Status);

export default function NamedTopSection() {
return (


  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    py: 2,
    gap: 2
  }}>
    {todoNames.map((name) => (
      <Chip 
        key={name}
        label={name}
        sx={{ 
          flex: '1 1 0',
          minWidth: 0,
          bgcolor: 
            name === 'NEW' ? '#ff9800' :
            name === 'OPEN' ? '#2196f3' : 
            name === 'COMPLETED' ? '#4caf50' : '#1976d2',
          color: 'white', 
          fontWeight: 'bold',
          fontSize: '14px',
          height: 40
        }}
      />
    ))}
  </Box>


    
  );
}

// <Box>
      
    //   <Paper elevation={10} sx={{ 
    //     flex: 1,
    //     height: 40,
    //     p: 1,
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    //   }}>
    //     <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
           
    //         <Chip 
    //         label="NEW"
    //         sx={{ minWidth: 200 }}
    //         /> 
    //         <Chip label="OPEN" />
    //         <Chip label="COMPLETED" />
    //     </Stack>
    //   </Paper>
    // </Box>