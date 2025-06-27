import React, { useState } from 'react';
import axios from 'axios';
import './BookingForm.css'; // Import CSS for styling

function BookingForm({ roomId, roomType }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to book a room.');
      return;
    }

    try {
      const payload = {
        ...formData,
        roomId,
        userId,
        roomType,
      };

      console.log('Submitting booking:', payload);

      const response = await axios.post('http://localhost:5000/api/bookings/book', payload);
      setMessage('Booking successful!');
      console.log('Booking response:', response.data);
    } catch (err) {
      console.error('Error booking room:', err.response?.data || err);
      setMessage('Failed to book the room. Please try again.');
    }
  };

  return (
    <div className="booking-form">
      <h3>Book a {roomType}</h3>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="checkInDate"
        value={formData.checkInDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="checkOutDate"
        value={formData.checkOutDate}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="guests"
        placeholder="Number of Guests"
        value={formData.guests}
        onChange={handleChange}
        min="1"
        required
      />
      <button onClick={handleBooking}>Book Now</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BookingForm;