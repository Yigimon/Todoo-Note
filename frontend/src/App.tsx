import CssBaseline from '@mui/material/CssBaseline';
import MainTodos from './pages/MainTodos';
import ButtonAppBar from './components/common/NavigationBar';
import a from './assets/a.jpg';
import { Box, CircularProgress } from '@mui/material';
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { logout, checkAuthStatus } = useAuth();

  // Beim App-Start: Prüfe ob User bereits eingeloggt ist
  useEffect(() => {
    const checkSession = async () => {
      setIsCheckingAuth(true);
      const isLoggedIn = await checkAuthStatus();
      setIsAuthenticated(isLoggedIn);
      setIsCheckingAuth(false);
    };

    checkSession();
  }, [checkAuthStatus]);

  const handleLogin = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  const handleLogout = async () => {
    await logout(); 
    setIsAuthenticated(false); 
  };

  // Loading-Screen während Session-Check
  if (isCheckingAuth) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh',
            backgroundColor: '#121212'
          }}
        >
          <CircularProgress size={60} />
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
      <Box sx={{ backgroundImage: `url(${a})`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <MainTodos />
      </Box>
        </>
      ) : (
        <LogIn onLogin={handleLogin} />
      )}
      </ThemeProvider>
  );
}

export default App;