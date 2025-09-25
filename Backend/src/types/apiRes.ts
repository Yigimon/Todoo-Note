//!API response Types 

import { TodoWithUserData } from './database';

// Standard API response 
export interface StandardApiRes<DataType = any> {
  success: boolean;
  message?: string;
  data?: DataType;
  error?: string;
}

//API response types for different endpoints
export interface GetAllTodosApiRes extends StandardApiRes<TodoWithUserData[]> {
  count?: number; 
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




