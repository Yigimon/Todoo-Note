import CssBaseline from '@mui/material/CssBaseline';
import MainTodos from './pages/MainTodos';
import ButtonAppBar from './components/common/NavigationBar';
import a from './assets/a.jpg';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import LogIn from './pages/logIn';
import { useAuth } from './hooks/useAuth';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, getCurrentUser } = useAuth();

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [getCurrentUser]);

  const handleLogout = async () => {
    await logout(); 
    setIsAuthenticated(false); 
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh' 
        }}>
          Loading...
        </Box>
      </ThemeProvider>
    );
  }

  return (
    
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isAuthenticated ? (
        <>
      <ButtonAppBar onLogout={handleLogout} />
      <Box sx={{ 
        backgroundImage: `url(${a})`, 
        backgroundSize: 'cover', 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
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