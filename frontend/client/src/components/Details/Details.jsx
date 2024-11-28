import React, { useState } from "react";
import "./Details.css";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router";

const Details = () => {
  const [counter, setCounter] = useState(2); 
  const [step, setStep] = useState(0); 
  const [selectedOptions, setSelectedOptions] = useState({
    crust: "",
    size: "",
    toppings: [],
  }); 

  const navigate = useNavigate(); 
  const incrementCounter = () => setCounter((prev) => prev + 1);
  const decrementCounter = () => setCounter((prev) => (prev > 0 ? prev - 1 : 0));

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

  return (
    <>
      <Container fluid className="details-container text-light py-4" style={{ backgroundColor: "#1f1d2b" }}>
        <Row className="align-items-center mb-4">
          <Col xs={2} md={1} className="text-start">
            <Button variant="link" className="text-light p-0">
              <i className="bi bi-arrow-left" style={{ fontSize: "24px" }}></i>
            </Button>
          </Col>
          <Col xs={8} md={10} className="text-center">
            <h5 className="mb-0">Item Details</h5>
          </Col>
          <Col xs={2} md={1} className="text-end">
            <i className="bi bi-three-dots-vertical text-light" style={{ fontSize: "20px" }}></i>
          </Col>
        </Row>
        <Row className="justify-content-center mb-4">
          <Col xs={10} md={6} className="text-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QYSqGb1ASbnbXKdlzTDMDbwviGzxD3H6QADIR80588J3-aKlHblv2G0ODhgKJbasyDs3rWsJ-nUJ1cB9eL5gOXIyHdPQC4fwl2GZe55bd~aHtvyTa63n57~jJ0PVC5bqn3ClheFRQzi6VdoJTyUcM3~m2amhDVA5oVMNj-DvTZ99QIXtrdXFSIPM~bxSjnRowjv96bnoRn~wUyY04oAgwBKtQy~YINjbn9yWUgGaoUMpcNTI3REB5zefYl-w9LYIk0741aCEIB0HBn4RWCPT1W9lOQOn9HpHNUTeS6jwj~XTjCxAlG-VgMaTo-JbZkpAfGZf6qBSo-BgfUIyTx8hDw__"
              alt="Maharaja Burger"
              className="img-fluid rounded-circle shadow-lg"
              width={209}
            />
          </Col>
        </Row>
        <Card className="text-dark" style={{ backgroundColor: "#2d303e", borderRadius: "15px" }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button variant="outline-light" size="sm">
                Customization
              </Button>
              <span className="badge bg-success">Veg</span>
            </div>

            <div className="border-bottom">
              <div className="d-flex justify-content-between align-items-center mb-3 ">
                <h5 className="mb-0 text-light">Maharaja Burger</h5>
                <span style={{ fontSize: "20px", color: "rgb(202, 146, 61)" }}>₹500</span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <p className="text-light mb-0">Details</p>
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
            </div>
            <p style={{ color: "#bbb" }}>
              Ginger Garlic Noodle Soup With Bok Choy is a nutritious, comforting, and flu-fighting twenty-minute recipe
              made with vegetarian broth, noodles, mushrooms, and baby bok choy.
            </p>
            <p className="mb-2 text-light">Ingredients:</p>
            <ol className="ps-3" style={{ color: "#bbb" }}>
              <li>Tbsp olive oil</li>
              <li>Shallots (diced)</li>
              <li>Bunch green onion (chopped, green & white divided)</li>
              <li>Cloves garlic (minced)</li>
            </ol>
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
                    onClick={() =>
                      handleOptionSelect(
                        "toppings",
                        selectedOptions.toppings.includes(topping)
                          ? selectedOptions.toppings.filter((item) => item !== topping)
                          : [...selectedOptions.toppings, topping]
                      )
                    }
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
        Cancel
      </Button>
      {step < 3 && (
        <Button variant="primary" onClick={handleNextStep}>
          Continue
        </Button>
      )}
      {step === 3 && (
        <Button variant="success" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      )}
    </Modal.Footer>
      </Modal>
    </>
  );
};

export default Details;
