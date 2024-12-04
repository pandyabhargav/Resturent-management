import React, { useState } from 'react';
import { IoMdArrowDropdown, IoMdHome, IoMdCart, IoMdRestaurant, IoMdCash, IoMdQrScanner, IoMdLogOut, IoMdMenu } from "react-icons/io";
import './Sidebar.css';
import logo from '../../assets/logo.png';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        <IoMdMenu className="sidebar-toggle-icon" />
      </button>
      
      <aside className={`sidebar ${isSidebarOpen ? 'off-canvas' : ''}`}>
        <div className="sidebar-logo mb-4">
          <img src={logo} alt="MyApp Logo" className="logo-img" />
        </div>

        <div className="sidebar-nav">
          <a href="#dashboard" className="sidebar-item text-white">
            <IoMdHome className="sidebar-icon" /> Dashboard
          </a>

          <div>
            <div className="sidebar-item" onClick={() => handleToggleDropdown('manageOrders')}>
              <IoMdCart className="sidebar-icon" /> Manage Orders
              <IoMdArrowDropdown className={`dropdown-arrow ${openDropdown === 'manageOrders' ? 'open' : ''}`} />
            </div>
            <div className="dropdown-menu" style={{ display: openDropdown === 'manageOrders' ? 'block' : 'none' }}>
              <a href="#view-orders" className="dropdown-item">Parcel order</a>
              <a href="#pending-orders" className="dropdown-item">Onsite Order</a>
            </div>
          </div>

          <a href="#manage-menu" className="sidebar-item text-white">
            <IoMdRestaurant className="sidebar-icon" /> Manage Menu
          </a>

          <div>
            <div className="sidebar-item" onClick={() => handleToggleDropdown('paymentHistory')}>
              <IoMdCash className="sidebar-icon" /> Payment History
              <IoMdArrowDropdown className={`dropdown-arrow ${openDropdown === 'paymentHistory' ? 'open' : ''}`} />
            </div>
            <div className="dropdown-menu" style={{ display: openDropdown === 'paymentHistory' ? 'block' : 'none' }}>
              <a href="#transactions" className="dropdown-item">Parcel order</a>
              <a href="#invoices" className="dropdown-item">Onsite Order</a>
            </div>
          </div>

          <a href="#qr-codes" className="sidebar-item text-white">
            <IoMdQrScanner className="sidebar-icon" /> QR Codes
          </a>

          <div className="sidebar-logout">
            <a href="#logout" className="sidebar-item text-white">
              <IoMdLogOut className="sidebar-icon" /> Logout
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
