import React, { useState } from 'react';
import { FaEye, FaWallet } from 'react-icons/fa';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import './CustomDate.css'; 


const CustomDate = () => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);

  const orders = [
    {
      customerName: 'Davis Lipshutz',
      itemName: 'Rice',
      date: '10/02/2024',
      time: '3:45 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Marcus Dorwart',
      itemName: 'Biryani Rice',
      date: '11/02/2024',
      time: '2:45 PM',
      customerPhone: '98566 85214',
      quantity: '100 G.M',
      totalBill: '₹500',
      paymentType: "Online"



    },
    {
      customerName: 'Davis Lipshutz',
      itemName: 'Rice',
      date: '10/02/2024',
      time: '3:45 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
      paymentType: "Online"
    },
    {
      customerName: 'Marcus Dorwart',
      itemName: 'Biryani Rice',
      date: '11/02/2024',
      time: '2:45 PM',
      customerPhone: '98566 85214',
      quantity: '100 G.M',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Angel Bator',
      itemName: 'Noodles',
      date: '12/02/2024',
      time: '5:35 PM',
      customerPhone: '98566 85214',
      quantity: '2K.G',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Jaydon Rhiel ',
      itemName: 'French Fries',
      date: '13/02/2024',
      time: '2:40 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Leo Carder',
      itemName: 'Burger',
      date: '14/02/2024',
      time: '2:30 PM',
      customerPhone: '98566 85214',
      quantity: '900 G.M',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Cristofer Calzoni',
      itemName: 'Pasta',
      date: '15/02/2024',
      time: '2:30 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Wilson Vaccaro',
      itemName: 'Pizza',
      date: '16/02/2024',
      time: '2:30 PM',
      customerPhone: '98566 85214',
      quantity: '800 G.M',
      totalBill: '₹500',
      paymentType: "Online"


    },
    {
      customerName: 'Jaxson Culhane',
      itemName: 'Teriyaki Egg',
      date: '17/02/2024',
      time: '5:30 PM',
      customerPhone: '98566 85214',
      quantity: '1K.G',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Lincoln Dias',
      itemName: 'Rice',
      date: '18/02/2024',
      time: '2:40 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Corey Ekstrom',
      itemName: 'Paneer tandoori',
      date: '19/02/2024',
      time: '8:45 PM',
      customerPhone: '98566 85214',
      quantity: '300 G.M',
      totalBill: '₹500',
      paymentType: "Online"

    },
    {
      customerName: 'Zain Bator',
      itemName: 'Paneer Chiliice',
      date: '20/02/2024',
      time: '6:45 PM',
      customerPhone: '98566 85214',
      quantity: '900 G.M',
      totalBill: '₹500',
      paymentType: "Online"
    },

  ];

  const handleDateModalClose = () => setShowDateModal(false);
  const handleDateModalShow = () => setShowDateModal(true);
  const handleOrderModalClose = () => setShowOrderModal(false);
  const handleOrderModalShow = () => setShowOrderModal(true);

  const handleFromDateChange = (e) => setFromDate(e.target.value);
  const handleToDateChange = (e) => setToDate(e.target.value);

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return (!fromDate || orderDate >= from) && (!toDate || orderDate <= to);
  });

  return (
    <div className='payment-order co'>
    <div className='header-component'>
        <div className='custom-table'>
          <h2>Payment Details</h2>

          <Dropdown className="">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Month
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Month</Dropdown.Item>
              <Dropdown.Item>Week</Dropdown.Item>
              <Dropdown.Item>Day</Dropdown.Item>
              <Dropdown.Item onClick={handleDateModalShow}>Custom Date</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
    
    
      </div>

        <div className=" co col-12 w">
          <h1 className="">Parcel Orders</h1>
          <div className='main-div'>


          
          <Modal show={showDateModal} onHide={handleDateModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Custom Date Selection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="date-inputs">
                <div className="date-field">
                  <label htmlFor="from-date">From:</label>
                  <input
                    type="date"
                    id="from-date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                  />
                </div>
                <div className="date-field">
                  <label htmlFor="to-date">To:</label>
                  <input
                    type="date"
                    id="to-date"
                    value={toDate}
                    onChange={handleToDateChange}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDateModalClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleDateModalClose();
                }}
              >
                Apply Filter
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Orders List */}
          <div className="order-header">
            <div>Customer Name</div>
            <div>Phone</div>
            <div>Items Name</div>
            <div>Quantity</div>
            <div>Total Bill</div>
            <div>Payment Type</div>
            <div>Actions</div>
          </div>

          <div className="order-list">
            {filteredOrders.map((order, index) => (
              <div className="order-item" key={index}>
                <div>{order.customerName}</div>
                <div>{order.customerPhone}</div>
                <div>{order.itemName}</div>
                <div>{order.quantity}</div>
                <div className="total-bill-background">{order.totalBill}</div>
                <div className='payment-background'><FaWallet />{order.paymentType}</div>
                <div>
                  <button className="check-button" onClick={handleOrderModalShow}>
                    <FaEye />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details Modal */}
          <Modal show={showOrderModal} onHide={handleOrderModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Parcel Payment Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="bill-container">
                <div className="details">
                  <div className="detail-item">
                    <span>Bill No: </span>
                    <span>GRT1715</span>
                    <div className="detail-item">
                      <span>Date: </span>
                      <span>24/01/2024</span>
                    </div>
                  </div>

                  <div className="detail-item">

                    <span>Time: </span>
                    <span>7:00 PM</span>
                    <div className="detail-item">
                      <span>Customer: </span>
                      <span>98266 66655</span>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span>Name: </span>
                    <span>Chance Geidt</span>
                    <div className="detail-item">
                      <span>Payment: </span>
                      <span className="online">Online</span>
                    </div>
                  </div>
                </div>
                <div className="items">
                  <table>
                    <thead>
                      <tr>
                        <th>Items Names</th>
                        <th>Qty</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jeera Rice</td>
                        <td>2</td>
                        <td>290.00</td>
                      </tr>
                      <tr>
                        <td>Veg Manhwa So</td>
                        <td>1</td>
                        <td>119.00</td>
                      </tr>
                      <tr>
                        <td>Dal Tadka</td>
                        <td>1</td>
                        <td>215.00</td>
                      </tr>
                      <tr>
                        <td>Butter Tandoor</td>
                        <td>1</td>
                        <td>45.00</td>
                      </tr>
                      <tr>
                        <td>Garlic Naan</td>
                        <td>5</td>
                        <td>300.00</td>
                      </tr>
                      <tr>
                        <td>Veg Sweet Corn</td>
                        <td>1</td>
                        <td>119.00</td>
                      </tr>
                      <tr>
                        <td>Plain Papad</td>
                        <td>2</td>
                        <td>160.00</td>
                      </tr>
                      <tr>
                        <td>Baked Veg With</td>
                        <td>1</td>
                        <td>270.00</td>
                      </tr>
                      <tr>
                        <td>Biryani Rice</td>
                        <td>2</td>
                        <td>315.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="invoice-summary">
                  <h3 className="section-title">Total Amount

                    <span>₹ 1315.00</span>
                  </h3>
                  <div className="amount-details">
                    <div className="row">


                    </div>
                    <div className="row">
                      <span>SGST 2.5%:</span>
                      <span>₹ 32.88</span>
                    </div>
                    <div className="row">
                      <span>CGST 2.5%:</span>
                      <span>₹ 32.88</span>
                    </div>
                  </div>
                  <h3 className="section-title">Grand Total Amount</h3>
                  <div className="grand-total">
                    <span>₹ 1381.00</span>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        </div>
      </div>
    
  );
};



export default CustomDate;
