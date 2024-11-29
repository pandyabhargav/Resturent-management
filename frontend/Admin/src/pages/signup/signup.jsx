import React, { useState, useEffect } from 'react';
import './signup.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.png';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        state: '',       
        city: '',        
        restaurant: '',  
        password: '',
        confirmPassword: '',
        agree: false,
    });
    const navigate = useNavigate();

    const locations = [
        {
            country: 'USA',
            states: [
                { state: 'California', cities: ['Los Angeles', 'San Francisco'] },
                { state: 'New York', cities: ['New York City', 'Buffalo'] },
                { state: 'Texas', cities: ['Houston', 'Dallas'] },
            ],
        },
        {
            country: 'Canada',
            states: [
                { state: 'Ontario', cities: ['Toronto', 'Ottawa'] },
                { state: 'Quebec', cities: ['Montreal', 'Quebec City'] },
                { state: 'British Columbia', cities: ['Vancouver', 'Victoria'] },
            ],
        },
        {
            country: 'India',
            states: [
                { state: 'Maharashtra', cities: ['Mumbai', 'Pune'] },
                { state: 'Delhi', cities: ['Delhi', 'Noida'] },
                { state: 'Tamil Nadu', cities: ['Chennai', 'Madurai'] },
            ],
        },
        {
            country: 'Australia',
            states: [
                { state: 'New South Wales', cities: ['Sydney', 'Newcastle'] },
                { state: 'Victoria', cities: ['Melbourne', 'Geelong'] },
                { state: 'Queensland', cities: ['Brisbane', 'Gold Coast'] },
            ],
        },
        {
            country: 'UK',
            states: [
                { state: 'England', cities: ['London', 'Manchester'] },
                { state: 'Scotland', cities: ['Edinburgh', 'Glasgow'] },
                { state: 'Wales', cities: ['Cardiff', 'Swansea'] },
            ],
        },
        {
            country: 'Germany',
            states: [
                { state: 'Bavaria', cities: ['Munich', 'Nuremberg'] },
                { state: 'Berlin', cities: ['Berlin', 'Potsdam'] },
                { state: 'Hessen', cities: ['Frankfurt', 'Wiesbaden'] },
            ],
        },
        {
            country: 'France',
            states: [
                { state: 'Île-de-France', cities: ['Paris', 'Versailles'] },
                { state: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice'] },
                { state: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble'] },
            ],
        },
        {
            country: 'Spain',
            states: [
                { state: 'Madrid', cities: ['Madrid', 'Alcalá de Henares'] },
                { state: 'Catalonia', cities: ['Barcelona', 'Girona'] },
                { state: 'Andalusia', cities: ['Seville', 'Malaga'] },
            ],
        },
        {
            country: 'Italy',
            states: [
                { state: 'Lazio', cities: ['Rome', 'Tivoli'] },
                { state: 'Lombardy', cities: ['Milan', 'Bergamo'] },
                { state: 'Sicily', cities: ['Palermo', 'Catania'] },
            ],
        },
        {
            country: 'Brazil',
            states: [
                { state: 'São Paulo', cities: ['São Paulo', 'Campinas'] },
                { state: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'Niterói'] },
                { state: 'Bahia', cities: ['Salvador', 'Feira de Santana'] },
            ],
        },
        {
            country: 'South Africa',
            states: [
                { state: 'Gauteng', cities: ['Johannesburg', 'Pretoria'] },
                { state: 'Western Cape', cities: ['Cape Town', 'Stellenbosch'] },
                { state: 'KwaZulu-Natal', cities: ['Durban', 'Pietermaritzburg'] },
            ],
        },
        {
            country: 'Mexico',
            states: [
                { state: 'CDMX', cities: ['Mexico City', 'Coyoacán'] },
                { state: 'Jalisco', cities: ['Guadalajara', 'Puerto Vallarta'] },
                { state: 'Yucatán', cities: ['Mérida', 'Valladolid'] },
            ],
        },
        {
            country: 'Japan',
            states: [
                { state: 'Tokyo', cities: ['Tokyo', 'Yokohama'] },
                { state: 'Osaka', cities: ['Osaka', 'Kobe'] },
                { state: 'Hokkaido', cities: ['Sapporo', 'Asahikawa'] },
            ],
        },
        {
            country: 'China',
            states: [
                { state: 'Beijing', cities: ['Beijing', 'Tianjin'] },
                { state: 'Shanghai', cities: ['Shanghai', 'Suzhou'] },
                { state: 'Guangdong', cities: ['Guangzhou', 'Shenzhen'] },
            ],
        },
        {
            country: 'Russia',
            states: [
                { state: 'Moscow', cities: ['Moscow', 'Tula'] },
                { state: 'Saint Petersburg', cities: ['Saint Petersburg', 'Pushkin'] },
                { state: 'Krasnoyarsk', cities: ['Krasnoyarsk', 'Zelenogorsk'] },
            ],
        },
    ];

    const [countriesData, setCountriesData] = useState(locations);



    const [restaurants, setRestaurants] = useState([]);
    const [formRestData, setFormRestData] = useState({
        restaurant: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [newRestaurant, setNewRestaurant] = useState({
        restaurantName: '',
        restaurantAddress: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
    });

    
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/restaurant/restaurants-get');
            console.log('Fetched restaurants:', response.data); 

           
            if (response.data.success && Array.isArray(response.data.data)) {
                setRestaurants(response.data.data); 
            } else {
                console.error("Invalid data format:", response.data);
                setRestaurants([]);
            }
        } catch (error) {
            console.error("Error fetching restaurants:", error);
            setRestaurants([]);
        }
    };

    const handleRestaurantChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "addNewRestaurant") {
            setShowModal(true);
        } else {
            setFormData({
                ...formData,
                restaurant: selectedValue,
            });
        }
    };

    const handleNewRestaurantChange = (e) => {
        setNewRestaurant({
            ...newRestaurant,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddRestaurant = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/restaurant/restaurant-add',
                newRestaurant
            );
            console.log("Restaurant added:", response.data);

            setRestaurants((prevRestaurants) => [
                ...prevRestaurants,
                response.data.restaurant
            ]);

            window.location.reload();
            setShowModal(false);
            setNewRestaurant({
                restaurantName: '',
                restaurantAddress: '',
                country: '',
                state: '',
                city: '',
                zipCode: ''
            });
        } catch (error) {
            if (error.response) {
                console.error("Server response error:", error.response.data);
            } else {
                console.error("Error adding restaurant:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };




    const getStates = () => {
        const countryData = countriesData.find(
            (country) => country.country === formData.country
        );
        return countryData ? countryData.states : [];
    };

 
    const getCities = () => {
        const stateData = getStates().find(
            (state) => state.state === formData.state
        );
        return stateData ? stateData.cities : [];
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log("Form Data:", formData);


        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }


        if (!formData.agree) {
            alert("You must agree to the T&C and Privacy Policies.");
            return;
        }

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.country || !formData.state || !formData.city || !formData.restaurant || !formData.password) {
            alert("Please fill all the required fields.");
            return;
        }

        try {

            const dataToSend = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                country: formData.country,
                state: formData.state,
                city: formData.city,
                restaurant: formData.restaurant,
                phoneNumber: formData.phoneNumber,
                confirmPassword: formData.confirmPassword, 
                agree: formData.agree  
            };

            console.log("Data to send:", dataToSend);


            const response = await axios.post('http://localhost:5000/api/v1/owner/owner-add', dataToSend);

            if (response.status === 201) {
                alert("Registration successful!");
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert("Registration failed. Please try again.");
        }
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
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
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
                            style={{ color: '#fff', backgroundColor: '#2D303E' }}
                        >
                            <option value="" disabled>Select a Country</option>
                            
                            {countriesData.map((location, index) => (
                                <option key={index} value={location.country}>
                                    {location.country}
                                </option>
                            ))}
                        </select>

                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="form-control third-width"
                            required
                            style={{ color: '#fff', backgroundColor: '#2D303E' }}
                        >
                            <option value="" disabled>Select a State</option>
                            {getStates().map((state, index) => (
                                <option key={index} value={state.state}>
                                    {state.state}
                                </option>
                            ))}
                        </select>

                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-control third-width"
                            required
                            style={{ color: '#fff', backgroundColor: '#2D303E' }}
                        >
                            <option value="" disabled>Select a City</option>
                            {getCities().map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

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
                            }}
                        >
                            <option value="">Select a restaurant</option>

                            {Array.isArray(restaurants) && restaurants.length > 0 ? (
                                restaurants.map((restaurant) =>
                                    restaurant && restaurant._id ? (
                                        <option key={restaurant._id} value={restaurant._id}>
                                            {restaurant.restaurantName || 'Unnamed Restaurant'}
                                        </option>
                                    ) : null
                                )
                            ) : (
                                <option value="" disabled>No restaurants available</option>
                            )}
                            <option value="addNewRestaurant" className='text-center register-button'>+ Add New Restaurant</option>
                        </select>
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
                                style={{ width: '16px', height: '16px', margin: '0' }}
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title style={{ textAlign: 'left', width: '100%' }}>
                        Create New Restaurant
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="newRestaurantName">
                                    <Form.Label>
                                        Restaurant Name
                                        <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="restaurantName"
                                        value={newRestaurant.restaurantName}
                                        onChange={handleNewRestaurantChange}
                                        placeholder="Enter restaurant name"
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="restaurantAddress">
                                    <Form.Label>
                                        Restaurant Address
                                        <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="restaurantAddress"
                                        value={newRestaurant.restaurantAddress}
                                        onChange={handleNewRestaurantChange}
                                        placeholder="Enter restaurant address"
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="restaurantCountry">
                                    <Form.Label>
                                        Country
                                        <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={newRestaurant.country}
                                        onChange={handleNewRestaurantChange}
                                        placeholder="Enter country"
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="restaurantState">
                                    <Form.Label>
                                        State
                                        <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={newRestaurant.state}
                                        onChange={handleNewRestaurantChange}
                                        placeholder="Enter state"
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="restaurantCity">
                                    <Form.Label>
                                        City
                                        <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={newRestaurant.city}
                                        onChange={handleNewRestaurantChange}
                                        placeholder="Enter city"
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="restaurantZip">
                                    <Form.Label>
                                        ZIP Code
                                        <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zipCode"
                                        value={newRestaurant.zipCode}
                                        onChange={handleNewRestaurantChange}
                                        placeholder="Enter ZIP code"
                                        required
                                        style={{ width: '100%' }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                        style={{ width: '48%', fontWeight: 'bold', color: '#fff' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddRestaurant}
                        style={{ width: '48%', fontWeight: 'bold', color: '#fff' }}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Registration;