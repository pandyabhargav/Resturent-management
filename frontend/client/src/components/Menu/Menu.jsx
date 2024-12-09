import React, { useState, useEffect } from "react";
import "./menu.css";
import { Container, Row, Col, Button, Tabs, Tab, Card } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-main.png";
import { FaLeaf, FaDrumstickBite } from 'react-icons/fa';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BASE_URL } from "../../config";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("veg"); // Default to Veg tab
  const [selectedCategory, setSelectedCategory] = useState("All"); // All categories by default
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch categories and items on component mount
  useEffect(() => {


    const fetchCategoriesAndItems = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/usercategory/restaurantusercategorys-get`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories and items");
        }
        const data = await response.json();
        console.log("category and items", data);
        setCategories(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategoriesAndItems();
  }, [navigate]);

  // Filtered menu items based on category and item type (veg/non-veg)
  const filteredMenu = categories
    .map((category) => {
      return {
        ...category,
        items: category.items.filter(
          (item) =>
            (activeTab === "veg"
              ? item.itemType === "Veg"
              : item.itemType === "Nonveg") &&
            (selectedCategory === "All" || item.category === selectedCategory)
        ),
      };
    })
    .filter((category) => category.items.length > 0); // Only categories with items to display

    const handleOrderNow = (orderId) => {
      console.log("Order ID sent:", orderId); // Log the ID to the console
      navigate(`/details/${orderId}`); // Navigate to the Details page with orderId in the URL
    };
    

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h3 className="text-danger">Error: {error}</h3>
        <p>Please try logging in again.</p>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="bg text-light pt-0"
      style={{ minHeight: "100vh" }}
    >
      {/* Header */}
      <Row
        className="mb-4 py-3"
        style={{ backgroundColor: "rgba(31, 29, 43, 1)" }}
      >
        <Col xs={8}>
          <div className="logo">
            <img src={logo} alt="logo" width={100} />
          </div>
        </Col>
        <Col xs={4} className="text-end d-flex justify-content-end">
          <div className="icon-circle me-3">
            <NavLink to={"/search"} style={{ color: "#fff" }}>
              <FaSearch size={20} />
            </NavLink>
          </div>
          <div className="icon-circle">
            <NavLink to={"/cart"} style={{ color: "#fff" }}>
              <FaShoppingCart size={20} />
            </NavLink>
          </div>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Row className="mb-4">
        <Col>
          <Tabs
            id="veg-nonveg-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="custom-tabs"
            style={{ borderBottom: "none" }}
          >
            <Tab
              eventKey="veg"
              title={
                <div style={{ color: "#4CAF50" }}>
                  {" "}
                  {/* Green color for Veg */}
                  <FaLeaf
                    size={20}
                    style={{ color: "#4CAF50", marginRight: "8px" }}
                  />{" "}
                  Veg
                </div>
              }
            >
              <Row className="mb-4">
                <h4 className="mb-3 mt-4">Categories</h4>
                {categories.map((category, index) => (
                  <Col
                    xs={4}
                    md={2}
                    key={index}
                    className="text-center mb-3 mt-2"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="tabimg mb-2"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedCategory === category._id
                            ? "#FFA500"
                            : "#2D303E", // Change color based on active selection
                      }}
                      onClick={() => handleCategoryClick(category._id)}
                    />
                    <p className="text-light">{category.name}</p>
                  </Col>
                ))}
              </Row>
            </Tab>
            <Tab eventKey="nonveg" title={
          <div style={{ color: "#FF5722" }}> {/* Orange color for Non-Veg */}
            <FaDrumstickBite size={20} style={{ color: "#FF5722", marginRight: "8px" }} /> Non-Veg
          </div>
        }
>
              <Row className="mb-4">
                <h4 className="mb-3 mt-4">Categories</h4>
                {categories.map((category, index) => (
                  <Col
                    xs={4}
                    md={2}
                    key={index}
                    className="text-center mb-3 mt-2"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="tabimg mb-2"
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedCategory === category._id
                            ? "#FFA500"
                            : "#2D303E", // Change color based on active selection
                      }}
                      onClick={() => handleCategoryClick(category._id)}
                    />
                    <p className="text-light">{category.name}</p>
                  </Col>
                ))}
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Display Items for each category */}
      <Row>
        {filteredMenu.map((category) =>
          category.items.map((item) => (
            <Col xs={12} key={item._id} className="mb-3">
              <Card
                className="text-light"
                style={{ backgroundColor: "rgba(37, 40, 54, 1)" }}
              >
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="tabimg me-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.ingredients}</Card.Text>
                    <h5 style={{ color: "rgba(57, 151, 61, 1)" }}>
                      ₹{item.price}
                    </h5>
                  </div>
                  <div className="ms-auto">
                  <Button
                      onClick={() => handleOrderNow(item._id)} // Pass the item ID
                      className="text-white"
                      variant="warning"
                    >
                      Order Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
        <NavLink  to={'/categories'} style={{color:'#fff'}}> 
      <Button
        variant="warning"
        className="position-fixed bottom-0 end-0 m-4 rounded-circle"
        style={{ width: "71px", height: "71px" }}
      >
       <MdOutlineRestaurantMenu />
      </Button>
      </NavLink>
      </Row>
    </Container>
  );
};

export default Menu;
