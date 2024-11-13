import React, { useState, useEffect, useRef } from 'react';
import { Form, Row, Col, Button,Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './otp.css'; // Import your CSS file

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  // Handle input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box
      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // Handle key down event for backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle form submission (e.g., submit OTP)
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    console.log('OTP Entered:', otpCode);
    // Handle OTP submission logic here
  };

  // Focus on the first input box when the component mounts
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);
  return (
    <section className='Forgot'>
      <Container>
        <Row className="d-flex flex-wrap justify-content-center align-items-center">
          <Col xs={12} md={6} className="d-flex flex-wrap">
            <div className="form-container">
              <h2>Enter OTP</h2>
              <p>A Verification Code Has Been Sent On XXX98. Enter the code Beloe.</p>
              <Form onSubmit={handleSubmit}>
                <Row className="otp-input-row">
                  {otp.map((value, index) => (
                    <Col key={index} xs={2}>
                      <Form.Control
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputsRef.current[index] = el)}
                        maxLength={1}
                        className="otp-input"
                      />
                    </Col>
                  ))}
                </Row>
                <a href="">Resend OTP</a>
                <Button type="submit"  className="mt-3 login-btn">
                  Submit OTP
                </Button>
                
              </Form>
            </div>
            <div className="background-image">
              {/* Add your background image here */}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="d-flex flex-wrap justify-content-center col-12 align-items-center">
              <div className="d-flex flex-wrap justify-content-center p-3 align-items-center login-logo">
                <div className='d-flex'>
                   <img src="public/Group.png" alt="login-logo" />
                  <div>
                    <h4 className="px-2 pt-2 m-0">Restaurants</h4>
                    <h6 className="px-2 pb-2 m-0">Your Tagline</h6>
                  </div>
                </div>
              </div>
              <div className="d-flex text-center align-items-center login-tagline pt-3">
                <h3>
                  Aenean blandit id nisl et pretium. Sed efficitur{' '}
                  <span>lectus ipsum, ac dapibus turpis auctor</span>
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    
  );
  
};

export default Otp;