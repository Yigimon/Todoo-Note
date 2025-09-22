import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MainTodos from './pages/MainTodos';
import PrimarySearchAppBar from './components/common/appBar';

function App() {
  return (
    <>
      <CssBaseline />
      <PrimarySearchAppBar />
      <Container maxWidth={false} sx={{ px: 2 }}>
        <MainTodos />
      </Container>
    </>
  );
}

export default App;