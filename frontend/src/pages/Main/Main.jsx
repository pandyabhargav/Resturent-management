import React from 'react';
import Profile from '../Profile/Profile';
import './main.css';
import Dashboard from '../Dashboard/Dashboard';
import Managemenu from '../Managemenu/Managemenu';
import Additem from '../Additem/Additem';


const Main = ({ showProfile }) => {
  return (
    <div>
     
      {showProfile ? (
        <Profile />
      ) : (  
        <div>
         {/* <Dashboard/> */}
         <div className="wrapper">
         <Managemenu />
        {/* <Additem /> */}
         </div>
        </div>
      )}
    </div>
  );
};

export default Main;
