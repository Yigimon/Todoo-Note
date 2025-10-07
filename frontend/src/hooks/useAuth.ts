import { useState, useCallback } from 'react';
import { AuthService, type LoginCredentials, type User } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.login(credentials);
      
      if (result.success) {
        return true;
      } else {
        setError(result.message);
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await AuthService.logout();
      // Logout erfolgt immer, auch bei Backend-Fehlern (fail-safe)
    } catch (err) {
      console.error('Logout error:', err);
      // Trotzdem weiter mit Logout
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = useCallback(async (): Promise<User | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.getCurrentUser();
      
      if (result.success && result.data) {
        return result.data;
      } else {
        setError(result.message);
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get user';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    try {
      const result = await AuthService.getCurrentUser();
      return result.success && !!result.data;
    } catch (err) {
      console.error('Auth check failed:', err);
      return false;
    }
  }, []);

  return {
    login,
    logout,
    getCurrentUser,
    checkAuthStatus,
    loading,
    error,
    clearError: () => setError(null)
  };
};