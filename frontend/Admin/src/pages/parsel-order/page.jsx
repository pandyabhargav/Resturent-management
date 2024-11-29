import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Row, Col, } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import { FaEye } from "react-icons/fa";
import "./page.css"

function Pageorder() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const items = [
    { name: "Jeera Rice", qty: 2, amount: 290.00 },
    { name: "Veg Manhwa So", qty: 1, amount: 119.00 },
    { name: "Dal Tadka", qty: 1, amount: 215.00 },
    { name: "Butter Tandoor", qty: 1, amount: 45.00 },
    { name: "Garlic Naan", qty: 5, amount: 300.00 },
    { name: "Veg Sweet Corn", qty: 1, amount: 119.00 },
    { name: "Plain Papad", qty: 2, amount: 160.00 },
    { name: "Baked Veg With", qty: 1, amount: 270.00 },
  ];

  const totalAmount = items.reduce((total, item) => total + item.amount, 0);
  const orders = [

    {
      customerName: 'Davis Lipshutz',
      itemName: 'Rice',
      date: '10/02/2024',
      time: '3:45 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500'
    },
    {
      customerName: 'Marcus Dorwart',
      itemName: 'Biryani Rice',
      date: '11/02/2024',
      time: '2:45 PM',
      customerPhone: '98566 85214',
      quantity: '100 G.M',
      totalBill: '₹500'
    },
    {
      customerName: 'Davis Lipshutz',
      itemName: 'Rice',
      date: '10/02/2024',
      time: '3:45 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Marcus Dorwart',
      itemName: 'Biryani Rice',
      date: '11/02/2024',
      time: '2:45 PM',
      customerPhone: '98566 85214',
      quantity: '100 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Angel Bator',
      itemName: 'Noodles',
      date: '12/02/2024',
      time: '5:35 PM',
      customerPhone: '98566 85214',
      quantity: '2K.G',
      totalBill: '₹500',
    },
    {
      customerName: 'Jaydon Rhiel ',
      itemName: 'French Fries',
      date: '13/02/2024',
      time: '2:40 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Leo Carder',
      itemName: 'Burger',
      date: '14/02/2024',
      time: '2:30 PM',
      customerPhone: '98566 85214',
      quantity: '900 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Cristofer Calzoni',
      itemName: 'Pasta',
      date: '15/02/2024',
      time: '2:30 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Wilson Vaccaro',
      itemName: 'Pizza',
      date: '16/02/2024',
      time: '2:30 PM',
      customerPhone: '98566 85214',
      quantity: '800 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Jaxson Culhane',
      itemName: 'Teriyaki Egg',
      date: '17/02/2024',
      time: '5:30 PM',
      customerPhone: '98566 85214',
      quantity: '1K.G',
      totalBill: '₹500',
    },
    {
      customerName: 'Lincoln Dias',
      itemName: 'Rice',
      date: '18/02/2024',
      time: '2:40 PM',
      customerPhone: '98566 85214',
      quantity: '500 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Corey Ekstrom',
      itemName: 'Paneer tandoori',
      date: '19/02/2024',
      time: '8:45 PM',
      customerPhone: '98566 85214',
      quantity: '300 G.M',
      totalBill: '₹500',
    },
    {
      customerName: 'Zain Bator',
      itemName: 'RPaneer Chiliice',
      date: '20/02/2024',
      time: '6:45 PM',
      customerPhone: '98566 85214',
      quantity: '900 G.M',
      totalBill: '₹500',
    },

    
  ];

  return (
    <>
    
      <div className="order-header hello-wold">
        <div>Customer Name</div>
        <div>Item</div>
        <div>Date</div>
        <div>Time</div>
        <div>Phone</div>
        <div>Quantity</div>
        <div>Total Bill</div>
        <div>Actions</div>
      </div>

      <div className="order-list">
        <div className="order-container">

          {orders.map((order, index) => (
            <div className="order-item" key={index}>
              <div>{order.customerName}</div>
              <div>{order.itemName}</div>
              <div>{order.date}</div>
              <div className="Time-background">{order.time}</div>
              <div>{order.customerPhone}</div>
              <div>{order.quantity}</div>
              <div className="total-bill-background" style={{ color: "rgba(57, 151, 61, 1)" }}>
                {order.totalBill}
              </div>
              <div>
                <button className="check-button" onClick={handleShow}>
                  <FaEye />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Parcel Payment Bill</Modal.Title>

              </Modal.Header>
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
            </Modal>
          </>
        </div>
    </div>
    </>
  );
}
export default Pageorder;

