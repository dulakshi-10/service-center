import React, { useEffect, useState } from 'react';
import './Appointments.css';

const Appointments = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/orders', {
          method: 'POST',
        });

        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Washing Type</th>
              <th>Oil Check Type</th>
              <th>Additional Services</th>
              <th>Order Date</th>
              <th>Order Time</th>
              <th>Additional Note</th>
              <th>Created At</th>
              <th>Advance Paid</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.washing_type}</td>
                <td>{order.oil_check_type}</td>
                <td>{order.additional_services}</td>
                <td>{order.order_date}</td>
                <td>{order.order_time}</td>
                <td>{order.additional_note}</td>
                <td>{order.created_at}</td>
                <td>{order.isAdvancePaid ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
