import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email,
        password,
      });
  
      console.log("Response:", response); 
  
      
      if (response.data.message === "restaurantowner successfully login") {
        alert('Login successful!');
        setError(null); 
  
        
        const token = response.data.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
          console.log("Token saved:", token); 
        }
  
        
        const userId = response.data.data._id;
        if (userId) {
          localStorage.setItem('userId', userId);
          console.log("User ID saved:", userId); 
        }
  
        
        navigate('/');
      } else {
        setError('Invalid email or password'); 
      }
    } catch (err) {
      console.error("Error:", err); 
      setError('An error occurred. Please try again later'); 
    }
  };
  

  return (
    <>
      <section className="login">
        <div className="login-content">
          <Container>
            <Row className="d-flex flex-wrap justify-content-center align-items-center">
              <Col xs={12} s={12} md={8} xl={6} className="d-flex flex-wrap">
                <div className="bg-col col-12 p-5 rounded-4">
                  <h2 className="pb-2">Login</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Email or Phone<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Email or Phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 position-relative">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Password<span className="text-danger">*</span>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${error ? 'border-danger' : ''}`}
                        id="exampleInputPassword1"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '38px',
                          cursor: 'pointer',
                          color: '#6c757d',
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      {error && (
                        <div className="text-danger mt-1">{error}</div>
                      )}
                    </div>
                    <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="form-check-label" htmlFor="exampleCheck1">
                          Remember Me
                        </label>
                        <Link to={"/forgotpass"}>Forgot password?</Link>
                      </div>
                    </div>
                    <button type="submit" className="btn login-btn col-12 mb-2">
                      Login
                    </button>
                    <div className="text-center">
                      <Link to={"/signup"} className="text-white pt-2">
                        Don’t have an account? <span className="text-primary">Register</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </Col>

              <Col xs={12} s={12} md={4} xl={6}>
                <div className="d-flex flex-wrap justify-content-center col-12 align-items-center">
                  <div className="d-flex flex-wrap justify-content-center p-3 align-items-center login-logo">
                    <img src="public/Group.png" alt="login-logo" />
                    <div>
                      <h4 className="px-2 pt-2 m-0">Restaurants</h4>
                      <h6 className="px-2 pb-2 m-0">your tagline</h6>
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
        </div>
      </section>
    </>
  );
}

export default Login;
