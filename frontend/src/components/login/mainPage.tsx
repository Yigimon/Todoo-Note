import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

const providers = [{ id: 'credentials', name: 'Email and password' }];

interface NotificationsSignInPageErrorProps {
  onLogin: (authenticated: boolean) => void;
}

export default function NotificationsSignInPageError({ onLogin }: NotificationsSignInPageErrorProps) {
  const theme = useTheme();
  const [checked, setChecked] = useState<{ id: number }[]>([]);

  const signIn: (provider: AuthProvider, formData?: FormData) => Promise<AuthResponse> = async (provider, formData) => {
    try {
      const email = formData?.get('email') as string;
      const password = formData?.get('password') as string;

      // Validation
      if (!email || !password) {
        return {
          type: 'CredentialsSignin',
          error: 'Email and password are required'
        };
      }

      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        // successful login
        onLogin(true);
        return {};
      }

      else {
        // failed login
        return {
          type: 'CredentialsSignin',
          error: result.message || 'Invalid credentials'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        type: 'CredentialsSignin',
        error: 'Connection error. Please check if the server is running.'
      };
    }
  };

  const handleToggle = (todo: { id: number }) => {
    const currentIndex = checked.findIndex(t => t.id === todo.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(todo);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleEditTodo = (todo: { id: number }) => {
    // Deine Logik zum Bearbeiten des Todos hier
    console.log('Edit todo:', todo);
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
      {/* Beispiel für die Verwendung der customList Funktion */}
      <div>
        {/* ... andere Komponenten ... */}
        <ListItem key={1} sx={{ mb: 1, p: 0 }}>
          {/* Linke Seite: Nur Checkbox */}
          <ListItemButton
            onClick={() => handleToggle({ id: 1 })} // Nur für Checkbox-Funktionalität
            sx={{
              width: 'auto',
              minWidth: '48px',
              maxWidth: '48px',
              p: 1
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <Checkbox
                checked={checked.some(t => t.id === 1)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
          </ListItemButton>

          {/* Rechte Seite: Rest des Inhalts für Edit-Popup */}
          <ListItemButton
            onClick={() => handleEditTodo({ id: 1 })} // Neue Funktion für Edit-Popup
            sx={{
              flex: 1,
              p: 1
            }}
          >
            <ListItemText
              primary="Todo Title"
              secondary="Todo Description"
            />
          </ListItemButton>
        </ListItem>
        {/* ... andere Komponenten ... */}
      </div>
    </AppProvider>
  );
}
