import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Card, Row, Modal, Button, Form, Col, Container } from 'react-bootstrap';
import { FaSquarePlus } from "react-icons/fa6";
import './Managemenu.css';
import { FaTrashAlt } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import { FaImage } from "react-icons/fa";
import axios from 'axios';

const Managemenu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showOptions, setShowOptions] = useState({});
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', image: null });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', image: null });
  const [showAddBurgerPopup, setShowAddBurgerPopup] = useState(false);
  const [burgerData, setBurgerData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });


  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('jwtToken');
      try {
        const response = await axios.get('http://localhost:5000/api/v1/category/restaurantcategorys-get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setCategories(response.data.categories || []); // Assuming response contains a `categories` array
        } else {
          setError('Failed to fetch categories');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);










  const handleAddBurger = () => {
    console.log('New Burger Data:', burgerData);
    setShowAddBurgerPopup(false);
  };

  const handleDeleteClick = (itemId) => {
    setDeleteItemId(itemId);
    setShowDeleteModal(true);
  };


  const handleAddCategory = async () => {
    // if (!newCategory.name || !newCategory.image) {
    //   alert("Both name and image are required");
    //   return;
    // }

    // Create FormData to upload the image first
    const imageFormData = new FormData();
    imageFormData.append('image', newCategory.image);

    const token = localStorage.getItem('jwtToken');

    try {
      // Upload image to /upload/img-upload
      const imageResponse = await axios.post(
        'http://localhost:5000/api/v1/upload/img-upload',
        imageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the image upload was successful
      if (imageResponse.data.success === true) {
        const imageUrl = imageResponse.data.imagePath; 

        const imageName = imageUrl;

        const categoryFormData = new FormData();
        
        const categoryData = {
          name: newCategory.name,
          image: imageName,
        };
        
        const categoryResponse = await axios.post(
          'http://localhost:5000/api/v1/category/restaurantcategory-add',
          
          categoryData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      

        console.log('Category added successfully:', categoryResponse.data);
        alert("Category added successfully!");
        setNewCategory({ name: '', image: null });
        setShowAddCategoryPopup(false);
      } else {
        console.error("Error uploading image:", imageResponse.data);
        alert("Error uploading image. Please try again.");
      }
    } catch (error) {
      console.error('Error adding category:', error.response?.data || error.message);
      alert("Error adding category. Please try again.");
    }
  };



  const handleCloseDelete = () => setShowDeleteModal(false);


  const handleConfirmDelete = () => {

    const updatedCategories = categories.filter(category => category.key !== deleteItemId);
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
      setNewCategory({ ...newCategory, image: acceptedFiles[0] }); // Store the File object
    },
  });




  const indianFoods = [
    'Butter Chicken',
    'Paneer Tikka',
    'Chole Bhature',
    'Biryani',
    'Aloo Gobi',
    'Palak Paneer',
    'Dosa',
    'Samosa',
    'Pav Bhaji',
    'Dal Makhani',
  ];


  const categories = [
    { key: 'all', label: 'All', icon: 'https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fqlZUfKFRFu51rIF9qDNDkX0hM-6lh4dEHGSzuRhJa5Q~bKsQa-ZSz4ZwuTn-4Xk~unVxU1487GcGkXc9riyZV3incW-NPudZp5Lbmzwi4b1I6LBmnWFHGvt-Z~HeObvHK7Tgf7EcCEgLQnz6zt4PMTcGAoNAlXmbfxhM5Py6jnZcN0z0s4rS~q~My96tK9RKr1MlMRwUnwpLw~E9xPMsHlxXYTM2-h2KLnOBtgrf4JzaOVL0BFNqI7WntUwv~CVz8S8UcUPIqV17ntWoMQ0QFPr4SsMKsneujfYH1G28AvHeMRC5P7jpzo~6pu0tqYtmeRl~-Hr-n~mwru6SzGLQA__' },
    { key: 'burger', label: 'Burger', icon: 'https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fqlZUfKFRFu51rIF9qDNDkX0hM-6lh4dEHGSzuRhJa5Q~bKsQa-ZSz4ZwuTn-4Xk~unVxU1487GcGkXc9riyZV3incW-NPudZp5Lbmzwi4b1I6LBmnWFHGvt-Z~HeObvHK7Tgf7EcCEgLQnz6zt4PMTcGAoNAlXmbfxhM5Py6jnZcN0z0s4rS~q~My96tK9RKr1MlMRwUnwpLw~E9xPMsHlxXYTM2-h2KLnOBtgrf4JzaOVL0BFNqI7WntUwv~CVz8S8UcUPIqV17ntWoMQ0QFPr4SsMKsneujfYH1G28AvHeMRC5P7jpzo~6pu0tqYtmeRl~-Hr-n~mwru6SzGLQA__' },
    { key: 'icecream', label: 'Ice Cream', icon: 'https://s3-alpha-sig.figma.com/img/05de/774e/807dd6ec092da5e280109b013c513a0d?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EQ0cdAk8BmcXXzstEebi6ncCRnYBW-ApWef1AiVGUaIoCU0YT32QQmRbKdfNrkVvaqV36oN2Yp9Md-xjqrjKZ9f6DP9p08kV0UIYbeHIqKujEwBpxoaknwhBAAmkDPqJBDC8KhVFvzALrYhgtu9xNrdzOEmzvjVX0PRs08bLPfMncWI4QSLRiS56YW3vC3JMykMfqa9xyCAjeCXsoPFyFVXqk8S8eccAAN4mAnFTxmEtn9PCAjq0G5dYxxRfFVC-~7FDjhC5n7cdZq7t8o3Kni33fGFlzC5-WOpyRcycqp2wzCjiTqWGiPEZiYTjyL8MOi8p7XuBSxZ2MnmQNcCxQA__' },
    { key: 'frenchfries', label: 'French Fries', icon: 'https://s3-alpha-sig.figma.com/img/c495/ed87/1338e2e608f2055840d3132745fa5027?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YuXGjICbfNOIbMPScZ~m4vMkxNE5gJpG5eWpn6TnjEm9RdyH0gmGw1L0KPlYUD--kWvE2kxNMZ7gRrPBpoSMYDKzcEgObj3cu468XG6R1vxUPigGBbhkAba2OSSPI9GyScIaEnz5FSR0H8UNBtW~5y2U~LceWharlf1o4RKy1E~XDqUGyR-l~tWp3L~~IUvxGjq3br0VOzvtPuX0OD1pWW2CCSUJ9a5UUD2OhJT7dapZjDRlkkOV0BNk4NwIqFgJZ~CTzjOC00ibTO3HDYTXKcrX~D5Fikx6JJeG~34Q586B-XuFNEle65bJMMXx9MeXE501xDD3javZoOg5P5IgUA__' },
    { key: 'sandwich', label: 'Sandwich', icon: 'https://s3-alpha-sig.figma.com/img/9ac5/7848/92cebe7826b91979d7ec7154dc714870?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c2D7vqcnv5Ywz6gQgSV9cpcM4ZE7vjwBtzK52ylJuo0Fn9DnVuwYs1nCjaw92t8JoIXe091vlq8d6JnqxjsAZE6lKuafFSobpKfau8F5g0EvGvxT-s1rktxnpYLq64rihl-O9I2PiW3ePCds9fkMdg6yM78qAPei3HAlmAl6Z2DCMt4K0gUE-7CgafEHmfMv3WWf3qWS6szbzCw5sn9PbMXrO4DC6sTuHGIRHmMUEgeHTXrcWss4DM3PadXhNmbaKpy4LxZvujLwFb3vzxRswg29eN~of7fwkYrWbqZPBKuWGMOoytPK4H0DTA1BMH4POrfQhvplEJkq9oeZBWVaQg__' },
    { key: 'drinkjuice', label: 'Drink/Juice', icon: 'https://s3-alpha-sig.figma.com/img/cecc/4fd1/3829c29c170bee25c8af06e829cde3de?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OfxfZ4fRAzEnRwdu3RpkoWOy--A22Bm7ldyJ6mdYxgbIC5n4tPJVRwdI8ElHVpGHWW2BGqlhW1qO~mVhnV2b9SWf0LgkonUbSNU5CcCkWH0VYCdSwbQVmDAXmb5-brCFVUchyzksqPbzebI4vLeQrhBDgNvXdxR6ktCeN6Tnj0~OGVWYD1xI5tAv~VglpbIhSreGuGGOzVwRiAd5Oi5Etn3O1p7-c5K9fY4PVxD1nyeQekWusbqyai~G7X3fIa~nW6PWZztwgx8LfnG0mR3pE-b8EeqjjzxlR2hBJdHKyS9R0d7zE5tnEv2K0V1nBaANBw2KXpJZSPYp6fimsRIbow__' }
  ];


  const categoryData = {
    all: [
      { title: ' Cheeseburger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$10.99', imgSrc: 'https://img.freepik.com/free-photo/view-homemade-delicious-sandwiches-black-board-gray-blurred-surface_179666-42327.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
    ],
    burger: [
      { title: ' Cheeseburger', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.99', imgSrc: 'https://img.freepik.com/free-photo/huge-burger-with-fried-meat-vegetables_140725-971.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
    ],
    icecream: [
      { title: 'Vanila', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.49', imgSrc: 'https://img.freepik.com/free-photo/ice-cream-balls-bowl_1220-571.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
    ],
    frenchfries: [
      { title: 'Small Fries', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$1.99', imgSrc: 'https://img.freepik.com/free-photo/french-fries-with-mayonnaise-ketchup_140725-2742.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
    ],
    sandwich: [
      { title: 'Club Sandwich', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$5.99', imgSrc: 'https://img.freepik.com/free-photo/front-view-delicious-ham-sandwiches-with-french-fries-seasonings-dark-surface_179666-34427.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
    ],
    drinkjuice: [
      { title: 'Cola', description: 'Including premium beef, freshly baked brioche buns, crisp lettuce, ripe tomatoes, savory cheese, tangy pickles.', price: '$2.49', imgSrc: 'https://img.freepik.com/free-photo/fresh-cola-drink-with-green-lime_144627-12396.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid' },
    ]
  };


  const handleDescriptionClick = (index) => {
    setExpandedDescription(expandedDescription === index ? null : index);
  };

  return (
    <div className="menu-wrapper mb-5">
      <div className="tab-header">
        <h2 className="tab-title">Categories (250)</h2>
        <button className="add-category-btn col-2" onClick={() => setShowAddCategoryPopup(true)}>
          <span style={{ fontSize: '24px', lineHeight: '1', marginRight: '10px' }}>
            <FaSquarePlus />
          </span>
          Add Categories
        </button>
      </div>
      <br />
      <Tabs activeKey={activeCategory} onSelect={(category) => setActiveCategory(category)} className="mb-3">
        {categories.map((category) => (
          <Tab
            className='ml-5'
            eventKey={category.key}
            key={category.key}
            title={
              <div style={{ display: 'flex', alignItems: 'center' }} className='tab-products'>
                <img
                  src={category.icon}
                  alt={`${category.label} icon`}
                  style={{
                    width: '70px',
                    height: '50px',
                    marginRight: '8px',
                    backgroundColor: 'rgba(31, 29, 43, 1)',
                  }}
                />
                {category.label}
              </div>
            }
          >
            <div className="tab-header">
              <h2 className="tab-title">{category.label}</h2>
              {category.key === 'burger' && (
                <button className="add-category-btn col-2" onClick={() => setShowAddBurgerPopup(true)}>
                  <span style={{ fontSize: '24px', lineHeight: '1', marginRight: '10px' }}>
                    <FaSquarePlus />
                  </span>
                  Add Burger
                </button>
              )}
            </div>
            <Container className='m-0' fluid>
              {/* <Row className="menu-grid row-cols-1 row-cols-sm-2 row-cols-md-3"> */}
              <Row className='d-flex flex-wrap col-12'>
                {(categoryData[category.key] || []).map((card, index) => (
                  <div className="d-flex ml-5" style={{ width: "18%" }}>
                    <div
                      className="card-item"
                      key={card.key}
                      style={{ margin: '10px', position: 'relative' }}
                    >
                      <Card className="h-100" style={{ border: 'none', overflow: 'hidden', }}>
                        <div className="card-img-wrapper">
                          <Card.Img variant="top" src={card.imgSrc} />
                          <div
                            className="three-dots"
                            onClick={() => setShowOptions(showOptions === index ? null : index)}
                          >
                            <span>...</span>
                          </div>
                          {showOptions === index && (
                            <div className="card-actions" style={{ backgroundColor: 'rgba(37, 40, 54, 1)' }}>
                              <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                              <button className="delete-btn" onClick={() => handleDeleteClick(card.key)}>Delete</button>
                            </div>
                          )}
                        </div>
                        <Card.Body>
                          <Card.Title>{card.title}</Card.Title>
                          <Card.Text style={{ color: '#bbb' }}>
                            {expandedDescription === index
                              ? card.description
                              : `${card.description.slice(0, 50)}...`}
                            <span
                              className="expand-text"
                              onClick={() => setExpandedDescription(expandedDescription === index ? null : index)}
                            >
                              {expandedDescription === index ? ' Show Less' : ' Read More'}
                            </span>
                          </Card.Text>
                          <Card.Text className="price">{card.price}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                ))}
              </Row>
            </Container>
          </Tab>
        ))}
      </Tabs>
      {/* Modal for Edit Form */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-start">Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Drag-and-Drop Area for Image */}
            <div {...getRootProps()} style={{ border: '2px dashed #ddd', padding: '20px', textAlign: 'center', marginBottom: '15px' }}>
              <input {...getInputProps()} />
              {formData.image ? (
                <p>Image selected: {formData.image.name}</p>
              ) : (
                <p><span style={{ fontSize: '20px' }}><FaImage />ㅤ</span>Choose Image</p>
              )}
            </div>

            {/* Item Details Fields */}
            <Row className="mb-3">
              {/* Item Name (Dropdown with Indian foods) */}
              <Form.Group className='mb-3'>
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  as="select"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #bbb',
                    color: '#bbb'
                  }}
                >
                  <option value="">Select Item</option>
                  {indianFoods.map((food, index) => (
                    <option key={index} value={food}>
                      {food}
                    </option>

                  ))}

                </Form.Control>
              </Form.Group>
            </Row>
            {/* Ingredients */}
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
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: '1px solid #bbb',
                    backgroundColor: 'rgba(45, 48, 62, 1)',
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              {/* Rate */}
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
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      borderRadius: '5px',
                      border: '1px solid #bbb',
                      backgroundColor: 'rgba(45, 48, 62, 1)',
                    }}
                  />
                </Form.Group>
              </Col>

              {/* Discount */}
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
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      borderRadius: '5px',
                      border: '1px solid #bbb',
                      backgroundColor: 'rgba(45, 48, 62, 1)',

                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Availability Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  color: '#bbb'
                }}
              >
                <option value="available">Available</option>
                <option value="not_available">Not Available</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Cancel Button */}
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}>
            Cancel
          </Button>

          {/* Save Changes Button */}
          <Button onClick={handleClose} style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}>
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
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: '#d9534f',
                  marginBottom: '10px',
                }}
              >
                <FaTrashAlt style={{ fontSize: '3rem', color: '#fff' }} />
              </div>
              <p>Are you sure you want to delete this item?</p>
            </center>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete} style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}>
            No
          </Button>
          <Button onClick={handleConfirmDelete} style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Categories Popup */}
      <Modal show={showAddCategoryPopup} onHide={() => setShowAddCategoryPopup(false)}>
        <Modal.Header>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Category Name */}
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Enter category name"
              />
            </Form.Group>

            {/* Image Upload */}
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #ddd',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '15px',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              {newCategory.image ? (
                <p>Image selected: {newCategory.image.name}</p>
              ) : (
                <p>
                  <span style={{ fontSize: '20px' }}>
                    <FaImage /> ㅤ
                  </span>
                  Drag & drop an image here, or click to select files
                </p>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCategoryPopup(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory}>Add Category</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddBurgerPopup} onHide={() => setShowAddBurgerPopup(false)}>
        <Modal.Header>
          <Modal.Title>Add New Burger</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>Burger Name</Form.Label>
              <Form.Control
                type="text"
                value={burgerData.name}
                onChange={(e) => setBurgerData({ ...burgerData, name: e.target.value })}
                placeholder="Enter burger name"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  backgroundColor: 'rgba(45, 48, 62, 1)',
                  color: '#bbb',
                }}
              />
            </Form.Group>

            {/* Description Field */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={burgerData.description}
                onChange={(e) =>
                  setBurgerData({ ...burgerData, description: e.target.value })
                }
                placeholder="Enter burger description"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  backgroundColor: 'rgba(45, 48, 62, 1)',
                  color: '#fff',
                }}
              />
            </Form.Group>

            {/* Price Field */}
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={burgerData.price}
                onChange={(e) =>
                  setBurgerData({ ...burgerData, price: e.target.value })
                }
                placeholder="Enter price"
                style={{
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  border: '1px solid #bbb',
                  backgroundColor: 'rgba(45, 48, 62, 1)',
                  color: '#bbb',
                }}
              />
            </Form.Group>

            {/* Image Upload Field */}
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #ddd',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '15px',
                cursor: 'pointer',
                backgroundColor: 'rgba(45, 48, 62, 1)',
                color: '#bbb',
              }}
            >
              <input {...getInputProps()} />
              {burgerData.image ? (
                <p>Image selected: {burgerData.image.name}</p>
              ) : (
                <p>
                  <span style={{ fontSize: '20px' }}>
                    <FaImage />ㅤ
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
            onClick={() => setShowAddBurgerPopup(false)}
            style={{ backgroundColor: 'rgba(51, 55, 72, 1)', border: '1px solid #bbb' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddBurger}
            style={{ backgroundColor: 'rgba(202, 146, 61, 1)' }}
          >
            Add Burger
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Managemenu;
