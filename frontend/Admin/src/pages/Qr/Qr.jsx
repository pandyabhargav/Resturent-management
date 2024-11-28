import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Modal, Button } from 'react-bootstrap';
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import './Qr.css';
import qrimg from '../../assets/qr1.png';


const Qr = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [showMenuIndex, setShowMenuIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  

  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

 
  const handleDotsClick = (index) => {
    setShowMenuIndex(showMenuIndex === index ? null : index);
  };

  
  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIndex(null);
  };

 
  const handleConfirmDelete = () => {
   
    console.log(`Deleting QR Code at index ${selectedIndex}`);
    setShowModal(false);
  };


  const QRCard = ({ index, isTab2 }) => (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-4 qr" key={index}>
      <Card style={{ width: '18rem' }} className="mb-4 qr">
        <Card.Header className='.card-header'>
          {isTab2 ? `Counter No ${index + 1}` : `Table No ${index + 1}`}
          <div className="vertical-dots" onClick={() => handleDotsClick(index)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
         
          {showMenuIndex === index && (
            <div className="dots-menu">
              <button className="btn btn-outline-primary btn-block">Edit</button>
              <button className="btn btn-outline-danger btn-block" onClick={() => handleDeleteClick(index)}>
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </Card.Header>
        <div className="menubody" style={{ backgroundColor: 'rgba(31, 29, 43, 1)' }}>
       
          <Card.Img variant="top" src={qrimg} />
        </div>
      </Card>
    </div>
  );

  return (
    <>
      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab1')}
          >
            Tab 1
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}
            onClick={() => handleTabClick('tab2')}
          >
            Tab 2
          </button>
        </li>
      </ul>
      <div className="qr-wrapper container">
        <div className="row">
          <div className="col-12">
            <div className="tab-content mt-4">
              {activeTab === 'tab1' && (
                <div className="tab-pane1 fade show active">
                  <div className="d-flex mb-4 justify-content-between">
                    <h3>QR Code</h3>
                    <button className="qrbtn col-2">
                      <span style={{ fontSize: '24px', lineHeight: '1', marginRight: '10px' }}>
                        <FaSquarePlus />
                      </span>
                      Create QR Code
                    </button>
                  </div>
                  <div className="row">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <QRCard key={index} index={index} isTab2={false} />
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'tab2' && (
                <div className="tab-pane2 fade show active">
                  <div className="d-flex mb-4 justify-content-between">
                    <h3>QR Code</h3>
                    <button className="qrbtn col-2">
                      <span style={{ fontSize: '24px', lineHeight: '1', marginRight: '10px' }}>
                        <FaSquarePlus />
                      </span>
                      Create QR Code
                    </button>
                  </div>
                  <div className="row">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <QRCard key={index} index={index} isTab2={true} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <FaTrash style={{ marginRight: '10px', fontSize: '24px' }} />
            Delete QR Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
         
          <div
            style={{
              display: 'inline-block',
              backgroundColor: 'red',
              borderRadius: '50%',
              padding: '30px',
              marginBottom: '20px',
            }}
          >
            <FaTrash style={{ fontSize: '60px', color: 'white' }} />
          </div>

          <h3>Delete This QR Code</h3>

          <p style={{ fontSize: '18px', color: '#fff' }}>
            Are you sure you want to delete this item?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Qr;
