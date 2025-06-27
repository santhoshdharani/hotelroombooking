import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in.');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/bookings/user/${userId}`)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bookings:', err);
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} style={{ border: '1px solid gray', margin: '1rem', padding: '1rem' }}>
            {b.roomId ? (
              <>
                <p><strong>Room:</strong> {b.roomId.name}</p>
                <p><strong>Description:</strong> {b.roomId.description}</p>
                <p><strong>Price:</strong> ₹{b.roomId.price}</p>
                <p><strong>From:</strong> {new Date(b.checkInDate).toLocaleDateString()}</p>
                <p><strong>To:</strong> {new Date(b.checkOutDate).toLocaleDateString()}</p>
              </>
            ) : (
              <p style={{ color: 'red' }}>Room details not available.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;