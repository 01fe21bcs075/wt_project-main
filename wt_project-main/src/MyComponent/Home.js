// export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import klefullphoto from './klefullphoto.png';



const Home = ({ userRole }) => {
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const navigate = useNavigate();
 

  const departments = ['ECE', 'CSE', 'Mechanical', 'Civil', 'Chemical'];

  const handleDepartmentClick = () => {
    setShowDepartmentDropdown(!showDepartmentDropdown);
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    setShowDepartmentDropdown(false);
    if (department === 'CSE') {
      navigate('/Socse'); // Navigate to Socse page when CSE is selected
    }
  };

  

  

  const renderDepartmentContent = () => {
    if (selectedDepartment === 'CSE') {
      return (
        <div>
          <h3>{selectedDepartment} Department - {userRole}</h3>
          <p>Additional content for {selectedDepartment} Department</p>
        </div>
      );
    }
    return null;
  };

  

  

  return (
    <div className='body'>
      <header className="header">
        <img src={klefullphoto} alt="Kletech Company Logo" className="logo2" />
        <nav className="navbar">
          <div className='navbut'>
            <button className="search">About</button>
            <button className="search">Programs</button>
            <button className="search">Academics</button>
            <div className="dropdown" onClick={handleDepartmentClick}>
          <button className="search">Department</button>
          {showDepartmentDropdown && (
            <div className="dropdown-content">
              {departments.map((dept) => (
                <button className="Dname" key={dept} onClick={() => handleDepartmentChange(dept)}>
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>
            <button className="search">Placement</button>
            <button className="search">Search</button>
          </div>
        </nav>
      </header>

      <div className='userCont'>
        <h2>Welcome, {userRole}!</h2>
        
        
      </div>
      
      {renderDepartmentContent()}
    </div>
  );
};

export default Home;
