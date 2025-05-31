import React, { useState, useEffect } from 'react';
import './Reporting.css';

const Reporting = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        setError('End date must be greater than or equal to start date');
        setReportData([]);
      } else {
        setError('');
        fetch(
          `http://localhost:5000/reporting/summary?startDate=${startDate}&endDate=${endDate}`
        )
          .then((res) => res.json())
          .then((data) => setReportData(data))
          .catch((err) => setError('Error fetching report data'));
      }
    }
  }, [startDate, endDate]);

  return (
    <div className="reporting-container">
      <h2 className="reporting-title">Service Report</h2>

      <div className="date-selector">
        <label>
          Start Date:
          <input
            type="date"
            max={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            min={startDate || ''}
            max={today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!startDate}
          />
        </label>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {reportData.length > 0 && (
        <table className="report-table">
          <thead>
            <tr>
              <th>Total Orders</th>
              <th>Total (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.total_orders}</td>
                <td>{Number(entry.total_advance).toLocaleString('en-LK', {
                  style: 'currency',
                  currency: 'LKR',
                })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reporting;
