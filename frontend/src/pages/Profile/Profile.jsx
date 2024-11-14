import React, { useState } from 'react';
import './Profile.css';
import Profilepage from '../Profile-page/Profilepage';
import Changepass from '../Changepass/Changepass';
import Terms from '../Terms/Terms';

const Profile = () => {
    const [selectedCategory, setSelectedCategory] = useState('profile'); 

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="container profile-container m-0">
            <div className="row">
                <div className="col-md-4 col-12 mb-3">
                    <div className="menu-box">
                        <h2>Profile Menu</h2>
                        <div className="menu-categories">
                            <div
                                className={`menu-category ${selectedCategory === 'profile' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('profile')}
                            >
                                Profile
                            </div>
                            <div
                                className={`menu-category ${selectedCategory === 'change-password' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('change-password')}
                            >
                                Change Password
                            </div>
                            <div
                                className={`menu-category ${selectedCategory === 'terms' ? 'active' : ''}`}
                                onClick={() => handleCategoryChange('terms')}
                            >
                                Terms and Conditions
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 col-12">
                    <div className="content">
                        {selectedCategory === 'profile' && <Profilepage />}
                        {selectedCategory === 'change-password' && <Changepass />}
                        {selectedCategory === 'terms' && <Terms />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
