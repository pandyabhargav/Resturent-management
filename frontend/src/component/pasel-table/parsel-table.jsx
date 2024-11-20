import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { TiTick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import './Prsel-tab.css';
// function Page() {
//   const [actionCount, setActionCount] = useState(0);
//   const [orders, setOrders] = useState([
//     // your orders data...
//   ]);

//   const handleActionClick = () => {
//     setActionCount(prevCount => prevCount + 1);
//   };

//   const handleReset = () => {
//     setActionCount(0);
//   };

//   const handlePaymentRequest = (index) => {
//     const updatedOrders = [...orders];
//     updatedOrders[index].paymentRequested = true;
//     setOrders(updatedOrders);
//   };

//   const handleDelivery = (index) => {
//     const updatedOrders = [...orders];
//     updatedOrders[index].delivered = true;
//     setOrders(updatedOrders);
//   };

  // return (
    
    // <div className='form-parcel'>
    //   <div className="app-container">
    //     <div className="action-button-container">
    //       <h1>Action</h1>
    //       <div>
    //         <button onClick={handleActionClick} className="action-btn success-btn">✔</button>
    //         <button onClick={handleReset} className="action-btn reset-btn">Reset</button>
    //         <button disabled={actionCount === 0} className="action-btn danger-btn">❌</button>
    //       </div>
    //       <p>Action count: {actionCount}</p>
    //       {actionCount > 0 && (
    //         <p className="feedback-message">You have performed the action {actionCount} times!</p>
    //       )}
    //     </div>

    //     <div className="parcel-order-container">
    //       <h1>Parcel Orders</h1>
    //       <Table responsive>
    //         <thead>
    //           <tr>
    //             <th>Customer Name</th>
    //             <th>Item</th>
    //             <th>Date</th>
    //             <th>Time</th>
    //             <th>Phone</th>
    //             <th>Quantity</th>
    //             <th>Total Bill</th>
    //             <th>Status</th>
    //             <th>Payment Requested</th>
    //             <th>Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {orders.map((order, index) => (
    //             <tr key={order.id}>
    //               <td>{order.customerName}</td>
    //               <td>{order.itemName}</td>
    //               <td>{order.date}</td>
    //               <td>{order.time}</td>
    //               <td>{order.customerPhone}</td>
    //               <td>{order.quantity}</td>
    //               <td>{order.totalBill}</td>
    //               <td>{order.delivered ? 'Delivered' : 'In Progress'}</td>
    //               <td>{order.paymentRequested ? 'Yes' : 'No'}</td>
    //               <td>
    //                 {!order.delivered && (
    //                   <button className="deliver-button" onClick={() => handleDelivery(index)}>Mark as Delivered</button>
    //                 )}
    //                 {!order.paymentRequested && order.delivered && (
    //                   <button className="payment-button" onClick={() => handlePaymentRequest(index)}>Request Payment</button>
    //                 )}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </Table>
    //     </div>
    //   </div>
    // </div>
    function ParselTable() {
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
        // Add more orders...
      ];
    
      return (
        <div className="container parsel-table mt-4">
          <h1 className="text-center">Parcel Orders</h1>
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
                  <td className='Customer-Name' >{order.customerName}</td>
                  <td>{order.itemName}</td>
                  <td>{order.date}</td>
                  <td className="Time-background">{order.time}</td>
                  <td>{order.customerPhone}</td>
                  <td>{order.quantity}</td>
                  <td className="total-bill-background" style={{color:"rgba(57, 151, 61, 1)"}}>{order.totalBill}</td> {/* Apply new class here */}
                  <td>
                    <div className="buttons ">
                      <button className="check-button">
                        <span className="check-icon"><TiTick /></span>
                        
                      </button>
                      <button className="cross-button">
                        <span className="cross-icon"><MdCancel /></span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
//   );
// }
export default ParselTable;