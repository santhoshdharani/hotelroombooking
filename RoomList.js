
import React from 'react';
import BookingForm from './BookingForm';

function RoomList({ rooms }) {
  if (!rooms || rooms.length === 0) {
    return <p>No rooms available.</p>;
  }

  return (
    <div>
      {rooms.map((room) => (
        <div key={room._id} style={{ border: '1px solid black', margin: '1rem', padding: '1rem' }}>
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p>Price: ₹{room.price}</p>
          <BookingForm roomId={room._id} />
        </div>
      ))}
    </div>
  );
}

export default RoomList;