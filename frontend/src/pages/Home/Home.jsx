import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false); 

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      {/* Header */}
      <Header onProfileClick={toggleProfile} />

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="content py-3" style={{ marginLeft: '180px' }}>
            <Main showProfile={showProfile} />
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
