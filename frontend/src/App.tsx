import CssBaseline from '@mui/material/CssBaseline';
import MainTodos from './pages/MainTodos';
import PrimarySearchAppBar from './components/common/appBar';
import peakpx from './assets/peakpx.jpg';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
function App() {
  return (
    
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PrimarySearchAppBar />
      <Box sx={{ backgroundImage: `url(${peakpx})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <MainTodos />
      </Box>
      </ThemeProvider>
  
  );
}

export default App;