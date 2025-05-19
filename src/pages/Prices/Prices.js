import React from "react";
import './Prices.css';

const servicePrices = {
  washing: [
    { type: "Sedan", full: 1500, exterior: 1000, interior: 800 },
    { type: "SUV", full: 2000, exterior: 1300, interior: 1000 },
    { type: "Luxury", full: 2500, exterior: 1800, interior: 1500 }
  ],
  oilCheck: [
    { type: "Sedan", petrol: 1200, diesel: 1400 },
    { type: "SUV", petrol: 1500, diesel: 1800 },
    { type: "Luxury", petrol: 2000, diesel: 2500 }
  ],
  engineCheck: [
    { type: "Sedan", price: 3000 },
    { type: "SUV", price: 3500 },
    { type: "Luxury", price: 5000 }
  ],
  gearboxCheck: [
    { type: "Sedan", price: 2500 },
    { type: "SUV", price: 3000 },
    { type: "Luxury", price: 4000 }
  ],
  brakeCheck: [
    { type: "Sedan", price: 1800 },
    { type: "SUV", price: 2000 },
    { type: "Luxury", price: 2500 }
  ],
  fullService: [
    { type: "Sedan", total: 10000 },
    { type: "SUV", total: 12000 },
    { type: "Luxury", total: 16000 }
  ]
};

function Prices() {
  return (
    <div className="prices-container">
      <h2>Washing Service Prices</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Full</th>
            <th>Exterior</th>
            <th>Interior</th>
          </tr>
        </thead>
        <tbody>
          {servicePrices.washing.map((item, idx) => (
            <tr key={idx}>
              <td>{item.type}</td>
              <td>Rs. {item.full}</td>
              <td>Rs. {item.exterior}</td>
              <td>Rs. {item.interior}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* If you want, you can add other service details here in a similar way */}
      <h2>Oil Check Prices</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Petrol</th>
            <th>Diesel</th>
          </tr>
        </thead>
        <tbody>
          {servicePrices.oilCheck.map((item, idx) => (
            <tr key={idx}>
              <td>{item.type}</td>
              <td>Rs. {item.petrol}</td>
              <td>Rs. {item.diesel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Engine Check */}
      <h2>Engine Check Prices</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {servicePrices.engineCheck.map((item, idx) => (
            <tr key={idx}>
              <td>{item.type}</td>
              <td>Rs. {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Gearbox Check */}
      <h2>Gearbox Check Prices</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {servicePrices.gearboxCheck.map((item, idx) => (
            <tr key={idx}>
              <td>{item.type}</td>
              <td>Rs. {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Brake Check */}
      <h2>Brake Check Prices</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {servicePrices.brakeCheck.map((item, idx) => (
            <tr key={idx}>
              <td>{item.type}</td>
              <td>Rs. {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Full Service */}
      <h2>Full Service Prices</h2>
      <table className="price-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {servicePrices.fullService.map((item, idx) => (
            <tr key={idx}>
              <td>{item.type}</td>
              <td>Rs. {item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Prices;
