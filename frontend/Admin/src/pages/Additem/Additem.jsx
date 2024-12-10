import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Additem.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const Additem = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const category = location.state?.category;
  const [stepErrors, setStepErrors] = useState({}); // Track errors by step index

  const [selectedCustomization, setSelectedCustomization] = useState(false);
  const [formData, setFormData] = useState({
    category: category,
    name: "",
    ingredients: "",
    price: "",
    discount: "",
    options: "",
    itemType: "Veg",
    type: "",
    image: "",
  });

  // Handle form field change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle spicy level change
  const handleSpicyLevelChange = (level) => {
    setFormData((prevData) => ({
      ...prevData,
      options: prevData.options === level ? "" : level, // Toggle between levels
    }));
  };

  const handleItemType = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      itemType: prevData.itemType === type ? "" : type, // Toggle between itemtypes
    }));
  };

  const handleCheckboxChange = () => {
    setSelectedCustomization((prev) => !prev);
  };

  // const handleImageDrop = (e) => {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
  //   if (file) {
  //     setImage(URL.createObjectURL(file));
  //   }
  // };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log
      ("Please select an image.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("JWT token is missing");
      setLoading(false);
      return;
    }
    try {
      console.log("Uploading image...");
      const imageResponse = await axios.post(
        `${BASE_URL}/api/v1/upload/img-upload`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (imageResponse.data.success === true) {
        const imageUrl = imageResponse.data.imagePath;
        setFormData((prevData) => ({
          ...prevData,
          image: imageUrl, // Save the uploaded image URL to the formData
        }));

        console.log("Image uploaded successfully:", imageUrl);
      } else {
        console.log("Error uploading image. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
      console.log("Failed to upload image. Please try again.");
    }
  };

  const [steps, setSteps] = useState([
    {
      stepName: "Step 1",
      customizations: [{ name: "", detail: "", rate: "" }],
    },
  ]);

  // const handleCustomizationSelection = (stepIndex, type) => {
  //   const updatedSteps = [...steps];
  //   updatedSteps[stepIndex].selection = type;
  //   setSteps(updatedSteps);
  // };

  const handleCustomizationSelection = (stepIndex, selection) => {
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps];
      updatedSteps[stepIndex].selection = selection;
      return updatedSteps;
    });

    // Clear any existing error when a valid selection is made
    setStepErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[stepIndex]; // Remove the error for this step
      return updatedErrors;
    });
  };

  const handleInputChange = (stepIndex, customIndex, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].customizations[customIndex][field] = value;
    setSteps(updatedSteps);
  };

  const addStep = () => {
    if (!selectedCustomization) {
      setSelectedCustomization(true);
      const newStep = {
        stepName: `Step 1`,
        customizations: [{ name: "", detail: "", rate: "" }],
      };
      setSteps([newStep]); // Set the steps with only the first step
    } else {
      // If the checkbox is already checked, add subsequent steps
      const newStep = {
        stepName: `Step ${steps.length + 1}`,
        customizations: [{ name: "", detail: "", rate: "" }],
      };
      setSteps([...steps, newStep]);
    }
  };

  // const addStep = () => {
  //   const newStep = {
  //     stepName: `Step ${steps.length + 1}`,
  //     customizations: [{ name: "", detail: "", rate: "" }],
  //   };
  //   setSteps([...steps, newStep]);
  //   setSelectedCustomization(true);
  // };

  const deleteStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const addCustomization = (stepIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].customizations.push({
      name: "",
      detail: "",
      rate: "",
    });
    setSteps(updatedSteps);
  };

  const removeCustomization = (stepIndex, customIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].customizations = updatedSteps[
      stepIndex
    ].customizations.filter((_, index) => index !== customIndex);
    setSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("JWT token is missing");
      setLoading(false);
      return;
    }
    // const invalidSteps = {};
    // steps.forEach((step, index) => {
    //   if (!step.selection) {
    //     invalidSteps[index] = "Please select either 'Multiple' or 'Single'.";
    //   }
    // });

    // // If there are any invalid steps, set the errors
    // if (Object.keys(invalidSteps).length > 0) {
    //   setStepErrors(invalidSteps);
    //   return;
    // }

    try {
      const customizationData = steps.map((step) => ({
        title: step.title,
        selection: step.selection, // Default to Single if not selected
        list: step.customizations.map((custom) => ({
          name: custom.name,
          detail: custom.detail,
          extraRate: custom.rate,
        })),
      }));
      console.log("customizationData", customizationData);

      // if (
      //   customizationData.selection !== undefined &&
      //   customizationData.title !== undefined
      // ) {
      //   formPayload.customization = customizationData;
      // }
      // Prepare formPayload without customization initially
      // const formPayload = {
      //   ...formData,
      //   price: Number(formData.price),
      //   discount: Number(formData.discount),
      //   customization: customizationData
      // };

      // Check if customizationData has valid content
      const hasValidCustomizations = customizationData.some(
        (step) =>
          step.title && // Ensure the step has a title
          step.list.length > 0 && // Ensure there are customizations
          step.list.some((custom) => custom.name || custom.detail || custom.extraRate) // At least one valid customization field
      );

      // Prepare formPayload
      const formPayload = {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        ...(hasValidCustomizations && { customization: customizationData }), // Conditionally add customization
      };
      console.log("formPayload", formPayload);

      const itemAddResponse = await axios.post(
        `${BASE_URL}/api/v1/item/restaurantitem-add`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Item added successfully:", itemAddResponse.data);
      console.log("Item added successfully!");

      setTimeout(() => {
        navigate("/managemenu"); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error(
        "Error adding items:",
        error.response?.data || error.message
      );
      console.log("Error adding items. Please try again.");
    }
  };

  return (
    <div className="additem container mt-4">
      <form>
        <div className="add-bg mb-4">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h5 mb-0">Add Item</h1>
              <div className="add-btn d-flex gap-3">
                <button
                  type="button"
                  className={`btn d-flex align-items-center ${formData.itemType === "Veg"
                    ? "btn-success"
                    : "btn-outline-success"
                    }`}
                  onClick={() => handleItemType("Veg")}
                >
                  <span
                    className="rounded-circle me-2"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "green",
                    }}
                  ></span>
                  Veg
                </button>

                <button
                  type="button"
                  className={`btn d-flex align-items-center ${formData.itemType === "Nonveg" ? "btn-danger" : "btn-outline-danger"
                    }`}
                  onClick={() => handleItemType("Nonveg")}
                >
                  <span
                    className="rounded-circle me-2"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "red",
                    }}
                  ></span>
                  Non-Veg
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="add-form-bg mb-4">
          <div className="row mb-3 form-row">
            <div className="col-12 col-md-4">
              <label htmlFor="itemname" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                className="form-control"
                id="itemname"
                placeholder="Enter item name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="itemingredients" className="form-label">
                Item Ingredients
              </label>
              <input
                type="text"
                className="form-control"
                id="itemingredients"
                placeholder="Enter ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="itemprice" className="form-label">
                Item Price
              </label>
              <input
                type="number"
                className="form-control"
                id="itemprice"
                placeholder="Enter item price"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <div className="row mb-3 form-row">
            <div className="col-12 col-md-4">
              <label htmlFor="adddiscount" className="form-label">
                Add Discount (%)
              </label>
              <input
                type="number"
                className="form-control"
                id="adddiscount"
                placeholder="Enter discount percentage"
                name="discount"
                value={formData.discount}
                onChange={handleFormChange}
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="selectitemtype" className="form-label">
                Select Item Type
              </label>
              <select
                className="form-select"
                id="selectitemtype"
                value={formData.type || ""}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="">Choose Item Type</option>
                <option value="Spicy">Spicy</option>
                <option value="Sweet">Sweet</option>
              </select>
            </div>

            <div className="col-12 col-md-4">
              {/* <label className="form-label">Spicy Level</label> */}
              <label className="form-label"></label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Less"
                    checked={formData.options === "Less"}
                    onChange={() => handleSpicyLevelChange("Less")}
                  />
                  <label className="form-check-label" htmlFor="Less">
                    Less Spicy
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Regular"
                    checked={formData.options === "Regular"}
                    onChange={() => handleSpicyLevelChange("Regular")}
                  />
                  <label className="form-check-label" htmlFor="Regular">
                    {" "}
                    Regular
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="Extra"
                    checked={formData.options === "Extra"}
                    onChange={() => handleSpicyLevelChange("Extra")}
                  />
                  <label className="form-check-label" htmlFor="Extra">
                    Extra
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row mb-3 drop-area"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px dashed #ccc",
              height: "200px",
            }}
            onClick={() => document.getElementById("fileInput").click()}
          >
            {formData.image ? (
              <img
                src={formData.image}
                alt="Uploaded"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <p className="text-center">Drop Image Here or Click to Select</p>
            )}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageSelect}
            />
          </div>
        </div>

        {/* Customization Form */}
        <div className="customization-section mt-4">
          <div className="d-flex gap-3">
            <div className="form-check spicy-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                id="customization"
                checked={selectedCustomization}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="lessspicy">
                Customization
              </label>
            </div>
          </div>
        </div>

        {selectedCustomization && (
          <>
            {steps.map((step, stepIndex) => (
              <div
                className="customization-form mt-4 p-4"
                style={{ backgroundColor: "rgba(31, 29, 43, 1)" }}
                key={stepIndex}
              >
                <div className="addfood mb-2">
                  <div className="padded-section">
                    <div className="row">
                      <div className="col-12">
                        <div
                          className="d-flex justify-content-between align-items-center mb-2"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h4 className="text-light mb-2">{step.stepName}</h4>
                          <button
                            className="col-1"
                            style={{
                              padding: "8px 16px",
                              background: "transparent",
                              border: "2px solid #dc3545",
                              borderRadius: "5px",
                              color: "#fff",
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#dc3545"; // Match the border color
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent"; // Revert to transparent
                            }}
                            onClick={() => deleteStep(stepIndex)}
                          >
                            Delete step
                          </button>
                        </div>

                        <div className="hea-3">
                          <div className="form-layout pt-3">
                            <div
                              className="form-row"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div
                                className="col-12 col-md-3"
                                style={{ marginRight: "10px" }}
                              >
                                <label
                                  htmlFor={`itemname-${stepIndex}`}
                                  className="form-label"
                                >
                                  Item Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id={`itemname-${stepIndex}`}
                                  placeholder="Enter item name"
                                  value={step.title}
                                  onChange={(e) => {
                                    const updatedSteps = [...steps];
                                    updatedSteps[stepIndex].title =
                                      e.target.value;
                                    setSteps(updatedSteps);
                                  }}
                                />
                              </div>
                              <div
                                className="form-group"
                                style={{
                                  paddingTop: "35px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className="checkbox-group"
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                  }}
                                >
                                  <label
                                    className="text-light"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      value="multiple"
                                      style={{ borderRadius: "100%" }}
                                      checked={step.selection === "Multiple"}
                                      onChange={() =>
                                        handleCustomizationSelection(
                                          stepIndex,
                                          "Multiple"
                                        )
                                      }
                                    />{" "}
                                    Multiple
                                  </label>

                                  <label
                                    className="text-light"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      value="single"
                                      checked={step.selection === "Single"}
                                      onChange={() =>
                                        handleCustomizationSelection(
                                          stepIndex,
                                          "Single"
                                        )
                                      }
                                    />{" "}
                                    Single
                                  </label>
                                </div>
                                {/* Show error message for this specific step if no option is selected */}
                                {stepErrors[stepIndex] && (
                                  <div
                                    style={{ color: "red", marginTop: "10px" }}
                                  >
                                    {stepErrors[stepIndex]}
                                  </div>
                                )}
                              </div>
                              {/* Add Customization Button */}
                              <div className="form-group-1 mt-3 text-end">
                                <button
                                  className="btn-custom col-3"
                                  style={{
                                    padding: "8px 16px",
                                    background: "rgba(202, 146, 61, 1)",
                                    border: "none",
                                    borderRadius: "5px",
                                    color: "#fff",
                                    marginLeft: "500px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease",
                                  }}
                                  onClick={() => addCustomization(stepIndex)}
                                  type="button"
                                >
                                  Add Customization
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="padded-section-2 mb-2">
                      <div className="row">
                        <div className="col-12">
                          <div className="addddd p-2">
                            <div className="form-layout">
                              {step.customizations.map(
                                (custom, customIndex) => (
                                  <div
                                    className="form-row"
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      marginBottom: "10px",
                                    }}
                                    key={customIndex}
                                  >
                                    <div
                                      className="form-group"
                                      style={{ flex: 1, marginRight: "10px" }}
                                    >
                                      <label
                                        htmlFor={`name-${stepIndex}-${customIndex}`}
                                        className="text-light"
                                      >
                                        Customization Name
                                      </label>
                                      <input
                                        type="text"
                                        id={`name-${stepIndex}-${customIndex}`}
                                        placeholder="Enter Customization Name"
                                        className="form-control border-0"
                                        style={{
                                          background: "rgba(45, 48, 62, 1)",
                                        }}
                                        value={custom.name}
                                        onChange={(e) =>
                                          handleInputChange(
                                            stepIndex,
                                            customIndex,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group"
                                      style={{ flex: 1, marginRight: "10px" }}
                                    >
                                      <label
                                        htmlFor={`detail-${stepIndex}-${customIndex}`}
                                        className="text-light"
                                      >
                                        Customization Detail
                                      </label>
                                      <input
                                        type="text"
                                        id={`detail-${stepIndex}-${customIndex}`}
                                        placeholder="Enter Customization Detail"
                                        className="form-control border-0"
                                        style={{
                                          background: "rgba(45, 48, 62, 1)",
                                        }}
                                        value={custom.detail}
                                        onChange={(e) =>
                                          handleInputChange(
                                            stepIndex,
                                            customIndex,
                                            "detail",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div
                                      className="form-group"
                                      style={{ flex: 1 }}
                                    >
                                      <label
                                        htmlFor={`rate-${stepIndex}-${customIndex}`}
                                        className="text-light"
                                      >
                                        Extra Rate
                                      </label>
                                      <div style={{ position: "relative" }}>
                                        <input
                                          type="number"
                                          id={`rate-${stepIndex}-${customIndex}`}
                                          placeholder="Enter Extra Rate"
                                          className="form-control border-0"
                                          style={{
                                            background: "rgba(45, 48, 62, 1)",
                                          }}
                                          value={custom.rate}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            const numericValue =
                                              value === "" ? "" : Number(value);
                                            handleInputChange(
                                              stepIndex,
                                              customIndex,
                                              "rate",
                                              numericValue
                                            );
                                          }}
                                          min="0"
                                        />
                                      </div>
                                    </div>
                                    <div className="step-icon">
                                      <FaRegTrashAlt
                                        className="text-light iconnn"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          removeCustomization(
                                            stepIndex,
                                            customIndex
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <div
          className="step-btn d-flex mt-3"
          style={{ gap: "16px", marginLeft: "990px" }}
        >
          <button
            className="btn-custom"
            style={{
              padding: "8px 16px",
              background: "rgba(202, 146, 61, 1)",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={addStep}
            type="button"
          >
            Add Step
          </button>
          <button
            className="btn-custom"
            style={{
              padding: "8px 16px",
              background: "rgba(202, 146, 61, 1)",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleSubmit}
            type="button"
          >
            Save Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Additem;
