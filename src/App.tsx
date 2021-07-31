import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Routes } from './components/routers/Routes';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </>
  );
}

export default App;
