import React, { useState, useEffect } from 'react';
import './Profilepage.css';
import { FaEdit } from 'react-icons/fa';
import profileImage from '../../assets/avtar.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profilepage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
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

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  // Function to fetch user data
  useEffect(() => {
    if (!userId) {
      navigate('/login'); // If no user ID is found, redirect to login page
      return;
    }

    const fetchUserData = async () => {
      const token = localStorage.getItem('jwtToken'); // Get the token from local storage
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/owner/owner-get/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`  // Add token to request headers
          }
        });
        const userData = response.data.data; // Assuming response contains a `data` object

        const restaurant = userData.restaurant || {}; // Fallback to empty object if no restaurant
        setFormData({
          fname: userData.firstName || '',
          lname: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phoneNumber || '',
          restaurant: restaurant.restaurantName || '',
          gender: userData.gender || '',
          city: userData.city || '',
          state: userData.state || '',
          country: userData.country || '',
          address: userData.address || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/owner/owner-get/${userId}`, // Update endpoint with user ID
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Profile updated successfully:', response.data);
      setIsEditing(false); // Exit editing mode after saving
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-form-wrapper">
      <div className="profile-form-container mb-5">
        <div className="banner">
          <button
            className={`banner-btn col-3 ${isEditing ? 'editing' : ''}`}
            onClick={() => setIsEditing(true)} // Enable editing mode on click
          >
            <FaEdit style={{ marginRight: '6px' }} /> {isEditing ? 'Save Changes' : 'Edit Profile'}
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing} // Disable input when not editing
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <input
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
            />
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
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
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="button-container">
              <button type="submit" className="submit-btn">Save Changes</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profilepage;
