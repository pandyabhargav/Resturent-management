import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Additem.css';
import { FaRegTrashAlt } from "react-icons/fa";

const Additem = () => {
    const [image, setImage] = useState(null);
    const [selectedSpicyLevel, setSelectedSpicyLevel] = useState(''); // State to track selected spicy level
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: '',
    });

    // Handle image drop
    const handleImageDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // Handle file selection from input
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    // Handle spicy level selection
    const handleSpicyLevelChange = (level) => {
        // If the same checkbox is clicked, it will be unselected
        setSelectedSpicyLevel(selectedSpicyLevel === level ? '' : level);
    };

    // Handle form field changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="additem container mt-4">
            {/* Header Section */}
            <div className="add-bg mb-4">
                <div className="row">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h5 mb-0">Add Item</h1>
                        <div className="add-btn d-flex gap-3">
                            <button type="button" className="btn btn-outline-success d-flex align-items-center">
                                <span
                                    className="rounded-circle me-2"
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: 'green',
                                    }}
                                ></span>
                                Veg
                            </button>
                            <button type="button" className="btn btn-outline-danger d-flex align-items-center">
                                <span
                                    className="rounded-circle me-2"
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: 'red',
                                    }}
                                ></span>
                                Non-Veg
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="add-form-bg mb-4">
                <form>
                    {/* Row 1: Item Name, Ingredients, and Price */}
                    <div className="row mb-3 form-row">
                        <div className="col-12 col-md-4">
                            <label htmlFor="itemname" className="form-label">Item Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="itemname"
                                placeholder="Enter item name"
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <label htmlFor="itemingredients" className="form-label">Item Ingredients</label>
                            <input
                                type="text"
                                className="form-control"
                                id="itemingredients"
                                placeholder="Enter ingredients"
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <label htmlFor="itemprice" className="form-label">Item Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="itemprice"
                                placeholder="Enter item price"
                            />
                        </div>
                    </div>

                    {/* Row 2: Add Discount, Item Type */}
                    <div className="row mb-3 form-row">
                        <div className="col-12 col-md-4">
                            <label htmlFor="adddiscount" className="form-label">Add Discount (%)</label>
                            <input
                                type="number"
                                className="form-control"
                                id="adddiscount"
                                placeholder="Enter discount percentage"
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            <label htmlFor="selectitemtype" className="form-label">Select Item Type</label>
                            <select className="form-select" id="selectitemtype">
                                <option value="">Choose Item Type</option>
                                <option value="veg">Veg</option>
                                <option value="non-veg">Non-Veg</option>
                                <option value="special">Special</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-4">
                            <label className="form-label">Spicy Level</label>
                            <div className="d-flex gap-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="lessspicy" />
                                    <label className="form-check-label" htmlFor="lessspicy">Less Spicy</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="regular" />
                                    <label className="form-check-label" htmlFor="regular">Regular</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="extra" />
                                    <label className="form-check-label" htmlFor="extra">Extra</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Image Drop Area */}
                    <div
                        className="row mb-3 drop-area"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '2px dashed #ccc',
                            height: '200px',
                            position: 'relative',
                        }}
                        onDrop={handleImageDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        {image ? (
                            <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                            <p className="text-center">Drop Image Here or Click to Select</p>
                        )}

                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageSelect}
                        />
                    </div>
                </form>
            </div>


            <div className="customization-section mt-4">
                <div className="d-flex gap-3">
                    <div className="form-check spicy-checkbox">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="lessspicy"
                            checked={selectedSpicyLevel === 'lessspicy'}
                            onChange={() => handleSpicyLevelChange('lessspicy')}
                        />
                        <label className="form-check-label" htmlFor="lessspicy">Customization</label>
                    </div>
                </div>
            </div>

            {/* Form Section after Customization Checkbox */}
            {selectedSpicyLevel && (
                <>
                    <div className="customization-form mt-4 p-4" style={{ backgroundColor: 'rgba(31, 29, 43, 1)' }}>
                        <div className="addfood mb-2">
                            <div className="padded-section">
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className='text-light mb-2'>Step 1</h4>
                                        <div className="hea-3">
                                            <form className="form-layout pt-3">
                                                <div className="form-row" style={{ display: "flex", alignItems: "center" }}>

                                                    {/* Customization Title Input */}
                                                    <div className="col-12 col-md-3" style={{ marginRight: "10px" }}>
                                                        <label htmlFor="itemname" className="form-label">Item Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="itemname"
                                                            placeholder="Enter item name"
                                                        />
                                                    </div>

                                                    {/* Checkbox Group for Selection Type */}
                                                    <div className="form-group" style={{ paddingTop: "35px", display: "flex", alignItems: "center" }}>
                                                        <div className='checkbox-group' style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                            <label className='text-light' style={{ display: "flex", alignItems: "center" }}>
                                                                <input type="checkbox" value="multiple" style={{ borderRadius: "100%" }} /> Multiple
                                                            </label>

                                                            <label className='text-light' style={{ display: "flex", alignItems: "center" }}>
                                                                <input type="checkbox" value="single" /> Single
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Add Customization Button */}
                                                    <span className="form-group-1 mt-3 text-end">
                                                        <button
                                                            className="btn-custom col-4"
                                                            style={{
                                                                padding: "4px 8px",
                                                                background: "rgba(202, 146, 61, 1)",
                                                                border: "none",
                                                                borderRadius: "5px",
                                                                color: "#fff",
                                                                marginLeft: '500px',
                                                                fontWeight: "bold",
                                                                cursor: "pointer",
                                                                transition: "background-color 0.3s ease",
                                                            }}>
                                                            Add Customization
                                                        </button>
                                                    </span>

                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                                <br />
                                {/* Customization Inputs in One Row (3 Inputs and Trash Icon Side by Side) */}
                                <div className="padded-section-2 mb-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="addddd p-2">
                                                <form className="form-layout">
                                                    <div className="form-row" style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div className="form-group" style={{ flex: 1, marginRight: "10px" }}>
                                                            <label htmlFor="itemName" className='text-light'>Customization Name</label>
                                                            <input
                                                                type="text"
                                                                id="itemName"
                                                                placeholder="Enter Customization Name"
                                                                className="form-control border-0"
                                                                style={{ background: "rgba(45, 48, 62, 1)" }}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 1, marginRight: "10px" }}>
                                                            <label htmlFor="itemIngredients" className='text-light'>Customization Detail</label>
                                                            <input
                                                                type="text"
                                                                id="itemIngredients"
                                                                placeholder="Enter Customization Detail"
                                                                className="form-control border-0"
                                                                style={{ background: "rgba(45, 48, 62, 1)" }}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <label htmlFor="extraRate" className='text-light'>Extra Rate</label>
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    type="number"
                                                                    id="extraRate"
                                                                    placeholder="Enter Extra Rate"
                                                                    className="form-control border-0"
                                                                    style={{ background: "rgba(45, 48, 62, 1)" }}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="step-icon ">
                                                            <FaRegTrashAlt
                                                                className="text-light iconnn"

                                                            />
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="padded-section-2 mb-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="addddd p-2">
                                                <form className="form-layout">
                                                    <div className="form-row" style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <div className="form-group" style={{ flex: 1, marginRight: "10px" }}>
                                                            <label htmlFor="itemName" className='text-light'>Customization Name</label>
                                                            <input
                                                                type="text"
                                                                id="itemName"
                                                                placeholder="Enter Customization Name"
                                                                className="form-control border-0"
                                                                style={{ background: "rgba(45, 48, 62, 1)" }}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 1, marginRight: "10px" }}>
                                                            <label htmlFor="itemIngredients" className='text-light'>Customization Detail</label>
                                                            <input
                                                                type="text"
                                                                id="itemIngredients"
                                                                placeholder="Enter Customization Detail"
                                                                className="form-control border-0"
                                                                style={{ background: "rgba(45, 48, 62, 1)" }}
                                                            />
                                                        </div>
                                                        <div className="form-group" style={{ flex: 1 }}>
                                                            <label htmlFor="extraRate" className='text-light'>Extra Rate</label>
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    type="number"
                                                                    id="extraRate"
                                                                    placeholder="Enter Extra Rate"
                                                                    className="form-control border-0"
                                                                    style={{ background: "rgba(45, 48, 62, 1)" }}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="step-icon ">
                                                            <FaRegTrashAlt
                                                                className="text-light iconnn"
                                                            />
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 d-flex justify-content-end'>
                                <button className='col-2 '>
                                    + Add steap 2
                                </button>
                                <button className='col-2 bts mx-2'>save</button>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default Additem;
