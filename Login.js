import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate();

  // Function to handle login
  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Store the user ID in localStorage if login is successful
      localStorage.setItem('userId', response.data.user.id);

      // Redirect to the homepage after login
      navigate('/');
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // If there is a response from the server
        setError(err.response.data.error || 'An error occurred during login.');
      } else if (err.request) {
        // If the request was made but no response was received
        setError('No response from the server. Please check your network connection.');
      } else {
        // For any other errors
        setError('An unexpected error occurred: ' + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;