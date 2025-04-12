import React, { useState } from "react";
import './OrderForm.css';  // Import the CSS file

const OrderForm = () => {
  const [selectedService, setSelectedService] = useState("");

  // Define grouped services
  const serviceGroups = [
    {
      group: "Washing",
      items: ["Full Washing", "Exterior Washing", "Interior Washing"],
    },
    {
      group: "Oil Check",
      items: ["Petrol Oil Check", "Diesel Oil Check"],
    },
  ];

  // Define ungrouped services separately
  const standaloneServices = ["Engine Check", "Gearbox & Brake Check"];

  // Get today's date and current month in YYYY-MM format
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Handle service click
  const handleSelect = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="form-box">
      <h2>Order Service</h2>

      {/* Custom service list */}
      <p>Select a Service:</p>

      {/* Display grouped services (Washing, Oil Check) */}
      {serviceGroups.map((group) => (
        <div key={group.group}>
          <strong>{group.group}</strong>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {group.items.map((item) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className={selectedService === item ? 'selected' : ''}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Display ungrouped services separately */}
      <div style={{ marginTop: "10px" }}>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {standaloneServices.map((item) => (
            <li
              key={item}
              onClick={() => handleSelect(item)}
              className={selectedService === item ? 'selected' : ''}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Show date/time form only if a service is selected */}
      {selectedService && (
        <>
          <br />
          <label>Date:</label>
          <input
            type="date"
            min={today} // Restricts to today's date onwards
            max={`${currentMonth}-31`} // Restricts to the current month (end of the month)
          />

          <label>Time:</label>
          <input type="time" step="1" />

          <br />

          <label htmlFor="note">Additional Note:</label>
          <br />
          <textarea
            id="note"
            rows="7"
            cols="50"
            placeholder="Any special requests..."
          ></textarea>
          <br />
          <br />

          <button>Submit Order</button>
          <button style={{ marginLeft: "10px" }}>Cancel</button>
        </>
      )}

      {/* Display dynamic messages based on selected service */}
      {selectedService && (
        <p className="selected-service-message">
          {selectedService === "Engine Check" && "Engine will be inspected by a certified mechanic."}
          {selectedService === "Petrol Oil Check" && "We will check and top up petrol engine oil."}
          {selectedService === "Diesel Oil Check" && "We will check and top up diesel engine oil."}
          {selectedService === "Gearbox & Brake Check" && "We will inspect the gearbox and brakes for any issues."}
          {selectedService === "Full Washing" && "Full vehicle washing will be done, inside and out."}
          {selectedService === "Exterior Washing" && "Exterior of the vehicle will be cleaned thoroughly."}
          {selectedService === "Interior Washing" && "Interior cleaning will include vacuuming and wipe down."}
        </p>
      )}
    </div>
  );
};

export default OrderForm;
