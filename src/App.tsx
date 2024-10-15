import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';
import TaskBoard from './Components/TaskBoard';


function App() {
  const [activecard,setactivcard]=useState(null);
  useEffect(() => {
    console.log("App Loaded");
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Wrap only TaskBoard with DndProvider */}
        <Route
          path="/taskboard"
          element={
  
              <TaskBoard />

          }
        />
      </Routes>
    </div>
  );
}

export default App;
