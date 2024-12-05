import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUser, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import logo from '../../assets/logoo.png';
import stock1 from '../../assets/stock1.png';
import stock2 from '../../assets/stock2.png';
import stock3 from '../../assets/stock3.png';
import stock5 from '../../assets/stock5.png';
import stock6 from '../../assets/stock6.png';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // To manage loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize navigate function

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'User Name is required.';
    } else if (username.length < 3) {
      newErrors.username = 'User Name must be at least 3 characters long.';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be a 10-digit number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
      try {
        const response = await fetch('http://localhost:5000/api/v1/user/user-add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            phoneNumber: phoneNumber,
          }),
        });
  
        const data = await response.json();
        if (response.ok) {
          // Extract the token from the response
          const token = data.token;
  
          // Store the token in localStorage
          localStorage.setItem('authToken', token);
  
          setSuccessMessage('User added successfully!');
          console.log("Login data:", data);
  
          // Clear form fields
          setUsername('');
          setPhoneNumber('');
  
          // Navigate to the homepage
          navigate('/');
        } else {
          setErrorMessage(data.message || 'Failed to add user.');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  //  Hide success/error after  5 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: '', 
    }));
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: '', 
    }));
  };

  return (
    <section className="login-page d-flex align-items-center justify-content-center">
      <img src={stock1} alt="s1" className="decorative-image stock1" />
      <img src={stock2} alt="s2" className="decorative-image stock2" />
      <img src={stock3} alt="s3" className="decorative-image stock3" />
      <img src={stock5} alt="s5" className="decorative-image stock5" />
      <img src={stock6} alt="s6" className="decorative-image stock6" />

      <Container>
        <Row className="justify-content-center">
          <Col lg={4} md={6} sm={8} xs={10}>
            <div className="login-container p-4 rounded-4 shadow">
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" className="logo img-fluid mb-3" />
                <h1 className="logo-text fw-bold text-warning">RESTAURANTS</h1>
                <p className="tagline text-secondary">Your Tagline</p>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label className="text-white">
                    User Name<span className="text-warning">*</span>
                  </Form.Label>
                  <div className="position-relative">
                    <FaUser className="input-icon text-muted" />
                    <Form.Control
                      type="text"
                      placeholder="Marcus George"
                      value={username}
                      onChange={handleUsernameChange}
                      className={`ps-4 ${errors.username ? 'is-invalid' : ''}`}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                </Form.Group>

                <Form.Group controlId="phoneNumber" className="mb-3">
                  <Form.Label className="text-white">
                    Phone Number<span className="text-warning">*</span>
                  </Form.Label>
                  <div className="position-relative">
                    <FaPhone className="input-icon text-muted" />
                    <Form.Control
                      type="tel"
                      placeholder="91+"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className={`ps-4 ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">{errors.phoneNumber}</div>
                    )}
                  </div>
                </Form.Group>

                <div className="text-center">
                  {successMessage && (
                    <div className="alert alert-success mb-3">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="alert alert-danger mb-3">{errorMessage}</div>
                  )}
                  {loading ? (
                    <Button className="w-100 btn-warning fw-bold" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                    </Button>
                  ) : (
                    <Button type="submit" className="w-100 btn-warning fw-bold">
                      Next
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
