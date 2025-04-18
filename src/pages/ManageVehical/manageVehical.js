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
  const [vehicleList, setVehicleList] = useState([{
    name: 'Ford Edge 2011', register: 'CAD - 22321', brand: 'Ford'
  }]);

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

  const CarInfoCard = ({ name, number, brand }) => {
    return (
      <div className="car-card">
        <h3 className="car-card-title">{name}</h3>
        <p><strong>Number:</strong> {number}</p>
        <p><strong>Brand:</strong> {brand}</p>
      </div>
    );
  };

  return (
    <div className="vehicle-management">
      <div className="vehicle-management-title">
        <h2>Vehicle Management</h2>
      </div>
      <div className="vehicle-main-wrapper">
        <h3>Vehicle List</h3>

        <div className="vehicle-list">
          {
            vehicleList.map((vehicle, index) =>
              <div key={index}>
                <CarInfoCard name={vehicle.name} number={vehicle.register} brand={vehicle.brand} />
                <button onClick={() => handleDeleteVehicle(index)}>Delete</button>
              </div>
            )
          }
        </div>

        <h3>Add a Vehicle</h3>
        <div className="add-vehicle">

          <div className="add-vehicle-left">
            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Vehicle Name</b></label>
              <input
                type="text"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                placeholder="Vehicle Name"
                className="vehicle-management-input"
              />
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Vehicle Type</b></label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="vehicle-management-select"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Sadan/Hatchback">Sadan/Hatchback</option>
                <option value="SUV & 4 x 4 Vehicle">SUV & 4 x 4 Vehicle</option>
                <option value="Luxury Vehicle">Luxury Vehicle</option>
                <option value="Electric Vehicle">Electric Vehicle</option>
              </select>
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Vehicle Brand</b></label>
              <select
                value={vehicleBrand}
                onChange={(e) => setVehicleBrand(e.target.value)}
                className="vehicle-management-select"
              >
                <option value="">Select Vehicle Brand</option>
                <option value="Toyota">Toyota</option>
                <option value="Honda">Honda</option>
                <option value="Suzuki">Suzuki</option>
                <option value="Nissan">Nissan</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Mazda">Mazda</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Kia">Kia</option>
                <option value="Subaru">Subaru</option>
                <option value="Isuzu">Isuzu</option>
                <option value="Perodua">Perodua</option>
                <option value="Proton">Proton</option>
                <option value="BMW">BMW</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Tata">Tata</option>
                <option value="Mahindra">Mahindra</option>
                <option value="Chery">Chery</option>
                <option value="Great Wall">Great Wall</option>
              </select>
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Vehicle Model</b></label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="Vehicle Model"
                className="vehicle-management-input"
              />
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Vehicle Year</b></label>
              <input
                type="text"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                placeholder="Year of Manufacture"
                className="vehicle-management-input"
              />
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Select Transmission</b></label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="vehicle-management-select"
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>

          <div className="add-vehicle-right">
            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Engine Capacity</b></label>
              <input
                type="text"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                placeholder="Engine Capacity"
                className="vehicle-management-input"
              />
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Vehicle Registration Number</b></label>
              <input
                type="text"
                value={vehicleRegisterNumber}
                onChange={(e) => setVehicleRegisterNumber(e.target.value)}
                placeholder="Vehicle Registration Number"
                className="vehicle-management-input"
              />
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Mileage</b></label>
              <input
                type="text"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Mileage"
                className="vehicle-management-input"
              />
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Chassis Number</b></label>
              <input
                type="text"
                value={chassisNumber}
                onChange={(e) => setChassisNumber(e.target.value)}
                placeholder="Chassis Number"
                className="vehicle-management-input"
              />
            </div>

            <div className="item-wrapper">
              <label className="manage-vehicle-label"><b>Made Country</b></label>
              <input
                type="text"
                value={madeCountry}
                onChange={(e) => setMadeCountry(e.target.value)}
                placeholder="Made Country"
                className="vehicle-management-input"
              />
            </div>

            <button type="submit" className="Add-btn">Add vehicle</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;
