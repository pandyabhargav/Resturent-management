import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  Row,
  Modal,
  Button,
  Form,
  Col,
  Container,
} from "react-bootstrap";
import { FaSquarePlus } from "react-icons/fa6";
import "./Managemenu.css";
import { FaTrashAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultimg from "../../assets/1732641275136.png";
import { BASE_URL } from "../../config";

const Managemenu = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Add categories state
  const [items, setItems] = useState([]); // New state to store items
  const [showOptions, setShowOptions] = useState({});
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", image: null });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: null });
  const [showAddBurgerPopup, setShowAddBurgerPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState("allCategories"); // Default category is "All Categories"

  const [burgerData, setBurgerData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoriesAndItems = async () => {
    setLoading(true);
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("JWT token is missing");
      setLoading(false);
      return;
    }

    try {
      // Fetch categories
      const categoryResponse = await axios.get(
        `${BASE_URL}/api/v1/category/restaurantcategorys-get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (categoryResponse.data.success) {
        setCategories(categoryResponse.data.data || []);
      } else {
        setError("Failed to fetch categories");
      }

      // Fetch items
      const itemResponse = await axios.get(
        `${BASE_URL}/api/v1/item/restaurantitems-get`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (itemResponse.data.success) {
        setItems(itemResponse.data.data || []);
      } else {
        setError("Failed to fetch items");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error fetching categories and items"
      );
    } finally {
      setLoading(false);
    }
  };

  // Use effect to call the function when the component mounts
  useEffect(() => {
    fetchCategoriesAndItems();
  }, []); // Run once when the component mounts

  const handleDeleteClick = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };

  const handleAddCategory = async () => {
    const imageFormData = new FormData();
    imageFormData.append("image", newCategory.image);

    const token = localStorage.getItem("jwtToken");

    try {
      const imageResponse = await axios.post(
        `${BASE_URL}/api/v1/upload/img-upload`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (imageResponse.data.success === true) {
        const imageUrl = imageResponse.data.imagePath;

        const categoryData = {
          name: newCategory.name,
          image: imageUrl,
        };

        const categoryResponse = await axios.post(
          `${BASE_URL}/api/v1/category/restaurantcategory-add`,
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Category added successfully:", categoryResponse.data);
        alert("Category added successfully!");
        setNewCategory({ name: "", image: null });
        setShowAddCategoryPopup(false);
        fetchCategoriesAndItems();
      } else {
        alert("Error uploading image. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error adding category:",
        error.response?.data || error.message
      );
      alert("Error adding category. Please try again.");
    }
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    if (!deleteItemId) {
      console.error("No item selected for deletion.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken"); // Assuming token is stored in localStorage
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/item/restaurantitem-delete/${deleteItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Item deleted successfully.");
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== deleteItemId)
        );
      } else {
        const errorData = await response.json();
        console.error("Error deleting item:", errorData);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setShowDeleteModal(false);
      setDeleteItemId(null);
    }
  };

  const handleClose = () => {
    setShowModal(false); // Close modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/v1/upload/img-upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Image uploaded successfully:", result);
        setFormData((prevData) => ({
          ...prevData,
          image: result.imageUrl, // Assume the API returns the uploaded image's URL in `imageUrl`
        }));
      } else {
        console.error("Error uploading image:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setNewCategory({ ...newCategory, image: acceptedFiles[0] });
    },
  });

  const handleDescriptionClick = (index) => {
    setExpandedDescription(expandedDescription === index ? null : index);
  };

  const handleSave = async () => {
    console.log("Form Data:", formData); // Ensure formData contains all expected fields

    const updatedItem = {
      name: formData.title,
      price: formData.rate,
      ingredients: formData.ingredients,
      discount: formData.discount,
      availability:
        formData.availability === "Available" ? "Available" : "Unavailable",
      image: formData.image, // Include the uploaded image URL
    };

    console.log("Updated Item:", updatedItem);

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/item/restaurantitem-update/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedItem),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Item updated successfully:", result);
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === formData.id ? { ...item, ...updatedItem } : item
          )
        );
      } else {
        console.error("Error response:", result);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleEditClick = async (itemId) => {
    console.log("Fetching item data for ID:", itemId); // Log itemId
    const url = `${BASE_URL}/api/v1/item/restaurantitem-get/${itemId}`;
    console.log("Fetching from URL:", url); // Log URL

    // Retrieve the token from localStorage
    const token = localStorage.getItem("jwtToken"); // Assuming the token is stored as 'token' in localStorage

    try {
      const response = await fetch(url, {
        method: "GET", // The default method is GET, so it's optional
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
      });

      const data = await response.json();
      console.log("API Response:", data); // Log full API response

      if (response.ok) {
        console.log("API returned successful response.");

        // Log the image before setting form data
        console.log("Image URL:", data.data.image); // Log the image URL

        // Populate the form data with the API response
        setFormData({
          id: data.data._id,
          title: data.data.name, // Set item name
          image: data.data.image, // Set image
          ingredients: data.data.ingredients, // Set ingredients
          rate: data.data.price, // Set price as rate
          discount: data.data.discount || 0, // Set discount (default to 0 if not present)
          availability: data.data.availability, // Set availability
        });
        setShowModal(true); // Show the modal after setting form data
      } else {
        console.error(
          "Failed to fetch item data:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching item data:", error.message || error);
    }
  };

  const handleButtonClick = (category) => {
    // Navigate to the next page with state
    navigate("/additems", { state: { category } });
  };

  const filterItemsByCategory = (categoryId) => {
    if (categoryId === "allCategories") {
      return items; // Return all items for "All Categories"
    }

    // Ensure that you're using the correct property name for category ID
    return items.filter(
      (item) => item.category && item.category._id === categoryId
    );
  };

  return (
    <div className="menu-wrapper mb-5">
      <div className="tab-header">
        <h2 className="tab-title">Categories ({categories.length})</h2>
        <button
          className="add-category-btn col-2"
          onClick={() => setShowAddCategoryPopup(true)}
        >
          <span
            style={{ fontSize: "24px", lineHeight: "1", marginRight: "10px" }}
          >
            <FaSquarePlus />
          </span>
          Add Categories
        </button>
      </div>
      <br />
      <Tabs
        activeKey={activeCategory}
        onSelect={(category) => setActiveCategory(category)} // Update activeCategory when a tab is clicked
        className="mb-3 m-3"
      >
        <Tab
          eventKey="allCategories"
          title={
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="tab-products"
            >
              <img
                src={categories[0]?.image}
                alt="All Categories"
                style={{
                  width: "70px",
                  height: "50px",
                  marginRight: "8px",
                  backgroundColor: "rgba(31, 29, 43, 1)",
                }}
              />
              All
            </div>
          }
        >
          <div className="tab-header">
            <h2 className="tab-title">All Categories</h2>
            <button
              className="add-category-btn col-2 d-none"
              onClick={() => handleButtonClick("allCategories")}
            >
              <span
                style={{
                  fontSize: "24px",
                  lineHeight: "1",
                  marginRight: "10px",
                }}
              >
                <FaSquarePlus />
              </span>
              Add Item to All Categories
            </button>
          </div>

          <Container className="m-0" fluid>
            <Row className="menu-grid col-12 d-flex flex-wrap row-cols-1 row-cols-sm-2 row-cols-md-3">
              {(filterItemsByCategory("allCategories") || []).map((item) => (
                <div
                  className="card-item col-3"
                  key={item._id}
                  style={{
                    width: "18rem",
                    margin: "10px",
                    position: "relative",
                  }}
                >
                  <Card
                    className="h-100 col-12"
                    style={{ border: "none", overflow: "hidden" }}
                  >
                    <div className="card-img-wrapper">
                      <Card.Img variant="top" src={item.image} />
                      <div
                        className="three-dots"
                        onClick={() =>
                          setShowOptions(
                            showOptions === item._id ? null : item._id
                          )
                        }
                      >
                        <span>...</span>
                      </div>
                      {showOptions === item._id && (
                        <div
                          className="card-actions"
                          style={{ backgroundColor: "rgba(37, 40, 54, 1)" }}
                        >
                          <button
                            className="edit-btn"
                            onClick={() => handleEditClick(item._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteClick(item._id)}
                            style={{
                              backgroundColor: "#d9534f",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text style={{ color: "#bbb" }}>
                        {expandedDescription === item._id
                          ? item.ingredients
                          : `${
                              item.ingredients
                                ? item.ingredients.slice(0, 50)
                                : ""
                            }...`}
                        <span
                          className="expand-text text-white"
                          onClick={() =>
                            setExpandedDescription(
                              expandedDescription === item._id ? null : item._id
                            )
                          }
                        >
                          {expandedDescription === item._id
                            ? " Show Less"
                            : " Read More"}
                        </span>
                      </Card.Text>
                      <Card.Text className="price">₹{item.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Row>
          </Container>
        </Tab>

        {/* Loop through other categories */}
        {categories.map((category) => (
          <Tab
            className="mt-5"
            eventKey={category._id}
            key={category._id}
            title={
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="tab-products"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: "70px",
                    height: "50px",
                    marginRight: "8px",
                    backgroundColor: "rgba(31, 29, 43, 1)",
                  }}
                />
                {category.name}
              </div>
            }
          >
            <div className="tab-header">
              <h2 className="tab-title">{category.name}</h2>
              <button
                className="add-category-btn col-2"
                onClick={() => handleButtonClick(category._id)}
              >
                <span
                  style={{
                    fontSize: "24px",
                    lineHeight: "1",
                    marginRight: "10px",
                  }}
                >
                  <FaSquarePlus />
                </span>
                Add {category.name}
              </button>
            </div>

            {/* Show filtered items for the selected category */}
            <Container className="m-0" fluid>
              <Row className="menu-grid col-12 d-flex flex-wrap row-cols-1 row-cols-sm-2 row-cols-md-3">
                {(filterItemsByCategory(category._id) || []).map((item) => (
                  <div
                    className="card-item col-3"
                    key={item._id}
                    style={{
                      width: "18rem",
                      margin: "10px",
                      position: "relative",
                    }}
                  >
                    <Card
                      className="h-100 col-12"
                      style={{ border: "none", overflow: "hidden" }}
                    >
                      <div className="card-img-wrapper">
                        <Card.Img variant="top" src={item.image} />
                        <div
                          className="three-dots"
                          onClick={() =>
                            setShowOptions(
                              showOptions === item._id ? null : item._id
                            )
                          }
                        >
                          <span>...</span>
                        </div>
                        {showOptions === item._id && (
                          <div
                            className="card-actions"
                            style={{ backgroundColor: "rgba(37, 40, 54, 1)" }}
                          >
                            <button
                              className="edit-btn"
                              onClick={() => handleEditClick(item._id)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteClick(item._id)}
                              style={{
                                backgroundColor: "#d9534f",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                padding: "5px 10px",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text style={{ color: "#bbb" }}>
                          {expandedDescription === item._id
                            ? item.ingredients
                            : `${
                                item.ingredients
                                  ? item.ingredients.slice(0, 50)
                                  : ""
                              }...`}
                          <span
                            className="expand-text text-white"
                            onClick={() =>
                              setExpandedDescription(
                                expandedDescription === item._id
                                  ? null
                                  : item._id
                              )
                            }
                          >
                            {expandedDescription === item._id
                              ? " Show Less"
                              : " Read More"}
                          </span>
                        </Card.Text>
                        <Card.Text className="price">₹{item.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>
            </Container>
          </Tab>
        ))}
      </Tabs>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-start">Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #ddd",
                padding: "20px",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              <input
                {...getInputProps()}
                onChange={(e) => handleImageChange(e)} // Handles image upload
              />
              {formData.image ? (
                <div>
                  <p>Image selected:</p>
                  <img
                    src={formData.image} // Display the uploaded or selected image
                    alt="Selected"
                    style={{
                      width: "100px",
                      height: "auto",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ) : (
                <p>
                  <span style={{ fontSize: "20px" }}>
                    <FaImage />ㅤ
                  </span>
                  Choose Image
                </p>
              )}
            </div>

            <Row className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  as="select"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{
                    padding: "0.75rem 1rem",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid #bbb",
                    color: "#bbb",
                  }}
                >
                  <option value="" disabled>
                    Select Item
                  </option>
                  {(items || []).map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  type="text"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  placeholder="Enter ingredients"
                  style={{
                    padding: "0.75rem 1rem",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid #bbb",
                    backgroundColor: "rgba(45, 48, 62, 1)",
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    placeholder="Enter rate"
                    style={{
                      padding: "0.75rem 1rem",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #bbb",
                      backgroundColor: "rgba(45, 48, 62, 1)",
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="Enter discount"
                    style={{
                      padding: "0.75rem 1rem",
                      fontSize: "1rem",
                      borderRadius: "5px",
                      border: "1px solid #bbb",
                      backgroundColor: "rgba(45, 48, 62, 1)",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                style={{
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #bbb",
                  color: "#bbb",
                }}
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "rgba(51, 55, 72, 1)",
              border: "1px solid #bbb",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: "rgba(202, 146, 61, 1)" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseDelete}>
        <Modal.Header>
          <Modal.Title className="text-start">Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-confirmation">
            <center>
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  backgroundColor: "#d9534f",
                  marginBottom: "10px",
                }}
              >
                <FaTrashAlt style={{ fontSize: "3rem", color: "#fff" }} />
              </div>
              <p>Are you sure you want to delete this item?</p>
            </center>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDelete}
            style={{
              backgroundColor: "rgba(51, 55, 72, 1)",
              border: "1px solid #bbb",
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{ backgroundColor: "rgba(202, 146, 61, 1)" }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddCategoryPopup}
        onHide={() => setShowAddCategoryPopup(false)}
      >
        <Modal.Header>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                placeholder="Enter category name"
              />
            </Form.Group>

            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #ddd",
                padding: "20px",
                textAlign: "center",
                marginBottom: "15px",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              {newCategory.image ? (
                <p>Image selected: {newCategory.image.name}</p>
              ) : (
                <p>
                  <span style={{ fontSize: "20px" }}>
                    <FaImage /> ㅤ
                  </span>
                  Drag & drop an image here, or click to select files
                </p>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddCategoryPopup(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleAddCategory}>Add Category</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Managemenu;
