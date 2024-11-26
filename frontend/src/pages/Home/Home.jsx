import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { IoMdArrowDropdown, IoMdHome, IoMdCart, IoMdRestaurant, IoMdCash, IoMdQrScanner, IoMdLogOut, IoMdMenu } from "react-icons/io";
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import logo from '../../assets/logo.png';
import '../Sidebar/Sidebar.css';
import { useNavigate } from 'react-router-dom';


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
    // Retrieve the JWT token (assuming it's stored in localStorage)
    const token = localStorage.getItem('jwtToken'); // Replace 'jwtToken' with your actual storage key
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/logout', {
        method: 'POST', // Assuming it's a POST request for logout
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
        // Handle error, e.g., show a message to the user
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
                  <a href="#pending-orders" className="dropdown-item">Onsite Order</a>
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
                  <Link to={''} className="dropdown-item">Onsite Order</Link>
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
