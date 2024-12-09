import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdHome, IoMdCart, IoMdRestaurant, IoMdCash, IoMdQrScanner, IoMdLogOut, IoMdMenu } from "react-icons/io";
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import logo from '../../assets/logo.png';
import '../Sidebar/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';


const Home = () => {
  const navigate = useNavigate()
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

  const handleLogout = async () => {
    
    const token = localStorage.getItem('jwtToken');
    
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the JWT token in the Authorization header
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful logout, e.g., clear JWT token and redirect to login page
        localStorage.removeItem('jwtToken'); // Remove token from storage
        navigate('/login'); // Navigate to the login page
        alert('Logged out successfully!');
      } else {
        alert('Logout failed! Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred. Please try again.');
    }
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
                  <Link to={'/orderdash'} className="dropdown-item">Onsite Order</Link>
                </div>
              </div>

              <div>
                <Link className="sidebar-item" to="/managemenu">
                  <IoMdRestaurant className="sidebar-icon" /> Manage Menu
                </Link>
              </div>

              <div>
                <div className="sidebar-item" onClick={() => handleToggleDropdown('paymentHistory')}>
                  <IoMdCash className="sidebar-icon" /> Payment History
                  <IoMdArrowDropdown className={`dropdown-arrow ${openDropdown === 'paymentHistory' ? 'open' : ''}`} />
                </div>
                <div className="dropdown-menu" style={{ display: openDropdown === 'paymentHistory' ? 'block' : 'none' }}>
                  <Link to={'/parelorder'} className="dropdown-item">Parcel order</Link>
                  <Link to={'/parelorder'} className="dropdown-item">Onsite Order</Link>
                </div>
              </div>

              <Link to={"/qr"} className="sidebar-item text-white">
                <IoMdQrScanner className="sidebar-icon" /> QR Codes
              </Link>

              <div className="sidebar-logout">
      <a
        href="#logout"
        className="sidebar-item text-white"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          handleLogout(); // Trigger the logout function
        }}
      >
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
