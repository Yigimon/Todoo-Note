import TodoList from './components/todos/TodoList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todoo Note</h1>
      </header>

      <main className="app-main">
        <TodoList />
      </main>
    </div>
  );
}

export default App;