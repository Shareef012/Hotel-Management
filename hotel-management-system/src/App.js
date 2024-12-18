import './App.css';
import Login from './Components/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Bookings from './Components/Bookings';
import History from './Components/History';
import Registration from './Components/Registration';

function App() {
  return (
    <AuthProvider>  
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/history" element={<History />} />
          <Route path='/registration' element={<Registration />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
