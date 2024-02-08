import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [signUpMsg, setSignUpMsg] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        try {
        const signUpResponse = await axios.post('http://localhost:3000/api/users/signup', { 
            username,
            firstname,
            lastname,
            password 
        });

        if (signUpResponse.status) {
            setSignUpMsg('Signed up successfully!');
        } else {
            setSignUpMsg('Sign up failed');
        }
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <Form onSubmit={handleSignUp} className='container'>
        <h1>Sign Up</h1>
        <Form.Group>
            <Form.Control className="inputField" type="text" placeholder="Enter username" onChange={handleUsernameChange} />
        </Form.Group>
        
        <Form.Group>
            <Form.Control className="inputField" type="text" placeholder="Enter first name" onChange={handleFirstNameChange} />
        </Form.Group>

        <Form.Group>
            <Form.Control className="inputField" type="text" placeholder="Enter last name" onChange={handleLastNameChange} />
        </Form.Group>

        <Form.Group>
            <Form.Control className="inputField" type="password" placeholder="Enter password" onChange={handlePasswordChange} />
        </Form.Group>

        <Form.Group>
            <Form.Check type="checkbox" label=" I agree to the terms and conditions" />
        </Form.Group>

        <Button variant="primary" type="submit" className='signUpBtn'>
            Sign Up
        </Button>

        {/* Display signUpMsg based on its content */}
        {signUpMsg ? (
            <p className="text-success">{signUpMsg}</p>
        ) : (
            <p className="text-danger">{signUpMsg}</p>
        )}
        <Form.Text className='loginText'>
            Already have an account?&nbsp;<Link to="/">Login</Link>
        </Form.Text>
        </Form>
    );
}

export default SignUp;