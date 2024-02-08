const { Server } = require("socket.io");

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Adjust according to your front-end domain for security
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinRoom', ({ room, user }) => {
            socket.join(room);
            console.log(`${user} joined room: ${room}`);
            socket.to(room).emit('message', { user: 'admin', text: `${user} has joined the chat!` });
        });

        socket.on('sendMessage', ({ room, user, message }) => {
            io.to(room).emit('message', { user, text: message });
            // Add logic here to save message to the database
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
            // Add logic here to notify the room of the user's departure
        });
    });
};

module.exports = initializeSocket;
