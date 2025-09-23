import { useState } from 'react';
import type { Todo } from '../services/todoServices';



export const useTodoSelection = () => {
  const [checked, setChecked] = useState<readonly Todo[]>([]);

  const handleToggle = (todo: Todo) => () => {
    const currentIndex = checked.findIndex(t => t.id === todo.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(todo);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const clearSelection = () => {
    setChecked([]);
  };

  const getCheckedTodosForStatus = (todos: readonly Todo[]): readonly Todo[] =>
    todos.filter(todo => checked.some(c => c.id === todo.id));

  return {
    checked,
    handleToggle,
    clearSelection,
    getCheckedTodosForStatus
  };
};
