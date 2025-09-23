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

export async function fetchAllTodosAxios() {
  const response = await axios.get('http://localhost:3001/api/todos');
  // Backend sendet { success: true, data: [...], count: n }
  return response.data.data || [];
}

export async function createTodoAxios(todoData: CreateTodoData): Promise<Todo> {
  const response = await axios.post('http://localhost:3001/api/todos', {
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
  const response = await axios.put(`http://localhost:3001/api/todos/${todoId}`, {
    status
  });
  
  if (!response.data.success) {
    throw new Error(response.data.message || 'Failed to update todo status');
  }
  
  return response.data.data;
}

