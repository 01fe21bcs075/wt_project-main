import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import Socse from './socse'; 
import StructurePage from './StructurePage';
import FacultyForm from './faculty';  // Import the FacultyForm component
import EditPage from './EditPage';

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
        <Route path="/home" element={<Home userRole={user?.role} />} />
        <Route path="/faculty" element={<FacultyForm />} />
        <Route path='/socse' element={<Socse/>} />
        
        <Route path="/batch/:batch/:option" element={<StructurePage userRole={user?.role} />} />
        
        <Route path="/batch/:batch/:option/edit" element={<EditPage />} />


      </Routes>
    </Router>
  );
};

export default App;
