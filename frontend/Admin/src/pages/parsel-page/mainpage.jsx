import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import './mainpage.css';
import { Link } from 'react-router-dom';
import Pageorder from '../parsel-order/page';
import Pageorder2 from '../parsel-order/parselorder2';


function Page2() {
  const [activeTab, setActiveTab] = useState('tab1');
  const orders = [
    { customerName: 'Davis Lipshutz', itemName: 'Rice', date: '10/02/2024', time: '3:45 PM', customerPhone: '98566 85214', quantity: '500 G.M', totalBill: '₹500' },
    { customerName: 'Marcus Dorwart', itemName: 'Biryani Rice', date: '11/02/2024', time: '2:45 PM', customerPhone: '98566 85214', quantity: '100 G.M', totalBill: '₹500' },
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
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab state when clicked
  };

  return (
    <div className="container par-ord mt-4">
      <div className="tabs mb-3">
        <Link
          to="#tab1"
          className={`tab ${activeTab === 'tab1' ? 'active' : ''} rounded-start`}
          onClick={() => handleTabClick('tab1')}
        >
          Request For Payment
        </Link>
        <Link
          to="#tab2"
          className={`tab ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          In progress
        </Link>
        <Link
          to="#tab3"
          className={`tab ${activeTab === 'tab3' ? 'active' : ''} rounded-end`}
          onClick={() => handleTabClick('tab3')}
        >
          Dilivered
        </Link>
      </div>

      <h1>Parcel Orders</h1>

      {/* Conditional rendering of content based on activeTab */}
      {activeTab === 'tab1' && (
        <Table striped bordered hover responsive className='table-background'>
          <thead>
            <tr>
              <th className='box'>Customer Name</th>
              <th>Item</th>
              <th>Date</th>
              <th>Time</th>
              <th>Phone</th>
              <th>Quantity</th>
              <th className='total-bill-header'>Total Bill</th>
              <th className='box2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className='Parcel-Order' key={index}>
                <td className='Customer-Name'>{order.customerName}</td>
                <td>{order.itemName}</td>
                <td>{order.date}</td>
                <td className="Time-background">{order.time}</td>
                <td>{order.customerPhone}</td>
                <td>{order.quantity}</td>
                <td className="total-bill-background" style={{ color: "rgba(57, 151, 61, 1)" }}>
                  {order.totalBill}
                </td>
                <td>
                  <div className="buttons1">
                    <button className="check-button1">
                      <span className="check-icon"><TiTick /></span>
                    </button>
                    <button className="cross-button1">
                      <span className="cross-icon"><MdCancel /></span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Render other tab content */}
      {activeTab === 'tab2' && <Pageorder />}
      {activeTab === 'tab3' && <Pageorder2 />}
    </div>
  );
}

export default Page2;