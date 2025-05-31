import React, { useEffect, useState } from 'react';
import './Invoice.css';

const Invoice = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/orders/details')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function formatTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(+hours, +minutes, +seconds || 0);
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(amount);
  }

  const handleEdit = (order) => {
    setEditingOrderId(order.order_id);
    setEditData({
      additional_services: order.additional_services || '',
      payment: order.payment || 0,
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (order_id) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${order_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Failed to update order');

      const updatedOrders = orders.map(order =>
        order.order_id === order_id
          ? { ...order, ...editData }
          : order
      );
      setOrders(updatedOrders);
      setEditingOrderId(null);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  return (
    <div className="orders-table-container">
      <h2 className="orders-title">Service Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Vehicle Reg. No</th>
            <th>Washing Type</th>
            <th>Oil Check</th>
            <th>Additional Services</th>
            <th>Advance Paid</th>
            <th>Order Date</th>
            <th>Order Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.user_name}</td>
              <td>{order.user_email}</td>
              <td>{order.registration_number}</td>
              <td>{order.washing_type}</td>
              <td>{order.oil_check_type}</td>

              <td>
                {editingOrderId === order.order_id ? (
                  <input
                    name="additional_services"
                    type="text"
                    value={editData.additional_services}
                    onChange={handleChange}
                  />
                ) : (
                  order.additional_services
                )}
              </td>

              <td>
                {editingOrderId === order.order_id ? (
                  <input
                    name="payment"
                    type="number"
                    value={editData.payment}
                    onChange={handleChange}
                  />
                ) : (
                  formatCurrency(order.payment)
                )}
              </td>

              <td>{formatDate(order.order_date)}</td>
              <td>{formatTime(order.order_time)}</td>

              <td>
                {editingOrderId === order.order_id ? (
                  <button onClick={() => handleSave(order.order_id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(order)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
