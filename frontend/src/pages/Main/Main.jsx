import React from 'react';
import Profile from '../Profile/Profile';
import './main.css';
import Dashboard from '../Dashboard/Dashboard';

const Main = ({ showProfile }) => {
  return (
    <div>
     
      {showProfile ? (
        <Profile />
      ) : (  
        <div>
         <Dashboard/>
        </div>
      )}
    </div>
  );
};

export default Main;
