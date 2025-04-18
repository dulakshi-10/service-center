import React, { useState } from "react";
import './OrderForm.css';

const OrderForm = () => {
  const [selectedWashingService, setSelectedWashingService] = useState("");
  const [selectedOilService, setSelectedOilService] = useState("");
  const [selectedOtherService, setSelectedOtherService] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  const handleWashingSelect = (service) => {
    setSelectedWashingService(service);
  };

  const handleOilSelect = (service) => {
    setSelectedOilService(service);
  };

  const handleOtherSelect = (service) => {
    setSelectedOtherService(service);
  };

  const handleNoteChange = (e) => {
    setAdditionalNote(e.target.value);
  };

  return (
    <div className="form-box">
      <center><h2>Order Service</h2></center>

      {/* Washing Dropdown */}
      <div className="item-wrapper">
        <label className="manage-vehicle-label">
          <b>Select Washing Type</b>
        </label>
        <select
          value={selectedWashingService}
          onChange={(e) => handleWashingSelect(e.target.value)}
          className="vehicle-management-select"
        >
          <option value="">Select</option>
          <option value="Full Washing">Full Washing</option>
          <option value="Exterior Washing">Exterior Washing</option>
          <option value="Interior Washing">Interior Washing</option>
        </select>
      </div>

      {/* Oil Check Dropdown */}
      <div className="item-wrapper" style={{ marginTop: "15px" }}>
        <label className="manage-vehicle-label">
          <b>Select Oil Check Type</b>
        </label>
        <select
          value={selectedOilService}
          onChange={(e) => handleOilSelect(e.target.value)}
          className="vehicle-management-select"
        >
          <option value="">Select</option>
          <option value="Petrol Oil Check">Petrol Oil Check</option>
          <option value="Diesel Oil Check">Diesel Oil Check</option>
        </select>
      </div>

      {/* Other Services (as list) */}
      <div style={{ marginTop: "15px" }}>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {["Engine Check", "Gearbox & Brake Check"].map((item) => (
            <li
              key={item}
              onClick={() => handleOtherSelect(item)}
              className={selectedOtherService === item ? 'selected' : ''}
              style={{
                cursor: "pointer", 
                marginBottom: "8px", 
                fontWeight: ["Engine Check", "Gearbox & Brake Check"].includes(item) ? 'bold' : 'normal'
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Show form if selected */}
      {(selectedWashingService || selectedOilService || selectedOtherService) && (
        <>
          <br></br>
          <div className="date-class">
            <label><b>Date:</b></label>
            <input
              type="date"
              min={today}
              max={`${currentMonth}-31`}
            />
          </div>
         

          <div className="time-class">
            <label><b>Time:</b></label>
            <input type="time" step="1" />
          </div>

        <br></br>

          <div className="note-class">
            <label htmlFor="note"><b>Additional Note:</b></label>
            
            <textarea
              id="note"
              rows="4"
              cols="45"
              placeholder="Any special requests..."
              value={additionalNote}
              onChange={handleNoteChange}
            ></textarea>
          </div>
          
        </>
      )}

      <center>
        <div className="button-wrapper">
          <button className="submit-button"><b>Submit Order</b></button>
          <button className="cancel-button"><b>Cancel</b></button>
        </div>
      </center>
    </div>
  );
};

export default OrderForm;

