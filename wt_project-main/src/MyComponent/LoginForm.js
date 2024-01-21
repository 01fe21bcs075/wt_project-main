// LoginForm.js

import React, { useState } from 'react';
import './LoginForm.css';
import kletechLogo from './logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



const LoginForm = ({ onLogin }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:3001/login', { email, password })
  .then(result => {
    console.log(result);
    if (result.data === 'Success') {
      console.log('Login Success');
      alert('Login successful!');
      navigate('/home');
    } else {
      alert('Incorrect password! Please try again.');
    }
  })
  .catch(error => {
    console.error('Error during login:', error);
    // Add any additional error handling logic here
  });
  }
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
              value={email}
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
          
          
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;