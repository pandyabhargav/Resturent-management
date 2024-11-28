import React from 'react';
import "./Payment.css";
import { NavLink } from 'react-router-dom';

const PaymentPage = () => {
  
  return (
    <>
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0f2a", // Exact dark background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "#1d213b", // Card background
          borderRadius: "20px",
          color: "#ffffff",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
          padding: "20px",
        }}
      >
        {/* Back Button */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <NavLink to={'/cart'} style={{color:'#fff'}}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => console.log("Back button clicked")} 
          >
            <span
              style={{
                fontSize: "24px",
                marginRight: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              &#8592; 
            </span>
            Back
          </button>
        </NavLink>
        </div>

        {/* Header */}
        <h5
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          Payment Method
        </h5>

        <div style={{ margin: "20px 0" }}>
          {/* MasterCard Option */}
          <div
            className="form-check"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="radio"
              className="form-check-input"
              name="paymentMethod"
              id="masterCard"
              defaultChecked
              style={{ cursor: "pointer" }}
            />
            <label
              htmlFor="masterCard"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="https://img.icons8.com/color/48/000000/mastercard.png"
                alt="Mastercard"
                style={{ marginRight: "10px", height: "24px", width: "24px" }}
              />
              Master Card
            </label>
          </div>

          {/* Form Inputs */}
          <form>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="cardholderName"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#c1c5d9",
                  fontSize: "14px",
                }}
              >
                Card Holder Name<span style={{ color: "#e85d04" }}>*</span>
              </label>
              <input
                type="text"
                id="cardholderName"
                placeholder="Marcus George"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#2a2f49",
                  border: "1px solid #3b415c",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="cardNumber"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "#c1c5d9",
                  fontSize: "14px",
                }}
              >
                Card Number<span style={{ color: "#e85d04" }}>*</span>
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 4567 8745 5212"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#2a2f49",
                  border: "1px solid #3b415c",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="expiryDate"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#c1c5d9",
                    fontSize: "14px",
                  }}
                >
                  Expiry Date<span style={{ color: "#e85d04" }}>*</span>
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#2a2f49",
                    border: "1px solid #3b415c",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="cvv"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#c1c5d9",
                    fontSize: "14px",
                  }}
                >
                  CVV<span style={{ color: "#e85d04" }}>*</span>
                </label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="XXX"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#2a2f49",
                    border: "1px solid #3b415c",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
              </div>
            </div>
          </form>

          {/* Visa Card Option */}
          <div
            className="form-check"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <input
              type="radio"
              className="form-check-input"
              name="paymentMethod"
              id="visaCard"
              style={{ cursor: "pointer" }}
            />
            <label
              htmlFor="visaCard"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="Visa"
                style={{ marginRight: "10px", height: "24px", width: "24px" }}
              />
              Visa Card
            </label>
          </div>

          {/* Payable Amount */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
              marginBottom: "15px",
            }}
          >
            <p>Payable Amount</p>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>₹ 2,050</p>
          </div>

          {/* Pay Now Button */}
          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#fda34c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default PaymentPage;
