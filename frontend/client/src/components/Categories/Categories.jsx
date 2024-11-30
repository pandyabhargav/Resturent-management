import React, { useState, useEffect } from 'react';
import './Categories.css';
import { NavLink } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from API
        fetch("http://localhost:5000/api/v1/usercategory/restaurantusercategorys-get")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setCategories(data.data); // Set categories from data.data
                    console.log(data); // Log the fetched data here for debugging
                } else {
                    console.error('Failed to fetch categories');
                }
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);
  return (
    <div className="categories-container">
    {/* Header Section */}
    <div className="header">
    <NavLink  to={'/'} style={{color:'#fff'}}>
      <button className="back-button">◀</button>
    </NavLink>
      <h4 className="title">Categories</h4>
      <span className="total-count">100</span>
    </div>

    {/* Categories Grid */}
    <div className="categories-grid">
    {categories.length > 0 ? (
                categories.map((category, index) => (
                  <div key={category._id} className="category-card">
        <img src={category.image || category.img} alt={category.name} className="category-image" />
          <p className="category-name">{category.name}</p>
        </div>
        ))
      ) : (
          <p>No categories available.</p>
      )}
    </div>
  </div>
  )
}

export default Categories
