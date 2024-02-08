import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import io from 'socket.io-client';
import '../css/Dashboard.css';

// Establish a connection to the Socket.IO server
const socket = io.connect('http://localhost:3000');

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('News'); // Default the room to 'News'
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  useEffect(() => {
    // Event listeners for Socket.IO can be set up here
    socket.on('message', (message) => {
      // Handle incoming messages
      console.log(message);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleRoomChange = (e) => setRoom(e.target.value);

  const handleJoinRoom = (e) => {
    e.preventDefault();

    if (!username.trim() || !room) {
      alert('Please enter a username and select a room.');
      return;
    }

    // Emit an event to join the room
    socket.emit('joinRoom', { username, room });
    
    // Optional: Navigate to a chat component if you have one set up
    navigate('/chat', { state: { username, room } }); // Use navigate with state
  };

  return (
    <>
      <h1>Join Chat Room</h1>
      <Form onSubmit={handleJoinRoom} className="container">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Room</Form.Label>
          <Form.Control
            as="select"
            value={room}
            onChange={handleRoomChange}
          >
            <option value="News">News</option>
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            {/* Add other room options here */}
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">Join Chat Room</Button>
      </Form>
    </>
  );
};

export default Dashboard;
