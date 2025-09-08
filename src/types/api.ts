//!API response Types 

import { TodoWithUserData } from './database';

// Standard API response structure
export interface StandardApiRes<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Specific API response types for different endpoints
export interface GetAllTodosApiRes extends StandardApiRes<TodoWithUserData[]> {
  count?: number; // Additional field for total count
}

export interface GetSingleTodoApiRes extends StandardApiRes<TodoWithUserData> {}

export interface CreateTodoApiRes extends StandardApiRes<TodoWithUserData> {}

export interface UpdateTodoApiRes extends StandardApiRes<TodoWithUserData> {}

export interface DeleteTodoApiRes extends StandardApiRes<null> {}

export interface ApiErrorRes extends StandardApiRes<null> {
  success: false;
  error: string;
  message: string;
}
