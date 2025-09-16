import MainTodos from './pages/MainTodos';
import './App.css';
import PrimarySearchAppBar from './components/common/appBar';

function App() {
  return (
    <div>
      <PrimarySearchAppBar /> 
     <div>
      <MainTodos />
    </div>  
    </div>
   
  );
}

export default App;