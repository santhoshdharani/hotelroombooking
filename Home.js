import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import './Home.css'; // Import CSS for styling

function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/rooms')
      .then((res) => setRooms(res.data))
      .catch((err) => console.error('Error fetching rooms:', err));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">Available Rooms</h2>
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room._id} className="room-card">
            <div className="room-images">
              {room.images && room.images.length > 0 ? (
                <img src={room.images[0]} alt={room.name} className="room-image" />
              ) : (
                <img src="https://via.placeholder.com/300x200" alt="Placeholder" className="room-image" />
              )}
            </div>
            <h3 className="room-name">{room.name}</h3>
            <p className="room-description">{room.description}</p>
            <p className="room-price">Price: ₹{room.price}</p>
            <p className="room-capacity">Capacity: {room.capacity} guests</p>
            <p className="room-facilities">Facilities: {room.facilities.join(', ')}</p>
            <BookingForm roomId={room._id} roomType={room.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;