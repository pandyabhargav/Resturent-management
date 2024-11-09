import React, { useEffect, useState } from 'react';
    import './signup.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import logo from '../../assets/logo.png';
    import { Modal, Button, Row, Col, Form  } from 'react-bootstrap'; 

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
    const [showModal, setShowModal] = useState(false);

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleRestaurantChange = (e) => {
        const selectedValue = e.target.value;
        
        if (selectedValue === "addNewRestaurant") {
            setShowModal(true);  // Show the modal when "+ Add Restaurant" is selected
        } else {
            setFormData({
                ...formData,
                restaurant: selectedValue,
            });
        }
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
        }
        setShowModal(false);  // Close the modal
    };

    const getStates = () => {
        const countryData = countriesData.find(
          (country) => country.country === formData.country
        );
        return countryData ? countryData.states : [];
      };
    
      // Get cities based on the selected state
      const getCities = () => {
        const stateData = getStates().find(
          (state) => state.state === formData.state
        );
        return stateData ? stateData.cities : [];
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
              style={{ color: '#fff', backgroundColor: '#2D303E' }}
            >
              <option value="" disabled>
                Select a Country
              </option>
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
              <option value="" disabled>
                Select a State
              </option>
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
              <option value="" disabled>
                Select a City
              </option>
              {getCities().map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
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
        {/* Add a new option for adding a restaurant */}
        <option value="addNewRestaurant"  className="add-restaurant-option" >+ Add Restaurant</option>
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
            
                <Modal.Header >
                <Modal.Title style={{ textAlign: 'left', width: '100%' }}>
               Create New Resturent
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
<Form>
    {/* Restaurant Name */}
    <Row>
        <Col md={12}>
            <Form.Group controlId="newRestaurantName">
                <Form.Label>
                    Restaurant Name 
                    <span style={{ color: 'red', marginLeft: '5px' }}></span> {/ Red Asterisk */}
                </Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={newRestaurant.name}
                    onChange={handleNewRestaurantChange}
                    placeholder="Enter restaurant name"
                    required
                    style={{ width: '100%' }}
                />
            </Form.Group>
        </Col>
    </Row>

    {/* Restaurant Address */}
    <Row>
        <Col md={12}>
            <Form.Group controlId="restaurantAddress">
                <Form.Label>
                    Restaurant Address 
                    <span style={{ color: 'red', marginLeft: '5px' }}></span> {/ Red Asterisk */}
                </Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={newRestaurant.address}
                    onChange={handleNewRestaurantChange}
                    placeholder="Enter restaurant address"
                    required
                    style={{ width: '100%' }}
                />
            </Form.Group>
        </Col>
    </Row>

    {/* Country, State, and City */}
    <Row>
        <Col md={6}>
            <Form.Group controlId="restaurantCountry">
                <Form.Label>
                    Country
                    <span style={{ color: 'red', marginLeft: '5px' }}></span> {/ Red Asterisk */}
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
                    <span style={{ color: 'red', marginLeft: '5px' }}></span> {/ Red Asterisk */}
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

    {/* City and ZIP */}
    <Row>
        <Col md={6}>
            <Form.Group controlId="restaurantCity">
                <Form.Label>
                    City
                    <span style={{ color: 'red', marginLeft: '5px' }}></span> {/ Red Asterisk */}
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
                    <span style={{ color: 'red', marginLeft: '5px' }}></span> {/ Red Asterisk */}
                </Form.Label>
                <Form.Control
                    type="text"
                    name="zip"
                    value={newRestaurant.zip}
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
        style={{
            backgroundColor: '#333', 
            borderColor: '#444',     
            color: '#fff',          
            fontSize: '1rem',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            width: '48%',           
            transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
        }}
    >
        Cancel
    </Button>
    <Button
        variant="primary"
        onClick={handleAddRestaurant}
        style={{
            backgroundColor: '#444',
            borderColor: '#555',     
            color: '#fff',          
            fontSize: '1rem',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            width: '48%',          
            transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
        }}
    >
        Create
    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    };

    export default Registration;