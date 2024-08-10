import logo from './logo.svg';
import './App.css';
import { yupResolver } from '@hookform/resolvers/yup';
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <div className="App">
      <RegistrationForm/>
    </div>
  );
}

export default App;
