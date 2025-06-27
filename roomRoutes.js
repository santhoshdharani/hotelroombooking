const express = require('express');
const router = express.Router();
const { getRooms, addRoom, getRoomById } = require('../controllers/roomController');

// Routes
router.get('/', getRooms);              // GET /api/rooms
router.post('/', addRoom);             // POST /api/rooms
router.get('/:id', getRoomById);       // ✅ GET /api/rooms/:id

module.exports = router;