import React, { useEffect, useState } from "react";
import { fetchAllTodosAxios } from "../../services/todoServices";
import type { Todo } from "../../services/todoServices";
import {Grid} from "@mui/material";


function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchAllTodosAxios().then((response) => {
      console.log("Backend response:", response);
      // data-Property mit dem Array
      setTodos(response.data || []);
    }).catch(console.error);
  }, []);

  return (
    <Grid container spacing={2}>
      {todos.map((todo) => (
        <Grid key={todo.id} size={{ xs: 12, sm: 6, md: 8 }}>
          <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            {/* Titel und Status in einer Zeile */}
            <Grid container spacing={2}>
              <Grid size={9}>
                <h3 style={{ margin: '0 0 8px 0' }}>{todo.title}</h3>
              </Grid>
              <Grid size={3}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '12px',
                  backgroundColor: todo.status === 'COMPLETED' ? '#4caf50' : 
                                   todo.status === 'OPEN' ? '#1f90c1ff' : 
                                   todo.status === 'NEW' ? '#ff9800' : '#ccc',
                  color: 'white'
                }}>
                  {todo.status}
                </span>
              </Grid>
            </Grid>
            
            {/* Beschreibung darunter */}
            <Grid container>
              <Grid size={12}>
                <p style={{ margin: '8px 0 0 0', color: '#666' }}>
                  {todo.description || 'Keine Beschreibung vorhanden'}
                </p>
              </Grid>
            </Grid>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default TodoList;