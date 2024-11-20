import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './pages/signup/signup';
import Login from './pages/login/login';
import Forget from './pages/Forgotpassword/forgot';
import Resetpassword from './pages/Resetpassword/Resetpass';
import Otp from './pages/otp/otp';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Managemenu from './pages/Managemenu/Managemenu';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpass" element={<Forget />} />
          <Route path="/resetpass" element={<Resetpassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/managemenu" element={<Managemenu />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
