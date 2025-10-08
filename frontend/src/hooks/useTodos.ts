import { useState, useEffect } from 'react';
import { type Todo } from '../services/todoServices';
import TodoFilterService, { type TodoQueryParams } from '../services/todoFilterService';
import { fetchAllTodosAxios } from '../services/todoServices';

export const useTodos = (filters: TodoQueryParams) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const filteredTodos = await TodoFilterService.fetchFilteredTodos(filters);
        setTodos(filteredTodos || []);
      } catch (error) {
        console.error('Error loading filtered todos:', error);
        // Fallback zu lokalen Daten
        const fallbackTodos = await fetchAllTodosAxios();
        setTodos(fallbackTodos || []);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [filters]);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const refreshTodos = async () => {
    setLoading(true);
    try {
      const refreshedTodos = await TodoFilterService.fetchFilteredTodos(filters);
      setTodos(refreshedTodos || []);
    } catch (error) {
      console.error('Error refreshing todos:', error);
    } finally {
      setLoading(false);
    }
  };

  return { 
    todos, 
    loading, 
    setTodos, 
    addTodo, 
    updateTodo, 
    refreshTodos 
  };
};
