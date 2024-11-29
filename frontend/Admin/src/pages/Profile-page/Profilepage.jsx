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
    restaurant: '', // Restaurant will be updated with the restaurant ObjectId
    gender: '',
    city: '',
    state: '',
    country: '',
    address: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  useEffect(() => {
    if (!userId) {
      navigate('/login'); 
      return;
    }

    const fetchUserData = async () => {
      const token = localStorage.getItem('jwtToken');
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/owner/owner-get/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data.data;
        const restaurant = userData.restaurant || {};
        const address = restaurant.restaurantAddress || '';

        console.log("User Data:", userData, "Restaurant Data:", restaurant);


        setFormData({
          fname: userData.firstName || '',
          lname: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phoneNumber || '',
          restaurant: restaurant.restaurantName || '', // Show restaurant name (editable)
          gender: userData.gender || 'male',
          city: userData.city || '',
          state: userData.state || '',
          country: userData.country || '',
          address: address,
        });

        localStorage.setItem('firstName', userData.firstName);

        console.log( userData.firstName );
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
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
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const updatedData = {
      ...formData,
      restaurant: formData.restaurant._id,  // Pass restaurant._id instead of restaurantName
    };
  
    const token = localStorage.getItem('jwtToken'); 
  
    axios
      .put(`http://localhost:5000/api/v1/owner/owner-update/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Profile updated successfully', response.data);

        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating profile:', error.response.data);
      });
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
            onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
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
              disabled={!isEditing}
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
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={{ backgroundColor: isEditing ? 'rgb(31, 29, 43)' : 'transparent', color: 'white' }}
              disabled={!isEditing}
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
            <button type="submit" className="btn-submit">
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profilepage;
