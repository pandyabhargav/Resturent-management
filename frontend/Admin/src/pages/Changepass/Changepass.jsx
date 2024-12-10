import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Changepass.css';
import axios from 'axios';
import { BASE_URL } from '../../config';

const Changepass = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New passwords do not match!");
      return;
    }
  
    try {
      const token = localStorage.getItem('jwtToken');
  
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/password-reset-currant`,
        {
          currantPassword: formData.currentPassword,
          password: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      // Handle successful password change
      console.log("Password changed successfully!");
      navigate('/login');
    } catch (error) {
      console.error('Error changing password:', error);
  
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Something went wrong, please try again.');
      } else {
        setErrorMessage('An error occurred while changing the password.');
      }
    }
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

          {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>} {/* Display error message in red */}

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
