import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for route-specific logic
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';
import TaskBoard from './Components/TaskBoard';
import NotFound from './Components/NotFound';

function App() {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // To get the current route
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    console.log('App Loaded');
    const token = localStorage.getItem('token');

    // Allow navigation to /login or /signup even without token
    if (!token && location.pathname !== '/signup' && location.pathname !== '/login') {
      navigate('/login'); // Redirect to login if no token is found and trying to access protected routes
    }
  }, [navigate, location.pathname]); // Dependency array includes location.pathname to check current path

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected route: TaskBoard */}
        <Route
          path="/taskboard"
          element={<TaskBoard />}
        />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </div>
  );
}

export default App;
