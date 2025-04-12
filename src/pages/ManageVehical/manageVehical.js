import React, { useState } from "react";
import './manageVehical.css';  // Correct import path

const VehicleManagement = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [transmission, setTransmission] = useState('');
  const [engineCapacity, setEngineCapacity] = useState('');
  const [vehicleRegisterNumber, setVehicleRegisterNumber] = useState('');
  const [mileage, setMileage] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [madeCountry, setMadeCountry] = useState('');
  const [vehicleList, setVehicleList] = useState([]);

  const handleAddVehicle = () => {
    const newVehicle = {
      name: vehicleName,
      type: vehicleType,
      brand: vehicleBrand,
      model: vehicleModel,
      year: vehicleYear,
      transmission: transmission,
      engineCapacity: engineCapacity,
      register: vehicleRegisterNumber,
      mileage: mileage,
      chassis: chassisNumber,
      country: madeCountry,
    };

    setVehicleList([...vehicleList, newVehicle]);
    clearForm();
  };

  const handleDeleteVehicle = (index) => {
    const updatedList = vehicleList.filter((_, i) => i !== index);
    setVehicleList(updatedList);
  };

  const clearForm = () => {
    setVehicleName('');
    setVehicleType('');
    setVehicleBrand('');
    setVehicleModel('');
    setVehicleYear('');
    setTransmission('');
    setEngineCapacity('');
    setVehicleRegisterNumber('');
    setMileage('');
    setChassisNumber('');
    setMadeCountry('');
  };

  return (
    <div className="vehicle-management">
      <h2>Vehicle Management</h2>
      <div className="form">
        <input
          type="text"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          placeholder="Vehicle Name"
        />

        {/* Vehicle Type as a dropdown */}
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="">Select Vehicle Type</option>
          <option value="Sadan/Hatchback">Sadan/Hatchback</option>
          <option value="SUV & 4 x 4 Vehicle">SUV & 4 x 4 Vehicle</option>
          <option value="Luxury Vehicle">Luxury Vehicle</option>
          <option value="Electric Vehicle">Electric Vehicle</option>
        </select>

        {/* Vehicle Brand as a dropdown */}
        <select
          value={vehicleBrand}
          onChange={(e) => setVehicleBrand(e.target.value)}
        >
          <option value="">Select Vehicle Brand</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Suzuki">Suzuki</option>
          <option value="Nissan">Nissan</option>
        </select>

        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          placeholder="Vehicle Model"
        />

        <input
          type="text"
          value={vehicleYear}
          onChange={(e) => setVehicleYear(e.target.value)}
          placeholder="Year of Manufacture"
        />

        {/* Transmission Dropdown */}
        <select
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        >
          <option value="">Select Transmission</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>

        <input
          type="text"
          value={engineCapacity}
          onChange={(e) => setEngineCapacity(e.target.value)}
          placeholder="Engine Capacity"
        />

        <input
          type="text"
          value={vehicleRegisterNumber}
          onChange={(e) => setVehicleRegisterNumber(e.target.value)}
          placeholder="Vehicle Registration Number"
        />

        <input
          type="text"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          placeholder="Mileage"
        />

        <input
          type="text"
          value={chassisNumber}
          onChange={(e) => setChassisNumber(e.target.value)}
          placeholder="Chassis Number"
        />

        <input
          type="text"
          value={madeCountry}
          onChange={(e) => setMadeCountry(e.target.value)}
          placeholder="Made Country"
        />
        
        <button onClick={handleAddVehicle}>Add Vehicle</button>
      </div>

      <div className="vehicle-list">
        <h3>Vehicle List</h3>
        {vehicleList.length === 0 ? (
          <p>No vehicles added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Transmission</th>
                <th>Engine Capacity</th>
                <th>Register Number</th>
                <th>Mileage</th>
                <th>Chassis</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicleList.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.transmission}</td>
                  <td>{vehicle.engineCapacity}</td>
                  <td>{vehicle.register}</td>
                  <td>{vehicle.mileage}</td>
                  <td>{vehicle.chassis}</td>
                  <td>{vehicle.country}</td>
                  <td>
                    <button onClick={() => handleDeleteVehicle(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VehicleManagement;
