import { useState } from 'react';
import { type NewTodoData } from './useTodoForm';
import { createTodoAxios, type Todo } from '../services/todoServices';

export const useCreateTodo = (onTodoCreated?: (newTodo: Todo) => void) => {
  const [createTodoOpen, setCreateTodoOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenCreateTodo = () => {
    setCreateTodoOpen(true);
    setError(null);
  };

  const handleCloseCreateTodo = () => {
    setCreateTodoOpen(false);
    setError(null);
  };

  const handleCreateTodo = async (todoData: NewTodoData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newTodo = await createTodoAxios({
        title: todoData.title,
        description: todoData.description,
        status: todoData.status,
        priority: todoData.priority,
        expiresAt: todoData.expiresAt,
        remindAt: todoData.remindAt,
        tags: todoData.tags
      });
      
      // Erfolg: Todo wurde erstellt
      onTodoCreated?.(newTodo);
      handleCloseCreateTodo();
      
      console.log('Todo erfolgreich erstellt:', newTodo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unbekannter Fehler beim Erstellen des Todos';
      setError(errorMessage);
      console.error('Fehler beim Erstellen des Todos:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createTodoOpen,
    loading,
    error,
    handleOpenCreateTodo,
    handleCloseCreateTodo,
    handleCreateTodo
  };
};
