import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './MyComponent/LoginForm';
import Home from './MyComponent/Home';
import Socse from './MyComponent/socse'; 
import StructurePage from './MyComponent/StructurePage';
import BatchDetails from './MyComponent/BatchDetails';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        {/* <Route path="/" element={<LoginForm/>}/> */}
        <Route path="/Home" element={<Home userRole={user?.role} />}>
          {/* Nested routes for Home */}
          
        </Route>
        <Route path="/batch/:batch/:option" element={<StructurePage/>} />      
      </Routes>
    </Router>
  );
};

export default App;