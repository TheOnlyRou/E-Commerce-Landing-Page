import api from './api';
import { AuthResponse, User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Authentication service for handling user login, registration, and profile
 */
class AuthService {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.success) {
      this.setAuthData(response.data.data.token, response.data.data.user);
    }
    
    return response.data;
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    
    if (response.data.success) {
      this.setAuthData(response.data.data.token, response.data.data.user);
    }
    
    return response.data;
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data.data.user;
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Store auth data in localStorage
   */
  private setAuthData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default new AuthService();

