//!API response Types 

import { TodoWithUserData } from './database';

// Standard API response structure
export interface StdApiRes<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Specific API response types for different endpoints
export interface GetAllTodosApiRes extends StdApiRes<TodoWithUserData[]> {
  count?: number; // Additional field for total count
}

export interface GetSingleTodoApiRes extends StdApiRes<TodoWithUserData> {}

export interface CreateTodoApiRes extends StdApiRes<TodoWithUserData> {}

export interface UpdateTodoApiRes extends StdApiRes<TodoWithUserData> {}

export interface DeleteTodoApiRes extends StdApiRes<null> {}

export interface ApiErrorRes extends StdApiRes<null> {
  success: false;
  error: string;
  message: string;
}
