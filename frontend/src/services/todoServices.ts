import axios from "axios";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: string;
  completed: boolean;
  expiresAt?: string;
};


export async function fetchAllTodosAxios() {
  const response = await axios.get('http://localhost:3001/api/todos');
  return response.data;
}

