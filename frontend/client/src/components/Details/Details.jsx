import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "./Details.css";
import { BASE_URL } from "../../config";

const Details = () => {
  const [counter, setCounter] = useState(1);
  const [step, setStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({
    crust: "",
    size: "",
    toppings: [],
    customizationPrice: 0, // Track customization price
  });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/api/v1/useritem/restaurantuseritem-get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched product data:", response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Error fetching product data.");
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const incrementCounter = () => setCounter((prev) => prev + 1);
  const decrementCounter = () => setCounter((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    // Ensure user has completed all customization steps
    if (step === product?.data?.customization?.length) {
      try {
        const token = localStorage.getItem("authToken");
  
        
        if (!token) {
          alert("User not authenticated");
          return;
        }
  
     
        const customizationIds = selectedOptions.toppings.map((topping) => {
          const custom = product?.data?.customization.find((c) =>
            c.list.some((item) => item.name === topping)
          );
          const item = custom?.list.find((item) => item.name === topping);
          return item?._id; 
        });
  
        // Include crust and size selections in the customization list if available
        const crustId = selectedOptions.crust
          ? product?.data?.customization
              .find((custom) => custom.list.some((item) => item.name === selectedOptions.crust))
              ?.list.find((item) => item.name === selectedOptions.crust)?._id
          : null;
  
        const sizeId = selectedOptions.size
          ? product?.data?.customization
              .find((custom) => custom.list.some((item) => item.name === selectedOptions.size))
              ?.list.find((item) => item.name === selectedOptions.size)?._id
          : null;
  
        // Combine all selected customizations
        const allCustomizationIds = [
          ...(crustId ? [crustId] : []),
          ...(sizeId ? [sizeId] : []),
          ...customizationIds,
        ];
  
        
        const payload = {
          restaurant: product?.data.restaurantid,
          items: [
            {
              item: product?.data._id,
              customizationList: allCustomizationIds,
              quantity: counter,
            },
          ],
        };
  
        console.log("Payload being sent to API:", payload);
  
        
        const response = await axios.post(
          `${BASE_URL}/api/v1/cart/restaurantcart-add`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);
        alert("Item added to cart successfully!");
        navigate("/cart"); 
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert(
          error?.response?.data?.message || "Failed to add item to cart. Please try again."
        );
      }
    } else {
      handleNextStep();
    }
  };
  
  

  const handleNextStep = () => {
    if (step < product?.data?.customization?.length) {
      setStep((prev) => prev + 1);
    }
  };

  const handleClose = () => setStep(0);

  const handleOptionSelect = (stepName, optionValue, extraRate) => {
    console.log(`Handling option select for step: ${stepName}, option: ${optionValue}`);
    if (stepName === "toppings") {
      const isSelected = selectedOptions.toppings.includes(optionValue);
      setSelectedOptions((prev) => ({
        ...prev,
        [stepName]: isSelected
          ? prev.toppings.filter((t) => t !== optionValue)
          : [...prev.toppings, optionValue],
        customizationPrice: isSelected
          ? prev.customizationPrice - extraRate
          : prev.customizationPrice + extraRate,
      }));
    } else {
      setSelectedOptions((prev) => ({
        ...prev,
        [stepName]: optionValue,
        customizationPrice: prev.customizationPrice + extraRate,
      }));
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = product?.data.price || 0;
    return counter * (basePrice + selectedOptions.customizationPrice);
  };

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
              src={product.data.image || "https://via.placeholder.com/150"}
              alt={product?.data.name || "Product Name"}
              className="img-fluid shadow-lg"
              width={209}
            />
          </Col>
        </Row>
        <Card className="text-dark" style={{ backgroundColor: "#2d303e", borderRadius: "15px" }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button variant="outline-light" size="sm" onClick={handleNextStep}>
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
                    ? product.data.ingredients.split(",").map((ingredient, index) => (
                        <li key={index} className="mb-2 text-light">
                          {ingredient.trim()}
                        </li>
                      ))
                    : <li className="mb-2 text-light">No ingredients available</li>}
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
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={step > 0} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{`Step ${step} / ${product?.data?.customization?.length}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product?.data?.customization?.map((custom, idx) => {
            if (idx + 1 === step) {
              return (
                <div key={custom._id}>
                  <h5>{custom.list[0]?.name || "Customization Option"}</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {custom.list.map((item, i) => (
                      <Button
                        key={item._id}
                        variant={selectedOptions.toppings.includes(item.name) ? "primary" : "outline-secondary"}
                        onClick={() => handleOptionSelect("toppings", item.name, item.extraRate)}
                        className="px-3 py-2"
                      >
                        {item.name} - ₹{item.extraRate}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
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
