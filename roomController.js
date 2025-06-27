const Room = require('../models/Room');

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new room
exports.addRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.json({ message: 'Room added', room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get a room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};