import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatRoom = ({ room, user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socketRef = useState(() => io('http://localhost:3000'))[0]; // Replace with your server URL

    useEffect(() => {
        // Join the room
        socketRef.emit('joinRoom', { room, user });

        // Listen for incoming messages
        socketRef.on('message', (message) => {
            setMessages((msgs) => [...msgs, message]);
        });

        return () => {
            // Cleanup on component unmount
            socketRef.disconnect();
            socketRef.off();
        };
    }, [socketRef, room, user]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            // Emit message to the server
            socketRef.emit('sendMessage', { room, user, message });
            setMessage('');
        }
    };

    const chatContainerStyle = {
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '20px',
        margin: '10px',
        height: '400px',
        overflowY: 'auto',
        backgroundColor: 'white'
    };

    const messageStyle = {
        padding: '5px 10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        margin: '5px 0',
        maxWidth: '85%',
    };

    const inputStyle = {
        borderRadius: '3px',
        padding: '10px',
        width: 'calc(100% - 22px)', // Adjust for padding and border
        margin: '10px 0'
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
        marginLeft: '10px'
    };

    return (
        <div>
            <div style={chatContainerStyle}>
                {messages.map((msg, index) => (
                    <div key={index} style={messageStyle}>
                        <strong>{msg.user}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Send</button>
            </form>
        </div>
    );
};

export default ChatRoom;
