


// import React, { useState } from 'react';
// import './LoginForm.css';
// import kletechLogo from './logo.jpeg';
// import { useNavigate } from 'react-router-dom';




// const LoginForm = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();


//   const handleLogin = () => {
    
//     const userRole = determineUserRole(username, password);
  
//     if (userRole !== 'viewer') {
//         onLogin({ username, role: userRole });
//         navigate('/home');
//       }  else {
//       alert('login failed');
      
//     }
//   };
  
 

//   const determineUserRole = (username, password) => {
//     // Hardcoded user roles and passwords
//     const userRoles = {
//       'admin@kletech.ac.in': 'admin',
//       'hod@kletech.ac.in': 'HoD',
//       'CommityMember1': 'pass1',
//       'CommityMember2': 'pass2',
//       'CommityMember3': 'pass3',
//       'CommityMember4': 'pass4',
//       'CommityMember5': 'pass5',
//     };

//     // Check if the entered username is in the list of user roles and if the password matches
//     const normalizedUsername = username.toLowerCase();
//     const normalizedPassword = password.toLowerCase();

//     if (userRoles.hasOwnProperty(normalizedUsername) && userRoles[normalizedUsername] === normalizedPassword) {
//         return 'admin';
//       } else if (normalizedUsername === 'hod@kletech.ac.in' && normalizedPassword === 'hod') {
//         return 'hod';
//       } else if (normalizedUsername === 'admin@kletech.ac.in' && normalizedPassword === 'admin') {
//           return 'admin';
//       }else if (normalizedUsername === 'commitymember1' && normalizedPassword === 'pass1') {
//           return 'member1';
//       }else if (normalizedUsername === 'commitymember2' && normalizedPassword === 'pass2') {
//           return 'member2';
//       }else if (normalizedUsername === 'commitymember3' && normalizedPassword === 'pass3') {
//           return 'member3';
//       }else if (normalizedUsername === 'commitymember4' && normalizedPassword === 'pass4') {
//           return 'member4';
//       }else if (normalizedUsername === 'commitymember5' && normalizedPassword === 'pass5') {
//           return 'member5';
//       }else if (normalizedUsername.startsWith('commitymember') && userRoles.hasOwnProperty(normalizedUsername) && userRoles[normalizedUsername] === normalizedPassword) {
//         return 'commity';
//       } else {
//         return 'viewer';
//       }
//   };

//   return (
//     <div id='body'>

//     <img src={kletechLogo} alt="Kletech Company Logo" className="logo" />
//     <div className="wrapper">
        
//       <div className="form-wrapper sign-in">
//         <form onSubmit={handleLogin}>
        

//           <h2>Login</h2>
//           <div className="input-group">
//             <input
//               type="text"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <label htmlFor="">Username</label>
//           </div>
//           <div className="input-group">
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <label htmlFor="">Password</label>
//           </div>
          
          
//           <button onClick={handleLogin}>Login</button>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import './LoginForm.css';
import kletechLogo from './logo.jpeg';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const userRole = determineUserRole(username, password);

    if (userRole !== 'viewer') {
      onLogin({ username, role: userRole });
      navigate('/home');
    } else {
      alert('Login failed');
    }
  };

  const determineUserRole = (username, password) => {
    const userRoles = {
      'admin@kletech.ac.in': 'admin',
      'hod@kletech.ac.in': 'HoD',
      'CommityMember1': 'pass1',
      'CommityMember2': 'pass2',
      'CommityMember3': 'pass3',
      'CommityMember4': 'pass4',
      'CommityMember5': 'pass5',
    };

    const normalizedUsername = username.toLowerCase();
    const normalizedPassword = password.toLowerCase();

    if (userRoles.hasOwnProperty(normalizedUsername) && userRoles[normalizedUsername] === normalizedPassword) {
      return 'admin';
    } else if (normalizedUsername === 'hod@kletech.ac.in' && normalizedPassword === 'hod') {
      return 'hod';
    } else if (normalizedUsername === 'admin@kletech.ac.in' && normalizedPassword === 'admin') {
      return 'admin';
    } else if (normalizedUsername === 'commitymember1' && normalizedPassword === 'pass1') {
      return 'member1';
    } else if (normalizedUsername === 'commitymember2' && normalizedPassword === 'pass2') {
      return 'member2';
    } else if (normalizedUsername === 'commitymember3' && normalizedPassword === 'pass3') {
      return 'member3';
    } else if (normalizedUsername === 'commitymember4' && normalizedPassword === 'pass4') {
      return 'member4';
    } else if (normalizedUsername === 'commitymember5' && normalizedPassword === 'pass5') {
      return 'member5';
    } else if (normalizedUsername.startsWith('commitymember') && userRoles.hasOwnProperty(normalizedUsername) && userRoles[normalizedUsername] === normalizedPassword) {
      return 'commity';
    } else {
      return 'viewer';
    }
  };

  return (
    <div id='body'>
      <img src={kletechLogo} alt="Kletech Company Logo" className="logo" />
      <div className="wrapper">
        <div className="form-wrapper sign-in">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="input-group">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="">Username</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="">Password</label>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
