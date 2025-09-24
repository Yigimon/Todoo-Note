import CssBaseline from '@mui/material/CssBaseline';
import MainTodos from './pages/MainTodos';
import ButtonAppBar from './components/common/NavigationBar';
import a from './assets/a.jpg';
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
      <ButtonAppBar />
      <Box sx={{ backgroundImage: `url(${a})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <MainTodos />
      </Box>
      </ThemeProvider>
  
  );
}

export default App;