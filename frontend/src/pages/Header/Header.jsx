import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaChevronDown, FaTimes, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'; // Import icons
import './Header.css';
import hello from '../../assets/welcome.png'; 
import profileImage from '../../assets/avtar.jpeg'; 

const Header = ({ onProfileClick }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem('firstName');
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []); // Empty dependency array to run this once on component mount

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNotificationsToggle = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const notifications = [
    {
      parcelNumber: "Parcel #1",
      tableNumber: "Table 10",
      orderDetails: "2x Pizza, 1x Coke",
      status: "Order Ready",
      time: "2 mins ago",
    },
    {
      parcelNumber: "Parcel #2",
      tableNumber: "Table 3",
      orderDetails: "1x Burger, 1x Fries",
      status: "Preparing",
      time: "10 mins ago",
    },
    {
      parcelNumber: "Parcel #3",
      tableNumber: "Table 5",
      orderDetails: "1x Pasta, 1x Juice",
      status: "Order Delivered",
      time: "20 mins ago",
    },
    {
      parcelNumber: "Parcel #4",
      tableNumber: "Table 8",
      orderDetails: "1x Salad, 1x Water",
      status: "Order Ready",
      time: "30 mins ago",
    },
  ];

  return (
    <header className="header text-white py-3 mt-2">
      <div className="container heade d-flex justify-content-between align-items-center">
        <div className="col-auto d-flex align-items-center">
          <img
            src={hello}
            alt="MyApp Logo"
            className="hello"
            width={190}
            style={{ marginLeft: '140px' }} 
          />
        </div>

        <nav className="nav-links text-white d-flex gap-3 align-items-center" style={{ marginRight: -100 }}>
          <div className="search-bar-container" style={{ width: '250px', position: 'relative' }}>
            <FaSearch
              className="search-icon"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgb(171, 187, 194)',
                fontSize: '1rem',
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              style={{
                width: '100%',
                paddingLeft: '35px',
                backgroundColor: '#333',
                color: 'rgb(171, 187, 194)',
                border: 'none',
                borderRadius: '4px',
              }}
            />
          </div>

          <div className="bell-icon-container" onClick={handleNotificationsToggle} style={{ position: 'relative' }}>
            <FaBell className="bell-icon" />
            <div className="notification-dot"></div>

            {notificationsOpen && (
              <div className="notifications-dropdown" style={{ position: 'absolute', top: '40px', right: '0', backgroundColor: 'rgb(31 , 29 , 43)', borderRadius: '8px', width: '320px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', zIndex: 10 }}>
                <div className="notifications-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h5 style={{ color: 'rgb(171, 187, 194)', margin: '0' }}>Notifications</h5>
                  <FaTimes onClick={() => setNotificationsOpen(false)} style={{ cursor: 'pointer', color: 'rgb(171, 187, 194)' }} />
                </div>
                
                <ul className="notifications-list" style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                  {notifications.map((notification, index) => (
                    <li key={index} className="notification-item" style={{ padding: '10px 0', color: 'rgb(171, 187, 194)', borderBottom: '1px solid rgb(37, 40, 54)' }}>
                      <div className="notification-header" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: '#f0ad4e' }}>
                        {notification.status === "Order Ready" && <FaCheckCircle style={{ color: '#5cb85c', marginRight: '5px' }} />}
                        {notification.status === "Preparing" && <FaHourglassHalf style={{ color: '#f0ad4e', marginRight: '5px' }} />}
                        {notification.parcelNumber} - {notification.tableNumber}
                      </div>
                      <div className="notification-details" style={{ fontSize: '0.9rem', marginTop: '5px' }}>
                        <span>{notification.orderDetails}</span>
                      </div>
                      <div className="notification-status" style={{ marginTop: '8px', fontSize: '0.8rem', color: '#5bc0de' }}>
                        {notification.status}
                      </div>
                      <div className="notification-time" style={{ marginTop: '5px', fontSize: '0.7rem', color: 'rgb(171, 187, 194)' }}>
                        {notification.time}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="profile-container mt-1" onClick={onProfileClick} style={{ position: 'relative' }}>
            <div className="profile-rect">
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
                style={{ width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}
              />
              <span className="profile-name">{firstName}</span>
              <FaChevronDown
                className={`dropdown-arrow ${dropdownOpen ? 'rotate' : ''}`}
                style={{
                  marginLeft: '8px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  color: 'rgb(171, 187, 194)',
                }}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
