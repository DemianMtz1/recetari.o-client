import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import { Routes } from './components/routers/Routes';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <Routes />
      </Router>
    </>
  );
}

export default App;
