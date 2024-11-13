import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Resetpass.css'

class Resetpassword extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            msg: {}
        };
        this.pwdconfirm = this.pwdconfirm.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }

    pwdconfirm(e) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            input: {
                ...prevState.input,
                [name]: value
            }
        }));
    }

    validation() {
        const msg = {};
        let isValid = true;

        if (this.state.input["passwd"] !== this.state.input["confirmpwd"]) {
            msg["passwd"] = "Passwords do not match!";
            isValid = false;
        } else {
            msg["confirmpwd"] = "Passwords match!";
        }

        this.setState({ msg });
        return isValid;
    }

    handlesubmit(e) {
        e.preventDefault();
        if (this.validation()) {
            // Clear the input fields
            this.setState({
                input: { passwd: "", confirmpwd: "" },
                msg: {}
            });
            // You can add further submission logic here (e.g., API call)
        }
    }

    render() {
        return (
            <section className='Reset'>
                <Container>
                    <Row className="d-flex flex-wrap justify-content-center align-items-center">
                        <Col xs={12} md={6} className="d-flex flex-wrap">
                            <div className='form-container'>
                                <center>
                                    <h2>Reset Password</h2>
                                </center>
                                <form onSubmit={this.handlesubmit}>
                                    <div className="form-group mb-3">
                                        Password:
                                        <input
                                            type="password"
                                            name='passwd'
                                            value={this.state.input.passwd || ''}
                                            onChange={this.pwdconfirm}
                                            className="form-control mb-3"
                                            placeholder='Enter The Password'
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        Confirm Password:
                                        <input  
                                            type="password"
                                            name='confirmpwd'
                                            value={this.state.input.confirmpwd || ''}
                                            onChange={this.pwdconfirm}
                                            className="form-control mb-3"
                                            placeholder="Enter The Confirm Password"
                                            required
                                        />
                                    </div>
                                    <strong>
                                        <div >{this.state.msg.passwd}</div>
                                        <div >{this.state.msg.confirmpwd}</div>
                                    </strong>
                                    <button type="submit"  value="Submit">Submit</button> 
                                </form>
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
}

export default Resetpassword;