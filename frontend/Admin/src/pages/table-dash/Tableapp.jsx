import React, { useState } from 'react';
import './Table.css'; // Import the CSS file
import { Container, Row, Col, Button, Modal, Card } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";

const OnsiteOrder = () => {
    const [show, setShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const tableNumbers = [
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
    ];

    const orders = [
        { amount: '₹ 1136.00', order: '06',numbers:'02' },
        { amount: '₹ 1089.00', order: '09',numbers:'06' },
        { amount: '₹ 3756.00', order: '10',numbers:'09' },
        { amount: '₹ 1689.00', order: '14',numbers:'10' },
        { amount: '₹ 1356.00', order: '02',numbers:'14' },
    ];

    const handleClose = () => setShow(false);
    const handleShow = (order) => {
        setSelectedOrder(order);
        setShow(true);
    };

    return (
        
        <Container className="onsite-order container-1">

            <Container>
                <h2 className="onsite-title-1" style={{ color: "white" }}>
                    Onsite Order
                </h2>
                <Row>
                    <div className="onsite-order" style={{ padding: "20px" }}>
                        <div className="order-item-1" style={{ display: "flex", gap: "35px", flexWrap: "no-wrap", justifyContent: "center" }}>
                            {orders.map((order, index) => (
                                <div
                                    className="bill-paid-container text-center"
                                    style={{
                                    }}
                                    key={index}
                                >
                                    <div className="card-body">
                                        {/* Row for Price and Bill Paid */}
                                        <div
                                            className="d-flex justify-content-between align-items-center mb-3"
                                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                        >
                                            <div className="bill-amount  ">{order.amount}</div>
                                            <button className="bill-paid-button">
                                                Bill Paid
                                            </button>
                                        </div>

                                        {/* Row for View Bill and Number */}
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                        >
                                            <a
                                                href="#"
                                                className="text-info text-decoration-none"
                                                style={{ fontSize: "14px" }}
                                            >
                                                View Bill
                                            </a>
                                            <div className="order-number-bolds" style={{ fontWeight: "bold" }}>
                                                {order.order}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Row>

            </Container>
                <h1 className="onsite-title-1 ">
                    Occupied
                </h1>
            <Row className="order-item-1s">
                <div className="grid-container-1">
                    {orders.map((item, index) => (
                        <div key={index} className="grid-item-1">
                            <div className="order-item-1 ">
                                {/* Total Items and Eye Icon */}
                                <div
                                    className="d-flex justify-content-between align-items-center mb-2"
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                >
                                    <div className="order-number fw-bold">Total Items: </div>
                                    <div className='number'>(02)</div>
                                    <Button size="sm" className="view-bill" onClick={() => handleShow(item)}>
                                        <FaEye />
                                    </Button>
                                </div>

                                {/* Total Bill and Number */}
                                <div
                                    className="d-flex justify-content-between align-items-center mb-2"
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                >
                                    <div className="amount">Total Bill:</div>
                                    <div className="Total" style={{ color: "#CA923D" ,display: "flex", justifyContent: "space-between", alignItems: "center" }}>{item.amount}</div>
                                    <Card.Footer className="bill-date fs-3 text-center">{item.numbers}</Card.Footer>
                                </div>

                                {/* Order Number */}
                            </div>
                        </div>
                    ))}
                </div>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Parcel Payment Bill</Modal.Title>
                </Modal.Header>
                <div className="bill-container">
                    <div className="details">
                        <div className="detail-item">
                            <span>Bill No: </span>
                            <span>GRT1715</span>
                        </div>
                        <div className="detail-item">
                            <span>Date: </span>
                            <span>24/01/2024</span>
                        </div>
                        <div className="detail-item">
                            <span>Time: </span>
                            <span>7:00 PM</span>
                        </div>
                        <div className="detail-item">
                            <span>Customer: </span>
                            <span>98266 66655</span>
                        </div>
                        <div className="detail-item">
                            <span>Name: </span>
                            <span>Chance Geidt</span>
                        </div>
                        <div className="detail-item">
                            <span>Payment: </span>
                            <span className="online">Online</span>
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
                                <tr><td>Jeera Rice</td><td>2</td><td>290.00</td></tr>
                                <tr><td>Veg Manhwa So</td><td>1</td><td>119.00</td></tr>
                                <tr><td>Dal Tadka</td><td>1</td><td>215.00</td></tr>
                                <tr><td>Butter Tandoor</td><td>1</td><td>45.00</td></tr>
                                <tr><td>Garlic Naan</td><td>5</td><td>300.00</td></tr>
                                <tr><td>Veg Sweet Corn</td><td>1</td><td>119.00</td></tr>
                                <tr><td>Plain Papad</td><td>2</td><td>160.00</td></tr>
                                <tr><td>Baked Veg With</td><td>1</td><td>270.00</td></tr>
                                <tr><td>Biryani Rice</td>
                                    <td>2</td>
                                    <td>315.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="invoice-summary">
                        <h3 className="section-title">Total Amount <span>₹ 1315.00</span></h3>
                        <div className="amount-details">
                            <div className="row"><span>SGST 2.5%:</span><span>₹ 32.88</span></div>
                            <div className="row"><span>CGST 2.5%:</span><span>₹ 32.88</span></div>
                        </div>
                        <h3 className="section-title">Grand Total Amount</h3>
                        <div className="grand-total"><span>₹ 1381.00</span></div>
                    </div>
                </div>
            </Modal>

            <div className="vacate-container text-center">
                <h1 className='onsite-title-1 ' cals style={{  color: "white", marginBottom: "20px" }}>Vacate</h1>
                <div className="grid-container-1">
                    {Array.from({ length: 20 }, (_, index) => (
                        <div className="table-cell" key={index}>
                            <div className="table-content">
                                <span className="small-text">Table No</span>
                                <span className="large-text">{index + 11}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </Container>
    );
};

export default OnsiteOrder;
