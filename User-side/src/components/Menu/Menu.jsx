import React, { useState } from 'react';
import './menu.css';
import { Container, Row, Col, Button, Tabs, Tab, Card } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import logo from '../../assets/logo-main.png'
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const [activeTab, setActiveTab] = useState("veg");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  const vegCategories = [
    { name: "All", image: "https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QYSqGb1ASbnbXKdlzTDMDbwviGzxD3H6QADIR80588J3-aKlHblv2G0ODhgKJbasyDs3rWsJ-nUJ1cB9eL5gOXIyHdPQC4fwl2GZe55bd~aHtvyTa63n57~jJ0PVC5bqn3ClheFRQzi6VdoJTyUcM3~m2amhDVA5oVMNj-DvTZ99QIXtrdXFSIPM~bxSjnRowjv96bnoRn~wUyY04oAgwBKtQy~YINjbn9yWUgGaoUMpcNTI3REB5zefYl-w9LYIk0741aCEIB0HBn4RWCPT1W9lOQOn9HpHNUTeS6jwj~XTjCxAlG-VgMaTo-JbZkpAfGZf6qBSo-BgfUIyTx8hDw__" },
    { name: "Salads", image: "https://s3-alpha-sig.figma.com/img/c495/ed87/1338e2e608f2055840d3132745fa5027?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lkzNRroWqyXISaarYy-f3rxATwowX4QTjvTAf7Zs0-lDMT3YcWBSzGPw18k2Ix1of6XxjokupjUH944IEPDnkUcoaWyX1JqT-oFSeMYHnfODVMGFvusNJBP1deDciooQosYc76pklOpnoU8DHpCm61jfMfL~dAC8tDr70ChrkISqf~9bYIU6vhld4rx0BhVoBtMnZY9Ec7AqDes29NspWpwkpFK~2CqkWTorqV0BZutS0uYKd4UZwFZFuQ3ytCIrZ9IEZ5kjRDz2pngIeUaLtWMCjkzUe2N80SeBRG9CPrLLL78VrT3w7V4k8KN2CHk0UmS6koPYmFjUsxOrVVSeyA__" },
    { name: "French Fries", image: "https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QYSqGb1ASbnbXKdlzTDMDbwviGzxD3H6QADIR80588J3-aKlHblv2G0ODhgKJbasyDs3rWsJ-nUJ1cB9eL5gOXIyHdPQC4fwl2GZe55bd~aHtvyTa63n57~jJ0PVC5bqn3ClheFRQzi6VdoJTyUcM3~m2amhDVA5oVMNj-DvTZ99QIXtrdXFSIPM~bxSjnRowjv96bnoRn~wUyY04oAgwBKtQy~YINjbn9yWUgGaoUMpcNTI3REB5zefYl-w9LYIk0741aCEIB0HBn4RWCPT1W9lOQOn9HpHNUTeS6jwj~XTjCxAlG-VgMaTo-JbZkpAfGZf6qBSo-BgfUIyTx8hDw__" },
    { name: "Sandwich", image: "https://s3-alpha-sig.figma.com/img/9ac5/7848/92cebe7826b91979d7ec7154dc714870?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fru2U3c7S46rO7E2YC5FMspGmqrVJPXoRCPbWz1waDLy0lT83gmkSxMtreZl47H1ZN~LCI--YlrFOADTMGCUgQvuc6dzirTHavWQd3PfvqO~QSn8ZhS59ueIP8ylhxXS2a-7BKddkMsOcB-Jue~eFFtFsAtX2WOCLF7DUkpGtNbJZ6-hTHQpY-RVV8gz4-w1xat1lYPerFUVm2uI-UCUW47qIOKKohKp31DQoRJY-pM0lXgP-xNEddHfOUYt3rRay~U-R4tqH2IIwcTONqL~8Z9oS54FcFKuz5Sodtd5lWt9M-zgIhSem-zvhuVEBlE~uDRQz8XUECu1gxyZX90tvA__" },
    { name: "Drinks", image: "https://s3-alpha-sig.figma.com/img/cecc/4fd1/3829c29c170bee25c8af06e829cde3de?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X~U7hTeVyAmTYqpePzuDUYzCi8i4mMJYqkCSh9BjovZw~sTgw2HGPfJxq95L9oaqN0SJ4~I6O7bnbXVhbjl7cYTF2GzWGP8a-YskTSoTdt2ZPfU880z2lNZ5Z8W-4o1sl0XtWRpmpXwdHyuvb940gaHXWmFmSBRzJIgTHqoS6yW44t1w3wn52jBcZhxKfCUULscZSK5nVS~jiZtw3azRtyZ-ppsqMKZtAYHGcQ2RzgOgF69TmCHlovj8rBww6C3Vg~czajeLOZcI2np9THOCE5-v3tgcXpe2KlBULx0Yg7xkmuKcVsxci6-hCZewX4SpkyyNi-FzCQWirM~Bog4vfg__" },
  ];

  const nonVegCategories = [
    { name: "All", image: "https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QYSqGb1ASbnbXKdlzTDMDbwviGzxD3H6QADIR80588J3-aKlHblv2G0ODhgKJbasyDs3rWsJ-nUJ1cB9eL5gOXIyHdPQC4fwl2GZe55bd~aHtvyTa63n57~jJ0PVC5bqn3ClheFRQzi6VdoJTyUcM3~m2amhDVA5oVMNj-DvTZ99QIXtrdXFSIPM~bxSjnRowjv96bnoRn~wUyY04oAgwBKtQy~YINjbn9yWUgGaoUMpcNTI3REB5zefYl-w9LYIk0741aCEIB0HBn4RWCPT1W9lOQOn9HpHNUTeS6jwj~XTjCxAlG-VgMaTo-JbZkpAfGZf6qBSo-BgfUIyTx8hDw__" },
    { name: "Burgers", image: "https://s3-alpha-sig.figma.com/img/ecd2/40ce/7c550720ab20af0840548a832e0f9a28?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QYSqGb1ASbnbXKdlzTDMDbwviGzxD3H6QADIR80588J3-aKlHblv2G0ODhgKJbasyDs3rWsJ-nUJ1cB9eL5gOXIyHdPQC4fwl2GZe55bd~aHtvyTa63n57~jJ0PVC5bqn3ClheFRQzi6VdoJTyUcM3~m2amhDVA5oVMNj-DvTZ99QIXtrdXFSIPM~bxSjnRowjv96bnoRn~wUyY04oAgwBKtQy~YINjbn9yWUgGaoUMpcNTI3REB5zefYl-w9LYIk0741aCEIB0HBn4RWCPT1W9lOQOn9HpHNUTeS6jwj~XTjCxAlG-VgMaTo-JbZkpAfGZf6qBSo-BgfUIyTx8hDw__" },
    { name: "Chicken Wings", image: "https://img.freepik.com/free-photo/grilled-chicken-wing-white-plate_1203-2479.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
    { name: "Pizza", image: "https://s3-alpha-sig.figma.com/img/faf2/7874/1baa9ca44d18cb4e6ad9d0e0ee65e16e?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TV9ejVstwP4YJXtYGKCtbopiZrTDaM-Td0uNK4qcfSs93aoAoxwndlPmH1W02N5eu9SyGYZ89oNaVRuH8zv1Q1QsYAaYmZ8f5dvBOZ~UFyezjzOf516dx7AwlDTmm3W-91xANfDX1TFxDztA59ewyJeE9XTMrEz9oLrGvQPB4KKsrelLE1I1Np~cy4ONnxzh8hyM6mWCuTKyOAMhaQjW~Kvk~zj~HZQrRA5ZIn2HqXhirtQpDprlzQd-XAHWoKfwarhuWz9KfdOtE7tqoK1cSQ~yDA8EDzg6xZfAhw1bg3E27t4FTkZDX1ijtRViZMLMSgFYkHPEqG5OXFTFKXWWOQ__" },
    { name: "Drinks", image: "https://s3-alpha-sig.figma.com/img/cecc/4fd1/3829c29c170bee25c8af06e829cde3de?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X~U7hTeVyAmTYqpePzuDUYzCi8i4mMJYqkCSh9BjovZw~sTgw2HGPfJxq95L9oaqN0SJ4~I6O7bnbXVhbjl7cYTF2GzWGP8a-YskTSoTdt2ZPfU880z2lNZ5Z8W-4o1sl0XtWRpmpXwdHyuvb940gaHXWmFmSBRzJIgTHqoS6yW44t1w3wn52jBcZhxKfCUULscZSK5nVS~jiZtw3azRtyZ-ppsqMKZtAYHGcQ2RzgOgF69TmCHlovj8rBww6C3Vg~czajeLOZcI2np9THOCE5-v3tgcXpe2KlBULx0Yg7xkmuKcVsxci6-hCZewX4SpkyyNi-FzCQWirM~Bog4vfg__" },
  ];

  
  const menuItems = {
    veg: [
      { name: "Veg Burger", category: "Burgers", orders: 150, price: "₹5.29", image: "https://img.freepik.com/free-photo/burger_1339-1576.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Veg Pizza", category: "Pizza", orders: 120, price: "₹7.29", image: "https://img.freepik.com/free-photo/front-view-delicious-cheese-pizza-consists-olives-pepper-tomatoes-dark-surface_179666-34391.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "French Fries", category: "French Fries", orders: 100, price: "₹2.29", image: "https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Vegetable Sandwich", category: "Sandwich", orders: 80, price: "₹3.29", image: "https://img.freepik.com/free-photo/side-view-club-sandwich-with-salted-cucumbers-lemon-olives-round-white-plate_176474-3049.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Salad", category: "Salads", orders: 200, price: "₹3.99", image: "https://img.freepik.com/free-photo/top-view-vegan-salad-with-fresh-ingredients-plate-pepper-black-cutting-board_179666-47300.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Lemonade", category: "Drinks", orders: 300, price: "₹1.99", image: "https://img.freepik.com/free-photo/front-view-lemonade-wooden-serving-board-lemon-slices-potted-plant-brown-surface_140725-103295.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Fruit Salad", category: "Salads", orders: 180, price: "₹4.49", image: "https://img.freepik.com/free-photo/fresh-fruit-berry-salad-healthy-eating_114579-14330.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Green Salad", category: "Salads", orders: 150, price: "₹3.49", image: "https://img.freepik.com/free-photo/salad-marinated-zucchini-spices_2829-10815.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Sweet Corn Soup", category: "Soup", orders: 100, price: "₹2.99", image: "https://img.freepik.com/free-photo/custard-pudding-white-plate_1232-2789.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Tomato Soup", category: "Soup", orders: 90, price: "₹2.49", image: "https://img.freepik.com/free-photo/tomato-soup-with-grated-cheese-crackers_140725-3017.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
    ],
    nonveg: [
      { name: "Chicken Burger", category: "Burgers", orders: 200, price: "₹6.29", image: "https://img.freepik.com/free-photo/side-view-chicken-burger-with-sliced-tomato-lettuce-board_141793-4817.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Chicken Wings", category: "Chicken Wings", orders: 180, price: "₹5.99", image: "https://img.freepik.com/free-photo/top-view-fried-chicken-with-variety-three-sauces_23-2148646572.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Pepperoni Pizza", category: "Pizza", orders: 160, price: "₹8.29", image: "https://img.freepik.com/free-photo/closeup-tasty-appetizing-salami-pizza-with-cheese-spices_1220-6201.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Chicken Sandwich", category: "Sandwich", orders: 90, price: "₹4.49", image: "https://img.freepik.com/free-photo/club-sandwich-chicken-breast-lettuce-cheese-toast-bread-tomato-cucumber-french-fries-side-view_141793-3533.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Iced Tea", category: "Drinks", orders: 120, price: "₹2.49", image: "https://img.freepik.com/free-photo/fresh-ice-tea-plastic-glass_144627-27132.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "BBQ Wings", category: "Chicken Wings", orders: 100, price: "₹6.99", image: "https://img.freepik.com/free-photo/high-angle-fried-chicken-with-variety-sauces-french-fries_23-2148646571.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Chicken Caesar Salad", category: "Salads", orders: 75, price: "₹7.99", image: "https://img.freepik.com/free-photo/chicken-caesar-salad-plate_140725-2358.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Margarita Pizza", category: "Pizza", orders: 140, price: "₹9.49", image: "https://img.freepik.com/free-photo/top-view-delicious-pizza-with-fresh-cheese_23-2150096953.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Lemonade", category: "Drinks", orders: 220, price: "₹2.99", image: "https://img.freepik.com/free-photo/refreshing-lemonade-retro-jar_23-2148150473.jpg?ga=GA1.1.227229956.1729880268&semt=ais_hybrid" },
      { name: "Hot Dog", category: "Burgers", orders: 95, price: "₹4.79", image: "https://media.istockphoto.com/id/1161700174/photo/chilean-completo-italiano-hot-dog-sandwiches-with-tomato-avocado-and-mayonnaise-on-wooden.jpg?b=1&s=612x612&w=0&k=20&c=Q5XB_jaJXPWy5nQjEHxY5TaNarJgRfbWpQaB81uigKM=" },
    ]
  };

  
  const filteredMenu = activeTab === "veg"
    ? menuItems.veg.filter(item => selectedCategory === "All" || item.category === selectedCategory)
    : menuItems.nonveg.filter(item => selectedCategory === "All" || item.category === selectedCategory);

    const handleOrderNow = () => {
      navigate('/details'); 
    };

  return (
    <Container fluid className="bg text-light pt-0" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Row className="mb-4 py-3 " style={{backgroundColor:'rgba(31, 29, 43, 1)'}}>
        <Col xs={8}>
         <div className="logo">
          <img src={logo} alt="logo" width={100} />
         </div>
        </Col>
        <Col xs={4} className="text-end d-flex justify-content-end">
          {/* Search Icon */}
          <div className="icon-circle me-3">
          <NavLink  to={'/search'} style={{color:'#fff'}}>
          <FaSearch size={20} />
        </NavLink>
          </div>

          {/* Cart Icon */}
          <div className="icon-circle">
          <NavLink  to={'/cart'} style={{color:'#fff'}}>
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
            style={{
              borderBottom:'none',
            }}
          >
            <Tab eventKey="veg" title="Veg">
              {/* Veg Categories */}
              <Row className="mb-4">
                <h4 className="mb-3 mt-4">Categories</h4>
                {vegCategories.map((category, index) => (
                  <Col xs={4} md={2} key={index} className="text-center mb-3 mt-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="tabimg mb-2"
                    
                      onClick={() => setSelectedCategory(category.name)} 
                    />
                    <p className="text-light">{category.name}</p>
                  </Col>
                ))}
              </Row>
            </Tab>
            <Tab eventKey="nonveg" title="Non Veg">
              <Row className="mb-4">
                <h4 className="mb-3 mt-4">Categories</h4>
                {nonVegCategories.map((category, index) => (
                  <Col xs={4} md={2} key={index} className="text-center mb-3 mt-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="tabimg mb-2"
                   
                      onClick={() => setSelectedCategory(category.name)} 
                    />
                    <p className="text-light">{category.name}</p>
                  </Col>
                ))}
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Row className="trending-menu-header d-flex align-items-center justify-content-between py-3">
      <Col>
        <h3 className="trending-menu-title mb-0">Trending Menu</h3>
      </Col>
      <Col className="text-end">
      <NavLink  to={'/trending'} style={{color:'#fff' , textDecoration:'none'}} >
          View All
      </NavLink>
      </Col>
    </Row>
      <Row>
        {filteredMenu.map((item, index) => (
          <Col xs={12} key={index} className="mb-3">
            <Card className="text-light" style={{ backgroundColor: 'rgba(37, 40, 54, 1)' }}>
              <Card.Body className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="tabimg me-3"
                  style={{ width: '80px', height: '80px' }}
                />
                <div>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    Order Per Day - {item.orders}
                  </Card.Text>
                  <h5 style={{ color: 'rgba(57, 151, 61, 1)' }}>{item.price}</h5>
                </div>
                <div className="ms-auto">
                  <Button  onClick={handleOrderNow} className='text-white' variant="warning">Order Now</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <NavLink  to={'/categories'} style={{color:'#fff'}}>
      <Button
        variant="warning"
        className="position-fixed bottom-0 end-0 m-4 rounded-circle"
        style={{ width: "71px", height: "71px" }}
      >
       <MdOutlineRestaurantMenu />
      </Button>
      </NavLink>
    </Container>
  );
};

export default Menu;
