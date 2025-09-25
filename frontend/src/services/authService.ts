// API Base URL
const API_BASE_URL = 'http://localhost:3001';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface LoginResponse {
  success: boolean;
  data?: User;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: result.data,
          message: result.message || 'Login successful'
        };
      } else {
        return {
          success: false,
          message: result.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.'
      };
    }
  }

  static async logout(): Promise<LogoutResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const result = await response.json();

      return {
        success: response.ok,
        message: result.message || (response.ok ? 'Logout successful' : 'Logout failed')
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: 'Network error during logout'
      };
    }
  }

  static async getCurrentUser(): Promise<{ success: boolean; data?: User; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: result.data,
          message: result.message || 'User data retrieved'
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to get user data'
        };
      }
    } catch (error) {
      console.error('Get current user error:', error);
      return {
        success: false,
        message: 'Network error'
      };
    }
  }
}