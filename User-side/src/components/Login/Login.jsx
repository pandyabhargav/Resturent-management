import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaUser, FaPhone } from 'react-icons/fa';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Welcome ${username}!`);
    }
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
                {/* User Name Field */}
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
                      onChange={(e) => setUsername(e.target.value)}
                      className={`ps-4 ${errors.username ? 'is-invalid' : ''}`}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                </Form.Group>

           
                <Form.Group controlId="phoneNumber" className="mb-4">
                  <Form.Label className="text-white">
                    Phone Number<span className="text-warning">*</span>
                  </Form.Label>
                  <div className="position-relative">
                    <FaPhone className="input-icon text-muted" />
                    <Form.Control
                      type="tel"
                      placeholder="91+"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`ps-4 ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">{errors.phoneNumber}</div>
                    )}
                  </div>
                </Form.Group>

               
                <Button type="submit" className="w-100 btn-warning fw-bold">
                  Next
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
