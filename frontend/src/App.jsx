// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/signup/signup';
import Login from './pages/login/login';
import Forget from './pages/Forgotpassword/forgot';
import Resetpassword from './pages/Resetpassword/Resetpass';
import Otp from './pages/otp/otp';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpass" element={<Forget/>} />
            <Route path="/Resetpass" element={<Resetpassword/>} />
            <Route path="/otp" element={<Otp/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
