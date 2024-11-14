import React, { useState } from 'react';
import './Changepass.css';

const Changepass = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }   
    console.log('Changing password with data:', formData);
  };

  return (
    <div className="changepass-form-wrapper">
      <div className="changepass-form-container">
        <div className="changepass-banner">
        </div>
        <form onSubmit={handleSubmit} className="changepass-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              required
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>
          <div className="form-group">
            <button type="submit" className="change-pass-btn">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Changepass;
