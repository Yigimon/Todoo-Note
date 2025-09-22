import * as React from 'react';
import { Box } from '@mui/material';
import TodoList from '../components/todos/TodoList';
import CreateTodoPopUp from '../components/common/CreateTodoPopUp';
import NamedTopSection from '../components/common/todosplittedNames';

export default function MainTodos() {
  const [createTodoOpen, setCreateTodoOpen] = React.useState(false);

  const handleCreateTodo = async (_todoData: any) => {
    // TODO: Implement todo creation logic
  };  return (
    <Box>
      
      <NamedTopSection />
      <TodoList />
      <CreateTodoPopUp 
        open={createTodoOpen}
        onClose={() => setCreateTodoOpen(false)}
        onSubmit={handleCreateTodo}
      />
    </Box>
  );
}