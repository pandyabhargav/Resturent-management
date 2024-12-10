import React from "react";
import "./AddItems.css"; 
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import diningImage from "../../assets/dinner.png"; 
import { NavLink } from "react-router-dom";

const AddItems = () => {
  const navigate = useNavigate();

  const handleAddMoreItems = () => {
    navigate("/add-items");
  };

  const handlePayNow = () => {
    console.log("Proceed to Payment");
  };

  return (
    <div
      className="additems-container"
      style={{
        backgroundColor: "#0A0F23",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header Section */}
      <div className="d-flex align-items-center mb-4">
      <NavLink  to={'/cart'} style={{color:'#fff'}}>
        <button
          className="btn btn-secondary me-3"
          onClick={() => navigate(-1)}
          style={{ borderRadius: "50%" }}
        >
          &#8592;
        </button>
      </NavLink>
        <h5>Add Items</h5>
      </div>

      {/* Content Section */}
      <div className="text-center">
        <img
          src={diningImage} 
          alt="Dining Illustration"
          className="img-fluid mb-4"
          style={{ maxWidth: "324px" }}
        />
        <p>
          If you want to order another item, you can order using this button.
        </p>
        <Button
          className="btn btn-warning text-white fw-bold mb-4"
          style={{ borderRadius: "10px", padding: "10px 20px" }}
          onClick={handleAddMoreItems}
        >
          Add More Items
        </Button>
      </div>

      {/* Footer Section */}
      <div
        className="d-flex justify-content-between align-items-center fixed-bottom additems-footer"
        style={{
          backgroundColor: "#1A1F37",
          padding: "15px 20px",
          borderTop: "1px solid white",
        }}
      >
        <div>
          <p className="mb-0">5 Items Added</p>
          <h6 className="mb-0">₹ 2,050</h6>
        </div>
        <Button
          className="btn btn-warning text-white fw-bold"
          style={{ borderRadius: "10px", padding: "10px 20px" }}
          onClick={handlePayNow}
        >
          Pay Now &rarr;
        </Button>
      </div>
    </div>
  );
};

export default AddItems;
