import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdHome, IoMdCart, IoMdRestaurant, IoMdCash, IoMdQrScanner, IoMdLogOut, IoMdMenu } from "react-icons/io";
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import logo from '../../assets/logo.png';
import '../Sidebar/Sidebar.css';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleToggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <Header onProfileClick={toggleProfile} />

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            <IoMdMenu className="sidebar-toggle-icon" />
          </button>

          <aside className={`sidebar ${isSidebarOpen ? 'off-canvas' : ''}`}>
            <div className="sidebar-logo mb-4">
              <img src={logo} alt="MyApp Logo" className="logo-img" />
            </div>

            <div className="sidebar-nav">
              <Link to="/" className="sidebar-item text-white">
                <IoMdHome className="sidebar-icon" /> Dashboard
              </Link>

              <div>
                <div className="sidebar-item" onClick={() => handleToggleDropdown('manageOrders')}>
                  <IoMdCart className="sidebar-icon" /> Manage Orders
                  <IoMdArrowDropdown className={`dropdown-arrow ${openDropdown === 'manageOrders' ? 'open' : ''}`} />
                </div>
                <div className="dropdown-menu" style={{ display: openDropdown === 'manageOrders' ? 'block' : 'none' }}>
                  <Link to={'/page'} className="dropdown-item">Parcel order</Link>
                  <a href="#pending-orders" className="dropdown-item">Onsite Order</a>
                </div>
              </div>

              <div>
                <div className="sidebar-item" onClick={() => handleToggleDropdown('manageMenu')}>
                  <IoMdRestaurant className="sidebar-icon" /> Manage Menu
                  <IoMdArrowDropdown className={`dropdown-arrow ${openDropdown === 'manageMenu' ? 'open' : ''}`} />
                </div>
                <div className="dropdown-menu" style={{ display: openDropdown === 'manageMenu' ? 'block' : 'none' }}>
                  <Link to="/managemenu" className="dropdown-item">Manage Menu</Link>
                  <Link to="/additems" className="dropdown-item">Add Items</Link>
                </div>
              </div>


              <div>
                <div className="sidebar-item" onClick={() => handleToggleDropdown('paymentHistory')}>
                  <IoMdCash className="sidebar-icon" /> Payment History
                  <IoMdArrowDropdown className={`dropdown-arrow ${openDropdown === 'paymentHistory' ? 'open' : ''}`} />
                </div>
                <div className="dropdown-menu" style={{ display: openDropdown === 'paymentHistory' ? 'block' : 'none' }}>
                  <Link to={'/parelorder'} className="dropdown-item">Parcel order</Link>
                  <Link to={''} className="dropdown-item">Onsite Order</Link>
                </div>
              </div>

              <Link to={"/qr"} className="sidebar-item text-white">
                <IoMdQrScanner className="sidebar-icon" /> QR Codes
              </Link>

              <div className="sidebar-logout">
                <a href="#logout" className="sidebar-item text-white">
                  <IoMdLogOut className="sidebar-icon" /> Logout
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="content py-5" style={{ marginLeft: '220px' }}>
            {showProfile ? (
              <Profile />
            ) : (
              <Outlet />
            )}
          </main>
        </div >
      </div >
    </>
  );
};

export default Home;
