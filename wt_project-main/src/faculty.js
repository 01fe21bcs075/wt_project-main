// import React, { useState } from 'react';

// const FacultyForm = ({ onFormSubmit }) => {
//   const [newUsername, setNewUsername] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSaveClick = () => {
//     // Validate form inputs
//     if (newPassword !== confirmPassword) {
//       alert('Passwords do not match. Please try again.');
//       return;
//     }

//     // Package form data
//     const formData = {
//       username: newUsername,
//       password: newPassword,
//       // Add any other form fields as needed
//     };

//     // Pass form data to the parent component (Home) for further handling
//     onFormSubmit(formData);
//   };

//   return (
//     <div className='body'>
//       <h2 className='header'>Add Faculty</h2>
//       <div className='form'>
      
//       </div>

//       <div className='userCont'>
//       <form className='form'>
//         <label>
//           Faculty Email:
//           <input type="email" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
//         </label>
//         <br></br>
//         <br></br>
//         <br></br>
//         <label>
//           Password:
//           <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//         </label>
//         <br></br>
//         <br></br>
//         <br></br>
//         <label>
//           Confirm Password:
//           <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//         </label>
//         <br></br>
//         <br></br>
//         <br></br>
//         <button type="button" className='btn' onClick={handleSaveClick}>Save</button>
//       </form>
//       </div>
    
//     </div>
//   );
// };

// export default FacultyForm;
