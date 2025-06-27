const Booking = require('../models/Booking');

exports.bookRoom = async (req, res) => {
  try {
    console.log('Booking request received:', req.body);
    const { fullName, email, phone, roomType, checkInDate, checkOutDate, guests, roomId, userId } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !roomType || !checkInDate || !checkOutDate || !guests || !roomId || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for overlapping bookings
    const existingBooking = await Booking.findOne({
      roomId,
      $or: [
        { checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate } }, // Overlapping dates
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room is already booked for the selected dates' });
    }

    // Create a new booking
    const booking = new Booking({ fullName, email, phone, roomType, checkInDate, checkOutDate, guests, roomId, userId });
    await booking.save();

    res.status(201).json({ message: 'Room booked successfully', booking });
  } catch (err) {
    console.error('Error booking room:', err);
    res.status(500).json({ message: 'Failed to book the room' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('roomId');
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};