import CssBaseline from '@mui/material/CssBaseline';
import MainTodos from './pages/MainTodos';
import ButtonAppBar from './components/common/NavigationBar';
import a from './assets/a.jpg';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import LogIn from './pages/logIn';
import { useAuth } from './hooks/useAuth';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout(); 
    setIsAuthenticated(false); 
  };

  return (
    
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isAuthenticated ? (
        <>
      <ButtonAppBar onLogout={handleLogout} />
      <Box sx={{ backgroundImage: `url(${a})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <MainTodos />
      </Box>
        </>
      ) : (
        <LogIn onLogin={setIsAuthenticated} />
      )}
      </ThemeProvider>
  );
}

export default App;