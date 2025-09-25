import { Box } from '@mui/material'; 
import NotificationsSignInPageError from '../components/login/mainPage'; 

interface LogInProps {
  onLogin: (authenticated: boolean) => void;
}

export default function LogIn({ onLogin }: LogInProps) {
  return (
    <Box>
      <NotificationsSignInPageError onLogin={onLogin} />
    </Box>
  );
}