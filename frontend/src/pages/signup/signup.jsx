import React, { useState } from 'react';
    import './signup.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import logo from '../../assets/logo.png';

    const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        restaurant: '',
        password: '',
        confirmPassword: '',
        agree: false,
    });

    const [restaurants, setRestaurants] = useState([
        "McDonald's",
        'Starbucks',
        'KFC',
        'Domino\'s Pizza',
        'Pizza Hut',
        'Burger King',
        'Subway',
        'Chipotle',
        'Taco Bell',
        'Wendy\'s',
    ]);

    const [newRestaurant, setNewRestaurant] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const countries = ['USA', 'Canada', 'India'];
    const states = ['California', 'New York', 'Texas'];
    const cities = ['Los Angeles', 'New York City', 'San Francisco'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleRestaurantChange = (e) => {
        setFormData({
        ...formData,
        restaurant: e.target.value,
        });
    };

    const handleNewRestaurantChange = (e) => {
        setNewRestaurant(e.target.value);
    };

    const handleAddRestaurant = () => {
        if (newRestaurant && !restaurants.includes(newRestaurant)) {
        setRestaurants([...restaurants, newRestaurant]);
        setFormData({
            ...formData,
            restaurant: newRestaurant,
        });
        setNewRestaurant('');
        setIsModalOpen(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="registration-wrapper">
        <div className="registration-container">
            <h2>Registration</h2>
            <br />
            <form onSubmit={handleSubmit} className="registration-form">
            <div className="input-group">
                <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control half-width"
                required
                style={{ color: '#fff' }}
                />
                <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control half-width"
                required
                style={{ color: '#fff' }}
                />
            </div>

            <div className="input-group">
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control half-width"
                required
                style={{ color: '#fff' }}
                />
                <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="form-control half-width"
                required
                style={{ color: '#fff' }}
                />
            </div>

            <div className="input-group">
                <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control third-width"
                required
                style={{
                    color: '#fff',
                    backgroundColor: '#2D303E',
                    border: '1px solid #2A2A38',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '-10px',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath fill=%22%23FFF%22 d=%22M4 5L1 2h6L4 5z%22/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '10px 5px',
                }}
                >
                <option value="" disabled>Select a Country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
                </select>
                <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control third-width"
                required
                style={{
                    color: '#fff',
                    backgroundColor: '#2D303E',
                    border: '1px solid #2A2A38',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '-10px',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath fill=%22%23FFF%22 d=%22M4 5L1 2h6L4 5z%22/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '10px 5px',
                }}
                >
                <option value="" disabled>Select a State</option>
                {states.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                ))}
                </select>
                <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control third-width"
                required
                style={{
                    color: '#fff',
                    backgroundColor: '#2D303E',
                    border: '1px solid #2A2A38',
                    padding: '10px',
                    borderRadius: '5px',
                    marginBottom: '-10px',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath fill=%22%23FFF%22 d=%22M4 5L1 2h6L4 5z%22/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '10px 5px',
                }}
                >
                <option value="" disabled>Select a City</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                ))}
                </select>
            </div>

            <br />
            <div className="mb-3">
                <select
                name="restaurant"
                value={formData.restaurant}
                onChange={handleRestaurantChange}
                required
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    color: '#fff',
                    backgroundColor: '#2D303E',
                    border: '1px solid #2A2A38',
                    marginBottom: '-10px',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 8 8%22%3E%3Cpath fill=%22%23FFF%22 d=%22M4 5L1 2h6L4 5z%22/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '10px 5px',
                }}
                >
                <option value="" disabled>Select a Restaurant</option>
                {restaurants.map((restaurant, index) => (
                    <option key={index} value={restaurant}>{restaurant}</option>
                ))}
                </select>
                <a
                type="button"
                className="btn btn-link mt-2 text-warning  "
                onClick={() => setIsModalOpen(true)}
                style={{ color: '#fff' }}
                >
                Add a New Restaurant
                </a>
            </div>

            <div className="input-group">
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form-control full-width"
                required
                style={{ color: '#fff' }}
                />
            </div>
            <div className="input-group">
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control full-width"
                required
                style={{ color: '#fff' }}
                />
            </div>
            
            <div className="form-group mt-3">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    style={{
                    width: '16px',
                    height: '16px',
                    margin: '0',
                    }}
                />
                <span>
                    I agree to all the <a href="#">T&C</a> and <a href="#">Privacy Policies</a>
                </span>
                </label>
            </div>

            <button type="submit" className="btn register-button w-100">
                Register
            </button>
            </form>

            {/* Modal for adding a new restaurant */}
            {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                <h4>Add New Restaurant</h4>
                <input
                    type="text"
                    value={newRestaurant}
                    onChange={handleNewRestaurantChange}
                    placeholder="Enter restaurant name"
                    className="form-control"
                />
                <button onClick={handleAddRestaurant} className="btn btn-primary">
                    Add
                </button>
                <button onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                    Cancel
                </button>
                </div>
            </div>
            )}

            <div className="login-link">
            <p className="text-center mt-3">
                Already have an account? <a href="/login">Login here</a>
            </p>
            </div>
        </div>
        <div className="login-info">
            <div className="logo-container">
            <img src={logo} className="logo" alt="Logo" />
            </div>
            <p className="info-text">
            Where every <span className="highlight">flavor</span> tells a story.
            </p>
        </div>
        </div>
    );
    };

    export default Registration;