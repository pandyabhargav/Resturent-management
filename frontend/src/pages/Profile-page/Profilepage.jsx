import React, { useState } from 'react';
import './Profilepage.css';
import { FaEdit } from 'react-icons/fa';
import profileImage from '../../assets/avtar.jpeg'; 

const Profilepage = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    restaurant: '',
    gender: '',
    city: '',
    state: '',
    country: '',
    address: '',
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
    console.log('User Profile Data:', formData);
  };

  return (
    <div className="profile-form-wrapper">
      <div className="profile-form-container mb-5">
      
        <div className="banner">
        <button className="banner-btn">
            <FaEdit style={{ marginRight: '6px' }} /> Edit Profile

          </button>
        </div>

       
        <div className="profile-image-container">
          <img
            src={profileImage} 
            alt="Profile"
            className="profile-image"
           
          />
        </div>

      
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="restaurant">Restaurant Name:</label>
            <input
              type="text"
              id="restaurant"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
              placeholder="Enter your restaurant name"
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              style={{ backgroundColor: 'rgb(31, 29, 43)', color: 'white' }} 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profilepage;
