import React from 'react';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/signup/signup';
import Login from './pages/login/login';

function App() {
  

  return (
    <>
      <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}
                              
export default App;
