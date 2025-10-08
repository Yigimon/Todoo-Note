import axios from "axios";

export const Status = {
  NEW: "NEW",
  OPEN: "OPEN",
  COMPLETED: "COMPLETED"
} as const;

export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT"
} as const;

export type Status = typeof Status[keyof typeof Status];
export type Priority = typeof Priority[keyof typeof Priority];

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  expiresAt?: string;
  tags: string[];
  remindAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
};

export type CreateTodoData = {
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  expiresAt?: string;
  tags?: string[];
  remindAt?: string;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true
});

export async function fetchAllTodosAxios() {
  const response = await apiClient.get('/todos');
  // Backend sendet { success: true, data: [...], count: n }
  return response.data.data || [];
}

export async function createTodoAxios(todoData: CreateTodoData): Promise<Todo> {
  const response = await apiClient.post('/todos', {
    title: todoData.title,
    description: todoData.description || '',
    status: todoData.status || 'NEW',
    priority: todoData.priority || 'MEDIUM',
    expiresAt: todoData.expiresAt || null,
    remindAt: todoData.remindAt || null,
    tags: todoData.tags || []
  });
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to create todo');
  }
  
  return response.data.data;
}

export async function updateTodoStatusAxios(todoId: string, status: Status): Promise<Todo> {
  const response = await apiClient.put(`/todos/${todoId}`, {
    status
  });
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to update todo status');
  }
  
  return response.data.data;
}

export async function updateTodoAxios(todoId: string, todoData: Partial<CreateTodoData>): Promise<Todo> {
  const response = await apiClient.put(`/todos/${todoId}`, todoData);
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to update todo');
  }
  
  return response.data.data;
}

export async function deleteTodoAxios(todoId: string): Promise<void> {
  const response = await apiClient.delete(`/todos/${todoId}`);
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to delete todo');
  }
}

