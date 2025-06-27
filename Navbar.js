import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#ccc' }}>
      <Link to="/">Home</Link> | 
      <Link to="/login"> Login</Link> | 
      <Link to="/register"> Register</Link> | 
      <Link to="/my-bookings"> My Bookings</Link>
    </nav>
  );
}

export default Navbar; 
