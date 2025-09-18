import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MainTodos from './pages/MainTodos';
import PrimarySearchAppBar from './components/common/appBar';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <PrimarySearchAppBar />
      <Container maxWidth={false} sx={{ mt: 2, px: 2, maxWidth: 'max-content' }}>
        <MainTodos />
      </Container>
    </React.Fragment>
  );
}

export default App;