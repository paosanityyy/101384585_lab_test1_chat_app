const express = require('express');
const User = require('../models/User'); // Assuming this is the correct path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import jwt for generating tokens

const router = express.Router(); // Use express.Router() for route definitions

// Sign up a new user
router.post('/signup', async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with hashed password
        const newUser = new User({
            username,
            firstname,
            lastname,
            password
        });
        const savedUser = await newUser.save();

        // Exclude password from the response
        savedUser.password = undefined;

        res.status(201).json({ message: "User signed up successfully", user: savedUser });
    } catch (err) {
        res.status(400).json({ message: "Error signing up user", error: err });
    }
});

// Login an existing user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        if (user.password !== password) {
            return res.status(401).json({ status: false, message: "Invalid Username and password" });
        }

        res.status(200).json({
            status: true,
            username: user.username,
            message: "User logged in successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error logging in user" });
    }
});

module.exports = router;
