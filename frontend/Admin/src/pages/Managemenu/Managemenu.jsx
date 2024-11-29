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

const Managemenu = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
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
  const [burgerData, setBurgerData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          "http://localhost:5000/api/v1/category/restaurantcategorys-get",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched Categories Response:", categoryResponse.data);

        if (categoryResponse.data.success) {
          setCategories(categoryResponse.data.data || []);
          console.log("Fetched Categories:", categoryResponse.data.data);
        } else {
          setError("Failed to fetch categories");
          console.log("API Response Error:", categoryResponse.data.message);
        }

        // Fetch items
        const itemResponse = await axios.get(
          "http://localhost:5000/api/v1/item/restaurantitems-get",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched Items Response:", itemResponse.data);

        if (itemResponse.data.success) {
          setItems(itemResponse.data.data || []); // Set items data
          console.log("Fetched Items:", itemResponse.data.data);
        } else {
          setError("Failed to fetch items");
          console.log("API Response Error:", itemResponse.data.message);
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Error fetching categories and items"
        );
        console.error("Error during fetch:", err.response || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndItems();
  }, []); // Run once when the component mounts

  const handleAddBurger = () => {
    console.log("New Burger Data:", burgerData);
    setShowAddBurgerPopup(false);
  };

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
        "http://localhost:5000/api/v1/upload/img-upload",
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
          "http://localhost:5000/api/v1/category/restaurantcategory-add",
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

  const handleConfirmDelete = () => {
    const updatedCategories = categories.filter(
      (category) => category.key !== deleteItemId
    );
    setCategories(updatedCategories);
    setShowDeleteModal(false);
  };

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false); // Close modal
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setNewCategory({ ...newCategory, image: acceptedFiles[0] });
    },
  });

  const handleDescriptionClick = (index) => {
    setExpandedDescription(expandedDescription === index ? null : index);
  };

  const handleButtonClick = (category) => {
    // Navigate to the next page with state
    navigate("/additems", { state: { category } });
  };

  return (
    <div className="menu-wrapper mb-5">
      <div className="tab-header">
        <h2 className="tab-title">Categories (250)</h2>
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
        onSelect={(category) => setActiveCategory(category)}
        className="mb-3"
      >
        {categories.map((category) => (
          <Tab
            className="ml-5"
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
              {category.name === category.name && (
                <button
                  className="add-category-btn col-2"
                  // onClick={() => navigate("/additems")}
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
              )}
            </div>
            {/* a imgpela upload ni api ma upload  kari ti
            na postman ma thi tari api post kari ti
            chale   j   che img  valu ok   */}
            <Container className="m-0" fluid>
              <Row className="menu-grid row-cols-1 row-cols-sm-2 row-cols-md-3">
                {(items || []).map((item, index) => (
                  <div
                    className="card-item"
                    key={item._id}
                    style={{
                      width: "18rem",
                      margin: "10px",
                      position: "relative",
                    }}
                  >
                    <Card
                      className="h-100"
                      style={{ border: "none", overflow: "hidden" }}
                    >
                      <div className="card-img-wrapper">
                        <Card.Img variant="top" src={item.image} />
                        <div
                          className="three-dots"
                          onClick={() =>
                            setShowOptions(showOptions === index ? null : index)
                          }
                        >
                          <span>...</span>
                        </div>
                        {showOptions === index && (
                          <div
                            className="card-actions"
                            style={{ backgroundColor: "rgba(37, 40, 54, 1)" }}
                          >
                            <button
                              className="edit-btn"
                              onClick={handleEditClick}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteClick(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text style={{ color: "#bbb" }}>
                          {expandedDescription === index
                            ? item.ingredients
                            : `${
                                item.ingredients
                                  ? item.ingredients.slice(0, 50)
                                  : ""
                              }...`}
                          <span
                            className="expand-text"
                            onClick={() =>
                              setExpandedDescription(
                                expandedDescription === index ? null : index
                              )
                            }
                          >
                            {expandedDescription === index
                              ? " Show Less"
                              : " Read More"}
                          </span>
                        </Card.Text>
                        <Card.Text className="price">{item.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Row>
            </Container>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Managemenu;

// <Modal show={showModal} onHide={handleClose}>
//   <Modal.Header>
//     <Modal.Title className="text-start">Edit Item</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>

//       <div {...getRootProps()} style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center', marginBottom: '15px' }}>
//         <input {...getInputProps()} />
//         {formData.image ? (
//           <p>Image selected: {formData.image.name}</p>
//         ) : (
//           <p><span style={{ fontSize: '20px' }}><FaImage />ㅤ</span>Choose Image</p>
//         )}
//       </div>

//       <Row className="mb-3">

//         <Form.Group className='mb-3'>
//           <Form.Label>Item Name</Form.Label>
//           <Form.Control
//             as="select"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             style={{
//               padding: '0.75rem 1rem',
//               fontSize: '1rem',
//               borderRadius: '5px',
//               border: '1px solid #bbb',
//               color: '#bbb'
//             }}
//           >
//             <option value="">Select Item</option>
//             {indianFoods.map((food, index) => (
//               <option key={index} value={food}>
//                 {food}
//               </option>

//             ))}

//           </Form.Control>
//         </Form.Group>
//       </Row>

//       <Row>
//         <Form.Group>
//           <Form.Label>Ingredients</Form.Label>
//           <Form.Control
//             type="text"
//             name="ingredients"
//             value={formData.ingredients}
//             onChange={handleInputChange}
//             placeholder="Enter ingredients"
//             style={{
//               padding: '0.75rem 1rem',
//               fontSize: '1rem',
//               borderRadius: '5px',
//               border: '1px solid #bbb',
//               backgroundColor: 'rgba(45, 48, 62, 1)',
//             }}
//           />
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">

//         <Col>
//           <Form.Group>
//             <Form.Label>Rate</Form.Label>
//             <Form.Control
//               type="number"
//               name="rate"
//               value={formData.rate}
//               onChange={handleInputChange}
//               placeholder="Enter rate"
//               style={{
//                 padding: '0.75rem 1rem',
//                 fontSize: '1rem',
//                 borderRadius: '5px',
//                 border: '1px solid #bbb',
//                 backgroundColor: 'rgba(45, 48, 62, 1)',
//               }}
//             />
//           </Form.Group>
//         </Col>

//         <Col>
//           <Form.Group>
//             <Form.Label>Discount</Form.Label>
//             <Form.Control
//               type="number"
//               name="discount"
//               value={formData.discount}
//               onChange={handleInputChange}
//               placeholder="Enter discount"
//               style={{
//                 padding: '0.75rem 1rem',
//                 fontSize: '1rem',
//                 borderRadius: '5px',
//                 border: '1px solid #bbb',
//                 backgroundColor: 'rgba(45, 48, 62, 1)',

//               }}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Form.Group className="mb-3">
//         <Form.Label>Availability</Form.Label>
//         <Form.Control
//           as="select"
//           name="availability"
//           value={formData.availability}
//           onChange={handleInputChange}
//           style={{
//             padding: '0.75rem 1rem',
//             fontSize: '1rem',
//             borderRadius: '5px',
//             border: '1px solid #bbb',
//             color: '#bbb'
//           }}
//         >
//           <option value="available">Available</option>
//           <option value="not_available">Not Available</option>
//         </Form.Control>
//       </Form.Group>
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>

//     <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}>
//       Cancel
//     </Button>

//     <Button onClick={handleClose} style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}>
//       Save
//     </Button>
//   </Modal.Footer>
// </Modal>

// <Modal show={showDeleteModal} onHide={handleCloseDelete}>
//   <Modal.Header>
//     <Modal.Title className="text-start">Delete Item</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <div className="delete-confirmation">
//       <center>
//         <div
//           style={{
//             display: 'inline-flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '90px',
//             height: '90px',
//             borderRadius: '50%',
//             backgroundColor: '#d9534f',
//             marginBottom: '10px',
//           }}
//         >
//           <FaTrashAlt style={{ fontSize: '3rem', color: '#fff' }} />
//         </div>
//         <p>Are you sure you want to delete this item?</p>
//       </center>

//     </div>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={handleCloseDelete} style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}>
//       No
//     </Button>
//     <Button onClick={handleConfirmDelete} style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}>
//       Yes
//     </Button>
//   </Modal.Footer>
// </Modal>

// <Modal show={showAddCategoryPopup} onHide={() => setShowAddCategoryPopup(false)}>
//   <Modal.Header>
//     <Modal.Title>Add New Category</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>

//       <Form.Group className="mb-3">
//         <Form.Label>Category Name</Form.Label>
//         <Form.Control
//           type="text"
//           value={newCategory.name}
//           onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//           placeholder="Enter category name"
//         />
//       </Form.Group>

//       <div
//         {...getRootProps()}
//         style={{
//           border: '2px dashed #ddd',
//           padding: '20px',
//           textAlign: 'center',
//           marginBottom: '15px',
//           cursor: 'pointer',
//         }}
//       >
//         <input {...getInputProps()} />
//         {newCategory.image ? (
//           <p>Image selected: {newCategory.image.name}</p>
//         ) : (
//           <p>
//             <span style={{ fontSize: '20px' }}>
//               <FaImage /> ㅤ
//             </span>
//             Drag & drop an image here, or click to select files
//           </p>
//         )}
//       </div>
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowAddCategoryPopup(false)}>
//       Cancel
//     </Button>
//     <Button onClick={handleAddCategory}>Add Category</Button>
//   </Modal.Footer>
// </Modal>
