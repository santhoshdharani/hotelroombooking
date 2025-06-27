const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x300', // Optional placeholder image
  },
  capacity: {
    type: Number,
    default: 2
  },
  roomType: {
    type: String,
    enum: ['single', 'double', 'suite'],
    default: 'single'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);
