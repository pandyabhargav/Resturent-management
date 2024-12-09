import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Resetpass.css';
import axios from 'axios';

function Resetpassword() {
    const [input, setInput] = useState({ passwd: '', confirmpwd: '' });
    const [msg, setMsg] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate(); 

    const pwdconfirm = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const validation = () => {
        const messages = {};
        let isValid = true;

        if (input.passwd !== input.confirmpwd) {
            messages.passwd = "Passwords do not match!";
            isValid = false;
        } else {
            messages.confirmpwd = "Passwords match!";
        }

        setMsg(messages);
        return isValid;
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
      
        if (validation()) {
          const otp = localStorage.getItem('OTP');
          
          try {
            const response = await axios.post(
              'http://localhost:5000/api/v1/auth/password-reset-otp',
              {
                otp,
                password: input.passwd,
                confirmPassword: input.confirmpwd,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
      
            if (response.status === 200) {
              console.log('Password reset response:', response.data);
              navigate('/login'); 
            }
          } catch (error) {
            console.error('There was a problem with the request:', error);
          }
      
          
          setInput({ passwd: "", confirmpwd: "" });
          setMsg({});
        }
      };

    return (
        <section className="Reset">
            <Container>
                <Row className="d-flex flex-wrap justify-content-center align-items-center">
                    <Col xs={12} md={6} className="d-flex flex-wrap">
                        <div className="form-container">
                            <center>
                                <h2>Reset Password</h2>
                            </center>
                            <form onSubmit={handlesubmit}>
                                <div className="form-group mb-3 position-relative">
                                    Password:
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="passwd"
                                        value={input.passwd}
                                        onChange={pwdconfirm}
                                        className="form-control mb-3"
                                        placeholder="Enter The Password"
                                        required
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
                                </div>
                                <div className="form-group position-relative">
                                    Confirm Password:
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmpwd"
                                        value={input.confirmpwd}
                                        onChange={pwdconfirm}
                                        className="form-control mb-3"
                                        placeholder="Enter The Confirm Password"
                                        required
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '38px',
                                            cursor: 'pointer',
                                            color: '#6c757d',
                                        }}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                <strong className='text-danger'>
                                    <div>{msg.passwd}</div>
                                    <div>{msg.confirmpwd}</div>
                                </strong>
                                <button type="submit" value="Submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="d-flex flex-wrap justify-content-center col-12 align-items-center">
                            <div className="d-flex flex-wrap justify-content-center p-3 align-items-center login-logo">
                                <div className="d-flex">
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

export default Resetpassword;
