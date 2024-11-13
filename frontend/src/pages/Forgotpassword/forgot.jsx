import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './forgot.css';

function Forget() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (event) => {
    setEmailOrPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Replace this with your actual API call to send an OTP
    try {
      const response = await fetch('/your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrPhone }),
      });

      if (response.ok) {
        setOtpSent(true);
      } else {
        // Handle errors appropriately
        console.error('Error sending OTP:', response.status);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <section className='Forgot'>

      <Container>
        <Row className="d-flex flex-wrap justify-content-center align-items-center">
          <Col xs={12} md={6} className="d-flex flex-wrap">

            <div className="form-container">
              <h2>Forgot password</h2>
              {otpSent ? (
                <p>OTP sent to {emailOrPhone}. Please check your inbox.</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="emailOrPhone">Email or Phone:</label>
                  <input
                    type="text"
                    id="emailOrPhone"
                    value={emailOrPhone}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" >Get OTP</button>
                </form>
              )}
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
                    <h6 className="px-2 pb-2 m-0">your tagline</h6>
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
}

export default Forget;