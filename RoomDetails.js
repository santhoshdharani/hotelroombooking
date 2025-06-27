import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RoomDetails() {
  const { id } = useParams(); // Get room ID from URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rooms/${id}`)
      .then(response => {
        setRoom(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Room not found or server error');
        setLoading(false);
      });
  }, [id]);

  const handleBooking = () => {
    axios.post('http://localhost:5000/api/bookings', { roomId: id })
      .then(() => setBookingSuccess(true))
      .catch(() => setError('Failed to book the room'));
  };

  if (loading) return <div>Loading room details...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{room.name}</h2>
      <p><strong>Location:</strong> {room.location}</p>
      <p><strong>Description:</strong> {room.description}</p>
      <p><strong>Price per night:</strong> ₹{room.price}</p>
      <p><strong>Status:</strong> {room.booked ? 'Booked' : 'Available'}</p>

      {!room.booked && !bookingSuccess && (
        <button onClick={handleBooking}>Book Now</button>
      )}

      {bookingSuccess && <p style={{ color: 'green' }}>Room booked successfully!</p>}
    </div>
  );
}

export default RoomDetails; 
