const express = require('express');
const router = express.Router();
const { bookRoom, getBookings } = require('../controllers/bookingController');

// POST route for booking a room
router.post('/book', bookRoom);

// GET route for fetching user bookings
router.get('/user/:userId', getBookings);

module.exports = router;