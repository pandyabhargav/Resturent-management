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
import Dashboard from './pages/Dashboard/Dashboard';
import Additem from './pages/Additem/Additem';
import Qr from './pages/Qr/Qr';
import CreateQr from './pages/CreateQr/CreateQr';
import Header from './pages/Header/Header';
import Page2 from './pages/parsel-page/mainpage';
import CustomDate from './pages/payment-order/Date';
import OnsiteOrder from './pages/table-dash/Tableapp';
// import Page2 from './pages/parsel-page/mainpage';

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
          <Route path="/head" element={<Header />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            {/* Nested routes for the Main component */}
            <Route index element={<Dashboard />} />
            <Route path="orderdash" element={<OnsiteOrder />} />
            <Route path='page' element={<Page2/>} />
            <Route path="managemenu" element={<Managemenu />} />
            <Route path="additems" element={<Additem />} />
            <Route path="qr" element={<Qr/>} />
            <Route path="createqr" element={<CreateQr/>} />
            <Route path="parelorder" element={<CustomDate />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
