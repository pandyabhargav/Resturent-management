import React, { useState } from 'react';
import './Cart.css';
import { Button, Modal } from 'react-bootstrap'; 
import online from '../../assets/online.png';
import cash from '../../assets/cash.png';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Beef Burger", price: 500, quantity: 2 },
    { id: 2, name: "Chicken Burger", price: 600, quantity: 1 },
  ]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Navigation
  const navigate = useNavigate();

  // Handlers
  const handlePaymentModal = () => setShowPaymentModal(!showPaymentModal);

  const incrementQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleAddItems = () => {
    navigate('/add-items'); 
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(false);

    if (method === 'Online') {
      navigate('/payment', { state: { paymentMethod: method } });
    } else if (method === 'Cash') {
      setShowSuccessModal(true); 
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div
        className="container-fluid p-4"
        style={{
          backgroundColor: "#0A0F23",
          color: "white",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5>Cart</h5>
          <NavLink to={'/details'} style={{color:'#fff'}}>
          <button className="btn btn-secondary" onClick={() =>   console.log("Go back")}>
            &#8592; Back
          </button>
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Cart Section */}
          <div className="col-lg-8 mb-4">
            <div
              className="p-4"
              style={{ backgroundColor: "#1A1F37", borderRadius: "10px" }}
            >
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center p-3 mb-3"
                  style={{ backgroundColor: "#2A2F47", borderRadius: "10px" }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/80"
                      alt={item.name}
                      className="me-3 rounded"
                    />
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <p className="mb-0">₹ {item.price}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {/* Counter */}
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => decrementQuantity(item.id)}
                      style={{ color: "#0A0F23", borderRadius: "50%" }}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => incrementQuantity(item.id)}
                      style={{ color: "#0A0F23", borderRadius: "50%" }}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => removeItem(item.id)}
                    >
                      &#128465;
                    </button>
                  </div>
                </div>
              ))}

           
              <div className="mb-4">
                <h6>Add Cooking Request (Optional)</h6>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter your request here"
                ></textarea>
              </div>

              <button
                className="btn btn-success w-100"
                onClick={handleAddItems}
              >
                Add Items
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="p-4"
              style={{ backgroundColor: "#1A1F37", borderRadius: "10px" }}
            >
              <h5>Price Details</h5>
              <div className="d-flex justify-content-between">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total Price</span>
                <span>₹ {calculateTotal()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Taxes (CGST + SGST)</span>
                <span>₹ {(calculateTotal() * 0.05).toFixed(2)}</span>
              </div>
              <hr style={{ backgroundColor: "white" }} />
              <div className="d-flex justify-content-between">
                <strong>Payable Amount</strong>
                <strong>₹ {(calculateTotal() * 1.05).toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-warning w-100 mt-4"
                onClick={handlePaymentModal}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal show={showPaymentModal} onHide={handlePaymentModal} centered>
          <Modal.Body className="payment-modal-body">
            <h5>Select Payment</h5>
            <div className="payment-options">
              <button
                className="payment-option"
                onClick={() => handlePaymentSelection('Online')}
              >
                <img src={online} alt="Online" />
                <p>Online</p>
              </button>
              <button
                className="payment-option"
                onClick={() => handlePaymentSelection('Cash')}
              >
                <img src={cash} alt="Cash" />
                <p>Cash</p>
              </button>
            </div>
          </Modal.Body>
        </Modal>

        {/* Success Modal */}
        <Modal
        show={showSuccessModal}
        onHide={handleSuccessClose}
        centered
      >
        <Modal.Body
          style={{
            textAlign: 'center',
            backgroundColor: '#0A0F23',
            color: 'white',
            borderRadius: '20px',
            padding: '30px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            {/* Success Icon */}
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#28A745', // Green background
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 20px auto',
              }}
            >
              <span
                style={{
                  fontSize: '50px',
                  color: 'white',
                }}
              >
                ✔
              </span>
            </div>
            <h4 style={{ marginBottom: '10px' }}>Payment Successfully</h4>
            <p style={{ color: '#A9A9A9', marginBottom: '20px' }}>Payment Successful!</p>
            <Button
              onClick={handleSuccessClose}
              style={{
                backgroundColor: '#FFC107', 
                color: '#0A0F23',
                border: 'none',
                padding: '10px 30px',
                fontWeight: 'bold',
                borderRadius: '10px',
              }}
            >
              Done
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
};

export default Cart;
