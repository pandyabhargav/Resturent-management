import React from 'react';
import Profile from '../Profile/Profile';
import './main.css';
import Dashboard from '../Dashboard/Dashboard';
import Managemenu from '../Managemenu/Managemenu';
import Additem from '../Additem/Additem';
import Qr from '../Qr/Qr';
import CreateQr from '../CreateQr/CreateQr';


const Main = ({ showProfile }) => {
  return (
    <div>
     
      {showProfile ? (
        <Profile />
      ) : (  
        <div>
         {/* <Dashboard/> */}
         <div className="wrapper">
         {/* <Managemenu /> */}
         <Additem />
         {/* <Qr/> */}
         {/* <CreateQr/> */}
         </div>
        </div>
      )}
    </div>
  );
};

export default Main;
