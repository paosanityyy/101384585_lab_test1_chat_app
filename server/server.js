// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const userRouter = require('./routes/UserRoutes');
const groupMessageRouter = require('./routes/GroupMessageRoutes');
const initializeSocket = require('./utils/socket'); // Adjust the path as necessary

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection setup
const DB_HOST = "cluster0.3myz13n.mongodb.net";
const DB_USER =  "paolocasison";
const DB_PASSWORD = "Password.123";
const DB_NAME = "comp3133-labtest1";
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

// Use routers
app.use('/api/users',userRouter);
app.use('/api/groups', groupMessageRouter);

// Initialize Socket.IO
initializeSocket(server);

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});
