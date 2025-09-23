import { useMemo } from 'react';
import type { Todo } from '../services/todoServices';

export const useTodoStatus = (todos: Todo[]) => {
  const categorizedTodos = useMemo(() => {
    const safeTodos = Array.isArray(todos) ? todos : [];
    const newTodos = safeTodos.filter(todo => todo.status === 'NEW');
    const openTodos = safeTodos.filter(todo => todo.status === 'OPEN');
    const completedTodos = safeTodos.filter(todo => todo.status === 'COMPLETED');

    return {
      newTodos,
      openTodos,
      completedTodos
    };
  }, [todos]);

  const moveTodos = (todosToMove: Todo[], toStatus: string, updateTodos: (updater: (todos: Todo[]) => Todo[]) => void) => {
    const validStatus = toStatus as 'NEW' | 'OPEN' | 'COMPLETED';
    updateTodos(prev => prev.map(todo =>
      todosToMove.some(t => t.id === todo.id) ? { ...todo, status: validStatus } : todo
    ));
    // TODO: Backend-Update (z.B. per Axios PUT/POST)
  };

  return {
    ...categorizedTodos,
    moveTodos
  };
};
