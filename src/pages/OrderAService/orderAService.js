import React, { useState } from "react";
import { useUser } from '../../context/UserContext';
import toast, { Toaster } from 'react-hot-toast';
import './OrderForm.css';

const OrderService = () => {
  const [selectedVehicleNumber, setSelectedVehicleNumber] = useState("");
  const [selectedWashingService, setSelectedWashingService] = useState("");
  const [selectedOilService, setSelectedOilService] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { user } = useUser();
  const handleServiceToggle = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleWashingSelect = (service) => {
    setSelectedWashingService(service);
  };

  const handleVehicleNumber = (service) => {
    setSelectedVehicleNumber(service);
  };

  const handleOilSelect = (service) => {
    setSelectedOilService(service);
  };

  const handleNoteChange = (e) => {
    setAdditionalNote(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const onOrderSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      "userId": user.id,
      "vehicleId": selectedVehicleNumber,
      "washingType": selectedWashingService,
      "oilCheckType": selectedOilService,
      "additionalServices": selectedServices.join(", "),
      "orderDate": selectedDate,
      "orderTime": selectedTime,
      "additionalNote": additionalNote,
      "email": user.email,
      "isAdvancePaid": 1
    }
    try {
      // Send the POST request to the backend
      const response = await fetch('/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Handle response from the backend
      if (response.ok) {
        const data = await response.json();
        toast(data.message);
      } else {
        const errorData = await response.json();
        toast(`Error: ${errorData.message || 'Something went wrong'}`);

      }
    } catch (error) {
      toast('Error during Login. Please try again later.');
    }
  };

  return (
    <div className="form-box">
      <Toaster position="top-right" toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }} />
      <div className="vehicle-management-title" style={{ marginBottom: 30 }}>
        <h2>Order Service</h2>
      </div>
      {/* Washing Dropdown */}
      <div style={{ marginLeft: 30 }}>
        <div className="item-wrapper">
          <label className="manage-vehicle-label">
            <b>Select Vehicle</b>
          </label>
          <select
            value={selectedVehicleNumber}
            onChange={(e) => handleVehicleNumber(e.target.value)}
            className="vehicle-management-select"
          >
            <option value="">Select</option>
            <option value="CAD - 5467">CAD - 5467</option>
            <option value="TFF - 6654">TFF - 6654</option>
            <option value="HED - 5542">HED - 5542</option>
          </select>
        </div>

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

        {/* Vehicle Services Section */}
        <div className="item-wrapper" style={{ marginTop: "15px" }}>
          <label className="manage-vehicle-label">
            <b>Select Additional Services</b>
          </label>
          <div style={{
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "flex-start" // or "center" or "stretch" as needed
}}>

            {[
              "Tire Rotation",
              "Brake Inspection",
              "Battery Check",
              "Air Filter Replacement",
              "Coolant Flush",
              "Transmission Service",
              "Spark Plug Replacement",
              "AC Service",
              "Headlight Restoration",
              "Wheel Alignment",
            ].map((service) => (
              <div key={service} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id={service}
                  value={service}
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <label htmlFor={service} style={{ marginLeft: "5px" }}>
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Show form if selected */}
        <div className="date-class item-wrapper">
          <label><b>Date:</b></label>
          <input
            type="date"
            min={today}
            max={`${currentMonth}-31`}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="time-class item-wrapper">
          <label><b>Time:</b></label>
          <input type="time" step="60" value={selectedTime}
            onChange={handleTimeChange} />
        </div>

        <div className="note-class item-wrapper">
          <label htmlFor="note"><b>Additional Note:</b></label>

          <textarea
            id="note"
            rows="4"
            cols="60"
            placeholder="Any special requests..."
            value={additionalNote}
            onChange={handleNoteChange}
          ></textarea>
        </div>

        <div className="credit-card-section" style={{ marginTop: "30px" }}>
        <h3>Payment Details</h3>
        <div className="item-wrapper">
          <label htmlFor="creditCardNumber"><b>Credit Card Number</b></label>
          <input
            type="text"
            id="creditCardNumber"
            placeholder="1234 5678 9101 1121"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            className="vehicle-management-input"
          />
        </div>
        <div className="item-wrapper">
          <label htmlFor="expirationDate"><b>Expiration Date</b></label>
          <input
            type="month"
            id="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="vehicle-management-input"
          />
        </div>
        <div className="item-wrapper">
          <label htmlFor="cvv"><b>CVV</b></label>
          <input
            type="password"
            id="cvv"
            placeholder="123"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className="vehicle-management-input"
          />
        </div>
        <div className="item-wrapper">
          <label htmlFor="cvv" style={{fontSize: 20, backgroundColor: "#ffdf01"}}><b>Advance Payment of Rs 500.00, will be deducted from your account.</b></label>
        </div>
      </div>

        <div className="button-wrapper">
          <button className="submit-button" onClick={onOrderSubmit}><b>Submit Order</b></button>
        </div>
      </div>
    </div>
  );
};

export default OrderService;

