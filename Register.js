import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
        await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      if (err.response) {
        // If the error has a response (e.g., 400 or 500 status code)
        setError(err.response.data.error || 'An error occurred during registration.');
      } else if (err.request) {
        // If the request was made but no response was received (e.g., network error)
        setError('No response from the server. Please check your network connection.');
      } else {
        // If there is some other error (e.g., programming error)
        setError('An unexpected error occurred: ' + err.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {/* Display error message if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;