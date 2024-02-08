import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Login from './screens/LoginScreen';
import SignUp from './screens/SignUpScreen';
import Chat from './screens/ChatScreen';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setLoggedIn(status);
  }

  const handleLogout = (status) => {
    setLoggedIn(false);
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {
            (loggedIn) ? 
            <Route path="/" element={<Dashboard logout={handleLogout} />} /> 
            :
            <Route path="/" element={<Login loggedIn={handleLogin}/>} />
          }
          <Route path='/signup' element={<SignUp />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
    

export default App;
