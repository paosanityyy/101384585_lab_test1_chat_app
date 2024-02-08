const express = require('express');
const GroupMessage = require('../models/GroupMessage'); // Adjust the path as necessary
// If you're implementing authentication, you might also import your User model or authentication middleware here
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to join a room
router.post('/join', async (req, res) => {
    const { username, room } = req.body;

    if (!username || !room) {
        return res.status(400).json({ message: 'Please provide both a username and a room.' });
    }

    res.status(200).json({ message: `${username} joined room ${room}` });
});

// Route to send a new message in a group
router.post('/send', async (req, res) => {
    const { from_user, room, message } = req.body;

    if (!from_user || !room || !message) {
        return res.status(400).json({ message: 'Please provide all required fields: from_user, room, message.' });
    }

    try {
        const newMessage = new GroupMessage({ from_user, room, message });
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ message: 'Failed to send message', error: err });
    }
});


// Route to get all messages for a specific room
router.get('/:room', async (req, res) => {
    const { room } = req.params;

    try {
        const messages = await GroupMessage.find({ room: room }).populate('from_user', 'username');
        res.json(messages);
    } catch (err) {
        console.error('Error retrieving messages:', err);
        res.status(500).json({ message: 'Failed to retrieve messages', error: err });
    }
});

module.exports = router;
