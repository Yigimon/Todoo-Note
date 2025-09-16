import * as React from 'react';
import { Container, Typography, Box } from '@mui/material';
import StatusFilter from '../components/todos/StatusFilter';
import TodoList from '../components/todos/TodoList';
import SideDrawer from '../components/common/SideDrawer';
import CreateTodoPopUp from '../components/common/CreateTodoPopUp';

export default function MainTodos() {
  const [selectedStatus, setSelectedStatus] = React.useState<string>('ALL');
  const [createTodoOpen, setCreateTodoOpen] = React.useState(false);
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleDrawerAction = (action: string) => {
    switch (action) {
      case 'create-todo':
        setCreateTodoOpen(true);
        break;
      case 'edit-todo':
        // TODO: Öffne Edit-Modal
        console.log('Edit Todo Modal');
        break;
      case 'search':
        // TODO: Öffne Search-Modal
        console.log('Search Modal');
        break;
      case 'filter':
        // TODO: Öffne Advanced Filter Modal
        console.log('Filter Modal');
        break;
      case 'delete-todo':
        // TODO: Öffne Delete-Modal/Confirmation
        console.log('Delete Todo Modal');
        break;
      case 'settings':
        // TODO: Öffne Settings-Modal
        console.log('Settings Modal');
        break;
      case 'about':
        // TODO: Öffne About-Modal
        console.log('About Modal');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SideDrawer onNavigate={handleDrawerAction} />
      </Box>
      
      <StatusFilter 
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />
      
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