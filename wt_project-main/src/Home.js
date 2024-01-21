
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import klefullphoto from './klefullphoto.png';

const Home = ({ userRole }) => {
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const departments = ['ECE', 'CSE', 'Mechanical', 'Civil', 'Chemical'];

  const handleDepartmentClick = () => {
    setShowDepartmentDropdown(!showDepartmentDropdown);
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    setShowDepartmentDropdown(false);
    if (department === 'CSE') {
      navigate('/Socse');
    }
  };

  

  const handleInsertClick = () => {
    setShowInsertForm(true);
  };

  const handleEditClick = () => {
         if (userRole !== 'hod') {
           setIsEditing(!isEditing);
          
         }
       };

  const handleDeleteClick = () => {
    console.log('Delete clicked');
  };

  const handleSaveClick = () => {
    // Handle save logic here (e.g., add new username and password to the database)
    console.log('Save clicked');
    setShowInsertForm(false);
    // You may want to make an API call to save the new username and password
  };

  const renderDepartmentContent = () => {
    if (selectedDepartment === 'CSE') {
      return (
        <div>
          <h3>{selectedDepartment} Department - {userRole}</h3>
          <p>Additional content for {selectedDepartment} Department</p>

          {isEditing && (
            <div>
              <button onClick={handleInsertClick}>Insert</button>
              <button onClick={handleDeleteClick}>Delete</button>
            </div>
          )}

          {showInsertForm && (
            <div>
              <form>
                <label>
                  New Username:
                  <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                </label>
                <label>
                  New Password:
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </label>
                <button type="button" onClick={handleSaveClick}>Save</button>
              </form>
            </div>
          )}
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
           
          </div>
        </nav>
      </header>

      <div className='userCont'>
        <h2>Welcome  {userRole}</h2>

        <p>The Board of Studies (BoS) is the basic constituent of the academic system of an Institute. Its functions will include framing the content of various courses, reviewing and updating the content from time to time, introducing new courses of study </p>
         <br/>
        

        

        
      </div>

      {renderDepartmentContent()}
    </div>
  );
};

export default Home;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import './Home.css';
// import klefullphoto from './klefullphoto.png';

// const Home = ({ userRole }) => {
//   const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
//   const [ setSelectedDepartment] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
  
//   const navigate = useNavigate();

//   const departments = ['ECE', 'CSE', 'Mechanical', 'Civil', 'Chemical'];

//   const handleDepartmentClick = () => {
//     setShowDepartmentDropdown(!showDepartmentDropdown);
//   };

//   const handleDepartmentChange = (department) => {
//     setSelectedDepartment(department);
//     setShowDepartmentDropdown(false);
//     if (department === 'CSE') {
//       navigate('/Socse');
//     }
//   };

//   const handleEditClick = () => {
//     if (userRole !== 'hod') {
//       setIsEditing(!isEditing);
      
//     }
//   };

  

  

//   return (
//     <div className='body'>
//       <header className="header">
//         <img src={klefullphoto} alt="Kletech Company Logo" className="logo2" />
//         <nav className="navbar">
//           <div className='navbut'>
//             <button className="search">About</button>

//             <div className="dropdown" onClick={handleDepartmentClick}>
//               <button className="search">Department</button>
//               {showDepartmentDropdown && (
//                 <div className="dropdown-content">
//                   {departments.map((dept) => (
//                     <button className="Dname" key={dept} onClick={() => handleDepartmentChange(dept)}>
//                       {dept}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className='userCont'>
//         <h2 className='p'>Welcome, {userRole}!</h2>
//         <p>The Board of Studies (BoS) is the basic constituent of the academic system of an Institute...</p>
//         <br /><hr /><br /><br /><br /><h2 className='p'> Add faculty here</h2>
//         {isEditing && (
//           <div>
//             <button className="search">Add faculty</button>
//           </div>
//         )}
//         {!isEditing && (
//           <button
//             className="editButton"
//             onClick={handleEditClick}
//             disabled={userRole === 'hod'}
//             style={{
//               cursor: userRole === 'hod' ? 'not-allowed' : 'pointer',
//               backgroundColor: userRole === 'hod' ? '#ccc' : '#007bff',
//               color: userRole === 'hod' ? '#555' : '#fff',
//               height: '40px',
//               width: '100px',
//             }}
//           >
//             Edit
//           </button>
//         )}

        
//       </div>
//     </div>
//   );
// };

// export default Home;
