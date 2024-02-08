import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

function Login({loggedIn}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMsg, setLoginMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post('http://localhost:3000/api/users/login', {
                username,
                password
            });

            if (loginResponse.status) {
                setLoginMsg('Logged in successfully!');
                loggedIn(loginResponse.data);
                
            } else {
                setLoginMsg('Login failed');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleUsernameChange = (e) => { setUsername(e.target.value); }

    const handlePasswordChange = (e) => { setPassword(e.target.value); }

    return (
        <Form onSubmit={handleLogin} className='container'>
            <h1>Log In</h1>
            <Form.Group>
                <Form.Control className='inputField' type="text" placeholder="Enter username" onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group>
                <Form.Control className='inputField' type="password" placeholder="Enter password" onChange={handlePasswordChange} />
            </Form.Group>

            <Button type="submit" className='loginBtn'>
                Login
            </Button>

            <p>{loginMsg}</p>

            <Form.Text className='signUpMsg'>
                Don't have an account?&nbsp;<Link to="/signup">Sign up here!</Link>
            </Form.Text>
           
        </Form>
    );  

}

export default Login;