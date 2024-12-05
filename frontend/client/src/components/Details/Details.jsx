import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "./Details.css";

const Details = () => {
  const [counter, setCounter] = useState(1); // Quantity counter (starts from 1)
  const [step, setStep] = useState(0); // Step for customization
  const [selectedOptions, setSelectedOptions] = useState({
    crust: "",
    size: "",
    toppings: [],
  });
  const [product, setProduct] = useState(null); // Store fetched product data
  const [loading, setLoading] = useState(true); // Loading state for product fetch
  const [error, setError] = useState(""); // Error state for fetching product

  const navigate = useNavigate();
  const { id } = useParams(); // Extract the `id` from the URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        const response = await axios.get(`http://localhost:5000/api/v1/useritem/restaurantuseritem-get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        });
        console.log("Fetched product data:", response.data);
        setProduct(response.data); // Set fetched data to state
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError("Error fetching product data.");
        setLoading(false); // Stop loading in case of error
        console.error("Error fetching product data:", error);
      }
    };

    if (id) {
      fetchProduct(); // Fetch data only if `id` is available
    }
  }, [id]);

  const incrementCounter = () => setCounter((prev) => prev + 1);
  const decrementCounter = () => setCounter((prev) => (prev > 1 ? prev - 1 : 1)); // Minimum 1

  const handleAddToCart = () => {
    if (step === 3) {
      navigate("/cart");
    } else {
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleClose = () => setStep(0);

  const handleOptionSelect = (stepName, optionValue) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [stepName]: optionValue,
    }));
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    const basePrice = product?.data.price || 0; // Fetched base price
    return counter * basePrice;
  };

  // Show loading or error if applicable
  if (loading) {
    return (
      <Container className="text-center py-5">
        <h4>Loading product details...</h4>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <h4>{error}</h4>
      </Container>
    );
  }

  return (
    <>
      <Container fluid className="details-container text-light py-4" style={{ backgroundColor: "#1f1d2b" }}>
        <Row className="justify-content-center mb-4">
          <Col xs={10} md={6} className="text-center">
            <img
              src={product.data.image || "https://via.placeholder.com/150"} // Use fetched image URL or fallback
              alt={product?.data.name || "Product Name"} // Fallback to a default name
              className="img-fluid shadow-lg"
              width={209}
            />
          </Col>
        </Row>
        <Card className="text-dark" style={{ backgroundColor: "#2d303e", borderRadius: "15px" }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button variant="outline-light" size="sm" onClick={handleAddToCart}>
                Customization
              </Button>
              <span
                className={`badge ${product?.data.itemType === "Veg" ? "bg-success" : "bg-danger"}`}
              >
                {product?.data.itemType || "Veg"}
              </span>
            </div>

            <div className="border-bottom">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 text-light">{product?.data.name || "Product Name"}</h5>
                <span style={{ fontSize: "20px", color: "rgb(202, 146, 61)" }}>
                  ₹{product?.data.price || 0}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p className="text-light mb-0">Quantity</p>
                <div className="d-flex align-items-center counter">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="counter-btn"
                    style={{ backgroundColor: "rgb(202, 146, 61)", color: "#fff" }}
                    onClick={decrementCounter}
                  >
                    <FaMinus />
                  </Button>
                  <span className="mx-3 text-light counter-value">{counter}</span>
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="counter-btn"
                    style={{ backgroundColor: "rgb(202, 146, 61)", color: "#fff" }}
                    onClick={incrementCounter}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </div>
              <div className="col-12 mx-0 text-white">
                <h5 className="mb-2 text-light">Ingredients</h5>
                <ol className="mx-0 ps-3">
                  {product?.data.ingredients
                    ? product.data.ingredients.split(',').map((ingredient, index) => (
                      <li key={index} className="mb-2 text-light">
                        {ingredient.trim()}
                      </li>
                    ))
                    : <li className="mb-2 text-light">No ingredients available</li>
                  }
                </ol>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <h4 className="text-light mb-0">Total Price:</h4>
                <h4 className="text-light">₹{calculateTotalPrice()}</h4>
              </div>
            </div>
            <Button
              className="w-100 mt-3 text-dark add-to-cart-btn"
              style={{ borderRadius: "10px", backgroundColor: "rgb(202, 146, 61)" }}
            >
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={step > 0} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{`Step ${step} / 3`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <h5>Select Crust</h5>
              <div className="d-flex flex-wrap gap-2">
                {["Wheat Crust", "Cheese Burst", "Pan Pizza", "Hand Tossed"].map((crust, idx) => (
                  <Button
                    key={idx}
                    variant={selectedOptions.crust === crust ? "primary" : "outline-secondary"}
                    onClick={() => handleOptionSelect("crust", crust)}
                    className="px-3 py-2"
                  >
                    {crust}
                  </Button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h5>Select Size</h5>
              <div className="d-flex flex-wrap gap-2">
                {["Medium - ₹200", "Large - ₹700", "Regular - ₹300"].map((size, idx) => (
                  <Button
                    key={idx}
                    variant={selectedOptions.size === size ? "primary" : "outline-secondary"}
                    onClick={() => handleOptionSelect("size", size)}
                    className="px-3 py-2"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h5>Select Toppings</h5>
              <div className="d-flex flex-wrap gap-2">
                {["Jalapeno", "Onion", "Black Olive"].map((topping, idx) => (
                  <Button
                    key={idx}
                    variant={selectedOptions.toppings.includes(topping) ? "primary" : "outline-secondary"}
                    onClick={() => handleOptionSelect("toppings", topping)}
                    className="px-3 py-2"
                  >
                    {topping}
                  </Button>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNextStep}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Details;
