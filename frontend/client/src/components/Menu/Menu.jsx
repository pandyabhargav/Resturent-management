import React, { useState, useEffect } from "react";
import "./menu.css";
import { Container, Row, Col, Button, Tabs, Tab, Card } from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo-main.png";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("veg");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch categories and items on component mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/category/restaurantcategorys-get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log("category",data);
        setCategories(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/item/restaurantitems-get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        console.log("items",data);
        
        setItems(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
    fetchItems();
  }, [navigate]);

  const filteredMenu = items.filter(
    (item) =>
      (activeTab === "veg" ? item.itemType === "Veg" : item.itemType === "Non-Veg") &&
      (selectedCategory === "All" || item.category._id === selectedCategory)
  );

  const handleOrderNow = () => {
    navigate("/details");
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
    <Container fluid className="bg text-light pt-0" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Row className="mb-4 py-3 " style={{ backgroundColor: "rgba(31, 29, 43, 1)" }}>
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
            <Tab eventKey="veg" title="Veg">
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
                      onClick={() => setSelectedCategory(category._id)}
                    />
                    <p className="text-light">{category.name}</p>
                  </Col>
                ))}
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      {/* Trending Menu */}
      <Row>
        {filteredMenu.map((item) => (
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
                    onClick={handleOrderNow}
                    className="text-white"
                    variant="warning"
                  >
                    Order Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Menu;
