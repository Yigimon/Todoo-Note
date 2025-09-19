import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import StatusFilter from '../components/todos/StatusFilter';
import TodoList from '../components/todos/TodoList';

import CreateTodoPopUp from '../components/common/CreateTodoPopUp';
import NamedTopSection from '../components/common/todosplittedNames';

export default function MainTodos() {
  const [selectedStatus, setSelectedStatus] = React.useState<string>('ALL');
  const [createTodoOpen, setCreateTodoOpen] = React.useState(false);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);


  const handleCreateTodo = async (todoData: any) => {
    try {
      console.log('Creating new todo:', todoData);
      
      // Prepare data matching backend schema
      const todoPayload = {
        title: todoData.title,
        description: todoData.description || null,
        userId: "cm3i8bf0c00008ntxyvva3551", // TODO: Replace with actual logged-in user ID
        expiresAt: todoData.expiryDate ? new Date(todoData.expiryDate).toISOString() : null,
        tags: todoData.tags || [],
        reminder: todoData.reminderDate ? new Date(todoData.reminderDate).toISOString() : null,
      };

      console.log('Sending todo payload:', todoPayload);
      
      const response = await fetch('http://localhost:3001/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoPayload),
      });
      
      if (response.ok) {
        const createdTodo = await response.json();
        console.log('Todo erfolgreich erstellt:', createdTodo);
        setRefreshTrigger(prev => prev + 1);
        setCreateTodoOpen(false); // Close modal after successful creation
      } else {
        const errorData = await response.json();
        console.error('Fehler beim Erstellen des Todos:', errorData);
      }
    } catch (error) {
      console.error('Netzwerkfehler beim Erstellen des Todos:', error);
    }
  };

  return (
    <Container maxWidth="100%" sx={{ py: 1 }}>
      
      <NamedTopSection />
      <TodoList 
        filterStatus={selectedStatus === 'ALL' ? undefined : selectedStatus}
        refreshTrigger={refreshTrigger}
      />
      <CreateTodoPopUp 
        open={createTodoOpen}
        onClose={() => setCreateTodoOpen(false)}
        onSubmit={handleCreateTodo}
      />
    </Container>
  );
}