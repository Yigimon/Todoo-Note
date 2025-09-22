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

export async function fetchAllTodosAxios() {
  const response = await axios.get('http://localhost:3001/api/todos');
  // Backend sendet { success: true, data: [...], count: n }
  return response.data.data || [];
}

